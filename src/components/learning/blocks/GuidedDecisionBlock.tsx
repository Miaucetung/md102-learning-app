"use client";

/**
 * GuidedDecisionBlock Component
 *
 * Interactive multi-step decision tree for choosing solutions.
 * "Which solution would you choose?"
 *
 * Cognitive Science: Decision-making + immediate feedback
 */

import type { GuidedDecisionBlock as GuidedDecisionBlockType } from "@/content/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

interface GuidedDecisionBlockProps {
  block: GuidedDecisionBlockType;
  onComplete?: (allCorrect: boolean) => void;
}

export function GuidedDecisionBlock({
  block,
  onComplete,
}: GuidedDecisionBlockProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const currentStep = block.steps[currentStepIndex];
  const isLastStep = currentStepIndex === block.steps.length - 1;
  const isComplete = currentStepIndex >= block.steps.length;

  const handleSelect = (index: number) => {
    if (isRevealed) return;
    setSelectedIndex(index);
  };

  const handleReveal = () => {
    if (selectedIndex === null) return;
    setIsRevealed(true);

    const isCorrect = currentStep.options[selectedIndex].isCorrect;
    setAnswers([...answers, isCorrect]);
  };

  const handleNext = () => {
    if (isLastStep) {
      // Complete the block
      const allCorrect = [...answers].every((a) => a);
      onComplete?.(allCorrect);
      setCurrentStepIndex(block.steps.length); // Move to complete state
    } else {
      // Move to next step
      const nextStepIndex =
        currentStep.options[selectedIndex!]?.nextStep ?? currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
      setSelectedIndex(null);
      setIsRevealed(false);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedIndex(null);
    setIsRevealed(false);
    setAnswers([]);
  };

  const selectedOption =
    selectedIndex !== null ? currentStep?.options[selectedIndex] : null;

  return (
    <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-violet-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-500/20">
            <GitBranch className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{block.title}</h3>
            <p className="text-sm text-violet-300/70">Entscheidungsbaum</p>
          </div>
        </div>
        {/* Progress indicator */}
        <div className="flex items-center gap-1">
          {block.steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < currentStepIndex
                  ? "bg-emerald-500"
                  : i === currentStepIndex
                    ? "bg-violet-500"
                    : "bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Scenario */}
        <p className="text-sm text-slate-300 mb-4">{block.scenario}</p>

        {isComplete ? (
          // Completion view
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <h4 className="font-semibold text-emerald-300">
                    Abgeschlossen!
                  </h4>
                  <p className="text-sm text-emerald-200">
                    {answers.filter((a) => a).length} von {answers.length}{" "}
                    Entscheidungen korrekt
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Zusammenfassung
              </h4>
              <p className="text-slate-200">{block.summary}</p>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Nochmal versuchen
            </button>
          </div>
        ) : (
          // Question view
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Step indicator */}
              <div className="text-xs text-violet-400 mb-2">
                Schritt {currentStepIndex + 1} von {block.steps.length}
              </div>

              {/* Question */}
              <p className="text-lg text-white mb-6">{currentStep.question}</p>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentStep.options.map((option, index) => {
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
                      bgColor = "bg-amber-500/20";
                      borderColor = "border-amber-500/50";
                      textColor = "text-amber-200";
                    }
                  } else if (isSelected) {
                    bgColor = "bg-violet-500/20";
                    borderColor = "border-violet-500/50";
                    textColor = "text-violet-200";
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
                                ? "bg-amber-500"
                                : isSelected
                                  ? "bg-violet-500"
                                  : "bg-slate-700"
                          }`}
                        >
                          {isRevealed ? (
                            isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            ) : isSelected ? (
                              <HelpCircle className="w-4 h-4 text-white" />
                            ) : null
                          ) : (
                            <span className="text-xs text-white font-semibold">
                              {String.fromCharCode(65 + index)}
                            </span>
                          )}
                        </div>
                        <p className="font-medium">{option.label}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation (shown after reveal) */}
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                >
                  <p className="text-sm text-slate-300">
                    <ArrowRight className="w-4 h-4 inline mr-1 text-violet-400" />
                    {currentStep.explanation}
                  </p>
                </motion.div>
              )}

              {/* Action Button */}
              {!isRevealed ? (
                <motion.button
                  onClick={handleReveal}
                  disabled={selectedIndex === null}
                  whileHover={selectedIndex !== null ? { scale: 1.02 } : {}}
                  whileTap={selectedIndex !== null ? { scale: 0.98 } : {}}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                    selectedIndex !== null
                      ? "bg-violet-500 hover:bg-violet-600 text-white"
                      : "bg-slate-700 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Antwort prüfen
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-xl font-semibold bg-violet-500 hover:bg-violet-600 text-white transition-all flex items-center justify-center gap-2"
                >
                  {isLastStep ? "Abschließen" : "Weiter"}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
