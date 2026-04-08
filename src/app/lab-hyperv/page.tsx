"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { get as readMap, set as saveMap } from "@/lib/progress";
import { HYPERV_MANIFEST_ID, HYPERV_STEPS } from "@/lib/stepsHyperV";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HyperVList() {
  const [map, setMap] = useState<Record<string, boolean>>({});
  useEffect(() => setMap(readMap(HYPERV_MANIFEST_ID)), []);
  const toggle = (id: string) => {
    const next = { ...map, [id]: !map[id] };
    setMap(next);
    saveMap(HYPERV_MANIFEST_ID, next);
  };

  return (
    <main className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Hyper-V – Aufgaben</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {HYPERV_STEPS.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-3 rounded border p-2"
            >
              <div className="flex items-center gap-2">
                <Checkbox checked={!!map[s.id]} onChange={() => toggle(s.id)} />
                <div className="text-sm">{s.title}</div>
              </div>
              <Link
                href={`/lab-hyperv/step/${s.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Schritt öffnen
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
