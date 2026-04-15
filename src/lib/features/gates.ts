// ============================================================================
// Enterprise IT Training Platform - Feature Gating
// ============================================================================
// Utilities and components for tier-based feature access control
// ============================================================================

import type { SubscriptionTier } from "@/types";

// ============================================================================
// Feature Definitions
// ============================================================================

export interface Feature {
  id: string;
  name: string;
  description: string;
  requiredTier: SubscriptionTier;
  category: "scenarios" | "analytics" | "team" | "export" | "customization";
}

export const FEATURES: Record<string, Feature> = {
  // Scenario Access
  unlimited_scenarios: {
    id: "unlimited_scenarios",
    name: "Unlimited Scenarios",
    description: "Access all training scenarios without limits",
    requiredTier: "premium",
    category: "scenarios",
  },
  all_categories: {
    id: "all_categories",
    name: "All Categories",
    description:
      "Access scenarios in all categories including advanced security",
    requiredTier: "premium",
    category: "scenarios",
  },
  advanced_difficulty: {
    id: "advanced_difficulty",
    name: "Advanced Scenarios",
    description: "Access advanced enterprise incident scenarios",
    requiredTier: "premium",
    category: "scenarios",
  },

  // Analytics
  basic_progress: {
    id: "basic_progress",
    name: "Basic Progress Tracking",
    description: "Track your scenario completions and scores",
    requiredTier: "free",
    category: "analytics",
  },
  skill_analytics: {
    id: "skill_analytics",
    name: "Skill Analytics",
    description: "Detailed skill breakdowns and improvement recommendations",
    requiredTier: "premium",
    category: "analytics",
  },
  advanced_analytics: {
    id: "advanced_analytics",
    name: "Advanced Analytics",
    description: "Deep insights with trend analysis and benchmarking",
    requiredTier: "enterprise",
    category: "analytics",
  },

  // Team Features
  team_management: {
    id: "team_management",
    name: "Team Management",
    description: "Create teams and manage team members",
    requiredTier: "enterprise",
    category: "team",
  },
  team_analytics: {
    id: "team_analytics",
    name: "Team Analytics",
    description: "View team progress and performance comparisons",
    requiredTier: "enterprise",
    category: "team",
  },
  skill_gap_analysis: {
    id: "skill_gap_analysis",
    name: "Skill Gap Analysis",
    description: "Identify skill gaps across your team or organization",
    requiredTier: "enterprise",
    category: "team",
  },
  admin_dashboard: {
    id: "admin_dashboard",
    name: "Admin Dashboard",
    description: "Organization-wide administration and oversight",
    requiredTier: "enterprise",
    category: "team",
  },

  // Export & API
  export_personal: {
    id: "export_personal",
    name: "Export Personal Progress",
    description: "Export your own progress and certificates",
    requiredTier: "premium",
    category: "export",
  },
  export_reports: {
    id: "export_reports",
    name: "Export Team Reports",
    description: "Generate and export detailed team reports",
    requiredTier: "enterprise",
    category: "export",
  },
  api_access: {
    id: "api_access",
    name: "API Access",
    description: "REST API for integration with LMS and HR systems",
    requiredTier: "enterprise",
    category: "export",
  },

  // Customization
  custom_scenarios: {
    id: "custom_scenarios",
    name: "Custom Scenarios",
    description: "Create custom training scenarios for your organization",
    requiredTier: "enterprise",
    category: "customization",
  },
  custom_branding: {
    id: "custom_branding",
    name: "Custom Branding",
    description: "Add your organization's logo and colors",
    requiredTier: "enterprise",
    category: "customization",
  },
  sso: {
    id: "sso",
    name: "Single Sign-On",
    description: "Integrate with your identity provider",
    requiredTier: "enterprise",
    category: "customization",
  },
};

// ============================================================================
// Tier Limits
// ============================================================================

export interface TierLimits {
  scenariosPerMonth: number | "unlimited";
  categories: number | "all";
  teamMembers: number;
  apiCallsPerMonth: number;
  storageGB: number;
}

export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  free: {
    scenariosPerMonth: 5,
    categories: 2, // Only identity-access and conditional-access (basics)
    teamMembers: 0,
    apiCallsPerMonth: 0,
    storageGB: 0,
  },
  premium: {
    scenariosPerMonth: "unlimited",
    categories: "all",
    teamMembers: 0, // No team features
    apiCallsPerMonth: 0,
    storageGB: 5,
  },
  enterprise: {
    scenariosPerMonth: "unlimited",
    categories: "all",
    teamMembers: 500,
    apiCallsPerMonth: 10000,
    storageGB: 100,
  },
};

