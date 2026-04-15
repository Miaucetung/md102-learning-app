"use client";

// ============================================================================
// Enterprise IT Training Platform - Admin Dashboard
// ============================================================================
// Main admin dashboard for organization management
// ============================================================================

import type { Organization, User } from "@/types";
import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  Building2,
  ChevronRight,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { ReactNode } from "react";

// ============================================================================
// Dashboard Layout
// ============================================================================

interface DashboardLayoutProps {
  children: ReactNode;
  organization: Organization;
  currentUser: User;
}

export function DashboardLayout({
  children,
  organization,
  currentUser,
}: DashboardLayoutProps) {
  const navItems = [
    { icon: BarChart3, label: "Overview", href: "/admin" },
    { icon: Users, label: "Team", href: "/admin/team" },
    { icon: BookOpen, label: "Training", href: "/admin/training" },
    { icon: Award, label: "Progress", href: "/admin/progress" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700">
        {/* Organization Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {organization.branding?.logo ? (
              <img
                src={organization.branding.logo}
                alt={organization.name}
                className="w-10 h-10 rounded-lg"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <h2 className="font-semibold text-white truncate">
                {organization.name}
              </h2>
              <span className="text-xs text-slate-400 capitalize">
                {organization.subscriptionTier} Plan
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="h-16 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">{currentUser.email}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500" />
          </div>
        </header>

        {/* Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

// ============================================================================
// Stats Card
// ============================================================================

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: typeof Users;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "bg-purple-500/20 text-purple-400",
}: StatsCardProps) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${
                change >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              <TrendingUp
                className={`w-4 h-4 ${change < 0 ? "rotate-180" : ""}`}
              />
              {Math.abs(change)}% from last month
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
// Overview Dashboard
// ============================================================================

interface DashboardOverviewProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    scenariosCompleted: number;
    averageScore: number;
    userGrowth: number;
    completionGrowth: number;
  };
  recentActivity: {
    userId: string;
    userName: string;
    action: string;
    scenarioTitle: string;
    timestamp: string;
    score?: number;
  }[];
  topPerformers: {
    userId: string;
    userName: string;
    scenariosCompleted: number;
    averageScore: number;
  }[];
}

export function DashboardOverview({
  stats,
  recentActivity,
  topPerformers,
}: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Team Members"
          value={stats.totalUsers}
          change={stats.userGrowth}
          icon={Users}
          iconColor="bg-blue-500/20 text-blue-400"
        />
        <StatsCard
          title="Active This Week"
          value={stats.activeUsers}
          icon={Activity}
          iconColor="bg-emerald-500/20 text-emerald-400"
        />
        <StatsCard
          title="Scenarios Completed"
          value={stats.scenariosCompleted}
          change={stats.completionGrowth}
          icon={BookOpen}
          iconColor="bg-purple-500/20 text-purple-400"
        />
        <StatsCard
          title="Avg. Success Rate"
          value={`${stats.averageScore}%`}
          icon={Award}
          iconColor="bg-amber-500/20 text-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Activity</h3>
            <a
              href="/admin/activity"
              className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              View all <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                  {activity.userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">
                    <span className="font-medium">{activity.userName}</span>{" "}
                    <span className="text-slate-400">{activity.action}</span>{" "}
                    <span className="text-purple-400">
                      {activity.scenarioTitle}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">{activity.timestamp}</p>
                </div>
                {activity.score !== undefined && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.score >= 80
                        ? "bg-emerald-500/20 text-emerald-400"
                        : activity.score >= 60
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {activity.score}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Top Performers</h3>
            <a
              href="/admin/leaderboard"
              className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              View all <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-3">
            {topPerformers.map((performer, i) => (
              <div
                key={performer.userId}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    i === 0
                      ? "bg-amber-500 text-white"
                      : i === 1
                        ? "bg-slate-400 text-white"
                        : i === 2
                          ? "bg-amber-700 text-white"
                          : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{performer.userName}</p>
                  <p className="text-xs text-slate-400">
                    {performer.scenariosCompleted} scenarios completed
                  </p>
                </div>
                <span className="text-emerald-400 font-medium">
                  {performer.averageScore}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
