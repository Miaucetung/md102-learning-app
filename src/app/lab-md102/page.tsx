"use client";

import { PageHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  MD102_STEPS,
  MD102_TOTAL,
  loadMD102,
  pct,
  saveMD102,
  type ProgressMap,
} from "@/lib/stepsMD102";
import { Award, BookOpen, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Md102Page() {
  const [map, setMap] = useState<ProgressMap>({});
  const value = pct(map, MD102_TOTAL);

  useEffect(() => setMap(loadMD102()), []);
  useEffect(() => saveMD102(map), [map]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <PageHeader
        title="MD-102 Labs"
        subtitle="Praktische Übungen"
        icon={Play}
        iconGradient="from-green-500 to-green-700"
        crossLinks={[
          {
            href: "/learn/md-102",
            label: "Lernmodule",
            icon: BookOpen,
          },
          {
            href: "/lab-md102-exam",
            label: "Prüfung",
            icon: Award,
            variant: "primary",
          },
        ]}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Progress */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Fortschritt</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {value}%
            </span>
          </div>
          <Progress value={value} />
        </div>

        {/* Labs List */}
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              MD-102 – Praktische Übungen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {MD102_STEPS.map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Checkbox
                  checked={!!map[s.id]}
                  onChange={(e: any) =>
                    setMap({ ...map, [s.id]: !!e?.target?.checked })
                  }
                />
                <Link
                  href={`/lab-md102/${s.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline flex-1"
                >
                  {s.title}
                </Link>
              </label>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
