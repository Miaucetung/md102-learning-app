"use client";

/**
 * ExamTrapBlock Component
 *
 * Highlights certification exam pitfalls.
 * "In the exam, watch out for..."
 *
 * Cognitive Science: Error-based learning + metacognition
 */

import type { ExamTrapBlock as ExamTrapBlockType } from "@/content/types";
import {
  AlertTriangle,
  CheckCircle2,
  GraduationCap,
  XCircle,
} from "lucide-react";

interface ExamTrapBlockProps {
  block: ExamTrapBlockType;
}

export function ExamTrapBlock({ block }: ExamTrapBlockProps) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-amber-500/20 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-amber-500/20">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{block.title}</h3>
          <p className="text-sm text-amber-300/70">
            Aufgepasst in der Zertifizierung!
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* The Trap Description */}
        <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500/40">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-2">
                Die Falle
              </h4>
              <p className="text-amber-100">{block.trapDescription}</p>
            </div>
          </div>
        </div>

        {/* Common Mistake vs Correct Approach */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Common Mistake */}
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-red-300 uppercase tracking-wider mb-2">
                  Häufiger Fehler
                </h4>
                <p className="text-red-100 text-sm">{block.commonMistake}</p>
              </div>
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
                <div className="text-emerald-100 text-sm whitespace-pre-line">
                  {block.correctApproach}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Phrasing Examples */}
        {block.examPhrasing && block.examPhrasing.length > 0 && (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-2">
                  Typische Prüfungsformulierungen
                </h4>
                <ul className="space-y-2">
                  {block.examPhrasing.map((phrase, index) => (
                    <li
                      key={index}
                      className="text-blue-100 text-sm flex items-start gap-2"
                    >
                      <span className="text-blue-400 font-mono">→</span>
                      <span className="font-mono text-xs">{phrase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
