"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MD102_STEPS, MD102_TOTAL, loadMD102, saveMD102, pct, type ProgressMap } from "@/lib/stepsMD102";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export default function Md102Page() {
  const [map, setMap] = useState<ProgressMap>({});
  const value = pct(map, MD102_TOTAL);

  useEffect(() => setMap(loadMD102()), []);
  useEffect(() => saveMD102(map), [map]);

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">MainLab – MD-102</h1>
        <Link href="/lab" className="text-sm text-blue-600 hover:underline">⬅ Zur Übersicht</Link>
      </header>

      <div>
        <div className="flex justify-between text-xs text-zinc-500 mb-1">
          <span>Fortschritt</span><span>{value}%</span>
        </div>
        <Progress value={value} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>MD-102 – Überblick & Übungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {MD102_STEPS.map((s) => (
            <label key={s.id} className="flex items-center gap-3">
              <Checkbox
                checked={!!map[s.id]}
                onChange={(e: any) => setMap({ ...map, [s.id]: !!e?.target?.checked })}
              />
              <Link href={`/lab-md102/${s.id}`} className="text-blue-600 hover:underline">
                {s.title}
              </Link>
            </label>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
