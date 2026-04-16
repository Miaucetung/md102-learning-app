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
import { ADDNS_MANIFEST_ID, ADDNS_STEPS } from "@/lib/stepsAddns-interactive";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Code2,
  HelpCircle,
  Lightbulb,
  Server,
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
    const allowed = new Set(ADDNS_STEPS.map((s) => s.id));
    return allowed.has(cleaned) ? cleaned : null;
  }, [params?.id]);

  const idx = useMemo(
    () => (stepId ? ADDNS_STEPS.findIndex((s) => s.id === stepId) : -1),
    [stepId],
  );
  const step = idx >= 0 ? ADDNS_STEPS[idx] : undefined;

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

  useEffect(() => setMap(readMap(ADDNS_MANIFEST_ID)), []);
  useEffect(() => {
    if (!step) router.replace("/lab-addns");
  }, [step, router]);

  const total = ADDNS_STEPS.length;
  const pct = useMemo(
    () =>
      Math.round((ADDNS_STEPS.filter((s) => map[s.id]).length / total) * 100),
    [map, total],
  );

  if (!step) return <main className="p-6">Lade…</main>;

  const isDone = !!map[step.id];
  const markDone = () => {
    const next = { ...map, [step.id]: true };
    setMap(next);
    saveMap(ADDNS_MANIFEST_ID, next);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInteractiveComplete = (key: string) => {
    setCompletedInteractive((prev) => ({ ...prev, [key]: true }));
  };

  const prev = idx > 0 ? ADDNS_STEPS[idx - 1].id : null;
  const next = idx < total - 1 ? ADDNS_STEPS[idx + 1].id : null;

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
            href="/lab-addns"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            AD/DNS/DHCP
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
      <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/80 dark:to-indigo-900/80 p-6">
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
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Server className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          {step.duration && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              {step.duration}
            </div>
          )}
          {interactiveCount > 0 && (
            <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
              <Target className="w-4 h-4" />
              {completedCount}/{interactiveCount} Interaktiv
            </div>
          )}
        </div>
      </div>

      {/* Instructions Section */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => toggleSection("instructions")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Target className="w-5 h-5 text-blue-500" />
              Anleitung & Checkliste
            </CardTitle>
            {expandedSections.instructions ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </CardHeader>
        <AnimatePresence>
          {expandedSections.instructions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="pt-0 space-y-4">
                <div className="space-y-2">
                  {step.checklist.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2 rounded bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* PowerShell Commands */}
                {step.powershell && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Code2 className="w-4 h-4 text-blue-500" />
                      PowerShell-Befehle
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                      <code>{step.powershell}</code>
                    </pre>
                  </div>
                )}

                {/* Verify */}
                {step.verify && step.verify.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Verifizierung
                    </div>
                    <ul className="space-y-1">
                      {step.verify.map((v, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notes */}
                {step.notes && step.notes.length > 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30">
                    <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400 mb-2">
                      <Lightbulb className="w-4 h-4" />
                      Hinweise
                    </div>
                    <ul className="space-y-1">
                      {step.notes.map((n, i) => (
                        <li
                          key={i}
                          className="text-sm text-amber-800 dark:text-amber-300"
                        >
                          • {n}
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

      {/* Interactive Terminal */}
      {hasTerminal && step.terminalLab && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            onClick={() => toggleSection("terminal")}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Terminal className="w-5 h-5 text-green-500" />
                {step.terminalLab.title}
                {completedInteractive["terminal"] && (
                  <Badge className="ml-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs">
                    ✓
                  </Badge>
                )}
              </CardTitle>
              {expandedSections.terminal ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.terminal && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="pt-0">
                  {step.terminalLab.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {step.terminalLab.description}
                    </p>
                  )}
                  <InteractiveTerminal
                    title={step.terminalLab.title}
                    commands={step.terminalLab.commands}
                    onComplete={() => handleInteractiveComplete("terminal")}
                  />
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      )}

      {/* Command Challenge */}
      {hasChallenge && step.commandChallenge && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            onClick={() => toggleSection("challenge")}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Code2 className="w-5 h-5 text-purple-500" />
                {step.commandChallenge.title}
                {completedInteractive["challenge"] && (
                  <Badge className="ml-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs">
                    ✓
                  </Badge>
                )}
              </CardTitle>
              {expandedSections.challenge ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.challenge && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="pt-0">
                  {step.commandChallenge.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {step.commandChallenge.description}
                    </p>
                  )}
                  <CommandChallenge
                    title={step.commandChallenge.title}
                    challenges={step.commandChallenge.challenges}
                    onComplete={() => handleInteractiveComplete("challenge")}
                  />
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      )}

      {/* Quick Check Quiz */}
      {hasQuiz && step.quickChecks && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            onClick={() => toggleSection("quiz")}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <HelpCircle className="w-5 h-5 text-orange-500" />
                Wissens-Check
                {completedInteractive["quiz"] && (
                  <Badge className="ml-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs">
                    ✓
                  </Badge>
                )}
              </CardTitle>
              {expandedSections.quiz ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.quiz && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="pt-0 space-y-4">
                  {step.quickChecks.map((qc, i) => (
                    <QuickCheck
                      key={i}
                      question={qc.question}
                      options={qc.options}
                      correctAnswer={qc.correctAnswer}
                      explanation={qc.explanation}
                      hint={qc.hint}
                      onComplete={() => handleInteractiveComplete("quiz")}
                    />
                  ))}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      )}

      {/* Navigation & Complete */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex gap-2">
          {prev && (
            <Link href={`/lab-addns/step/${prev}`}>
              <Button variant="outline">← Zurück</Button>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isDone ? (
            <Button
              onClick={markDone}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Als erledigt markieren
            </Button>
          ) : (
            <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-2">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Schritt abgeschlossen
            </Badge>
          )}

          {next && (
            <Link href={`/lab-addns/step/${next}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Weiter →
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
