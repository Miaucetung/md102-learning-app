"use client";

/**
 * QuickCheck Component
 *
 * Embedded multiple choice quiz for quick knowledge verification.
 * Lightweight and designed to be embedded within other content.
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface QuickCheckProps {
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
  hint?: string;
  onComplete?: () => void;
}

export function QuickCheck({
  question,
  options,
  correctAnswer,
  explanation,
  hint,
  onComplete,
}: QuickCheckProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selectedAnswer === correctAnswer;

  const handleSelect = (key: string) => {
    if (submitted && isCorrect) return;
    setSelectedAnswer(key);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setSubmitted(true);

    if (selectedAnswer === correctAnswer) {
      setTimeout(() => onComplete?.(), 500);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setSubmitted(false);
    setShowHint(false);
  };

  return (
    <div className="rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-gradient-to-br from-indigo-50 dark:from-indigo-500/10 to-violet-50 dark:to-violet-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-indigo-200 dark:border-indigo-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Quick Check
          </span>
        </div>

        {(submitted || showHint) && (
          <button
            onClick={handleReset}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700/50 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Question */}
        <p className="text-gray-800 dark:text-slate-200">{question}</p>

        {/* Hint Button */}
        {hint && !submitted && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          >
            <Lightbulb className="w-3 h-3" />
            {showHint ? "Hinweis ausblenden" : "Hinweis anzeigen"}
          </button>
        )}

        <AnimatePresence>
          {showHint && hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-sm text-amber-700 dark:text-amber-300"
            >
              {hint}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Options */}
        <div className="space-y-2">
          {options.map((option) => {
            const isSelected = selectedAnswer === option.key;
            const showCorrect = submitted && option.key === correctAnswer;
            const showWrong =
              submitted && isSelected && option.key !== correctAnswer;

            return (
              <button
                key={option.key}
                onClick={() => handleSelect(option.key)}
                disabled={submitted && isCorrect}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  showCorrect
                    ? "bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500"
                    : showWrong
                      ? "bg-red-50 dark:bg-red-500/20 border-red-500"
                      : isSelected
                        ? "bg-indigo-50 dark:bg-indigo-500/20 border-indigo-500"
                        : "bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                      showCorrect
                        ? "bg-emerald-500 text-white"
                        : showWrong
                          ? "bg-red-500 text-white"
                          : isSelected
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-slate-300"
                    }`}
                  >
                    {showCorrect ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      option.key
                    )}
                  </span>
                  <span
                    className={
                      showCorrect
                        ? "text-emerald-700 dark:text-emerald-300"
                        : showWrong
                          ? "text-red-700 dark:text-red-300"
                          : "text-gray-700 dark:text-slate-200"
                    }
                  >
                    {option.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg ${
                isCorrect
                  ? "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30"
                  : "bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30"
              }`}
            >
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  <p
                    className={
                      isCorrect
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-red-700 dark:text-red-300"
                    }
                  >
                    {isCorrect
                      ? "Richtig!"
                      : "Nicht ganz. Die richtige Antwort ist markiert."}
                  </p>
                  {isCorrect && explanation && (
                    <p className="text-gray-600 dark:text-slate-400 mt-1">
                      {explanation}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Überprüfen
          </button>
        )}
      </div>
    </div>
  );
}
