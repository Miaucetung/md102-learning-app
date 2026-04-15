// ============================================================================
// Enterprise IT Training Platform - Organization & B2B Types
// ============================================================================
// Multi-tenant architecture for B2B enterprise features
// ============================================================================

import type { SubscriptionTier } from "./scenarios";

// ----------------------------------------------------------------------------
// Organization Structure
// ----------------------------------------------------------------------------

export interface Organization {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly domain?: string;

  // Subscription
  readonly tier: SubscriptionTier;
  readonly subscriptionStatus: "active" | "trial" | "expired" | "cancelled";
  readonly subscriptionStartDate: string;
  readonly subscriptionEndDate?: string;
  readonly maxSeats: number;
  readonly usedSeats: number;

  // Settings
  readonly settings: OrganizationSettings;

  // Metadata
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface OrganizationSettings {
  /** Custom branding */
  readonly branding?: {
    readonly logoUrl?: string;
    readonly primaryColor?: string;
    readonly companyName?: string;
  };
  /** Feature flags */
  readonly features: {
    readonly customScenarios: boolean;
    readonly apiAccess: boolean;
    readonly ssoEnabled: boolean;
    readonly advancedAnalytics: boolean;
    readonly exportReports: boolean;
  };
  /** Default settings for new users */
  readonly defaultUserSettings: {
    readonly notificationsEnabled: boolean;
    readonly weeklyReportEnabled: boolean;
  };
  /** Allowed scenario categories (for restricted access) */
  readonly allowedCategories?: string[];
}

// ----------------------------------------------------------------------------
// Team Structure
// ----------------------------------------------------------------------------

export interface Team {
  readonly id: string;
  readonly organizationId: string;
  readonly name: string;
  readonly description?: string;
  readonly memberCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface TeamMember {
  readonly id: string;
  readonly teamId: string;
  readonly userId: string;
  readonly role: TeamRole;
  readonly joinedAt: string;
}

export type TeamRole = "owner" | "admin" | "member";

// ----------------------------------------------------------------------------
// User Types
// ----------------------------------------------------------------------------

export interface User {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
  readonly avatarUrl?: string;

  // Organization relationship
  readonly organizationId?: string;
  readonly organizationRole: OrganizationRole;

  // Subscription (for individual users)
  readonly personalTier: SubscriptionTier;

  // Profile
  readonly profile: UserProfile;

