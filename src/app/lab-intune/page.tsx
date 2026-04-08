"use client";
import Link from "next/link";
import { INTUNE_STEPS } from "@/lib/stepsIntune";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { get as readMap, set as saveMap } from "@/lib/progress";

const MID = "lab-intune-001";

export default function IntuneList() {
  const [map, setMap] = useState<Record<string, boolean>>({});
  useEffect(() => setMap(readMap(MID)), []);
  const toggle = (id: string) => {
    const next = { ...map, [id]: !map[id] };
    setMap(next); saveMap(MID, next);
  };

  return (
    <main className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Entra / Intune – Aufgaben</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {INTUNE_STEPS.map(s => (
            <div key={s.id} className="flex items-center justify-between gap-3 rounded border p-2">
              <div className="flex items-center gap-2">
                <Checkbox checked={!!map[s.id]} onChange={() => toggle(s.id)} />
                <div className="text-sm">{s.title}</div>
              </div>
              <Link href={`/lab-intune/step/${s.id}`} className="text-sm text-blue-600 hover:underline">Schritt öffnen</Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
