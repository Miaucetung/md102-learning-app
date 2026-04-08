import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">MainLab</h1>
      <p className="text-zinc-600">Step-by-Step Labs für On-Prem & Cloud.</p>

      <div>
        <Link href="/lab" className="text-blue-600 hover:underline">
          ➜ Zur Lab-Übersicht
        </Link>
      </div>
    </main>
  );
}