  // Metadata
  readonly createdAt: string;
  readonly lastLoginAt: string;
  readonly emailVerified: boolean;
}

export type OrganizationRole = "owner" | "admin" | "manager" | "member";

export interface UserProfile {
  readonly jobTitle?: string;
  readonly department?: string;
  readonly experience: "junior" | "mid" | "senior" | "lead";
  readonly focusAreas: string[];
  readonly certifications: string[];
  readonly timezone: string;
  readonly language: string;
}

// ----------------------------------------------------------------------------
// Admin Dashboard Types
// ----------------------------------------------------------------------------

export interface OrganizationDashboard {
  readonly organization: Organization;
  readonly stats: OrganizationStats;
  readonly recentActivity: ActivityItem[];
  readonly teamPerformance: TeamPerformanceMetric[];
  readonly topPerformers: UserPerformanceMetric[];
  readonly categoryBreakdown: CategoryBreakdown[];
}

export interface OrganizationStats {
  readonly totalUsers: number;
  readonly activeUsersThisMonth: number;
  readonly totalScenariosCompleted: number;
  readonly averageScore: number;
  readonly totalTimeSpentHours: number;
  readonly completionRate: number;
  readonly monthOverMonthGrowth: number;
}

export interface ActivityItem {
  readonly id: string;
  readonly type:
    | "scenario_completed"
    | "user_joined"
    | "achievement_unlocked"
    | "milestone_reached";
  readonly userId: string;
  readonly userName: string;
  readonly details: string;
  readonly timestamp: string;
}

export interface TeamPerformanceMetric {
  readonly teamId: string;
  readonly teamName: string;
  readonly memberCount: number;
  readonly averageScore: number;
  readonly scenariosCompleted: number;
  readonly completionRate: number;
  readonly trend: "up" | "down" | "stable";
}

export interface UserPerformanceMetric {
  readonly userId: string;
  readonly displayName: string;
  readonly avatarUrl?: string;
  readonly scenariosCompleted: number;
  readonly averageScore: number;
  readonly streak: number;
  readonly rank: number;
}

export interface CategoryBreakdown {
  readonly category: string;
  readonly scenariosCompleted: number;
  readonly averageScore: number;
  readonly userCount: number;
}

// ----------------------------------------------------------------------------
// Report Types
// ----------------------------------------------------------------------------

export interface ReportConfig {
  readonly type: ReportType;
  readonly dateRange: {
    readonly start: string;
    readonly end: string;
  };
  readonly filters: ReportFilters;
  readonly format: "pdf" | "csv" | "xlsx";
}

export type ReportType =
  | "team-progress"
  | "individual-progress"
  | "skill-gap-analysis"
  | "scenario-completion"
  | "time-tracking";

export interface ReportFilters {
  readonly teamIds?: string[];
  readonly userIds?: string[];
  readonly categories?: string[];
  readonly difficulties?: string[];
}

export interface GeneratedReport {
  readonly id: string;
  readonly config: ReportConfig;
  readonly status: "pending" | "generating" | "completed" | "failed";
  readonly downloadUrl?: string;
  readonly generatedAt?: string;
  readonly expiresAt?: string;
}

// ----------------------------------------------------------------------------
// Invitation & Onboarding
// ----------------------------------------------------------------------------

export interface Invitation {
  readonly id: string;
  readonly organizationId: string;
  readonly email: string;
  readonly role: OrganizationRole;
  readonly teamId?: string;
  readonly invitedBy: string;
  readonly status: "pending" | "accepted" | "expired" | "revoked";
  readonly createdAt: string;
  readonly expiresAt: string;
}

export interface OnboardingProgress {
  readonly userId: string;
  readonly steps: OnboardingStep[];
  readonly completedAt?: string;
}

export interface OnboardingStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly completedAt?: string;
}

// ----------------------------------------------------------------------------
// API Access (Enterprise Tier)
// ----------------------------------------------------------------------------

export interface ApiKey {
  readonly id: string;
  readonly organizationId: string;
  readonly name: string;
  readonly keyPrefix: string; // First 8 chars for identification
  readonly permissions: ApiPermission[];
  readonly createdAt: string;
  readonly lastUsedAt?: string;
  readonly expiresAt?: string;
  readonly status: "active" | "revoked";
}

export type ApiPermission =
  | "scenarios:read"
  | "progress:read"
  | "progress:write"
  | "analytics:read"
  | "users:read"
  | "users:write";

// ----------------------------------------------------------------------------
// Feature Gating Utilities
// ----------------------------------------------------------------------------

export interface FeatureGate {
  readonly feature: string;
  readonly requiredTier: SubscriptionTier;
  readonly description: string;
}

export const FEATURE_GATES: FeatureGate[] = [
  {
    feature: "unlimited_scenarios",
    requiredTier: "premium",
    description: "Access to all scenarios without limits",
  },
  {
    feature: "all_categories",
    requiredTier: "premium",
    description: "Access to all scenario categories",
  },
  {
    feature: "advanced_analytics",
    requiredTier: "premium",
    description: "Detailed skill analytics and insights",
  },
  {
    feature: "export_reports",
    requiredTier: "premium",
    description: "Export progress reports",
  },
  {
    feature: "team_management",
    requiredTier: "enterprise",
    description: "Create and manage teams",
  },
  {
    feature: "admin_dashboard",
    requiredTier: "enterprise",
    description: "Organization admin dashboard",
  },
  {
    feature: "api_access",
    requiredTier: "enterprise",
    description: "REST API access for integrations",
  },
  {
    feature: "custom_scenarios",
    requiredTier: "enterprise",
    description: "Create custom training scenarios",
  },
  {
    feature: "sso",
    requiredTier: "enterprise",
    description: "Single Sign-On integration",
  },
  {
    feature: "custom_branding",
    requiredTier: "enterprise",
    description: "Custom logo and branding",
  },
];

/**
 * Check if a feature is available for a given tier
 */
export function hasFeatureAccess(
  tier: SubscriptionTier,
  feature: string,
): boolean {
  const gate = FEATURE_GATES.find((g) => g.feature === feature);
  if (!gate) return true; // Unknown features are allowed

  const tierHierarchy: SubscriptionTier[] = ["free", "premium", "enterprise"];
  const requiredLevel = tierHierarchy.indexOf(gate.requiredTier);
  const currentLevel = tierHierarchy.indexOf(tier);

  return currentLevel >= requiredLevel;
}

/**
 * Get all features available for a tier
 */
export function getAvailableFeatures(tier: SubscriptionTier): string[] {
  return FEATURE_GATES.filter((gate) =>
    hasFeatureAccess(tier, gate.feature),
  ).map((gate) => gate.feature);
}

/**
 * Get upgrade prompt for a feature
 */
export function getUpgradePrompt(feature: string): {
  requiredTier: SubscriptionTier;
  description: string;
} | null {
  const gate = FEATURE_GATES.find((g) => g.feature === feature);
  if (!gate) return null;
  return {
    requiredTier: gate.requiredTier,
    description: gate.description,
  };
}
