"use client";

/**
 * Unified Card Components
 * Consistent styling for modules, labs, exams across the platform
 */

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  Play,
  Target,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

// ============================================================================
// MODULE CARD - For learning modules
// ============================================================================

export interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  iconColor?: string;
  estimatedMinutes?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  blockCount?: number;
  progress?: number; // 0-100
  isCompleted?: boolean;
  examRelevance?: "low" | "medium" | "high" | "critical";
  tags?: string[];
  index?: number;
}

export function ModuleCard({
  title,
  description,
  href,
  icon: Icon = BookOpen,
  iconColor = "from-blue-500 to-blue-600",
  estimatedMinutes,
  difficulty,
  blockCount,
  progress = 0,
  isCompleted = false,
  examRelevance,
  tags = [],
  index = 0,
}: ModuleCardProps) {
  const difficultyColors = {
    beginner: "text-green-600 dark:text-green-400",
    intermediate: "text-yellow-600 dark:text-yellow-400",
    advanced: "text-red-600 dark:text-red-400",
  };

  const difficultyLabels = {
    beginner: "Einsteiger",
    intermediate: "Fortgeschritten",
    advanced: "Experte",
  };

  const examColors = {
    low: "bg-gray-100 dark:bg-gray-800",
    medium: "bg-blue-100 dark:bg-blue-900/30",
    high: "bg-purple-100 dark:bg-purple-900/30",
    critical: "bg-red-100 dark:bg-red-900/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={href}>
        <div className="group relative bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg overflow-hidden">
          {/* Progress indicator */}
          {progress > 0 && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${iconColor} flex-shrink-0`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-6 w-6 text-white" />
              ) : (
                <Icon className="h-6 w-6 text-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {title}
                </h3>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {description}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
                {blockCount && (
                  <span className="flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5" />
                    {blockCount} Blöcke
                  </span>
                )}
                {estimatedMinutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />~{estimatedMinutes} Min
                  </span>
                )}
                {difficulty && (
                  <span
                    className={`flex items-center gap-1 ${difficultyColors[difficulty]}`}
                  >
                    <Target className="h-3.5 w-3.5" />
                    {difficultyLabels[difficulty]}
                  </span>
                )}
                {examRelevance && (
                  <span
                    className={`px-2 py-0.5 rounded-full ${examColors[examRelevance]} flex items-center gap-1`}
                  >
                    <Award className="h-3 w-3" />
                    {examRelevance === "critical"
                      ? "Prüfungsrelevant"
                      : examRelevance}
                  </span>
                )}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {tags.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// LAB CARD - For hands-on labs
// ============================================================================

export interface LabCardProps {
  title: string;
  description?: string;
  href: string;
  stepCount?: number;
  estimatedMinutes?: number;
  progress?: number;
  isLocked?: boolean;
  index?: number;
}

export function LabCard({
  title,
  description,
  href,
  stepCount,
  estimatedMinutes,
  progress = 0,
  isLocked = false,
  index = 0,
}: LabCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={isLocked ? "#" : href}>
        <div
          className={`group bg-white dark:bg-gray-900 rounded-xl p-5 border transition-all ${
            isLocked
              ? "border-gray-200 dark:border-gray-800 opacity-60 cursor-not-allowed"
              : "border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl ${
                isLocked
                  ? "bg-gray-200 dark:bg-gray-800"
                  : "bg-gradient-to-br from-green-500 to-green-600"
              }`}
            >
              <Play
                className={`h-6 w-6 ${isLocked ? "text-gray-400" : "text-white"}`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold ${
                  isLocked
                    ? "text-gray-500"
                    : "text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400"
                } transition-colors`}
              >
                {title}
              </h3>
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                  {description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                {stepCount && <span>{stepCount} Schritte</span>}
                {estimatedMinutes && <span>~{estimatedMinutes} Min</span>}
                {progress > 0 && <span>{progress}% abgeschlossen</span>}
              </div>
            </div>

            {!isLocked && (
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
            )}
          </div>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="mt-4 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// EXAM CARD - For exam simulations
// ============================================================================

export interface ExamCardProps {
  title: string;
  description?: string;
  href: string;
  questionCount?: number;
  estimatedMinutes?: number;
  lastScore?: number;
  certification: string;
  index?: number;
}

export function ExamCard({
  title,
  description,
  href,
  questionCount,
  estimatedMinutes,
  lastScore,
  certification,
  index = 0,
}: ExamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={href}>
        <div className="group bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
              <Award className="h-6 w-6 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                  {certification}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mt-1">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                  {description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                {questionCount && <span>{questionCount} Fragen</span>}
                {estimatedMinutes && <span>~{estimatedMinutes} Min</span>}
                {lastScore !== undefined && (
                  <span
                    className={
                      lastScore >= 70
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }
                  >
                    Letzte Punkte: {lastScore}%
                  </span>
                )}
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// SECTION WRAPPER - For consistent section styling
// ============================================================================

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  action?: {
    label: string;
    href: string;
  };
}

export function Section({
  title,
  description,
  children,
  action,
}: SectionProps) {
  return (
    <section className="space-y-4">
      {(title || action) && (
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
          {action && (
            <Link
              href={action.href}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              {action.label}
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
