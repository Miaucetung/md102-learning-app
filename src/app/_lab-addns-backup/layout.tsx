"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { loadAddns, ADDNS_TOTAL } from "@/lib/stepsAddns";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "";
  const step = path.includes("/step/") ? path.split("/step/")[1] : "";
  const [value, setValue] = useState(0);
  useEffect(() => { setValue(loadAddns().percent); }, [path]);
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="border-b pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">MainLab – AD / DNS / DHCP</h1>
          <p className="text-sm text-zinc-500">Schritt {step || "Übersicht"} · {ADDNS_TOTAL} Schritte</p>
        </div>
        <Link href="/lab" className="text-sm text-blue-600 hover:underline">⬅ Übersicht</Link>
      </header>
      <div>
        <div className="mb-1 flex justify-between text-xs text-zinc-500">
          <span>Fortschritt</span><span>{value}%</span>
        </div>
        <Progress value={value} />
      </div>
      {children}
    </div>
  );
}
