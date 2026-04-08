"use client";

/**
 * LearningModule Component
 *
 * Renders a complete learning experience following cognitive science principles:
 * 1. Real-world problem (scenario)
 * 2. Context (theory chunks)
 * 3. Blocks (interactive learning)
 * 4. Lab scenario (hands-on)
 * 5. Checkpoints (active recall)
 * 6. Explanation (why/how)
 * 7. Transfer task (apply knowledge)
 *
 * This is the GOLD STANDARD format from the Linux/Azure apps.
 */

import type {
  LabStep,
  LearningBlock,
  LearningModule as LearningModuleType,
} from "@/content/types";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Lightbulb,
  MessageCircle,
  PlayCircle,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  ComparisonBlock,
  ConceptBlock,
  ExamTrapBlock,
  GuidedDecisionBlock,
  MistakeBlock,
  PracticeBlock,
  PredictionBlock,
  ScenarioBlock,
  SummaryBlock,
  TerminalBlock,
} from "./blocks";

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface ExpandableSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
  badge?: string;
}

function ExpandableSection({
  title,
  icon,
  children,
  defaultOpen = false,
  accentColor = "#3b82f6",
  badge,
}: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span style={{ color: accentColor }}>{icon}</span>
          <span className="font-semibold text-white">{title}</span>
          {badge && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-300">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function LabStepCard({
  step,
  stepNumber,
}: {
  step: LabStep;
  stepNumber: number;
}) {
  const [completed, setCompleted] = useState(false);

  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        completed
          ? "bg-emerald-500/10 border-emerald-500/30"
          : "bg-slate-800/50 border-slate-700/50"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => setCompleted(!completed)}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
            completed
              ? "bg-emerald-500 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          {completed ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
        </button>

        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{step.title}</h4>
          <p className="text-slate-300 text-sm mb-3">{step.description}</p>

          {step.detailedInstructions && (
            <ul className="text-sm text-slate-400 space-y-1 mb-3">
              {step.detailedInstructions.map(
                (instruction: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    {instruction}
                  </li>
                ),
              )}
            </ul>
          )}

          {step.command && (
            <pre className="p-3 bg-slate-900 rounded-lg text-sm overflow-x-auto mb-3">
              <code className="text-green-400">{step.command}</code>
            </pre>
          )}

          {step.tip && (
            <div className="flex items-start gap-2 p-2 bg-blue-500/10 rounded-lg text-sm">
              <Lightbulb className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="text-blue-200">{step.tip}</span>
            </div>
          )}

          {step.warning && (
            <div className="flex items-start gap-2 p-2 bg-amber-500/10 rounded-lg text-sm mt-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span className="text-amber-200">{step.warning}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// BLOCK RENDERER
// ============================================================================

function BlockRenderer({ block }: { block: LearningBlock }) {
  switch (block.type) {
    case "prediction":
      return <PredictionBlock block={block} />;
    case "scenario":
      return <ScenarioBlock block={block} />;
    case "concept":
      return <ConceptBlock block={block} />;
    case "guided-decision":
      return <GuidedDecisionBlock block={block} />;
    case "practice":
      return <PracticeBlock block={block} />;
    case "mistake":
      return <MistakeBlock block={block} />;
    case "comparison":
      return <ComparisonBlock block={block} />;
    case "terminal":
      return <TerminalBlock block={block} />;
    case "exam-trap":
      return <ExamTrapBlock block={block} />;
    case "summary":
      return <SummaryBlock block={block} />;
    default:
      return null;
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface LearningModuleProps {
  module: LearningModuleType;
  onComplete?: () => void;
  nextModule?: { slug: string; title: string };
  previousModule?: { slug: string; title: string };
}

export function LearningModule({
  module,
  onComplete,
  nextModule,
  previousModule,
}: LearningModuleProps) {
  const [startTime] = useState(Date.now());
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const markSectionComplete = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Module Header */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span>{module.estimatedMinutes} Minuten</span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              module.difficulty === "beginner"
                ? "bg-emerald-500/20 text-emerald-300"
                : module.difficulty === "intermediate"
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-red-500/20 text-red-300"
            }`}
          >
            {module.difficulty === "beginner"
              ? "Einsteiger"
              : module.difficulty === "intermediate"
                ? "Fortgeschritten"
                : "Experte"}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">{module.title}</h1>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2">
          {module.skillTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Real-World Problem */}
      <ExpandableSection
        title="Das Problem"
        icon={<Target className="w-5 h-5" />}
        defaultOpen
        accentColor="#f59e0b"
      >
        <div className="prose prose-invert prose-amber max-w-none">
          <p className="text-slate-200 leading-relaxed whitespace-pre-line">
            {module.realWorldProblem}
          </p>
        </div>
      </ExpandableSection>

      {/* Context */}
      <ExpandableSection
        title="Hintergrund"
        icon={<BookOpen className="w-5 h-5" />}
        defaultOpen
        accentColor="#3b82f6"
        badge={`${module.context.length} Punkte`}
      >
        <ul className="space-y-3">
          {module.context.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs font-semibold">
                  {index + 1}
                </span>
              </div>
              <span className="text-slate-200">{point}</span>
            </li>
          ))}
        </ul>
      </ExpandableSection>

      {/* Learning Blocks */}
      {module.blocks && module.blocks.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Lernabschnitte
          </h2>
          {module.blocks.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}
        </div>
      )}

      {/* Lab Scenario */}
      {module.labScenario && (
        <ExpandableSection
          title="Praktisches Lab"
          icon={<PlayCircle className="w-5 h-5" />}
          defaultOpen
          accentColor="#10b981"
          badge={`${module.labScenario.steps.length} Schritte`}
        >
          <div className="space-y-4">
            {module.labScenario.description && (
              <p className="text-slate-300 mb-4">
                {module.labScenario.description}
              </p>
            )}
            {module.labScenario.steps.map((step, index) => (
              <LabStepCard key={step.id} step={step} stepNumber={index + 1} />
            ))}
            {module.labScenario.validation && (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="text-emerald-300 font-semibold mb-2">
                  Validierung
                </h4>
                <p className="text-emerald-200 text-sm">
                  {module.labScenario.validation}
                </p>
              </div>
            )}
          </div>
        </ExpandableSection>
      )}

      {/* Explanation */}
      <ExpandableSection
        title="Erklärung"
        icon={<Lightbulb className="w-5 h-5" />}
        defaultOpen
        accentColor="#8b5cf6"
      >
        <div className="space-y-4">
          {/* Why - Main explanation */}
          <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <h4 className="text-violet-300 font-semibold mb-2">Warum?</h4>
            <p className="text-slate-200 leading-relaxed">
              {module.explanation.why}
            </p>
          </div>

          {/* How - Technical details */}
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <h4 className="text-emerald-300 font-semibold mb-2">Wie?</h4>
            <p className="text-emerald-200 text-sm whitespace-pre-line">
              {module.explanation.how}
            </p>
          </div>

          {/* Deep Dive - Optional expanded content */}
          {module.explanation.deepDive && (
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Deep Dive
              </h4>
              <div className="text-blue-200 text-sm prose prose-invert prose-sm max-w-none whitespace-pre-line">
                {module.explanation.deepDive}
              </div>
            </div>
          )}

          {/* Common Questions */}
          {module.explanation.commonQuestions &&
            module.explanation.commonQuestions.length > 0 && (
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <h4 className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Häufige Fragen
                </h4>
                <ul className="space-y-3">
                  {module.explanation.commonQuestions.map((item, i) => (
                    <li
                      key={i}
                      className="border-b border-amber-500/20 pb-3 last:border-0 last:pb-0"
                    >
                      <p className="text-amber-200 font-medium text-sm mb-1">
                        {item.question}
                      </p>
                      <p className="text-amber-100/80 text-sm">{item.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </ExpandableSection>

      {/* Transfer Task */}
      {module.transferTask && (
        <ExpandableSection
          title="Transfer-Aufgabe"
          icon={<Brain className="w-5 h-5" />}
          accentColor="#ec4899"
        >
          <TransferTaskSection task={module.transferTask} />
        </ExpandableSection>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-700/50">
        {previousModule ? (
          <Link
            href={`/learn/${previousModule.slug}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{previousModule.title}</span>
            <span className="sm:hidden">Zurück</span>
          </Link>
        ) : (
          <div />
        )}

        {nextModule ? (
          <Link
            href={`/learn/${nextModule.slug}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <span className="hidden sm:inline">{nextModule.title}</span>
            <span className="sm:hidden">Weiter</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Modul abschließen</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TRANSFER TASK SECTION
// ============================================================================

function TransferTaskSection({
  task,
}: {
  task: NonNullable<LearningModuleType["transferTask"]>;
}) {
  const [showHints, setShowHints] = useState(false);
  const [showExpectedOutcome, setShowExpectedOutcome] = useState(false);

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-white">{task.title}</h4>

      <p className="text-slate-200 leading-relaxed whitespace-pre-line">
        {task.description}
      </p>

      {/* Hints */}
      {task.hints && task.hints.length > 0 && (
        <div>
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {showHints ? "Hinweise ausblenden" : "Hinweise anzeigen"}
          </button>
          {showHints && (
            <ul className="mt-3 space-y-2 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              {task.hints.map((hint, i) => (
                <li
                  key={i}
                  className="text-blue-200 text-sm flex items-start gap-2"
                >
                  <Lightbulb className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  {hint}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Expected Outcome */}
      {task.expectedOutcome && (
        <div>
          <button
            onClick={() => setShowExpectedOutcome(!showExpectedOutcome)}
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {showExpectedOutcome
              ? "Erwartetes Ergebnis ausblenden"
              : "Erwartetes Ergebnis anzeigen"}
          </button>
          {showExpectedOutcome && (
            <div className="mt-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-emerald-200 text-sm whitespace-pre-line">
                {task.expectedOutcome}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
