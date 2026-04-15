"use client";

// ============================================================================
// Enterprise IT Training Platform - Progress & Analytics
// ============================================================================
// Analytics dashboard for tracking team training progress
// ============================================================================

import type { SubscriptionTier } from "@/types";
import {
  Activity,
  AlertTriangle,
  Award,
  BarChart2,
  BookOpen,
  CheckCircle2,
  Clock,
  PieChart,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

interface TeamAnalytics {
  overview: {
    totalMembers: number;
    activeMembers: number;
    scenariosCompleted: number;
    averageScore: number;
    totalTimeSpent: number; // minutes
    completionRate: number;
  };
  trends: {
    memberGrowth: number;
    activityChange: number;
    scoreChange: number;
    completionChange: number;
  };
  categoryProgress: {
    categoryId: string;
    categoryName: string;
    totalScenarios: number;
    completed: number;
    averageScore: number;
    weakestArea?: string;
  }[];
  skillGaps: {
    skill: string;
    currentLevel: number;
    targetLevel: number;
    membersBelow: number;
  }[];
  memberProgress: {
    userId: string;
    userName: string;
    scenariosCompleted: number;
    averageScore: number;
    lastActive: string;
    trend: "up" | "down" | "stable";
  }[];
}

// ============================================================================
// Analytics Dashboard
// ============================================================================

interface AnalyticsDashboardProps {
  analytics: TeamAnalytics;
  tier: SubscriptionTier;
}

export function AnalyticsDashboard({
  analytics,
  tier,
}: AnalyticsDashboardProps) {
  const isPremiumOrAbove = tier === "premium" || tier === "enterprise";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Team Analytics</h2>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Members"
          value={`${analytics.overview.activeMembers}/${analytics.overview.totalMembers}`}
          trend={analytics.trends.activityChange}
          icon={Users}
          iconColor="bg-blue-500/20 text-blue-400"
        />
        <MetricCard
          title="Scenarios Completed"
          value={analytics.overview.scenariosCompleted}
          trend={analytics.trends.completionChange}
          icon={BookOpen}
          iconColor="bg-purple-500/20 text-purple-400"
        />
        <MetricCard
          title="Average Score"
          value={`${analytics.overview.averageScore}%`}
          trend={analytics.trends.scoreChange}
          icon={Award}
          iconColor="bg-emerald-500/20 text-emerald-400"
        />
        <MetricCard
          title="Time Invested"
          value={formatTime(analytics.overview.totalTimeSpent)}
          icon={Clock}
          iconColor="bg-amber-500/20 text-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Progress */}
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-400" />
            Progress by Category
          </h3>
          <div className="space-y-4">
            {analytics.categoryProgress.map((category) => (
              <CategoryProgressBar
                key={category.categoryId}
                category={category}
              />
            ))}
          </div>
        </div>

        {/* Skill Gaps */}
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            Skill Gaps Analysis
          </h3>
          {isPremiumOrAbove ? (
            <div className="space-y-4">
              {analytics.skillGaps.map((gap) => (
                <SkillGapIndicator key={gap.skill} gap={gap} />
              ))}
            </div>
          ) : (
            <UpgradePrompt feature="skill gap analysis" />
          )}
        </div>
      </div>

      {/* Member Progress Table */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Individual Progress
        </h3>
        <MemberProgressTable members={analytics.memberProgress} />
      </div>

      {/* Recommendations (Enterprise only) */}
      {tier === "enterprise" && (
        <TrainingRecommendations analytics={analytics} />
      )}
    </div>
  );
}

// ============================================================================
// Metric Card
// ============================================================================

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: typeof Users;
  iconColor: string;
}

