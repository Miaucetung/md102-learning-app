"use client";
import { Progress } from "@/components/ui/progress";
import { get as readMap } from "@/lib/progress";
import {
  HYPERV_MANIFEST_ID,
  HYPERV_STEPS,
  HYPERV_TOTAL,
} from "@/lib/stepsHyperV";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "";
  const step = path.includes("/step/") ? path.split("/step/")[1] : "";
  const [value, setValue] = useState(0);

  useEffect(() => {
    const map = readMap(HYPERV_MANIFEST_ID);
    const done = HYPERV_STEPS.filter((s) => map[s.id]).length;
    setValue(Math.round((done / HYPERV_TOTAL) * 100));
  }, [path]);

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="border-b pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">MD102 Learning App – Hyper-V</h1>
          <p className="text-sm text-zinc-500">
            Schritt {step || "Übersicht"} · {HYPERV_TOTAL} Schritte
          </p>
        </div>
        <Link href="/lab" className="text-sm text-blue-600 hover:underline">
          ⬅ Übersicht
        </Link>
      </header>
      <div>
        <div className="mb-1 flex justify-between text-xs text-zinc-500">
          <span>Fortschritt</span>
          <span>{value}%</span>
        </div>
        <Progress value={value} />
      </div>
      {children}
    </div>
  );
}
