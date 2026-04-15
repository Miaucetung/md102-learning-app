// ============================================================================
// Enterprise IT Training Platform - Analytics Types
// ============================================================================
// Types for tracking progress, analyzing skills, and generating insights
// ============================================================================

import type { ScenarioCategory, ScenarioDifficulty } from "./scenarios";

// ----------------------------------------------------------------------------
// Progress Tracking
// ----------------------------------------------------------------------------

export interface UserProgress {
  readonly userId: string;
  readonly organizationId?: string;

  // Summary
  readonly totalScenariosAttempted: number;
  readonly totalScenariosCompleted: number;
  readonly totalTimeSpentMinutes: number;
  readonly averageScore: number;
  readonly currentStreak: number;
  readonly longestStreak: number;

  // By Category
  readonly categoryProgress: Record<ScenarioCategory, CategoryProgress>;

  // Timeline
  readonly activityTimeline: DailyActivity[];

  // Achievements
  readonly achievements: UnlockedAchievement[];

  // Metadata
  readonly lastUpdatedAt: string;
}

export interface CategoryProgress {
  readonly category: ScenarioCategory;
  readonly scenariosCompleted: number;
  readonly totalScenarios: number;
  readonly averageScore: number;
  readonly bestScore: number;
  readonly timeSpentMinutes: number;
  readonly masteryLevel: MasteryLevel;
  readonly completedDifficulties: ScenarioDifficulty[];
}

export type MasteryLevel =
  | "novice" // 0-20%
  | "beginner" // 21-40%
  | "intermediate" // 41-60%
  | "advanced" // 61-80%
  | "expert"; // 81-100%

export interface DailyActivity {
  readonly date: string; // YYYY-MM-DD
  readonly scenariosCompleted: number;
  readonly timeSpentMinutes: number;
  readonly averageScore: number;
}

// ----------------------------------------------------------------------------
// Skill Analytics
// ----------------------------------------------------------------------------

export interface SkillAssessment {
  readonly userId: string;
  readonly assessedAt: string;

  // Overall
  readonly overallScore: number;
  readonly overallLevel: MasteryLevel;

  // Category Breakdown
  readonly categoryScores: CategorySkillScore[];

  // Skill Tags
  readonly skillTags: SkillTagScore[];

  // Recommendations
  readonly recommendations: LearningRecommendation[];

  // Comparison
  readonly percentileRank?: number; // Compared to other users
}

export interface CategorySkillScore {
  readonly category: ScenarioCategory;
  readonly score: number;
  readonly level: MasteryLevel;
  readonly trend: "improving" | "stable" | "declining";
  readonly recentChange: number; // Percentage change
}

export interface SkillTagScore {
  readonly tag: string;
  readonly score: number;
  readonly scenariosContributing: number;
  readonly lastPracticedAt: string;
}

export interface LearningRecommendation {
  readonly type: "practice" | "review" | "challenge" | "deepen";
  readonly priority: "high" | "medium" | "low";
  readonly category?: ScenarioCategory;
  readonly skillTag?: string;
  readonly scenarioIds: string[];
  readonly reason: string;
}

// ----------------------------------------------------------------------------
// Team Analytics (Enterprise)
// ----------------------------------------------------------------------------

export interface TeamAnalytics {
  readonly teamId: string;
  readonly teamName: string;
  readonly periodStart: string;
  readonly periodEnd: string;

  // Summary
  readonly memberCount: number;
  readonly activeMemberCount: number;
  readonly totalScenariosCompleted: number;
  readonly averageScore: number;
  readonly averageTimePerScenario: number;

  // Breakdown
  readonly memberPerformance: MemberPerformance[];
  readonly categoryBreakdown: TeamCategoryBreakdown[];

  // Trends
  readonly weeklyTrends: WeeklyTrend[];

  // Skill Gaps
  readonly skillGaps: SkillGap[];
}

export interface MemberPerformance {
  readonly userId: string;
  readonly displayName: string;
  readonly scenariosCompleted: number;
  readonly averageScore: number;
  readonly timeSpentMinutes: number;
  readonly streak: number;
  readonly rank: number;
}

export interface TeamCategoryBreakdown {
  readonly category: ScenarioCategory;
  readonly scenariosCompleted: number;
  readonly averageScore: number;
  readonly participationRate: number; // % of members who attempted
}

export interface WeeklyTrend {
  readonly weekStart: string;
  readonly scenariosCompleted: number;
  readonly activeUsers: number;
  readonly averageScore: number;
}

export interface SkillGap {
  readonly skillTag: string;
  readonly category: ScenarioCategory;
  readonly teamAverageScore: number;
  readonly targetScore: number;
  readonly gap: number;
  readonly affectedMembers: number;
  readonly recommendedScenarios: string[];
}

// ----------------------------------------------------------------------------
// Organization Analytics (Enterprise)
// ----------------------------------------------------------------------------

export interface OrganizationAnalytics {
  readonly organizationId: string;
  readonly periodStart: string;
  readonly periodEnd: string;

  // Summary
  readonly totalUsers: number;
  readonly activeUsers: number;
  readonly engagementRate: number;
  readonly totalScenariosCompleted: number;
  readonly averageScore: number;

  // Comparisons
  readonly vsLastPeriod: PeriodComparison;
  readonly vsBenchmark?: BenchmarkComparison;

  // Teams
  readonly teamComparisons: TeamComparison[];

