"use client";

/**
 * ScenarioLab Component
 *
 * Multi-step lab scenario combining different interactive elements.
 * Tracks progress and provides verification at each step.
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Rocket,
  RotateCcw,
  Target,
  Trophy,
} from "lucide-react";
import { useState } from "react";

interface LabStep {
  id: string;
  title: string;
  description: string;
  type: "info" | "action" | "verify";
  content: React.ReactNode;
  verification?: {
    question: string;
    options: { label: string; isCorrect: boolean }[];
  };
}

interface ScenarioLabProps {
  title: string;
  description?: string;
  objective: string;
  estimatedTime: string;
  steps: LabStep[];
  onComplete?: () => void;
}

export function ScenarioLab({
  title,
  description,
  objective,
  estimatedTime,
  steps,
  onComplete,
}: ScenarioLabProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isAllCompleted = completedSteps.length === steps.length;
  const progress = (completedSteps.length / steps.length) * 100;

  const handleProceed = () => {
    if (currentStep.verification && !completedSteps.includes(currentStep.id)) {
      // Step has verification - don't proceed yet
      return;
    }

    markStepComplete();
  };

  const markStepComplete = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps((prev) => [...prev, currentStep.id]);
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete?.();
    }
  };

  const handleVerify = () => {
    if (!selectedAnswer || !currentStep.verification) return;

    const option = currentStep.verification.options.find(
      (o) => o.label === selectedAnswer,
    );
    const correct = option?.isCorrect || false;

    setIsAnswerCorrect(correct);
    setShowResult(true);

    if (correct) {
      setTimeout(() => {
        markStepComplete();
      }, 1000);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const goToStep = (index: number) => {
    if (index <= completedSteps.length) {
      setCurrentStepIndex(index);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20">
              <Rocket className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{title}</h3>
              {description && (
                <p className="text-sm text-amber-300/70">{description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              {estimatedTime}
            </div>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Objective */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50">
          <Target className="w-4 h-4 text-amber-400" />
          <span className="text-sm text-slate-300">{objective}</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-slate-500">
              Schritt {currentStepIndex + 1} von {steps.length}
            </span>
            <span className="text-xs text-amber-400">
              {Math.round(progress)}% abgeschlossen
            </span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Step List */}
        <div className="w-64 border-r border-slate-700 bg-slate-800/30 p-4">
          <div className="space-y-2">
            {steps.map((step, idx) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = idx === currentStepIndex;
              const isAccessible = idx <= completedSteps.length;

              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(idx)}
                  disabled={!isAccessible}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 text-left transition-colors ${
                    isCurrent
                      ? "bg-amber-500/20 border border-amber-500/30"
                      : isCompleted
                        ? "bg-emerald-500/10 hover:bg-emerald-500/15"
                        : isAccessible
                          ? "hover:bg-slate-700/50"
                          : "opacity-40 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-emerald-500"
                        : isCurrent
                          ? "bg-amber-500"
                          : "bg-slate-600"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-xs text-white font-medium">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm truncate ${
                        isCurrent ? "text-white font-medium" : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {step.type}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 p-6 min-h-[400px]">
          {!isAllCompleted && currentStep && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Step Header */}
                <div>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                      currentStep.type === "info"
                        ? "bg-blue-500/20 text-blue-300"
                        : currentStep.type === "action"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-purple-500/20 text-purple-300"
                    }`}
                  >
                    {currentStep.type === "info" && "Information"}
                    {currentStep.type === "action" && "Aktion"}
                    {currentStep.type === "verify" && "Verifizierung"}
                  </div>
                  <h4 className="text-xl font-semibold text-white">
                    {currentStep.title}
                  </h4>
                  <p className="text-slate-400 mt-1">
                    {currentStep.description}
                  </p>
                </div>

                {/* Step Content */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  {currentStep.content}
                </div>

                {/* Verification */}
                {currentStep.verification &&
                  !completedSteps.includes(currentStep.id) && (
                    <div className="space-y-4">
                      <p className="text-slate-300 font-medium">
                        {currentStep.verification.question}
                      </p>
                      <div className="grid gap-2">
                        {currentStep.verification.options.map((option, idx) => {
                          const isSelected = selectedAnswer === option.label;
                          const showCorrect =
                            showResult && isSelected && option.isCorrect;
                          const showWrong =
                            showResult && isSelected && !option.isCorrect;

                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                setSelectedAnswer(option.label);
                                setShowResult(false);
                              }}
                              disabled={showResult && isAnswerCorrect}
                              className={`p-3 rounded-lg border text-left transition-colors ${
                                showCorrect
                                  ? "bg-emerald-500/20 border-emerald-500"
                                  : showWrong
                                    ? "bg-red-500/20 border-red-500"
                                    : isSelected
                                      ? "bg-amber-500/20 border-amber-500"
                                      : "bg-slate-700/50 border-slate-600 hover:border-slate-500"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Circle
                                  className={`w-4 h-4 ${
                                    isSelected ? "fill-current" : ""
                                  }`}
                                />
                                <span className="text-slate-200">
                                  {option.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {showResult && !isAnswerCorrect && (
                        <p className="text-red-300 text-sm">
                          Nicht ganz richtig. Versuche es erneut.
                        </p>
                      )}
                    </div>
                  )}

                {/* Action Button */}
                <div className="flex justify-end gap-3">
                  {currentStep.verification &&
                  !completedSteps.includes(currentStep.id) ? (
                    <button
                      onClick={handleVerify}
                      disabled={!selectedAnswer}
                      className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Überprüfen
                    </button>
                  ) : (
                    <button
                      onClick={handleProceed}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
                    >
                      {currentStepIndex < steps.length - 1
                        ? "Weiter"
                        : "Abschließen"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Completion */}
          {isAllCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <h4 className="text-2xl font-semibold text-white mb-2">
                  Lab erfolgreich abgeschlossen!
                </h4>
                <p className="text-amber-300/80 mb-4">
                  Du hast alle {steps.length} Schritte erfolgreich durchgeführt.
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition-colors"
                >
                  Erneut durchführen
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
