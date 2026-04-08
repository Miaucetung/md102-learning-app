"use client";

/**
 * LearningMeta - Displays learning objectives, prerequisites, exam relevance
 * Standard section for all learning pages
 */

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Target,
} from "lucide-react";
import Link from "next/link";

// ============================================================================
// DIFFICULTY & EXAM RELEVANCE BADGES
// ============================================================================

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type ExamRelevance = "low" | "medium" | "high" | "critical";

interface BadgeProps {
  level: Difficulty | ExamRelevance;
  type: "difficulty" | "exam";
}

export function Badge({ level, type }: BadgeProps) {
  const difficultyStyles: Record<Difficulty, string> = {
    beginner:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    intermediate:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const examStyles: Record<ExamRelevance, string> = {
    low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    high: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    critical:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-500/20",
  };

  const difficultyLabels: Record<Difficulty, string> = {
    beginner: "Einsteiger",
    intermediate: "Fortgeschritten",
    advanced: "Experte",
  };

  const examLabels: Record<ExamRelevance, string> = {
    low: "Geringe Prüfungsrelevanz",
    medium: "Mittlere Prüfungsrelevanz",
    high: "Hohe Prüfungsrelevanz",
    critical: "Prüfungskritisch",
  };

  const styles =
    type === "difficulty"
      ? difficultyStyles[level as Difficulty]
      : examStyles[level as ExamRelevance];

  const label =
    type === "difficulty"
      ? difficultyLabels[level as Difficulty]
      : examLabels[level as ExamRelevance];

  const Icon = type === "difficulty" ? Target : Award;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

// ============================================================================
// LEARNING OBJECTIVES SECTION
// ============================================================================

interface LearningObjectivesProps {
  objectives: string[];
  estimatedMinutes?: number;
  difficulty?: Difficulty;
  examRelevance?: ExamRelevance;
}

export function LearningObjectives({
  objectives,
  estimatedMinutes,
  difficulty,
  examRelevance,
}: LearningObjectivesProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/50"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Nach diesem Modul kannst du...
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {estimatedMinutes && (
            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />~{estimatedMinutes} Min
            </span>
          )}
        </div>
      </div>

      {/* Badges */}
      {(difficulty || examRelevance) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {difficulty && <Badge level={difficulty} type="difficulty" />}
          {examRelevance && <Badge level={examRelevance} type="exam" />}
        </div>
      )}

      {/* Objectives List */}
      <ul className="space-y-2">
        {objectives.map((objective, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300">
              {objective}
            </span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

// ============================================================================
// PREREQUISITES SECTION
// ============================================================================

interface PrerequisitesProps {
  required?: Array<{
    title: string;
    href?: string;
    completed?: boolean;
  }>;
  recommended?: Array<{
    title: string;
    href?: string;
  }>;
}

export function Prerequisites({
  required = [],
  recommended = [],
}: PrerequisitesProps) {
  if (required.length === 0 && recommended.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-500/10 rounded-xl">
          <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Was du dafür können solltest
        </h3>
      </div>

      {required.length > 0 && (
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            Erforderlich
          </p>
          <ul className="space-y-2">
            {required.map((prereq, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {prereq.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-amber-400" />
                )}
                {prereq.href ? (
                  <Link
                    href={prereq.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {prereq.title}
                  </Link>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300">
                    {prereq.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommended.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Empfohlen
          </p>
          <ul className="space-y-2">
            {recommended.map((prereq, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600" />
                {prereq.href ? (
                  <Link
                    href={prereq.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {prereq.title}
                  </Link>
                ) : (
                  <span>{prereq.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.section>
  );
}

// ============================================================================
// EXAM RELEVANCE CALLOUT
// ============================================================================

interface ExamCalloutProps {
  tips: string[];
  commonMistakes?: string[];
  examAreas?: string[];
}

export function ExamCallout({
  tips,
  commonMistakes = [],
  examAreas = [],
}: ExamCalloutProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-purple-50 dark:bg-purple-950/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-500/10 rounded-xl">
          <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Prüfungsrelevanz
        </h3>
      </div>

      {examAreas.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {examAreas.map((area) => (
            <span
              key={area}
              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-md"
            >
              {area}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {/* Tips */}
        <div>
          <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
            💡 In der Prüfung beachten:
          </p>
          <ul className="space-y-1">
            {tips.map((tip, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
              >
                <ChevronRight className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Common Mistakes */}
        {commonMistakes.length > 0 && (
          <div className="pt-4 border-t border-purple-200 dark:border-purple-800">
            <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Typische Fehler:
            </p>
            <ul className="space-y-1">
              {commonMistakes.map((mistake, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                >
                  <span className="text-red-500">✗</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.section>
  );
}

// ============================================================================
// NEXT STEPS / RELATED MODULES
// ============================================================================

interface NextStepsProps {
  nextModule?: {
    title: string;
    href: string;
    description?: string;
  };
  relatedModules?: Array<{
    title: string;
    href: string;
    type: "learn" | "lab" | "exam" | "theory";
  }>;
  examLink?: {
    title: string;
    href: string;
    questionCount?: number;
  };
}

export function NextSteps({
  nextModule,
  relatedModules = [],
  examLink,
}: NextStepsProps) {
  const typeColors = {
    learn: "bg-blue-500",
    lab: "bg-green-500",
    exam: "bg-purple-500",
    theory: "bg-indigo-500",
  };

  const typeLabels = {
    learn: "Lernen",
    lab: "Labor",
    exam: "Prüfung",
    theory: "Theorie",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Target className="h-5 w-5 text-blue-500" />
        Nächste Schritte
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Primary Next Module */}
        {nextModule && (
          <Link href={nextModule.href} className="sm:col-span-2">
            <div className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl p-5 text-white transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">
                    Empfohlener nächster Schritt
                  </p>
                  <p className="font-semibold text-lg">{nextModule.title}</p>
                  {nextModule.description && (
                    <p className="text-blue-100 text-sm mt-1">
                      {nextModule.description}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        )}

        {/* Exam Link */}
        {examLink && (
          <Link href={examLink.href}>
            <div className="group bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-xl p-4 border border-purple-200 dark:border-purple-800 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 dark:text-purple-400 text-sm">
                    Prüfungsvorbereitung
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {examLink.title}
                  </p>
                  {examLink.questionCount && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {examLink.questionCount} Fragen
                    </p>
                  )}
                </div>
                <Award className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </Link>
        )}

        {/* Related Modules */}
        {relatedModules.map((module) => (
          <Link key={module.href} href={module.href}>
            <div className="group bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${typeColors[module.type]}`}
                />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {typeLabels[module.type]}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {module.title}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