// ============================================================================
// Access Check Functions
// ============================================================================

const TIER_HIERARCHY: SubscriptionTier[] = ["free", "premium", "enterprise"];

/**
 * Check if a tier has access to a specific feature
 */
export function hasFeatureAccess(
  userTier: SubscriptionTier,
  featureId: string,
): boolean {
  const feature = FEATURES[featureId];
  if (!feature) {
    console.warn(`Unknown feature: ${featureId}`);
    return false;
  }

  const userTierIndex = TIER_HIERARCHY.indexOf(userTier);
  const requiredTierIndex = TIER_HIERARCHY.indexOf(feature.requiredTier);

  return userTierIndex >= requiredTierIndex;
}

/**
 * Check if user can access a specific scenario based on tier
 */
export function canAccessScenario(
  userTier: SubscriptionTier,
  scenarioTier: SubscriptionTier,
): boolean {
  const userTierIndex = TIER_HIERARCHY.indexOf(userTier);
  const scenarioTierIndex = TIER_HIERARCHY.indexOf(scenarioTier);

  return userTierIndex >= scenarioTierIndex;
}

/**
 * Check if user has reached their monthly scenario limit
 */
export function hasReachedScenarioLimit(
  userTier: SubscriptionTier,
  completedThisMonth: number,
): boolean {
  const limit = TIER_LIMITS[userTier].scenariosPerMonth;
  if (limit === "unlimited") return false;
  return completedThisMonth >= limit;
}

/**
 * Get remaining scenarios for the month
 */
export function getRemainingScenarios(
  userTier: SubscriptionTier,
  completedThisMonth: number,
): number | "unlimited" {
  const limit = TIER_LIMITS[userTier].scenariosPerMonth;
  if (limit === "unlimited") return "unlimited";
  return Math.max(0, limit - completedThisMonth);
}

/**
 * Get all features available for a tier
 */
export function getAvailableFeatures(tier: SubscriptionTier): Feature[] {
  return Object.values(FEATURES).filter((feature) =>
    hasFeatureAccess(tier, feature.id),
  );
}

/**
 * Get features locked for a tier (for upsell)
 */
export function getLockedFeatures(tier: SubscriptionTier): Feature[] {
  return Object.values(FEATURES).filter(
    (feature) => !hasFeatureAccess(tier, feature.id),
  );
}

/**
 * Get the minimum tier required to unlock a feature
 */
export function getRequiredTier(featureId: string): SubscriptionTier | null {
  const feature = FEATURES[featureId];
  return feature?.requiredTier ?? null;
}

/**
 * Get upgrade suggestion for a locked feature
 */
export function getUpgradeSuggestion(featureId: string): {
  targetTier: SubscriptionTier;
  feature: Feature;
} | null {
  const feature = FEATURES[featureId];
  if (!feature) return null;

  return {
    targetTier: feature.requiredTier,
    feature,
  };
}

// ============================================================================
// Free Tier Categories
// ============================================================================

export const FREE_TIER_CATEGORIES = [
  "identity-access",
  "conditional-access",
] as const;

/**
 * Check if a category is accessible on free tier
 */
export function isCategoryFree(category: string): boolean {
  return FREE_TIER_CATEGORIES.includes(category as any);
}

// ============================================================================
// Pricing Information
// ============================================================================

export interface PricingTier {
  name: string;
  tier: SubscriptionTier;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const PRICING: PricingTier[] = [
  {
    name: "Free",
    tier: "free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "5 scenarios per month",
      "2 categories (Identity & Conditional Access)",
      "Basic progress tracking",
      "Beginner difficulty scenarios",
    ],
    cta: "Get Started",
  },
  {
    name: "Premium",
    tier: "premium",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Unlimited scenarios",
      "All 6 categories",
      "All difficulty levels",
      "Skill analytics & insights",
      "Export personal progress",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    tier: "enterprise",
    monthlyPrice: 0, // Custom pricing
    yearlyPrice: 0,
    features: [
      "Everything in Premium",
      "Team management (up to 500 members)",
      "Team & organization analytics",
      "Skill gap analysis",
      "Admin dashboard",
      "Custom scenarios",
      "API access & LMS integration",
      "SSO / SAML",
      "Dedicated support",
    ],
    cta: "Contact Sales",
  },
];
