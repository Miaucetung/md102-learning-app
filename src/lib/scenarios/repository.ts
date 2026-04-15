// ============================================================================
// Enterprise IT Training Platform - Scenarios Repository
// ============================================================================
// Central repository for accessing scenario content
// Scenarios are stored as TypeScript files for type safety and versioning
// ============================================================================

import type {
  EnterpriseScenario,
  ScenarioCategory,
  ScenarioDifficulty,
  SubscriptionTier,
} from "@/types";

// Import all scenarios
import { conditionalAccessScenarios } from "@/content/scenarios/conditional-access";
import { defenderScenarios } from "@/content/scenarios/defender";
import { exchangeScenarios } from "@/content/scenarios/exchange";
import { identityAccessScenarios } from "@/content/scenarios/identity-access";
import { intuneScenarios } from "@/content/scenarios/intune";
import { tenantAdminScenarios } from "@/content/scenarios/tenant-admin";

// ============================================================================
// Scenario Registry
// ============================================================================

const allScenarios: EnterpriseScenario[] = [
  ...conditionalAccessScenarios,
  ...identityAccessScenarios,
  ...defenderScenarios,
  ...exchangeScenarios,
  ...intuneScenarios,
  ...tenantAdminScenarios,
];

// Build lookup maps for efficient access
const scenarioById = new Map<string, EnterpriseScenario>(
  allScenarios.map((s) => [s.id, s]),
);

const scenarioBySlug = new Map<string, EnterpriseScenario>(
  allScenarios.map((s) => [s.slug, s]),
);

// ============================================================================
// Repository Functions
// ============================================================================

/**
 * Get all scenarios
 */
export function getAllScenarios(): EnterpriseScenario[] {
  return [...allScenarios];
}

/**
 * Get scenario by ID
 */
export function getScenarioById(id: string): EnterpriseScenario | undefined {
  return scenarioById.get(id);
}

/**
 * Get scenario by slug
 */
export function getScenarioBySlug(
  slug: string,
): EnterpriseScenario | undefined {
  return scenarioBySlug.get(slug);
}

/**
 * Get scenarios by category
 */
export function getScenariosByCategory(
  category: ScenarioCategory,
): EnterpriseScenario[] {
  return allScenarios.filter((s) => s.category === category);
}

/**
 * Get scenarios by difficulty
 */
export function getScenariosByDifficulty(
  difficulty: ScenarioDifficulty,
): EnterpriseScenario[] {
  return allScenarios.filter((s) => s.difficulty === difficulty);
}

/**
 * Get scenarios by tier (and lower)
 */
export function getScenariosByTier(
  tier: SubscriptionTier,
): EnterpriseScenario[] {
  const tierOrder: SubscriptionTier[] = ["free", "premium", "enterprise"];
  const maxTierIndex = tierOrder.indexOf(tier);
  return allScenarios.filter((s) => tierOrder.indexOf(s.tier) <= maxTierIndex);
}

/**
 * Get free scenarios (for tier gating)
 */
export function getFreeScenarios(): EnterpriseScenario[] {
  return allScenarios.filter((s) => s.tier === "free");
}

/**
 * Get scenarios by skill tag
 */
export function getScenariosBySkillTag(tag: string): EnterpriseScenario[] {
  return allScenarios.filter((s) =>
    s.skillTags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

/**
 * Get related scenarios
 */
export function getRelatedScenarios(
  scenarioId: string,
  limit: number = 3,
): EnterpriseScenario[] {
  const scenario = scenarioById.get(scenarioId);
  if (!scenario) return [];

  // Get explicitly related scenarios
  const relatedIds = new Set(scenario.relatedScenarios);

  // Also find scenarios with similar skill tags
  const related = allScenarios.filter((s) => {
    if (s.id === scenarioId) return false;
    if (relatedIds.has(s.id)) return true;

    // Check for skill tag overlap
    const overlap = s.skillTags.filter((tag) =>
      scenario.skillTags.includes(tag),
    );
    return overlap.length >= 2;
  });

  // Sort by relevance (explicit relations first, then by tag overlap)
  related.sort((a, b) => {
    const aExplicit = relatedIds.has(a.id) ? 1 : 0;
    const bExplicit = relatedIds.has(b.id) ? 1 : 0;
    if (aExplicit !== bExplicit) return bExplicit - aExplicit;

    const aOverlap = a.skillTags.filter((t) =>
      scenario.skillTags.includes(t),
    ).length;
    const bOverlap = b.skillTags.filter((t) =>
      scenario.skillTags.includes(t),
    ).length;
    return bOverlap - aOverlap;
  });

  return related.slice(0, limit);
}

/**
 * Get next recommended scenarios based on user progress
 */
export function getRecommendedScenarios(
  completedScenarioIds: string[],
  userTier: SubscriptionTier,
  limit: number = 5,
): EnterpriseScenario[] {
  const completed = new Set(completedScenarioIds);
  const accessible = getScenariosByTier(userTier);

  // Get incomplete scenarios
  const incomplete = accessible.filter((s) => !completed.has(s.id));

  // Sort by difficulty (beginner first for new users)
  const difficultyOrder: ScenarioDifficulty[] = [
    "beginner",
    "intermediate",
    "advanced",
  ];

  incomplete.sort((a, b) => {
    const aDiff = difficultyOrder.indexOf(a.difficulty);
    const bDiff = difficultyOrder.indexOf(b.difficulty);
    return aDiff - bDiff;
  });

  return incomplete.slice(0, limit);
}

/**
 * Get scenario statistics
 */
export function getScenarioStats(): {
  total: number;
  byCategory: Record<ScenarioCategory, number>;
  byDifficulty: Record<ScenarioDifficulty, number>;
  byTier: Record<SubscriptionTier, number>;
} {
  const byCategory: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};
  const byTier: Record<string, number> = {};

  for (const s of allScenarios) {
    byCategory[s.category] = (byCategory[s.category] || 0) + 1;
    byDifficulty[s.difficulty] = (byDifficulty[s.difficulty] || 0) + 1;
    byTier[s.tier] = (byTier[s.tier] || 0) + 1;
  }

  return {
    total: allScenarios.length,
    byCategory: byCategory as Record<ScenarioCategory, number>,
    byDifficulty: byDifficulty as Record<ScenarioDifficulty, number>,
    byTier: byTier as Record<SubscriptionTier, number>,
  };
}

/**
 * Search scenarios
 */
export function searchScenarios(
  query: string,
  filters?: {
    category?: ScenarioCategory;
    difficulty?: ScenarioDifficulty;
    tier?: SubscriptionTier;
  },
): EnterpriseScenario[] {
  const queryLower = query.toLowerCase();

  return allScenarios.filter((s) => {
    // Apply filters first
    if (filters?.category && s.category !== filters.category) return false;
    if (filters?.difficulty && s.difficulty !== filters.difficulty)
      return false;
    if (filters?.tier) {
      const tierOrder: SubscriptionTier[] = ["free", "premium", "enterprise"];
      if (tierOrder.indexOf(s.tier) > tierOrder.indexOf(filters.tier))
        return false;
    }

    // Search in title, description, and skill tags
    if (s.title.toLowerCase().includes(queryLower)) return true;
    if (s.description.toLowerCase().includes(queryLower)) return true;
    if (s.skillTags.some((t) => t.toLowerCase().includes(queryLower)))
      return true;
    if (s.context.problem.toLowerCase().includes(queryLower)) return true;

    return false;
  });
}
