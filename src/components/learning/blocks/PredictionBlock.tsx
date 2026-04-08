"use client";

/**
 * PredictionBlock Component
 *
 * Activates prior knowledge before presenting new content.
 * "What do you think happens if..."
 *
 * Cognitive Science: Active recall + prediction improves retention
 */

import type { PredictionBlock as PredictionBlockType } from "@/content/types";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

interface PredictionBlockProps {
  block: PredictionBlockType;
  onComplete?: (correct: boolean) => void;
}

export function PredictionBlock({ block, onComplete }: PredictionBlockProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const correctIndex = block.options.findIndex(
    (opt) => opt === block.correctAnswer,
  );

  const handleSelect = (index: number) => {
    if (isRevealed) return;
    setSelectedIndex(index);
  };

  const handleReveal = () => {
    if (selectedIndex === null) return;
    setIsRevealed(true);
    onComplete?.(selectedIndex === correctIndex);
  };

  const isCorrect = selectedIndex === correctIndex;

  return (
    <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-purple-500/20 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-purple-500/20">
          <Brain className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Vorhersage</h3>
          <p className="text-sm text-purple-300/70">
            Was denkst du passiert hier?
          </p>
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <p className="text-lg text-white mb-6">{block.question}</p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {block.options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isCorrectOption = index === correctIndex;

            let bgColor = "bg-slate-800/50 hover:bg-slate-700/50";
            let borderColor = "border-slate-700/50";
            let textColor = "text-slate-200";

            if (isRevealed) {
              if (isCorrectOption) {
                bgColor = "bg-emerald-500/20";
                borderColor = "border-emerald-500/50";
                textColor = "text-emerald-200";
              } else if (isSelected && !isCorrectOption) {
                bgColor = "bg-red-500/20";
                borderColor = "border-red-500/50";
                textColor = "text-red-200";
              }
            } else if (isSelected) {
              bgColor = "bg-purple-500/20";
              borderColor = "border-purple-500/50";
              textColor = "text-purple-200";
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={isRevealed}
                whileHover={!isRevealed ? { scale: 1.01 } : {}}
                whileTap={!isRevealed ? { scale: 0.99 } : {}}
                className={`w-full p-4 rounded-xl border ${bgColor} ${borderColor} ${textColor} text-left transition-all flex items-center gap-3`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold ${
                    isRevealed && isCorrectOption
                      ? "bg-emerald-500 text-white"
                      : isRevealed && isSelected && !isCorrectOption
                        ? "bg-red-500 text-white"
                        : isSelected
                          ? "bg-purple-500 text-white"
                          : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {isRevealed ? (
                    isCorrectOption ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Reveal Button */}
        {!isRevealed ? (
          <motion.button
            onClick={handleReveal}
            disabled={selectedIndex === null}
            whileHover={selectedIndex !== null ? { scale: 1.02 } : {}}
            whileTap={selectedIndex !== null ? { scale: 0.98 } : {}}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
              selectedIndex !== null
                ? "bg-purple-500 hover:bg-purple-600 text-white"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            Vorhersage prüfen
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${
                isCorrect
                  ? "bg-emerald-500/20 border border-emerald-500/40"
                  : "bg-amber-500/20 border border-amber-500/40"
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4
                    className={`font-semibold mb-1 ${
                      isCorrect ? "text-emerald-300" : "text-amber-300"
                    }`}
                  >
                    {isCorrect ? "Richtig!" : "Nicht ganz..."}
                  </h4>
                  <p
                    className={`text-sm ${
                      isCorrect ? "text-emerald-200" : "text-amber-200"
                    }`}
                  >
                    {block.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
