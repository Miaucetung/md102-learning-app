"use client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { get as readMap, set as saveMap } from "@/lib/progress";
import { INTUNE_STEPS } from "@/lib/stepsIntune";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Cloud,
  KeyRound,
  Laptop,
  RefreshCw,
  Settings,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const MID = "lab-intune-001";

const stepMeta: Record<
  string,
  { icon: typeof Cloud; color: string; desc: string }
> = {
  i1: {
    icon: Cloud,
    color: "blue",
    desc: "Microsoft 365 Developer-Tenant aufsetzen",
  },
  i2: { icon: Settings, color: "blue", desc: "MDM/MAM-Behörde konfigurieren" },
  i3: {
    icon: KeyRound,
    color: "amber",
    desc: "Multi-Faktor-Authentifizierung aktivieren",
  },
  i4: {
    icon: RefreshCw,
    color: "emerald",
    desc: "Entra Connect mit Password Hash Sync",
  },
  i5: {
    icon: Settings,
    color: "emerald",
    desc: "Seamless SSO & OU-Filter konfigurieren",
  },
  i6: {
    icon: RefreshCw,
    color: "emerald",
    desc: "Ersten Sync starten und verifizieren",
  },
  i7: {
    icon: Users,
    color: "purple",
    desc: "Synchronisierte Benutzer im Portal prüfen",
  },
  i8: {
    icon: UserCheck,
    color: "purple",
    desc: "Anmeldung im Cloud-Portal testen",
  },
  i9: {
    icon: Laptop,
    color: "cyan",
    desc: "Windows 11 Gerät in Entra/Intune einbinden",
  },
  i10: {
    icon: Shield,
    color: "cyan",
    desc: "Compliance Policy erstellen und zuweisen",
  },
  i11: {
    icon: Settings,
    color: "pink",
    desc: "Konfigurationsprofile über Settings Catalog",
  },
  i12: {
    icon: Shield,
    color: "pink",
    desc: "Conditional Access für konforme Geräte",
  },
};

const categories = [
  { title: "Tenant-Setup", steps: ["i1", "i2", "i3"], color: "blue" },
  { title: "Entra Connect", steps: ["i4", "i5", "i6"], color: "emerald" },
  { title: "Benutzer & Anmeldung", steps: ["i7", "i8"], color: "purple" },
  {
    title: "Geräte & Richtlinien",
    steps: ["i9", "i10", "i11", "i12"],
    color: "cyan",
  },
];

export default function IntuneList() {
  const [map, setMap] = useState<Record<string, boolean>>({});
  useEffect(() => setMap(readMap(MID)), []);
  const toggle = (id: string) => {
    const next = { ...map, [id]: !map[id] };
    setMap(next);
    saveMap(MID, next);
  };

  const completed = useMemo(
    () => INTUNE_STEPS.filter((s) => map[s.id]).length,
    [map],
  );
  const total = INTUNE_STEPS.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <main className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950/80 dark:to-blue-900/80 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-2">
              <Cloud className="w-4 h-4" />
              Hands-On Lab
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Entra ID & Intune Lab
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Richte Microsoft 365, Entra Connect, Intune-Enrollment und
              Compliance-Richtlinien Schritt für Schritt ein.
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-cyan-500 text-cyan-600 dark:text-cyan-400 text-lg px-3 py-1"
          >
            {pct}%
          </Badge>
        </div>
        <Progress value={pct} className="mt-4 h-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {completed} von {total} Schritten abgeschlossen
        </p>
      </div>

      {/* Categories */}
      {categories.map((cat) => {
        const catSteps = INTUNE_STEPS.filter((s) => cat.steps.includes(s.id));
        const catDone = catSteps.filter((s) => map[s.id]).length;
        const catColorMap: Record<string, string> = {
          blue: "border-blue-500/30 text-blue-600 dark:text-blue-400",
          emerald:
            "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
          purple: "border-purple-500/30 text-purple-600 dark:text-purple-400",
          cyan: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
        };

        return (
          <div key={cat.title} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2
                className={`text-sm font-semibold uppercase tracking-wider ${catColorMap[cat.color]?.split(" ").slice(1).join(" ") || "text-zinc-500"}`}
              >
                {cat.title}
              </h2>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {catDone}/{catSteps.length}
              </span>
            </div>

            {catSteps.map((s, idx) => {
              const meta = stepMeta[s.id] || {
                icon: Cloud,
                color: "blue",
                desc: "",
              };
              const Icon = meta.icon;
              const isDone = !!map[s.id];
              const globalIdx = INTUNE_STEPS.findIndex((st) => st.id === s.id);

              const bgMap: Record<string, string> = {
                blue: "border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10",
                amber:
                  "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10",
                emerald:
                  "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10",
                purple:
                  "border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10",
                cyan: "border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10",
                pink: "border-pink-500/20 bg-pink-500/5 hover:bg-pink-500/10",
              };
              const iconMap: Record<string, string> = {
                blue: "text-blue-500",
                amber: "text-amber-500",
                emerald: "text-emerald-500",
                purple: "text-purple-500",
                cyan: "text-cyan-500",
                pink: "text-pink-500",
              };

              return (
                <div
                  key={s.id}
                  className={`group relative flex items-center gap-4 rounded-xl border p-4 transition-all ${
                    isDone
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : bgMap[meta.color] || bgMap.blue
                  }`}
                >
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
                      <span className="text-sm font-bold">{globalIdx + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon
                        className={`w-4 h-4 ${iconMap[meta.color] || "text-blue-500"}`}
                      />
                      <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">
                        {s.title}
                      </h3>
                      {isDone && (
                        <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30 text-xs">
                          Erledigt
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {meta.desc}
                    </p>
                    {s.duration && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                        <Clock className="w-3 h-3" />
                        {s.duration}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggle(s.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isDone
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-zinc-300 dark:border-zinc-600 hover:border-cyan-500"
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-3 h-3" />}
                    </button>
                    <Link
                      href={`/lab-intune/step/${s.id}`}
                      className="flex items-center gap-1 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                    >
                      Öffnen
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </main>
  );
}
