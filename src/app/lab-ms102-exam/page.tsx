// src/app/lab-ms102-exam/page.tsx
export default function Page() {
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">MS-102 – Exam (neu)</h1>
      <p className="text-gray-700">
        Hier erscheint dein neuer Test mit 476 Fragen in fester Reihenfolge + Erklärungen.
      </p>

      {/* Platzhalter – später ersetzt du dies durch dein Fragen-UI */}
      <div className="rounded-xl border p-4">
        <p className="text-sm text-gray-600">
          Placeholder: Lade hier <code>data/questionsDeploy.ts</code> und rendere die Fragen.
        </p>
      </div>
    </main>
  );
}