function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
  iconColor,
}: MetricCardProps) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${
                trend >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {trend >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {Math.abs(trend)}% vs last period
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Category Progress Bar
// ============================================================================

interface CategoryProgressBarProps {
  category: TeamAnalytics["categoryProgress"][number];
}

function CategoryProgressBar({ category }: CategoryProgressBarProps) {
  const percentage = (category.completed / category.totalScenarios) * 100;

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-white font-medium">{category.categoryName}</span>
        <span className="text-slate-400">
          {category.completed}/{category.totalScenarios} (
          {percentage.toFixed(0)}
          %)
        </span>
      </div>
      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            percentage >= 80
              ? "bg-emerald-500"
              : percentage >= 50
                ? "bg-purple-500"
                : "bg-amber-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {category.weakestArea && (
        <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Focus area: {category.weakestArea}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// Skill Gap Indicator
// ============================================================================

interface SkillGapIndicatorProps {
  gap: TeamAnalytics["skillGaps"][number];
}

function SkillGapIndicator({ gap }: SkillGapIndicatorProps) {
  const gapSize = gap.targetLevel - gap.currentLevel;
  const severity =
    gapSize >= 3 ? "critical" : gapSize >= 2 ? "moderate" : "minor";

  const colors = {
    critical: "border-red-500/50 bg-red-500/10",
    moderate: "border-amber-500/50 bg-amber-500/10",
    minor: "border-emerald-500/50 bg-emerald-500/10",
  };

  const textColors = {
    critical: "text-red-400",
    moderate: "text-amber-400",
    minor: "text-emerald-400",
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[severity]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{gap.skill}</span>
        <span className={`text-sm ${textColors[severity]}`}>
          Level {gap.currentLevel} → {gap.targetLevel}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full"
            style={{ width: `${(gap.currentLevel / gap.targetLevel) * 100}%` }}
          />
        </div>
        <span className="text-xs text-slate-400">
          {gap.membersBelow} members below target
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// Member Progress Table
// ============================================================================

interface MemberProgressTableProps {
  members: TeamAnalytics["memberProgress"];
}

function MemberProgressTable({ members }: MemberProgressTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
            <th className="pb-3">Member</th>
            <th className="pb-3">Scenarios</th>
            <th className="pb-3">Avg Score</th>
            <th className="pb-3">Last Active</th>
            <th className="pb-3">Trend</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {members.map((member) => (
            <tr key={member.userId} className="text-sm">
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-medium">
                    {member.userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white font-medium">
                    {member.userName}
                  </span>
                </div>
              </td>
              <td className="py-3 text-slate-300">
                {member.scenariosCompleted}
              </td>
              <td className="py-3">
                <span
                  className={`${
                    member.averageScore >= 80
                      ? "text-emerald-400"
                      : member.averageScore >= 60
                        ? "text-amber-400"
                        : "text-red-400"
                  }`}
                >
                  {member.averageScore}%
                </span>
              </td>
              <td className="py-3 text-slate-400">{member.lastActive}</td>
              <td className="py-3">
                {member.trend === "up" ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Improving
                  </span>
                ) : member.trend === "down" ? (
                  <span className="text-red-400 flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    Declining
                  </span>
                ) : (
                  <span className="text-slate-400">Steady</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// Training Recommendations (Enterprise)
// ============================================================================

interface TrainingRecommendationsProps {
  analytics: TeamAnalytics;
}

function TrainingRecommendations({ analytics }: TrainingRecommendationsProps) {
  // Generate recommendations based on data
  const recommendations = [
    {
      priority: "high",
      title: "Address Conditional Access knowledge gaps",
      description:
        "15% of team members are scoring below target in CA scenarios. Assign focused training.",
      action: "Create Learning Path",
    },
    {
      priority: "medium",
      title: "Re-engage inactive members",
      description:
        "5 team members haven't completed any scenarios in 2+ weeks.",
      action: "Send Reminder",
    },
    {
      priority: "low",
      title: "Advance top performers",
      description:
        "3 team members have mastered beginner scenarios. Consider advanced training.",
      action: "Assign Advanced",
    },
  ];

  const priorityColors = {
    high: "border-red-500/50 bg-red-500/5",
    medium: "border-amber-500/50 bg-amber-500/5",
    low: "border-emerald-500/50 bg-emerald-500/5",
  };

  const priorityIcons = {
    high: AlertTriangle,
    medium: Target,
    low: CheckCircle2,
  };

  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <PieChart className="w-5 h-5 text-purple-400" />
        AI Recommendations
        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
          Enterprise
        </span>
      </h3>
      <div className="space-y-4">
        {recommendations.map((rec, i) => {
          const Icon =
            priorityIcons[rec.priority as keyof typeof priorityIcons];
          return (
            <div
              key={i}
              className={`p-4 rounded-lg border ${
                priorityColors[rec.priority as keyof typeof priorityColors]
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Icon
                    className={`w-5 h-5 mt-0.5 ${
                      rec.priority === "high"
                        ? "text-red-400"
                        : rec.priority === "medium"
                          ? "text-amber-400"
                          : "text-emerald-400"
                    }`}
                  />
                  <div>
                    <h4 className="font-medium text-white">{rec.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      {rec.description}
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1.5 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors whitespace-nowrap">
                  {rec.action}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Upgrade Prompt
// ============================================================================

function UpgradePrompt({ feature }: { feature: string }) {
  return (
    <div className="p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
        <Award className="w-6 h-6 text-amber-400" />
      </div>
      <h4 className="font-medium text-white mb-2">Unlock {feature}</h4>
      <p className="text-sm text-slate-400 mb-4">
        Upgrade to Premium for advanced analytics features
      </p>
      <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-amber-400 hover:to-orange-400 transition-all">
        Upgrade to Premium
      </button>
    </div>
  );
}

// ============================================================================
// Helpers
// ============================================================================

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
