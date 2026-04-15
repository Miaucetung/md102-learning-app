"use client";

import {
  CommandChallenge,
  InteractiveTerminal,
  QuickCheck,
} from "@/components/labs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { get as readMap, set as saveMap } from "@/lib/progress";
import {
  HYPERV_MANIFEST_ID,
  HYPERV_STEPS,
} from "@/lib/stepsHyperV-interactive";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Code2,
  HelpCircle,
  Target,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const stepId = useMemo(() => {
    const raw = typeof params?.id === "string" ? params.id : "";
    const cleaned = decodeURIComponent(raw).trim();
    const allowed = new Set(HYPERV_STEPS.map((s) => s.id));
    return allowed.has(cleaned) ? cleaned : null;
  }, [params?.id]);

  const idx = useMemo(
    () => (stepId ? HYPERV_STEPS.findIndex((s) => s.id === stepId) : -1),
    [stepId],
  );
  const step = idx >= 0 ? HYPERV_STEPS[idx] : undefined;

  const [map, setMap] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    instructions: true,
    terminal: true,
    challenge: true,
    quiz: true,
  });
  const [completedInteractive, setCompletedInteractive] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => setMap(readMap(HYPERV_MANIFEST_ID)), []);
  useEffect(() => {
    if (!step) router.replace("/lab-hyperv");
  }, [step, router]);

  const total = HYPERV_STEPS.length;
  const pct = useMemo(
    () =>
      Math.round((HYPERV_STEPS.filter((s) => map[s.id]).length / total) * 100),
    [map, total],
  );

  if (!step) return <main className="p-6">Lade…</main>;

  const isDone = !!map[step.id];
  const markDone = () => {
    const next = { ...map, [step.id]: true };
    setMap(next);
    saveMap(HYPERV_MANIFEST_ID, next);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInteractiveComplete = (key: string) => {
    setCompletedInteractive((prev) => ({ ...prev, [key]: true }));
  };

  const prev = idx > 0 ? HYPERV_STEPS[idx - 1].id : null;
  const next = idx < total - 1 ? HYPERV_STEPS[idx + 1].id : null;

  // Count interactive elements
  const hasTerminal = !!step.terminalLab;
  const hasChallenge = !!step.commandChallenge;
  const hasQuiz = step.quickChecks && step.quickChecks.length > 0;
  const interactiveCount = [hasTerminal, hasChallenge, hasQuiz].filter(
    Boolean,
  ).length;
  const completedCount = Object.keys(completedInteractive).length;

  return (
    <main className="space-y-6 pb-12">
      {/* Breadcrumb & Progress */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/lab"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Übersicht
          </Link>
          {" · "}
          <Link
            href="/lab-hyperv"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Hyper-V
          </Link>
          {" · "}
          <span className="text-gray-800 dark:text-gray-200">{step.title}</span>
        </div>
        <Badge
          variant="outline"
          className="border-blue-500 text-blue-600 dark:text-blue-400"
        >
          {pct}% abgeschlossen
        </Badge>
      </div>

      <Progress value={pct} className="h-2" />

      {/* Step Header */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/80 dark:to-blue-900/80 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-blue-600 dark:text-blue-300 font-medium">
                Schritt {idx + 1} von {total}
              </span>
              {isDone && (
                <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  erledigt
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {step.title}
            </h1>
            {step.description && (
              <p className="text-gray-700 dark:text-gray-300">
                {step.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            {step.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {step.duration}
              </div>
            )}
            {interactiveCount > 0 && (
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                {completedCount}/{interactiveCount} Aktivitäten
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <CardHeader
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
          onClick={() => toggleSection("instructions")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
              📋 Anleitung
            </CardTitle>
            {expandedSections.instructions ? (
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </CardHeader>

        <AnimatePresence>
          {expandedSections.instructions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CardContent className="space-y-6 pt-0">
                {/* Checklist */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Checkliste
                  </h4>
                  <ul className="space-y-2">
                    {step.checklist.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PowerShell Reference */}
                {step.powershell && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      PowerShell Referenz
                    </h4>
                    <pre className="p-4 rounded-lg bg-gray-900 border border-gray-700 text-emerald-400 font-mono text-sm overflow-x-auto">
                      {step.powershell}
                    </pre>
                  </div>
                )}

                {/* Verification Steps */}
                {step.verify.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Prüfen
                    </h4>
                    <ul className="space-y-2">
                      {step.verify.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                        >
                          <span className="text-blue-500">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notes */}
                {step.notes && step.notes.length > 0 && (
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">
                      💡 Hinweise
                    </h4>
                    <ul className="space-y-1">
                      {step.notes.map((note, i) => (
                        <li
                          key={i}
                          className="text-sm text-amber-800 dark:text-amber-200/80"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Interactive Terminal Lab */}
      {step.terminalLab && (
        <div className="space-y-2">
          <button
            onClick={() => toggleSection("terminal")}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/15 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium text-emerald-700 dark:text-emerald-300">
                Interaktives Terminal Lab
              </span>
              {completedInteractive.terminal && (
                <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30">
                  ✓ Abgeschlossen
                </Badge>
              )}
            </div>
            {expandedSections.terminal ? (
              <ChevronDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.terminal && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <InteractiveTerminal
                  title={step.terminalLab.title}
                  description={step.terminalLab.description}
                  commands={step.terminalLab.commands}
                  onComplete={() => handleInteractiveComplete("terminal")}
                  allowSkip={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Command Challenge */}
      {step.commandChallenge && (
        <div className="space-y-2">
          <button
            onClick={() => toggleSection("challenge")}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 hover:bg-purple-100 dark:hover:bg-purple-500/15 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-purple-700 dark:text-purple-300">
                Command Challenge
              </span>
              {completedInteractive.challenge && (
                <Badge className="bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-500/30">
                  ✓ Abgeschlossen
                </Badge>
              )}
            </div>
            {expandedSections.challenge ? (
              <ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.challenge && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <CommandChallenge
                  title={step.commandChallenge.title}
                  description={step.commandChallenge.description}
                  challenges={step.commandChallenge.challenges}
                  onComplete={() => handleInteractiveComplete("challenge")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Quick Checks */}
      {step.quickChecks && step.quickChecks.length > 0 && (
        <div className="space-y-2">
          <button
            onClick={() => toggleSection("quiz")}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/15 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-medium text-indigo-700 dark:text-indigo-300">
                Wissens-Check
              </span>
              {completedInteractive.quiz && (
                <Badge className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border-indigo-300 dark:border-indigo-500/30">
                  ✓ Abgeschlossen
                </Badge>
              )}
            </div>
            {expandedSections.quiz ? (
              <ChevronDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.quiz && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4"
              >
                {step.quickChecks.map((check, i) => (
                  <QuickCheck
                    key={i}
                    question={check.question}
                    options={check.options}
                    correctAnswer={check.correctAnswer}
                    explanation={check.explanation}
                    hint={check.hint}
                    onComplete={() => {
                      if (i === step.quickChecks!.length - 1) {
                        handleInteractiveComplete("quiz");
                      }
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          {prev && (
            <Button
              variant="outline"
              onClick={() => router.push(`/lab-hyperv/step/${prev}`)}
              className="border-gray-300 dark:border-gray-600"
            >
              ◀ Zurück
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => router.push("/lab-hyperv")}
            className="border-gray-300 dark:border-gray-600"
          >
            Zur Übersicht
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={markDone}
            disabled={isDone}
            className={
              isDone ? "bg-emerald-600" : "bg-blue-600 hover:bg-blue-500"
            }
          >
            {isDone ? "✓ Erledigt" : "Als erledigt markieren"}
          </Button>

          {next && (
            <Button
              onClick={() => router.push(`/lab-hyperv/step/${next}`)}
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              Weiter ▶
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
