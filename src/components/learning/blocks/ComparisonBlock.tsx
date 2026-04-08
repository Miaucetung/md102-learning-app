"use client";

/**
 * ComparisonBlock Component
 *
 * Compares technologies/approaches side by side.
 * Shows characteristics for each item and key differences in a table.
 *
 * Cognitive Science: Comparative analysis aids differentiation
 */

import type { ComparisonBlock as ComparisonBlockType } from "@/content/types";
import { CheckCircle2, Lightbulb, Scale } from "lucide-react";

interface ComparisonBlockProps {
  block: ComparisonBlockType;
}

export function ComparisonBlock({ block }: ComparisonBlockProps) {
  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-indigo-500/20 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-500/20">
          <Scale className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{block.title}</h3>
          <p className="text-sm text-indigo-300/70">{block.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Items side by side */}
        <div className="grid gap-4 md:grid-cols-2">
          {block.items.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
            >
              {/* Item Name */}
              <h4 className="font-semibold text-white text-center pb-3 border-b border-slate-700/50 mb-4">
                {item.name}
              </h4>

              {/* Characteristics */}
              <ul className="space-y-2">
                {item.characteristics.map((char, i) => (
                  <li
                    key={i}
                    className="text-sm text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {char}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Key Differences Table */}
        {block.keyDifferences && block.keyDifferences.length > 0 && (
          <div className="rounded-xl overflow-hidden border border-slate-700/50">
            <div className="bg-slate-800/70 px-4 py-2 border-b border-slate-700/50">
              <h4 className="text-sm font-semibold text-white">
                Wichtige Unterschiede
              </h4>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-left px-4 py-2 text-slate-400 font-medium">
                    Aspekt
                  </th>
                  <th className="text-left px-4 py-2 text-slate-400 font-medium">
                    {block.items[0]?.name || "Option A"}
                  </th>
                  <th className="text-left px-4 py-2 text-slate-400 font-medium">
                    {block.items[1]?.name || "Option B"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.keyDifferences.map((diff, i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 === 0 ? "bg-slate-900/30" : "bg-transparent"
                    }
                  >
                    <td className="px-4 py-2 text-slate-300 font-medium">
                      {diff.aspect}
                    </td>
                    <td className="px-4 py-2 text-blue-300">{diff.optionA}</td>
                    <td className="px-4 py-2 text-purple-300">
                      {diff.optionB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Recommendation */}
        {block.recommendation && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-emerald-300 mb-1">
                  Empfehlung
                </h4>
                <p className="text-emerald-100 text-sm">
                  {block.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
