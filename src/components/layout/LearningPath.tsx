"use client";

/**
 * LearningPathCard - Displays a learning path with progress
 */

import {
  learningPaths,
  type LearningPath,
  type PathId,
} from "@/lib/learningPaths";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Clock,
  Cloud,
  Monitor,
  Network,
  Play,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Cloud,
  Network,
};

interface LearningPathCardProps {
  path: LearningPath;
  progress?: number;
  completedSteps?: string[];
  index?: number;
  variant?: "full" | "compact";
}

export function LearningPathCard({
  path,
  progress = 0,
  completedSteps = [],
  index = 0,
  variant = "full",
}: LearningPathCardProps) {
  const Icon = iconMap[path.icon] || BookOpen;
  const totalSteps = path.steps.filter((s) => !s.isOptional).length;
  const completedCount = path.steps.filter(
    (s) => !s.isOptional && completedSteps.includes(s.id),
  ).length;

  // Find next incomplete step
  const nextStep = path.steps.find(
    (s) => !s.isOptional && !completedSteps.includes(s.id),
  );

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Link href={nextStep?.href || `/learn/${path.id}`}>
          <div className="group bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${path.color}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {path.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {path.subtitle}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {progress}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {completedCount}/{totalSteps}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${path.color} transition-all`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className={`p-6 bg-gradient-to-br ${path.color}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{path.title}</h3>
                <p className="text-white/80">{path.subtitle}</p>
              </div>
            </div>
            {path.certification && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                <Award className="h-4 w-4 text-white" />
                <span className="text-sm text-white">Zertifizierung</span>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-white/80 text-sm mb-2">
              <span>Fortschritt</span>
              <span>
                {completedCount} von {totalSteps} Modulen
              </span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {path.description}
          </p>

          {/* Stats */}
          <div className="flex gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {path.steps.length} Module
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />~{path.totalHours}h
            </span>
          </div>

          {/* Steps preview */}
          <div className="space-y-2 mb-6">
            {path.steps.slice(0, 4).map((step, idx) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = step.id === nextStep?.id;

              return (
                <Link key={step.id} href={step.href}>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isCurrent
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : isCompleted
                          ? "bg-green-50 dark:bg-green-900/10"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          isCompleted
                            ? "text-green-700 dark:text-green-400"
                            : isCurrent
                              ? "text-blue-700 dark:text-blue-400"
                              : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {step.type === "exam"
                          ? "Prüfung"
                          : step.type === "lab"
                            ? "Labor"
                            : `~${step.estimatedMinutes} Min`}
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                        Nächster Schritt
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}

            {path.steps.length > 4 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                +{path.steps.length - 4} weitere Module
              </p>
            )}
          </div>

          {/* Action */}
          <Link href={nextStep?.href || `/learn/${path.id}`}>
            <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
              {progress > 0 ? (
                <>
                  <Play className="h-4 w-4" />
                  Fortsetzen: {nextStep?.title}
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Lernpfad starten
                </>
              )}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PATH OVERVIEW - Shows all learning paths
// ============================================================================

interface PathOverviewProps {
  completedSteps?: Partial<Record<PathId, string[]>>;
}

export function PathOverview({ completedSteps = {} }: PathOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {learningPaths.map((path, idx) => {
        const completed = completedSteps[path.id] || [];
        const progress = Math.round(
          (completed.length / path.steps.filter((s) => !s.isOptional).length) *
            100,
        );

        return (
          <LearningPathCard
            key={path.id}
            path={path}
            progress={progress}
            completedSteps={completed}
            index={idx}
            variant="compact"
          />
        );
      })}
    </div>
  );
}
