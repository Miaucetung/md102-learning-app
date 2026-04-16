"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { get as readMap, set as saveMap } from "@/lib/progress";
import { ADDNS_MANIFEST_ID, ADDNS_STEPS } from "@/lib/stepsAddns-interactive";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  MonitorCheck,
  Network,
  Server,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function AddnsLabPage() {
  const [map, setMap] = useState<Record<string, boolean>>({});
  useEffect(() => setMap(readMap(ADDNS_MANIFEST_ID)), []);

  const toggle = (id: string) => {
    const next = { ...map, [id]: !map[id] };
    setMap(next);
    saveMap(ADDNS_MANIFEST_ID, next);
  };

  const completed = useMemo(
    () => ADDNS_STEPS.filter((s) => map[s.id]).length,
    [map],
  );
  const total = ADDNS_STEPS.length;
  const pct = Math.round((completed / total) * 100);

  // Group steps by category
  const categories = [
    {
      title: "Grundinstallation",
      icon: Server,
      color: "blue",
      steps: ["ad1", "ad2", "ad3"],
    },
    {
      title: "DNS-Konfiguration",
      icon: Network,
      color: "green",
      steps: ["ad4"],
    },
    {
      title: "DHCP-Server",
      icon: Shield,
      color: "purple",
      steps: ["ad5", "ad6"],
    },
    {
      title: "AD-Struktur",
      icon: Users,
      color: "orange",
      steps: ["ad7", "ad8"],
    },
    {
      title: "Client-Integration",
      icon: MonitorCheck,
      color: "cyan",
      steps: ["ad9", "ad10"],
    },
    {
      title: "Erweitert",
      icon: BookOpen,
      color: "pink",
      steps: ["ad11", "ad12"],
    },
  ];

  return (
    <main className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/80 dark:to-indigo-900/80 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
              <Server className="w-4 h-4" />
              Hands-On Lab
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Active Directory, DNS & DHCP Lab
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Baue eine vollständige Windows Server-Infrastruktur auf: Domain
              Controller, DNS-Server, DHCP und mehr. Schritt für Schritt mit
              interaktiven Übungen.
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-lg px-4 py-2 border-blue-500 text-blue-600 dark:text-blue-400"
          >
            {pct}%
          </Badge>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>
              {completed} von {total} Schritten abgeschlossen
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              ~2-3 Stunden gesamt
            </span>
          </div>
          <Progress value={pct} className="h-3" />
        </div>
      </div>

      {/* Categories */}
      <div className="grid gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const catSteps = ADDNS_STEPS.filter((s) => cat.steps.includes(s.id));
          const catCompleted = catSteps.filter((s) => map[s.id]).length;
          const catPct = Math.round((catCompleted / catSteps.length) * 100);

          const colorClasses: Record<string, string> = {
            blue: "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30",
            green:
              "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30",
            purple:
              "border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30",
            orange:
              "border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/30",
            cyan: "border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/30",
            pink: "border-pink-200 dark:border-pink-800 bg-pink-50/50 dark:bg-pink-950/30",
          };

          const iconColors: Record<string, string> = {
            blue: "text-blue-600 dark:text-blue-400",
            green: "text-green-600 dark:text-green-400",
            purple: "text-purple-600 dark:text-purple-400",
            orange: "text-orange-600 dark:text-orange-400",
            cyan: "text-cyan-600 dark:text-cyan-400",
            pink: "text-pink-600 dark:text-pink-400",
          };

          return (
            <Card
              key={cat.title}
              className={`${colorClasses[cat.color]} border`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${iconColors[cat.color]}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      {cat.title}
                    </CardTitle>
                  </div>
                  {catPct === 100 && (
                    <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Abgeschlossen
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {catSteps.map((step) => {
                  const isDone = !!map[step.id];
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors ${
                        isDone
                          ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={isDone}
                          onChange={() => toggle(step.id)}
                          className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                        />
                        <div>
                          <div
                            className={`font-medium ${isDone ? "text-emerald-700 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}
                          >
                            {step.title}
                          </div>
                          {step.duration && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {step.duration}
                            </div>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/lab-addns/step/${step.id}`}
                        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Öffnen
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Hilfreiche Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300">
                AD DS Dokumentation
              </span>
            </a>
            <a
              href="https://learn.microsoft.com/windows-server/networking/dns/dns-top"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <Network className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-gray-700 dark:text-gray-300">
                DNS Server Guide
              </span>
            </a>
            <a
              href="https://learn.microsoft.com/windows-server/networking/technologies/dhcp/dhcp-top"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-gray-700 dark:text-gray-300">
                DHCP Server Guide
              </span>
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
