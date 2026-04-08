"use client";

/**
 * PracticeBlock Component
 *
 * Hands-on practice steps with commands.
 *
 * Cognitive Science: Active engagement + procedural learning
 */

import type { PracticeBlock as PracticeBlockType } from "@/content/types";
import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb, PlayCircle, Target } from "lucide-react";
import { useState } from "react";

interface PracticeBlockProps {
  block: PracticeBlockType;
  onComplete?: () => void;
}

export function PracticeBlock({ block, onComplete }: PracticeBlockProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const allCompleted = completedSteps.length === block.steps.length;

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-emerald-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20">
            <PlayCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{block.title}</h3>
            <p className="text-sm text-emerald-300/70">Praktische Übung</p>
          </div>
        </div>
        {allCompleted && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Abgeschlossen</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Instruction */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <p className="text-slate-200">{block.instruction}</p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Schritte
          </h4>
          {block.steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isCompleted
                    ? "bg-emerald-500/20 border-emerald-500/40"
                    : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                }`}
                onClick={() => toggleStep(index)}
              >
                <div className="flex items-start gap-4">
                  {/* Step Number / Checkbox */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <p
                    className={`flex-1 ${isCompleted ? "text-emerald-200" : "text-slate-200"}`}
                  >
                    {step}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hints */}
        {block.hints && block.hints.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-2">
                  Hinweise
                </h4>
                <ul className="space-y-1">
                  {block.hints.map((hint, index) => (
                    <li
                      key={index}
                      className="text-amber-100 text-sm flex items-start gap-2"
                    >
                      <span className="text-amber-400">•</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Expected Outcome */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-1">
                Erwartetes Ergebnis
              </h4>
              <p className="text-blue-100 text-sm">{block.expectedOutcome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
