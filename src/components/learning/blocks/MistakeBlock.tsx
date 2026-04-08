"use client";

/**
 * MistakeBlock Component
 *
 * Shows common errors and how to avoid them.
 * "A common error is..."
 *
 * Cognitive Science: Error-based learning improves recognition
 */

import type { MistakeBlock as MistakeBlockType } from "@/content/types";
import { AlertTriangle, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

interface MistakeBlockProps {
  block: MistakeBlockType;
}

export function MistakeBlock({ block }: MistakeBlockProps) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-pink-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-red-500/20 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-red-500/20">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{block.title}</h3>
          <p className="text-sm text-red-300/70">{block.description}</p>
        </div>
      </div>

      {/* Content - List of Mistakes */}
      <div className="p-6 space-y-6">
        {block.mistakes.map((mistake, index) => (
          <div
            key={index}
            className="space-y-4 pb-6 border-b border-slate-700/50 last:border-0 last:pb-0"
          >
            {/* Wrong Approach */}
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-300 uppercase tracking-wider mb-2">
                    Falscher Ansatz
                  </h4>
                  <p className="text-red-100">{mistake.wrong}</p>
                </div>
              </div>
            </div>

            {/* Arrow Transition */}
            <div className="flex justify-center">
              <div className="p-2 rounded-full bg-emerald-500/20">
                <ArrowRight className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            {/* Correct Approach */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider mb-2">
                    Richtiger Ansatz
                  </h4>
                  <p className="text-emerald-100">{mistake.correct}</p>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Erklärung
              </h4>
              <p className="text-slate-200 text-sm">{mistake.explanation}</p>
            </div>

            {/* Consequence */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-2">
                Konsequenz des Fehlers
              </h4>
              <p className="text-amber-100 text-sm">{mistake.consequence}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