  // Insights
  readonly insights: AnalyticsInsight[];
}

export interface PeriodComparison {
  readonly activeUsersChange: number;
  readonly scenariosChange: number;
  readonly averageScoreChange: number;
  readonly engagementChange: number;
}

export interface BenchmarkComparison {
  readonly benchmarkType: "industry" | "size" | "global";
  readonly averageScoreVsBenchmark: number;
  readonly completionRateVsBenchmark: number;
  readonly engagementVsBenchmark: number;
}

export interface TeamComparison {
  readonly teamId: string;
  readonly teamName: string;
  readonly memberCount: number;
  readonly averageScore: number;
  readonly completionRate: number;
  readonly rank: number;
}

export interface AnalyticsInsight {
  readonly type: "achievement" | "concern" | "opportunity" | "trend";
  readonly title: string;
  readonly description: string;
  readonly metric: string;
  readonly value: number;
  readonly recommendation?: string;
}

// ----------------------------------------------------------------------------
// Achievement System
// ----------------------------------------------------------------------------

export interface Achievement {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly category: AchievementCategory;
  readonly rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  readonly criteria: AchievementCriteria;
  readonly points: number;
}

export type AchievementCategory =
  | "completion"
  | "mastery"
  | "consistency"
  | "speed"
  | "exploration"
  | "teamwork";

export interface AchievementCriteria {
  readonly type: string;
  readonly threshold: number;
  readonly category?: ScenarioCategory;
  readonly timeframe?: string;
}

export interface UnlockedAchievement {
  readonly achievementId: string;
  readonly unlockedAt: string;
  readonly scenarioId?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Completion Achievements
  {
    id: "first-scenario",
    title: "First Steps",
    description: "Complete your first scenario",
    icon: "🎯",
    category: "completion",
    rarity: "common",
    criteria: { type: "scenarios_completed", threshold: 1 },
    points: 10,
  },
  {
    id: "ten-scenarios",
    title: "Getting Started",
    description: "Complete 10 scenarios",
    icon: "📈",
    category: "completion",
    rarity: "common",
    criteria: { type: "scenarios_completed", threshold: 10 },
    points: 50,
  },
  {
    id: "fifty-scenarios",
    title: "Dedicated Learner",
    description: "Complete 50 scenarios",
    icon: "🏆",
    category: "completion",
    rarity: "uncommon",
    criteria: { type: "scenarios_completed", threshold: 50 },
    points: 200,
  },
  {
    id: "hundred-scenarios",
    title: "Training Champion",
    description: "Complete 100 scenarios",
    icon: "👑",
    category: "completion",
    rarity: "rare",
    criteria: { type: "scenarios_completed", threshold: 100 },
    points: 500,
  },

  // Mastery Achievements
  {
    id: "perfect-score",
    title: "Perfect Execution",
    description: "Complete a scenario with 100% score",
    icon: "✨",
    category: "mastery",
    rarity: "uncommon",
    criteria: { type: "perfect_score", threshold: 1 },
    points: 100,
  },
  {
    id: "category-master",
    title: "Category Master",
    description: "Achieve Expert level in any category",
    icon: "🎓",
    category: "mastery",
    rarity: "rare",
    criteria: { type: "category_mastery", threshold: 80 },
    points: 300,
  },

  // Consistency Achievements
  {
    id: "three-day-streak",
    title: "Consistent Learner",
    description: "Maintain a 3-day learning streak",
    icon: "🔥",
    category: "consistency",
    rarity: "common",
    criteria: { type: "streak", threshold: 3 },
    points: 30,
  },
  {
    id: "seven-day-streak",
    title: "Weekly Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    category: "consistency",
    rarity: "uncommon",
    criteria: { type: "streak", threshold: 7 },
    points: 100,
  },
  {
    id: "thirty-day-streak",
    title: "Monthly Master",
    description: "Maintain a 30-day learning streak",
    icon: "🔥",
    category: "consistency",
    rarity: "epic",
    criteria: { type: "streak", threshold: 30 },
    points: 500,
  },

  // Exploration Achievements
  {
    id: "all-categories",
    title: "Well Rounded",
    description: "Complete at least one scenario in each category",
    icon: "🌟",
    category: "exploration",
    rarity: "uncommon",
    criteria: { type: "categories_explored", threshold: 6 },
    points: 150,
  },
  {
    id: "advanced-explorer",
    title: "Advanced Explorer",
    description: "Complete an advanced difficulty scenario",
    icon: "🚀",
    category: "exploration",
    rarity: "rare",
    criteria: { type: "difficulty_completed", threshold: 1 },
    points: 200,
  },
];

// ----------------------------------------------------------------------------
// Leaderboard Types
// ----------------------------------------------------------------------------

export interface Leaderboard {
  readonly type: LeaderboardType;
  readonly period: LeaderboardPeriod;
  readonly entries: LeaderboardEntry[];
  readonly userRank?: LeaderboardEntry;
}

export type LeaderboardType = "overall" | "category" | "organization" | "team";

export type LeaderboardPeriod = "all-time" | "monthly" | "weekly" | "daily";

export interface LeaderboardEntry {
  readonly rank: number;
  readonly userId: string;
  readonly displayName: string;
  readonly avatarUrl?: string;
  readonly score: number;
  readonly scenariosCompleted: number;
  readonly organizationName?: string;
  readonly teamName?: string;
}
