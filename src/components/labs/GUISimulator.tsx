"use client";

/**
 * GUISimulator Component
 *
 * Simulates GUI navigation (Azure Portal, Intune Admin Center, etc.)
 * Users click through steps in a simulated interface.
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Cloud,
  FileText,
  Globe,
  Key,
  Laptop,
  Monitor,
  MousePointer2,
  RotateCcw,
  Server,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";

interface GUIStep {
  id: string;
  title: string;
  description?: string;
  panel: "sidebar" | "main" | "modal";
  icon?: string;
  options: {
    label: string;
    isCorrect: boolean;
    feedback?: string;
  }[];
  successMessage?: string;
}

interface GUISimulatorProps {
  title: string;
  description?: string;
  portal: "azure" | "intune" | "entra" | "defender" | "m365";
  steps: GUIStep[];
  onComplete?: () => void;
}

const PORTAL_THEMES = {
  azure: {
    bg: "from-blue-600 to-blue-800",
    accent: "blue",
    name: "Azure Portal",
  },
  intune: {
    bg: "from-emerald-600 to-teal-700",
    accent: "emerald",
    name: "Intune Admin Center",
  },
  entra: {
    bg: "from-purple-600 to-indigo-700",
    accent: "purple",
    name: "Entra Admin Center",
  },
  defender: {
    bg: "from-orange-500 to-red-600",
    accent: "orange",
    name: "Microsoft Defender",
  },
  m365: {
    bg: "from-blue-500 to-purple-600",
    accent: "blue",
    name: "Microsoft 365 Admin",
  },
};

const ICONS: Record<string, React.ReactNode> = {
  settings: <Settings className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
  shield: <Shield className="w-4 h-4" />,
  server: <Server className="w-4 h-4" />,
  cloud: <Cloud className="w-4 h-4" />,
  laptop: <Laptop className="w-4 h-4" />,
  globe: <Globe className="w-4 h-4" />,
  key: <Key className="w-4 h-4" />,
  bell: <Bell className="w-4 h-4" />,
  file: <FileText className="w-4 h-4" />,
};

export function GUISimulator({
  title,
  description,
  portal,
  steps,
  onComplete,
}: GUISimulatorProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const theme = PORTAL_THEMES[portal];
  const currentStep = steps[currentStepIndex];
  const isAllCompleted = completedSteps.length === steps.length;

  const handleOptionClick = (
    optionLabel: string,
    isOptionCorrect: boolean,
    feedback?: string,
  ) => {
    setSelectedOption(optionLabel);
    setIsCorrect(isOptionCorrect);
    setShowFeedback(true);

    if (isOptionCorrect) {
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, currentStep.id]);

        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
          setSelectedOption(null);
          setShowFeedback(false);
        } else {
          onComplete?.();
        }
      }, 1200);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setCompletedSteps([]);
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden shadow-2xl">
      {/* Header */}
      <div
        className={`px-6 py-4 bg-gradient-to-r ${theme.bg} flex items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/20">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-white/70">{theme.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10">
            <span className="text-sm text-white/80">
              {completedSteps.length}/{steps.length}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulated GUI */}
      <div className="flex h-[400px]">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 p-4 space-y-2">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-4">
            Navigation
          </div>

          {steps.map((step, idx) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = idx === currentStepIndex;
            const isLocked =
              idx > currentStepIndex && !completedSteps.includes(step.id);

            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  isCurrent
                    ? `bg-${theme.accent}-500/20 border border-${theme.accent}-500/30`
                    : isCompleted
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : isLocked
                        ? "opacity-50"
                        : "hover:bg-slate-700/50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center ${
                    isCompleted
                      ? "bg-emerald-500"
                      : isCurrent
                        ? `bg-${theme.accent}-500`
                        : "bg-slate-600"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    ICONS[step.icon || "settings"] || (
                      <Settings className="w-4 h-4 text-white" />
                    )
                  )}
                </div>
                <span
                  className={`text-sm ${
                    isCurrent ? "text-white font-medium" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-slate-850 p-6">
          {!isAllCompleted && currentStep && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <MousePointer2 className="w-4 h-4" />
                    Klicke auf die richtige Option
                  </div>
                  <h4 className="text-xl font-semibold text-white">
                    {currentStep.title}
                  </h4>
                  {currentStep.description && (
                    <p className="text-slate-400 mt-1">
                      {currentStep.description}
                    </p>
                  )}
                </div>

                {/* Options */}
                <div className="grid gap-3">
                  {currentStep.options.map((option, idx) => {
                    const isSelected = selectedOption === option.label;
                    const showAsCorrect =
                      showFeedback && isSelected && option.isCorrect;
                    const showAsWrong =
                      showFeedback && isSelected && !option.isCorrect;

                    return (
                      <motion.button
                        key={idx}
                        onClick={() =>
                          handleOptionClick(
                            option.label,
                            option.isCorrect,
                            option.feedback,
                          )
                        }
                        disabled={showFeedback && isCorrect}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          showAsCorrect
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                            : showAsWrong
                              ? "bg-red-500/20 border-red-500 text-red-300"
                              : "bg-slate-800/50 border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 text-slate-200"
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center gap-3">
                          <ChevronRight
                            className={`w-4 h-4 ${
                              showAsCorrect
                                ? "text-emerald-400"
                                : showAsWrong
                                  ? "text-red-400"
                                  : "text-slate-500"
                            }`}
                          />
                          <span>{option.label}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 rounded-lg ${
                        isCorrect
                          ? "bg-emerald-500/10 border border-emerald-500/30"
                          : "bg-red-500/10 border border-red-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <MousePointer2 className="w-5 h-5 text-red-400" />
                        )}
                        <span
                          className={
                            isCorrect ? "text-emerald-300" : "text-red-300"
                          }
                        >
                          {isCorrect
                            ? currentStep.successMessage ||
                              "Richtig! Weiter zum nächsten Schritt..."
                            : "Falsche Option. Versuche es erneut."}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              <div className="text-center p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-2xl font-semibold text-white mb-2">
                  Simulation abgeschlossen!
                </h4>
                <p className="text-emerald-300/80">
                  Du hast alle Schritte in {theme.name} erfolgreich
                  durchgeführt.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
