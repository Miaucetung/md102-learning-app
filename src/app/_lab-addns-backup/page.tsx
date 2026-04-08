"use client";
import Link from "next/link";
import { ADDNS_STEPS } from "@/lib/stepsAddns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { get as readMap, set as saveMap } from "@/lib/progress";

const MID = "lab-addns-001";

export default function AddnsList() {
  const [map, setMap] = useState<Record<string, boolean>>({});
  useEffect(() => setMap(readMap(MID)), []);
  const toggle = (id: string) => {
    const next = { ...map, [id]: !map[id] };
    setMap(next); saveMap(MID, next);
  };

  return (
    <main className="space-y-4">
      <Card>
        <CardHeader><CardTitle>AD / DNS / DHCP – Aufgaben</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {ADDNS_STEPS.map(s => (
            <div key={s.id} className="flex items-center justify-between gap-3 rounded border p-2">
              <div className="flex items-center gap-2">
                <Checkbox checked={!!map[s.id]} onChange={() => toggle(s.id)} />
                <div className="text-sm">{s.title}</div>
              </div>
              <Link href={`/lab-addns/step/${s.id}`} className="text-sm text-blue-600 hover:underline">Schritt öffnen</Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
