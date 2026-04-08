"use client";

/**
 * SummaryBlock Component
 *
 * Provides a comprehensive summary with key points, exam relevance, and next steps.
 *
 * Cognitive Science: Consolidation + spaced retrieval cues
 */

import type { SummaryBlock as SummaryBlockType } from "@/content/types";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

interface SummaryBlockProps {
  block: SummaryBlockType;
  onComplete?: () => void;
}

export function SummaryBlock({ block, onComplete }: SummaryBlockProps) {
  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-indigo-500/20 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-500/20">
          <BookMarked className="w-5 h-5 text-indigo-400" />
        </div>
        <h3 className="font-semibold text-white">{block.title}</h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Key Points */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Kernpunkte
          </h4>
          <ul className="space-y-2">
            {block.keyPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-indigo-300">
                    {index + 1}
                  </span>
                </div>
                <span className="text-indigo-100">{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Exam Relevance */}
        {block.examRelevance && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <GraduationCap className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-amber-300 mb-3">
                  Exam-Relevanz
                </h4>

                {/* Weight */}
                {block.examRelevance.weight && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-amber-200">Prüfungsgewichtung</span>
                      <span className="text-amber-400 font-semibold">
                        {block.examRelevance.weight}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            block.examRelevance.weight.includes("15") ||
                            block.examRelevance.weight.includes("20")
                              ? "80%"
                              : block.examRelevance.weight.includes("10")
                                ? "60%"
                                : "40%",
                        }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                      />
                    </div>
                  </div>
                )}

                {/* Frequent Topics */}
                {block.examRelevance.frequentTopics &&
                  block.examRelevance.frequentTopics.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm text-amber-200 flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" />
                        Häufige Prüfungsthemen:
                      </span>
                      <ul className="space-y-1">
                        {block.examRelevance.frequentTopics.map(
                          (topic, index) => (
                            <li
                              key={index}
                              className="text-amber-100 text-sm flex items-start gap-2"
                            >
                              <span className="text-amber-400">•</span>
                              <span>{topic}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        {block.nextSteps && block.nextSteps.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Nächste Schritte
            </h4>
            <div className="flex flex-wrap gap-2">
              {block.nextSteps.map((step, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-200 text-sm border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  {step}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
