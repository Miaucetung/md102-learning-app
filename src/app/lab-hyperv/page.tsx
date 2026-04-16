"use client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { get as readMap, set as saveMap } from "@/lib/progress";
import { HYPERV_MANIFEST_ID, HYPERV_STEPS } from "@/lib/stepsHyperV";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Monitor,
  Network,
  Server,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const stepMeta: Record<string, { icon: typeof Server; color: string; desc: string }> = {
  t1: { icon: Server, color: "blue", desc: "System-Voraussetzungen prüfen & vorbereiten" },
  t2: { icon: Monitor, color: "emerald", desc: "Hyper-V Rolle per PowerShell aktivieren" },
  t3: { icon: Network, color: "purple", desc: "External, Internal & Private Switch erstellen" },
};

export default function HyperVList() {
  const [map, setMap] = useState<Record<string, boolean>>({});
  useEffect(() => setMap(readMap(HYPERV_MANIFEST_ID)), []);
  const toggle = (id: string) => {
    const next = { ...map, [id]: !map[id] };
    setMap(next);
    saveMap(HYPERV_MANIFEST_ID, next);
  };

  const completed = useMemo(
    () => HYPERV_STEPS.filter((s) => map[s.id]).length,
    [map],
  );
  const total = HYPERV_STEPS.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <main className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-violet-200 dark:border-violet-800 bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950/80 dark:to-purple-900/80 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-sm font-medium mb-2">
              <Monitor className="w-4 h-4" />
              Hands-On Lab
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Hyper-V Virtualisierung
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Richte Hyper-V auf deinem Windows-System ein, erstelle virtuelle Switches
              und bereite die Grundlage für weitere Labs vor.
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-violet-500 text-violet-600 dark:text-violet-400 text-lg px-3 py-1"
          >
            {pct}%
          </Badge>
        </div>
        <Progress value={pct} className="mt-4 h-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {completed} von {total} Schritten abgeschlossen
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {HYPERV_STEPS.map((s, idx) => {
          const meta = stepMeta[s.id] || { icon: Server, color: "blue", desc: "" };
          const Icon = meta.icon;
          const isDone = !!map[s.id];
          const colorMap: Record<string, string> = {
            blue: "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10",
            emerald: "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10",
            purple: "border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10",
          };
          const iconColorMap: Record<string, string> = {
            blue: "text-blue-500",
            emerald: "text-emerald-500",
            purple: "text-purple-500",
          };

          return (
            <div
              key={s.id}
              className={`group relative flex items-center gap-4 rounded-xl border p-4 transition-all ${
                isDone
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : colorMap[meta.color] || colorMap.blue
              }`}
            >
              {/* Step Number */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isDone
                    ? "bg-emerald-500/20 text-emerald-500"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${iconColorMap[meta.color] || "text-blue-500"}`} />
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {s.title}
                  </h3>
                  {isDone && (
                    <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30 text-xs">
                      Erledigt
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {meta.desc}
                </p>
                {s.duration && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                    <Clock className="w-3 h-3" />
                    {s.duration}
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggle(s.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isDone
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-zinc-300 dark:border-zinc-600 hover:border-violet-500"
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-3 h-3" />}
                </button>
                <Link
                  href={`/lab-hyperv/step/${s.id}`}
                  className="flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                >
                  Öffnen
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
