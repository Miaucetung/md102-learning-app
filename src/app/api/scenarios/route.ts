// ============================================================================
// Enterprise IT Training Platform - Scenarios API
// ============================================================================
// GET /api/scenarios - List all scenarios (filtered by tier)
// GET /api/scenarios/[id] - Get scenario details
// POST /api/scenarios/[id]/start - Start a scenario attempt
// PUT /api/scenarios/[id]/decision - Submit a decision
// POST /api/scenarios/[id]/complete - Complete a scenario
// ============================================================================

import {
  getAllScenarios,
  getScenariosByCategory,
} from "@/lib/scenarios/repository";
import type { ScenarioCategory, SubscriptionTier } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// Types for API Responses
// ============================================================================

interface ScenariosListResponse {
  scenarios: ScenarioSummary[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

interface ScenarioSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ScenarioCategory;
  difficulty: string;
  tier: SubscriptionTier;
  estimatedMinutes: number;
  skillTags: string[];
  isLocked: boolean;
}

interface ScenarioDetailResponse {
  scenario: ScenarioDetail;
  userProgress?: UserScenarioProgress;
}

interface ScenarioDetail extends ScenarioSummary {
  environment: object;
  context: object;
  decisionPoints: object[];
  totalDecisions: number;
}

interface UserScenarioProgress {
  attemptId?: string;
  status: "not-started" | "in-progress" | "completed";
  bestScore?: number;
  lastAttemptAt?: string;
  attemptCount: number;
}

// ============================================================================
// GET /api/scenarios
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const category = searchParams.get("category") as ScenarioCategory | null;
    const difficulty = searchParams.get("difficulty");
    const tier = searchParams.get("tier") as SubscriptionTier | null;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const search = searchParams.get("search");

    // Get user tier (from session - simplified for now)
    const userTier: SubscriptionTier = "free"; // TODO: Get from auth session

    // Get scenarios
    let scenarios = category
      ? getScenariosByCategory(category)
      : getAllScenarios();

    // Filter by difficulty
    if (difficulty) {
      scenarios = scenarios.filter((s) => s.difficulty === difficulty);
    }

    // Filter by tier (only show scenarios user can access OR locked ones)
    // Free users see all but some are locked

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      scenarios = scenarios.filter(
        (s) =>
          s.title.toLowerCase().includes(searchLower) ||
          s.description.toLowerCase().includes(searchLower) ||
          s.skillTags.some((tag) => tag.toLowerCase().includes(searchLower)),
      );
    }

    // Pagination
    const total = scenarios.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedScenarios = scenarios.slice(start, end);

    // Map to response format with lock status
    const scenarioSummaries: ScenarioSummary[] = paginatedScenarios.map(
      (s) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        description: s.description,
        category: s.category,
        difficulty: s.difficulty,
        tier: s.tier,
        estimatedMinutes: s.estimatedMinutes,
        skillTags: s.skillTags,
        isLocked: !canAccessScenario(userTier, s.tier),
      }),
    );

    const response: ScenariosListResponse = {
      scenarios: scenarioSummaries,
      total,
      page,
      pageSize,
      hasMore: end < total,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching scenarios:", error);
    return NextResponse.json(
      { error: "Failed to fetch scenarios" },
      { status: 500 },
    );
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function canAccessScenario(
  userTier: SubscriptionTier,
  scenarioTier: SubscriptionTier,
): boolean {
  const tierOrder: SubscriptionTier[] = ["free", "premium", "enterprise"];
  return tierOrder.indexOf(userTier) >= tierOrder.indexOf(scenarioTier);
}
