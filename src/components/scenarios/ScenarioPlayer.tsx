"use client";

// ============================================================================
// Enterprise IT Training Platform - Scenario Player Component
// ============================================================================
// The main interactive component for scenario-based training
// Handles decision flow, consequences, and completion
// ============================================================================

import type {
  Consequence,
  DecisionOption,
  DecisionPoint,
  EnterpriseScenario,
  ScenarioContext,
  TenantEnvironment,
} from "@/types";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Globe,
  Info,
  Lightbulb,
  PlayCircle,
  RefreshCw,
  Shield,
  Target,
  Users,
  XCircle,
} from "lucide-react";
import { useCallback, useState } from "react";

// ============================================================================
// Types
// ============================================================================

interface ScenarioPlayerProps {
  scenario: EnterpriseScenario;
  onComplete?: (result: ScenarioResult) => void;
  onExit?: () => void;
}

interface ScenarioResult {
  scenarioId: string;
  score: number;
  maxScore: number;
  decisions: DecisionRecord[];
  timeSpentSeconds: number;
}

interface DecisionRecord {
  decisionId: string;
  optionId: string;
  isOptimal: boolean;
  score: number;
}

type PlayerPhase =
  | "intro"
  | "environment"
  | "context"
  | "decision"
  | "consequence"
  | "review"
  | "complete";

// ============================================================================
// Main Component
// ============================================================================

