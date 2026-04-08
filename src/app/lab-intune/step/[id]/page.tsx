"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { INTUNE_STEPS, INTUNE_MANIFEST_ID } from "@/lib/stepsIntune";
import { get as readMap, set as saveMap } from "@/lib/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type StepId = "i1"|"i2"|"i3"|"i4"|"i5"|"i6"|"i7"|"i8"|"i9"|"i10"|"i11"|"i12";

export default function Page() {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const stepId = useMemo<StepId | null>(() => {
    const raw = typeof params?.id === "string" ? params.id : "";
    const cleaned = decodeURIComponent(raw).trim() as StepId;
    const allowed = new Set<StepId>(["i1","i2","i3","i4","i5","i6","i7","i8","i9","i10","i11","i12"]);
    return allowed.has(cleaned) ? cleaned : null;
  }, [params?.id]);

  const idx = useMemo(() => (stepId ? INTUNE_STEPS.findIndex(s => s.id === stepId) : -1), [stepId]);
  const step = idx >= 0 ? INTUNE_STEPS[idx] : undefined;

  const [map, setMap] = useState<Record<string, boolean>>({});
  useEffect(() => setMap(readMap(INTUNE_MANIFEST_ID)), []);
  useEffect(() => { if (!step) router.replace("/lab-intune"); }, [step, router]);

  const total = INTUNE_STEPS.length;
  const pct = useMemo(() => Math.round((INTUNE_STEPS.filter(s => map[s.id]).length / total) * 100), [map, total]);

  if (!step) return <main className="p-6">Lade…</main>;

  const isDone = !!map[step.id];
  const markDone = () => { const next = { ...map, [step.id]: true }; setMap(next); saveMap(INTUNE_MANIFEST_ID, next); };

  const prev = idx > 0 ? INTUNE_STEPS[idx - 1].id : null;
  const next = idx < total - 1 ? INTUNE_STEPS[idx + 1].id : null;

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-600">
          <Link href="/lab" className="text-blue-600 hover:underline">Übersicht</Link>{" · "}
          <Link href="/lab-intune" className="text-blue-600 hover:underline">Entra / Intune</Link>{" · "}
          <span>{step.title}</span>
        </div>
        <Badge>{pct}%</Badge>
      </div>

      <Progress value={pct} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {step.title} {isDone && <Badge>✓ erledigt</Badge>}
          </CardTitle>
          {step.duration && <div className="text-xs text-zinc-500">{step.duration}</div>}
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 font-medium">Checkliste</div>
            <ul className="ml-4 list-disc text-sm">{step.checklist.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>

          {step.portalLinks?.length ? (
            <div>
              <div className="mb-2 font-medium">Portale</div>
              <ul className="ml-4 list-disc text-sm">
                {step.portalLinks.map((l, i) => (
                  <li key={i}><a href={l.href} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{l.label}</a></li>
                ))}
              </ul>
            </div>
          ) : null}

          {step.powershell && (
            <div>
              <div className="mb-2 font-medium">PowerShell</div>
              <pre className="overflow-auto rounded border bg-zinc-50 p-3 text-sm">{step.powershell}</pre>
            </div>
          )}

          {step.verify.length > 0 && (
            <div>
              <div className="mb-2 font-medium">Prüfen</div>
              <ul className="ml-4 list-disc text-sm">{step.verify.map((v, i) => <li key={i}>{v}</li>)}</ul>
            </div>
          )}

          {step.notes?.length ? (
            <div>
              <div className="mb-2 font-medium">Hinweise</div>
              <ul className="ml-4 list-disc text-sm">{step.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button onClick={markDone} disabled={isDone}>Als erledigt markieren</Button>
            <Button className="border" onClick={() => router.push("/lab-intune")}>Zur Karte</Button>
            {prev && <Button className="border" onClick={() => router.push(`/lab-intune/step/${prev}`)}>◀ Zurück</Button>}
            {next && <Button className="border" onClick={() => router.push(`/lab-intune/step/${next}`)}>Weiter ▶</Button>}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
