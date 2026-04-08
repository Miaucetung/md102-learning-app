"use client";

/**
 * ScenarioBlock Component
 *
 * Presents a real-world admin scenario with multiple choice options.
 *
 * Cognitive Science: Situated learning + problem-based approach
 */

import type { ScenarioBlock as ScenarioBlockType } from "@/content/types";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { useState } from "react";

interface ScenarioBlockProps {
  block: ScenarioBlockType;
  onComplete?: (correct: boolean) => void;
}

export function ScenarioBlock({ block, onComplete }: ScenarioBlockProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (isRevealed) return;
    setSelectedIndex(index);
  };

  const handleReveal = () => {
    if (selectedIndex === null) return;
    setIsRevealed(true);
    onComplete?.(block.options[selectedIndex].isCorrect);
  };

  const selectedOption =
    selectedIndex !== null ? block.options[selectedIndex] : null;

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-cyan-500/20">
          <Building2 className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{block.title}</h3>
          <p className="text-sm text-cyan-300/70">{block.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Situation */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Situation
          </h4>
          <p className="text-slate-200">{block.situation}</p>
        </div>

        {/* Challenge */}
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
          <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-2">
            Herausforderung
          </h4>
          <p className="text-cyan-100">{block.challenge}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {block.options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isCorrect = option.isCorrect;

            let bgColor = "bg-slate-800/50 hover:bg-slate-700/50";
            let borderColor = "border-slate-700/50";
            let textColor = "text-slate-200";

            if (isRevealed) {
              if (isCorrect) {
                bgColor = "bg-emerald-500/20";
                borderColor = "border-emerald-500/50";
                textColor = "text-emerald-200";
              } else if (isSelected && !isCorrect) {
                bgColor = "bg-red-500/20";
                borderColor = "border-red-500/50";
                textColor = "text-red-200";
              }
            } else if (isSelected) {
              bgColor = "bg-cyan-500/20";
              borderColor = "border-cyan-500/50";
              textColor = "text-cyan-200";
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={isRevealed}
                whileHover={!isRevealed ? { scale: 1.01 } : {}}
                whileTap={!isRevealed ? { scale: 0.99 } : {}}
                className={`w-full p-4 rounded-xl border ${bgColor} ${borderColor} ${textColor} text-left transition-all`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isRevealed && isCorrect
                        ? "bg-emerald-500"
                        : isRevealed && isSelected && !isCorrect
                          ? "bg-red-500"
                          : isSelected
                            ? "bg-cyan-500"
                            : "bg-slate-700"
                    }`}
                  >
                    {isRevealed ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : isSelected ? (
                        <XCircle className="w-4 h-4 text-white" />
                      ) : null
                    ) : (
                      <span className="text-xs text-white font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{option.label}</p>
                    {isRevealed && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`mt-2 text-sm ${
                          isCorrect ? "text-emerald-300" : "text-slate-400"
                        }`}
                      >
                        {option.feedback}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Reveal Button */}
        {!isRevealed && (
          <motion.button
            onClick={handleReveal}
            disabled={selectedIndex === null}
            whileHover={selectedIndex !== null ? { scale: 1.02 } : {}}
            whileTap={selectedIndex !== null ? { scale: 0.98 } : {}}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
              selectedIndex !== null
                ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            Lösung prüfen
          </motion.button>
        )}

        {/* Real World Tip */}
        {isRevealed && block.realWorldTip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-300 mb-1">
                  Praxis-Tipp
                </h4>
                <p className="text-amber-100 text-sm">{block.realWorldTip}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