export function ScenarioPlayer({
  scenario,
  onComplete,
  onExit,
}: ScenarioPlayerProps) {
  // State
  const [phase, setPhase] = useState<PlayerPhase>("intro");
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [decisions, setDecisions] = useState<DecisionRecord[]>([]);
  const [currentConsequence, setCurrentConsequence] =
    useState<Consequence | null>(null);
  const [startTime] = useState<number>(Date.now());
  const [showHint, setShowHint] = useState(false);

  // Computed values
  const currentDecision = scenario.decisionPoints[currentDecisionIndex];
  const totalDecisions = scenario.decisionPoints.length;
  const progress = (currentDecisionIndex / totalDecisions) * 100;

  // Handlers
  const handleStartScenario = useCallback(() => {
    setPhase("environment");
  }, []);

  const handleEnvironmentContinue = useCallback(() => {
    setPhase("context");
  }, []);

  const handleContextContinue = useCallback(() => {
    setPhase("decision");
  }, []);

  const handleSelectOption = useCallback(
    (option: DecisionOption) => {
      // Record the decision
      const record: DecisionRecord = {
        decisionId: currentDecision.id,
        optionId: option.id,
        isOptimal: option.isOptimal,
        score: option.score,
      };
      setDecisions((prev) => [...prev, record]);

      // Get and show consequence
      const consequence = scenario.consequences[option.consequenceId];
      setCurrentConsequence(consequence);
      setPhase("consequence");
    },
    [currentDecision, scenario.consequences],
  );

  const handleContinueAfterConsequence = useCallback(() => {
    setShowHint(false);

    if (currentDecisionIndex < totalDecisions - 1) {
      setCurrentDecisionIndex((prev) => prev + 1);
      setCurrentConsequence(null);
      setPhase("decision");
    } else {
      setPhase("review");
    }
  }, [currentDecisionIndex, totalDecisions]);

  const handleComplete = useCallback(() => {
    const totalScore = decisions.reduce((sum, d) => sum + d.score, 0);
    const maxScore = scenario.decisionPoints.reduce((sum, dp) => {
      const maxOption = dp.options.reduce((max, opt) =>
        opt.score > max.score ? opt : max,
      );
      return sum + maxOption.score;
    }, 0);

    const result: ScenarioResult = {
      scenarioId: scenario.id,
      score: totalScore,
      maxScore,
      decisions,
      timeSpentSeconds: Math.floor((Date.now() - startTime) / 1000),
    };

    setPhase("complete");
    onComplete?.(result);
  }, [decisions, scenario, startTime, onComplete]);

  // Render based on phase
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-1 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: getCategoryColor(scenario.category) }}
            >
              {getCategoryIcon(scenario.category)}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {scenario.title}
              </h1>
              <p className="text-sm text-slate-400">
                {scenario.category.replace("-", " ").toUpperCase()} •{" "}
                {scenario.difficulty.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">~{scenario.estimatedMinutes} min</span>
            </div>
            <div className="text-slate-400 text-sm">
              {currentDecisionIndex + 1} / {totalDecisions}
            </div>
            {onExit && (
              <button
                onClick={onExit}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {phase === "intro" && (
          <IntroPhase scenario={scenario} onStart={handleStartScenario} />
        )}

        {phase === "environment" && (
          <EnvironmentPhase
            environment={scenario.environment}
            onContinue={handleEnvironmentContinue}
          />
        )}

        {phase === "context" && (
          <ContextPhase
            context={scenario.context}
            onContinue={handleContextContinue}
          />
        )}

        {phase === "decision" && currentDecision && (
          <DecisionPhase
            decision={currentDecision}
            decisionNumber={currentDecisionIndex + 1}
            totalDecisions={totalDecisions}
            showHint={showHint}
            onToggleHint={() => setShowHint(!showHint)}
            onSelectOption={handleSelectOption}
          />
        )}

        {phase === "consequence" && currentConsequence && (
          <ConsequencePhase
            consequence={currentConsequence}
            isLastDecision={currentDecisionIndex >= totalDecisions - 1}
            onContinue={handleContinueAfterConsequence}
          />
        )}

        {phase === "review" && (
          <ReviewPhase
            scenario={scenario}
            decisions={decisions}
            onComplete={handleComplete}
          />
        )}

        {phase === "complete" && (
          <CompletePhase
            scenario={scenario}
            decisions={decisions}
            timeSpentSeconds={Math.floor((Date.now() - startTime) / 1000)}
            onExit={onExit}
          />
        )}
      </main>
    </div>
  );
}

// ============================================================================
// Phase Components
// ============================================================================

interface IntroPhaseProps {
  scenario: EnterpriseScenario;
  onStart: () => void;
}

function IntroPhase({ scenario, onStart }: IntroPhaseProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
          <Target className="w-4 h-4" />
          Real-World Scenario
        </div>
        <h1 className="text-4xl font-bold text-white">{scenario.title}</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          {scenario.description}
        </p>
      </div>

      {/* Metadata cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400">Estimated Time</span>
          </div>
          <p className="text-2xl font-semibold text-white">
            {scenario.estimatedMinutes} min
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400">Decision Points</span>
          </div>
          <p className="text-2xl font-semibold text-white">
            {scenario.decisionPoints.length}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400">Difficulty</span>
          </div>
          <p className="text-2xl font-semibold text-white capitalize">
            {scenario.difficulty}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-400 mb-4">
          SKILLS YOU'LL PRACTICE
        </h3>
        <div className="flex flex-wrap gap-2">
          {scenario.skillTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full bg-slate-700/50 text-slate-300 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Start button */}
      <div className="flex justify-center">
        <button
          onClick={onStart}
          className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/25"
        >
          <PlayCircle className="w-5 h-5" />
          Start Scenario
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

interface EnvironmentPhaseProps {
  environment: TenantEnvironment;
  onContinue: () => void;
}

function EnvironmentPhase({ environment, onContinue }: EnvironmentPhaseProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Your Environment</h2>
          <p className="text-slate-400">
            Familiarize yourself with the tenant configuration
          </p>
        </div>
      </div>

      {/* Tenant info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            Organization
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Company</span>
              <span className="text-white font-medium">{environment.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Domain</span>
              <span className="text-white font-mono text-sm">
                {environment.customDomain || environment.domain}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">License</span>
              <span className="text-white">{environment.licenseType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Users</span>
              <span className="text-white">{environment.userCount}</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-400" />
            Existing Policies
          </h3>
          <div className="space-y-2">
            {environment.existingPolicies.slice(0, 4).map((policy) => (
              <div
                key={policy.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30"
              >
                <span className="text-slate-300 text-sm">{policy.name}</span>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    policy.status === "enabled"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : policy.status === "report-only"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-slate-500/20 text-slate-400"
                  }`}
                >
                  {policy.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users preview */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-cyan-400" />
          Key Users
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {environment.existingUsers.slice(0, 3).map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-lg bg-slate-700/30 space-y-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                  {user.displayName.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium">{user.displayName}</p>
                  <p className="text-slate-400 text-xs">{user.upn}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 text-xs rounded bg-slate-600/50 text-slate-300">
                  {user.role}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs rounded ${
                    user.mfaStatus === "enforced"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : user.mfaStatus === "enabled"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  MFA: {user.mfaStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onContinue}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

interface ContextPhaseProps {
  context: ScenarioContext;
  onContinue: () => void;
}

function ContextPhase({ context, onContinue }: ContextPhaseProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">The Situation</h2>
          <p className="text-slate-400">
            Understand the problem you need to solve
          </p>
        </div>
      </div>

      {/* Urgency indicator */}
      {context.urgency && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
            context.urgency === "critical"
              ? "bg-red-500/10 border border-red-500/30 text-red-400"
              : context.urgency === "high"
                ? "bg-orange-500/10 border border-orange-500/30 text-orange-400"
                : context.urgency === "medium"
                  ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                  : "bg-slate-500/10 border border-slate-500/30 text-slate-400"
          }`}
        >
          <Clock className="w-4 h-4" />
          {context.urgency.toUpperCase()} PRIORITY
        </div>
      )}

      {/* Situation description */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-400 mb-3">SITUATION</h3>
        <p className="text-lg text-slate-200 leading-relaxed">
          {context.situation}
        </p>
      </div>

      {/* Problem */}
      <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
        <h3 className="text-sm font-medium text-red-400 mb-3">THE PROBLEM</h3>
        <p className="text-lg text-slate-200 leading-relaxed">
          {context.problem}
        </p>
      </div>

      {/* Objective */}
      <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
        <h3 className="text-sm font-medium text-emerald-400 mb-3">
          YOUR OBJECTIVE
        </h3>
        <p className="text-lg text-slate-200 leading-relaxed">
          {context.objective}
        </p>
      </div>

      {/* Stakeholders */}
      {context.stakeholders.length > 0 && (
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            KEY STAKEHOLDERS
          </h3>
          <div className="space-y-3">
            {context.stakeholders.map((stakeholder, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 rounded-lg bg-slate-700/30"
              >
                <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm">
                  {stakeholder.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium">{stakeholder.name}</p>
                  <p className="text-slate-400 text-sm">{stakeholder.role}</p>
                  <p className="text-slate-300 text-sm mt-1">
                    "{stakeholder.concern}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onContinue}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Begin Analysis
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

interface DecisionPhaseProps {
  decision: DecisionPoint;
  decisionNumber: number;
  totalDecisions: number;
  showHint: boolean;
  onToggleHint: () => void;
  onSelectOption: (option: DecisionOption) => void;
}

function DecisionPhase({
  decision,
  decisionNumber,
  totalDecisions,
  showHint,
  onToggleHint,
  onSelectOption,
}: DecisionPhaseProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Decision Point {decisionNumber}
            </h2>
            <p className="text-slate-400">
              {decisionNumber} of {totalDecisions}
            </p>
          </div>
        </div>

        {decision.hints && decision.hints.length > 0 && (
          <button
            onClick={onToggleHint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
        )}
      </div>

      {/* Context if provided */}
      {decision.context && (
        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <p className="text-slate-300">{decision.context}</p>
        </div>
      )}

      {/* Question */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-800/50 border border-slate-700/50">
        <h3 className="text-xl text-white font-medium leading-relaxed">
          {decision.question}
        </h3>
      </div>

      {/* Hint */}
      {showHint && decision.hints && (
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              {decision.hints.map((hint, i) => (
                <p key={i} className="text-amber-200">
                  {hint}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {decision.options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedId(option.id)}
            className={`w-full p-5 rounded-xl border text-left transition-all ${
              selectedId === option.id
                ? "bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/30"
                : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/70"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedId === option.id
                    ? "border-blue-500 bg-blue-500"
                    : "border-slate-500"
                }`}
              >
                {selectedId === option.id && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{option.label}</p>
                {option.description && (
                  <p className="text-slate-400 text-sm mt-1">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            const option = decision.options.find((o) => o.id === selectedId);
            if (option) onSelectOption(option);
          }}
          disabled={!selectedId}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Decision
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

interface ConsequencePhaseProps {
  consequence: Consequence;
  isLastDecision: boolean;
  onContinue: () => void;
}

function ConsequencePhase({
  consequence,
  isLastDecision,
  onContinue,
}: ConsequencePhaseProps) {
  const typeConfig = {
    success: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-400" />,
      title: "Excellent Decision",
    },
    partial: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      icon: <Info className="w-8 h-8 text-amber-400" />,
      title: "Acceptable Approach",
    },
    failure: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      icon: <XCircle className="w-8 h-8 text-red-400" />,
      title: "Suboptimal Decision",
    },
    disaster: {
      bg: "bg-red-500/20",
      border: "border-red-500/50",
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      title: "Critical Error",
    },
  };

  const config = typeConfig[consequence.type];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Result header */}
      <div className={`p-6 rounded-xl ${config.bg} border ${config.border}`}>
        <div className="flex items-center gap-4 mb-4">
          {config.icon}
          <div>
            <h2 className="text-xl font-bold text-white">{config.title}</h2>
            <p className="text-slate-400">{consequence.title}</p>
          </div>
        </div>
      </div>

      {/* Outcome */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-400 mb-3">
          WHAT HAPPENED
        </h3>
        <p className="text-lg text-slate-200 leading-relaxed">
          {consequence.outcome}
        </p>
      </div>

      {/* Business Impact */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-400 mb-3">
          BUSINESS IMPACT
        </h3>
        <p className="text-slate-200 leading-relaxed">
          {consequence.businessImpact}
        </p>
      </div>

      {/* Technical Explanation */}
      <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
        <h3 className="text-sm font-medium text-blue-400 mb-3">
          TECHNICAL EXPLANATION
        </h3>
        <p className="text-slate-200 leading-relaxed">
          {consequence.technicalReason}
        </p>
      </div>

      {/* Visualization if present */}
      {consequence.visualization && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-700/50">
          <h3 className="text-sm font-medium text-slate-400 mb-3">
            {consequence.visualization.type.toUpperCase()} OUTPUT
          </h3>
          <pre className="p-4 rounded-lg bg-black/50 text-sm text-green-400 font-mono overflow-x-auto">
            {consequence.visualization.content}
          </pre>
          {consequence.visualization.caption && (
            <p className="text-slate-400 text-sm mt-2">
              {consequence.visualization.caption}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onContinue}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          {isLastDecision ? "View Results" : "Next Decision"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

interface ReviewPhaseProps {
  scenario: EnterpriseScenario;
  decisions: DecisionRecord[];
  onComplete: () => void;
}

function ReviewPhase({ scenario, decisions, onComplete }: ReviewPhaseProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Review & Learn</h2>
          <p className="text-slate-400">Understand the optimal solution path</p>
        </div>
      </div>

      {/* Your decisions summary */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <h3 className="font-semibold text-white mb-4">Your Decisions</h3>
        <div className="space-y-3">
          {decisions.map((decision, i) => {
            const dp = scenario.decisionPoints.find(
              (d) => d.id === decision.decisionId,
            );
            const option = dp?.options.find((o) => o.id === decision.optionId);
            return (
              <div
                key={i}
                className={`p-4 rounded-lg ${
                  decision.isOptimal
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-amber-500/10 border border-amber-500/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-300 text-sm mb-1">
                      Decision {i + 1}
                    </p>
                    <p className="text-white font-medium">
                      {option?.label || "Unknown"}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      decision.isOptimal
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {decision.isOptimal ? "Optimal" : "Suboptimal"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toggle solution */}
      <button
        onClick={() => setShowSolution(!showSolution)}
        className="w-full p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-left hover:bg-slate-800/70 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span className="text-white font-medium">
              {showSolution ? "Hide" : "Show"} Optimal Solution Path
            </span>
          </div>
          <ChevronRight
            className={`w-5 h-5 text-slate-400 transition-transform ${
              showSolution ? "rotate-90" : ""
            }`}
          />
        </div>
      </button>

      {showSolution && (
        <div className="space-y-4 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
          {scenario.solutionPath.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold flex-shrink-0">
                {step.order}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{step.title}</h4>
                <p className="text-slate-400 text-sm mt-1">
                  {step.description}
                </p>
                {step.command && (
                  <pre className="mt-2 p-3 rounded-lg bg-slate-900 text-sm text-green-400 font-mono overflow-x-auto">
                    {step.command.code}
                  </pre>
                )}
                {step.tip && (
                  <div className="mt-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
                    💡 {step.tip}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technical deep dive */}
      <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
        <h3 className="text-blue-400 font-semibold mb-4">
          Why This Approach Works
        </h3>
        <p className="text-slate-200 leading-relaxed mb-4">
          {scenario.explanation.why}
        </p>
        <p className="text-slate-300 leading-relaxed">
          {scenario.explanation.how}
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all"
        >
          Complete Scenario
          <CheckCircle2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

interface CompletePhaseProps {
  scenario: EnterpriseScenario;
  decisions: DecisionRecord[];
  timeSpentSeconds: number;
  onExit?: () => void;
}

function CompletePhase({
  scenario,
  decisions,
  timeSpentSeconds,
  onExit,
}: CompletePhaseProps) {
  const totalScore = decisions.reduce((sum, d) => sum + d.score, 0);
  const maxScore = scenario.decisionPoints.reduce((sum, dp) => {
    const maxOption = dp.options.reduce((max, opt) =>
      opt.score > max.score ? opt : max,
    );
    return sum + maxOption.score;
  }, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);
  const optimalCount = decisions.filter((d) => d.isOptimal).length;

  const grade =
    percentage >= 90
      ? {
          label: "Excellent",
          color: "text-emerald-400",
          bg: "bg-emerald-500/20",
        }
      : percentage >= 75
        ? { label: "Good", color: "text-blue-400", bg: "bg-blue-500/20" }
        : percentage >= 50
          ? { label: "Fair", color: "text-amber-400", bg: "bg-amber-500/20" }
          : { label: "Needs Work", color: "text-red-400", bg: "bg-red-500/20" };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Success header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Scenario Complete!</h1>
        <p className="text-slate-400">You've finished "{scenario.title}"</p>
      </div>

      {/* Score card */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/50 border border-slate-700/50">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white mb-2">
              {percentage}%
            </div>
            <div className="text-slate-400">Overall Score</div>
          </div>
          <div>
            <div className={`text-4xl font-bold ${grade.color} mb-2`}>
              {grade.label}
            </div>
            <div className="text-slate-400">Performance</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">
              {optimalCount}/{decisions.length}
            </div>
            <div className="text-slate-400">Optimal Decisions</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Clock className="w-5 h-5" />
            <span>Time Spent</span>
          </div>
          <p className="text-2xl font-semibold text-white">
            {Math.floor(timeSpentSeconds / 60)}m {timeSpentSeconds % 60}s
          </p>
        </div>
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Target className="w-5 h-5" />
            <span>Points Earned</span>
          </div>
          <p className="text-2xl font-semibold text-white">
            {totalScore} / {maxScore}
          </p>
        </div>
      </div>

      {/* Related scenarios */}
      {scenario.relatedScenarios.length > 0 && (
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-white font-semibold mb-4">
            Recommended Next Steps
          </h3>
          <div className="space-y-2">
            {scenario.relatedScenarios.slice(0, 3).map((id) => (
              <div
                key={id}
                className="p-3 rounded-lg bg-slate-700/30 flex items-center justify-between"
              >
                <span className="text-slate-300">{id}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors"
        >
          Back to Scenarios
        </button>
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all">
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Utility Functions
// ============================================================================

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "identity-access": "#3b82f6",
    "conditional-access": "#8b5cf6",
    defender: "#ef4444",
    exchange: "#0ea5e9",
    intune: "#22c55e",
    "tenant-admin": "#f59e0b",
  };
  return colors[category] || "#6b7280";
}

function getCategoryIcon(category: string) {
  const size = "w-5 h-5 text-white";
  switch (category) {
    case "identity-access":
      return <Users className={size} />;
    case "conditional-access":
      return <Shield className={size} />;
    case "defender":
      return <Shield className={size} />;
    case "exchange":
      return <Globe className={size} />;
    case "intune":
      return <Building2 className={size} />;
    case "tenant-admin":
      return <Building2 className={size} />;
    default:
      return <Target className={size} />;
  }
}
