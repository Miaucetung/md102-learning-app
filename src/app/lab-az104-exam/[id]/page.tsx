// src/app/lab-az104-exam/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { QUESTIONS_AZ104 } from "../data/questions-az104";

export default function Az104QuestionPage() {
  const { id } = useParams<{ id: string }>();
  const question = QUESTIONS_AZ104.find((q) => q.id === id);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  if (!question) {
    return (
      <main className="p-6">
        <p>Frage nicht gefunden.</p>
        <Link
          href="/lab-az104-exam"
          className="text-blue-600 hover:underline"
        >
          ⬅ Zurück zur Übersicht
        </Link>
      </main>
    );
  }

  const selectedOption =
    choice !== null ? question.options[choice] : undefined;

  // Korrektheitsprüfung: wir vergleichen auf den Buchstaben (A., B., C., ...)
  const isCorrect =
    checked &&
    selectedOption !== undefined &&
    selectedOption.trim().startsWith(question.correctAnswer);

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          AZ-104 – {question.id}
        </h1>
        <Link
          href="/lab-az104-exam"
          className="text-sm text-blue-600 hover:underline"
        >
          ⬅ Übersicht
        </Link>
      </header>

      <div className="space-y-4">
        <p className="font-medium whitespace-pre-line">
          {question.question}
        </p>

        {question.options.map((opt, i) => (
          <label
            key={i}
            className="flex items-start gap-2 border rounded p-3 cursor-pointer hover:bg-zinc-50"
          >
            <input
              type="radio"
              name="answer"
              checked={choice === i}
              onChange={() => {
                setChoice(i);
                setChecked(false);
              }}
              className="mt-0.5"
            />
            <span>{opt}</span>
          </label>
        ))}

        {!checked && (
          <button
            onClick={() => setChecked(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
            disabled={choice === null}
          >
            Antwort prüfen
          </button>
        )}

        {checked && (
          <div
            className={`p-4 rounded ${
              isCorrect
                ? "bg-green-50 border border-green-300"
                : "bg-red-50 border border-red-300"
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? "✅ Richtig!" : "❌ Falsch."}
            </p>
            <p className="text-sm mt-1">
              Richtige Antwort: {question.correctAnswers}
            </p>
            {question.explanationDe && (
              <p className="text-sm mt-2 text-zinc-700 whitespace-pre-line">
                {question.explanationDe}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/lab-az104-exam"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ⬅ Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </main>
  );
}
