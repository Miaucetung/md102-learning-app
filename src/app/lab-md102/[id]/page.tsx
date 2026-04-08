"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { MD102_STEPS } from "@/lib/stepsMD102";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Md102StepPage() {
  const { id } = useParams<{ id: string }>();
  const step = useMemo(() => MD102_STEPS.find(s => s.id === id), [id]);

  if (!step) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="mb-4">Schritt nicht gefunden.</p>
        <Link href="/lab-md102" className="text-blue-600 hover:underline">⬅ zurück</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">MD-102 – {step.title}</h1>
        <Link href="/lab-md102" className="text-sm text-blue-600 hover:underline">⬅ Zurück</Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{step.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step.duration && <p className="text-xs text-zinc-500">Dauer: {step.duration}</p>}
          <p><b>Ziel:</b> {step.goal}</p>

          <section>
            <h3 className="font-semibold mb-2">Checkliste</h3>
            <ul className="list-disc pl-5 space-y-1">
              {step.checklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </section>

          {step.cloudTrack && (
            <section>
              <h3 className="font-semibold mb-2">Cloud-Pfad</h3>
              <ul className="list-disc pl-5 space-y-1">
                {step.cloudTrack.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </section>
          )}

          {step.onpremTrack && (
            <section>
              <h3 className="font-semibold mb-2">On-Prem-Pfad</h3>
              <ul className="list-disc pl-5 space-y-1">
                {step.onpremTrack.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </section>
          )}

          {step.powershell && (
            <section>
              <h3 className="font-semibold mb-2">PowerShell</h3>
              <pre className="bg-zinc-100 p-3 rounded text-sm overflow-auto"><code>{step.powershell}</code></pre>
            </section>
          )}

          {step.portalLinks && step.portalLinks.length > 0 && (
            <section>
              <h3 className="font-semibold mb-2">Portale</h3>
              <ul className="list-disc pl-5 space-y-1">
                {step.portalLinks.map((l, i) => (
                  <li key={i}>
                    <a href={l.href} target="_blank" className="text-blue-600 hover:underline" rel="noreferrer">{l.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h3 className="font-semibold mb-2">Verifizierung</h3>
            <ul className="list-disc pl-5 space-y-1">
              {step.verify.map((v, i) => <li key={i}>{v}</li>)}
            </ul>
          </section>

          {step.tips && (
            <section>
              <h3 className="font-semibold mb-2">Tipps</h3>
              <ul className="list-disc pl-5 space-y-1">
                {step.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
