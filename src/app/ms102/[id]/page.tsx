"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { QUESTIONS_MS102 } from "../data/questions";

export default function Ms102QuestionPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const question = QUESTIONS_MS102.find((q) => q.id === id);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  if (!question) {
    return (
      <main className="p-6">
        <p>Frage nicht gefunden.</p>
        <Link href="/ms102" className="text-blue-600 hover:underline">
          ⬅ Zurück
        </Link>
      </main>
    );
  }

  const correct =
    checked &&
    choice !== null &&
    question.correctAnswers.includes(question.options[choice].key);

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{question.id}</h1>
        <Link href="/ms102" className="text-sm text-blue-600 hover:underline">
          ⬅ Übersicht
        </Link>
      </header>

      <div className="space-y-4">
        <p className="font-medium whitespace-pre-line">{question.question}</p>
        {question.options.map((opt, i) => (
          <label
            key={i}
            className="flex items-start gap-2 border rounded p-3 cursor-pointer hover:bg-zinc-50"
          >
            <input
              type="radio"
              name="answer"
              checked={choice === i}
              onChange={() => setChoice(i)}
              className="mt-0.5"
            />
            <span>
              <strong>{opt.key}.</strong> {opt.text}
            </span>
          </label>
        ))}

        {!checked && (
          <button
            onClick={() => setChecked(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={choice === null}
          >
            Antwort prüfen
          </button>
        )}

        {checked && (
          <div
            className={`p-4 rounded ${
              correct
                ? "bg-green-50 border border-green-300"
                : "bg-red-50 border border-red-300"
            }`}
          >
            <p className="font-semibold">
              {correct ? "✅ Richtig!" : "❌ Falsch."}
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
            href="/ms102"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ⬅ Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </main>
  );
}
