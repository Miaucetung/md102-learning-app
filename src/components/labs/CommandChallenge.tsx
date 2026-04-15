"use client";

/**
 * CommandChallenge Component
 *
 * Fill-in-the-blank PowerShell commands. Users complete partial
 * commands to learn syntax through active recall.
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface CommandPart {
  type: "text" | "blank";
  content: string;
  answer?: string;
  hint?: string;
}

interface Challenge {
  instruction: string;
  parts: CommandPart[];
  explanation?: string;
}

interface CommandChallengeProps {
  title: string;
  description?: string;
  challenges: Challenge[];
  onComplete?: () => void;
}

export function CommandChallenge({
  title,
  description,
  challenges,
  onComplete,
}: CommandChallengeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const currentChallenge = challenges[currentIndex];
  const blanks =
    currentChallenge?.parts.filter((p) => p.type === "blank") || [];

  const handleAnswerChange = (blankIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [blankIndex]: value }));
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const allCorrect = blanks.every((blank, index) => {
      const userAnswer = answers[index]?.toLowerCase().trim() || "";
      const correctAnswer = blank.answer?.toLowerCase().trim() || "";
      return userAnswer === correctAnswer;
    });

    setIsCorrect(allCorrect);
    setSubmitted(true);

    if (allCorrect) {
      setCompletedChallenges((prev) => [...prev, currentIndex]);

      if (currentIndex === challenges.length - 1) {
        setTimeout(() => onComplete?.(), 1000);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswers({});
      setSubmitted(false);
      setShowHints({});
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setShowHints({});
    setCompletedChallenges([]);
  };

  const toggleHint = (index: number) => {
    setShowHints((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const allCompleted = completedChallenges.length === challenges.length;

  let blankCounter = 0;

  return (
    <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20">
            <Code2 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            {description && (
              <p className="text-sm text-purple-300/70">{description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress Dots */}
          <div className="flex items-center gap-1">
            {challenges.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  completedChallenges.includes(idx)
                    ? "bg-purple-400"
                    : idx === currentIndex
                      ? "bg-purple-400/50"
                      : "bg-slate-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title="Zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {!allCompleted && currentChallenge && (
          <>
            {/* Instruction */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-slate-200">{currentChallenge.instruction}</p>
            </div>

            {/* Command with Blanks */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/50 font-mono">
              <div className="flex flex-wrap items-center gap-1">
                {currentChallenge.parts.map((part, partIndex) => {
                  if (part.type === "text") {
                    return (
                      <span key={partIndex} className="text-blue-300">
                        {part.content}
                      </span>
                    );
                  }

                  const blankIndex = blankCounter++;
                  const userAnswer = answers[blankIndex] || "";
                  const isThisCorrect =
                    submitted &&
                    userAnswer.toLowerCase().trim() ===
                      part.answer?.toLowerCase().trim();
                  const isThisWrong = submitted && !isThisCorrect;

                  return (
                    <span
                      key={partIndex}
                      className="inline-flex flex-col items-center"
                    >
                      <span className="flex items-center gap-1">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) =>
                            handleAnswerChange(blankIndex, e.target.value)
                          }
                          disabled={submitted && isCorrect}
                          className={`px-2 py-1 rounded bg-slate-800 border outline-none font-mono text-center transition-colors ${
                            isThisCorrect
                              ? "border-emerald-500 text-emerald-400"
                              : isThisWrong
                                ? "border-red-500 text-red-400"
                                : "border-purple-500/50 text-purple-200 focus:border-purple-400"
                          }`}
                          style={{
                            width: `${Math.max((part.answer?.length || 8) + 2, 8)}ch`,
                          }}
                          placeholder="..."
                        />
                        {part.hint && (
                          <button
                            onClick={() => toggleHint(blankIndex)}
                            className="p-1 rounded hover:bg-slate-700 text-slate-500 hover:text-purple-400"
                          >
                            <HelpCircle className="w-4 h-4" />
                          </button>
                        )}
                      </span>

                      <AnimatePresence>
                        {showHints[blankIndex] && part.hint && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-xs text-amber-400 mt-1"
                          >
                            {part.hint}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Feedback */}
            <AnimatePresence mode="wait">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl border ${
                    isCorrect
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p
                        className={
                          isCorrect ? "text-emerald-300" : "text-red-300"
                        }
                      >
                        {isCorrect
                          ? "Perfekt!"
                          : "Nicht ganz richtig. Versuche es erneut."}
                      </p>
                      {isCorrect && currentChallenge.explanation && (
                        <p className="text-slate-400 text-sm mt-2">
                          {currentChallenge.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleSubmit}
                disabled={
                  blanks.length === 0 ||
                  Object.keys(answers).length < blanks.length
                }
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Überprüfen
              </button>

              {submitted &&
                isCorrect &&
                currentIndex < challenges.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
                  >
                    Weiter →
                  </button>
                )}
            </div>
          </>
        )}

        {/* Completion */}
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-xl bg-purple-500/20 border border-purple-500/30 text-center"
          >
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">
              Alle Aufgaben gelöst!
            </h4>
            <p className="text-purple-300/80">
              Du hast {challenges.length} Command Challenges erfolgreich
              abgeschlossen.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
