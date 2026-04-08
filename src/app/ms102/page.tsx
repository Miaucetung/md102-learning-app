"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS_MS102 } from "./data/questions";

type AnswerMap = Record<string, string[]>;

export default function Ms102TestPage() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false); // nur noch für Gesamt-Statistik

  const stats = useMemo(() => {
    const total = QUESTIONS_MS102.length;
    let correct = 0;
    const perArea: Record<string, { total: number; correct: number }> = {};

    for (const q of QUESTIONS_MS102) {
      const selected = answers[q.id] || [];
      const allCorrect = q.correctAnswers;

      const isCorrect =
        selected.length > 0 &&
        selected.length === allCorrect.length &&
        selected.every((k) => allCorrect.includes(k)) &&
        allCorrect.every((k) => selected.includes(k));

      if (!perArea[q.area]) {
        perArea[q.area] = { total: 0, correct: 0 };
      }

      perArea[q.area].total += 1;
      if (isCorrect) {
        correct += 1;
        perArea[q.area].correct += 1;
      }
    }

    return { total, correct, perArea };
  }, [answers]);

  const handleSelect = (
    questionId: string,
    optionKey: string,
    isMulti: boolean
  ) => {
    setAnswers((prev) => {
      const prevSelected = prev[questionId] || [];

      if (isMulti) {
        // Mehrfachauswahl (Checkboxen)
        const exists = prevSelected.includes(optionKey);
        const nextSelected = exists
          ? prevSelected.filter((k) => k !== optionKey)
          : [...prevSelected, optionKey];

        return {
          ...prev,
          [questionId]: nextSelected,
        };
      } else {
        // Single-Choice (Radio) – immer genau eine Antwort
        return {
          ...prev,
          [questionId]: [optionKey],
        };
      }
    });
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">MS-102 – Gesamttest (476 Fragen)</h1>
          <p className="text-sm text-zinc-600">
            Die Fragen sind in fester Reihenfolge. Jede Frage hat ihre
            ursprüngliche ID (z. B. Q4, Q11 …) zur Wiedererkennung.
          </p>
        </div>

        <Link
          href="/"
          className="text-sm px-3 py-2 rounded border border-zinc-300 hover:bg-zinc-50"
        >
          ⬅️ Zur Startseite
        </Link>
      </header>

      {/* Status / Steuerung */}
      <section className="flex flex-wrap items-center gap-4 border rounded-lg p-4 bg-zinc-50">
        <div className="text-sm space-y-1">
          <div>
            Beantwortet:{" "}
            <span className="font-semibold">
              {Object.keys(answers).length}/{QUESTIONS_MS102.length}
            </span>
          </div>

          {showResult && (
            <div>
              Ergebnis:{" "}
              <span className="font-semibold">
                {stats.correct}/{stats.total} (
                {Math.round((stats.correct / stats.total) * 100)}%)
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 ml-auto">
          <button
            className="px-3 py-2 rounded bg-zinc-900 text-white text-sm hover:bg-zinc-800"
            onClick={() => setShowResult(true)}
          >
            Gesamt-Ergebnis anzeigen
          </button>
          <button
            className="px-3 py-2 rounded border text-sm"
            onClick={() => {
              setAnswers({});
              setShowResult(false);
            }}
          >
            Zurücksetzen
          </button>
        </div>
      </section>

      {/* Auswertung nach Themengebieten */}
      {showResult && (
        <section className="border rounded-lg p-4 space-y-2">
          <h2 className="font-semibold text-lg">Auswertung nach Themengebieten</h2>
          <div className="text-sm text-zinc-700 space-y-1">
            {Object.entries(stats.perArea).map(([area, v]) => {
              const pct = Math.round((v.correct / v.total) * 100);
              return (
                <div
                  key={area}
                  className="flex justify-between gap-4 border-b last:border-b-0 pb-1"
                >
                  <span>{area}</span>
                  <span className="font-mono">
                    {v.correct}/{v.total} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Fragenliste */}
      <section className="space-y-6">
        {QUESTIONS_MS102.map((q, idx) => {
          const selected = answers[q.id] || [];
          const isMulti = q.correctAnswers.length > 1;
          const allCorrect = q.correctAnswers;

          const hasAnswered = selected.length > 0;

          const isQuestionCorrect =
            hasAnswered &&
            selected.length === allCorrect.length &&
            selected.every((k) => allCorrect.includes(k)) &&
            allCorrect.every((k) => selected.includes(k));

          const isQuestionWrong = hasAnswered && !isQuestionCorrect;

          const colorClass = isQuestionCorrect
            ? "border-emerald-500 bg-emerald-50/40"
            : isQuestionWrong
            ? "border-red-400 bg-red-50/40"
            : "border-zinc-200";

          return (
            <article
              key={`${q.id}-${idx}`}
              className={`border rounded-lg p-4 space-y-3 transition-colors ${colorClass}`}
            >
              {/* Kopf der Frage */}
              <header className="flex justify-between gap-2">
                <div className="space-y-1">
                  <h2 className="font-semibold">
                    {q.number}. {q.id}
                  </h2>
                  <p className="text-xs text-zinc-600">
                    Bereich: {q.area} · Schwierigkeit: {q.difficulty}
                  </p>
                  {isMulti ? (
                    <p className="text-[11px] text-amber-700">
                      ⚠️ Mehrfachauswahl: Es können mehrere Antworten korrekt sein.
                    </p>
                  ) : (
                    <p className="text-[11px] text-zinc-500">
                      Single-Choice: Genau eine Antwort ist korrekt.
                    </p>
                  )}
                </div>
              </header>

              {/* Fragestellung – mit Zeilenumbrüchen */}
              <p className="whitespace-pre-line text-sm text-zinc-900">
                {q.question}
              </p>

              {/* Antwortoptionen */}
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = selected.includes(opt.key);

                  const isCorrectOpt =
                    hasAnswered && q.correctAnswers.includes(opt.key);

                  const isSelectedWrong =
                    hasAnswered &&
                    isSelected &&
                    !q.correctAnswers.includes(opt.key);

                  return (
                    <label
                      key={opt.key}
                      className={`flex items-start gap-2 rounded border p-2 text-sm cursor-pointer transition-colors ${
                        isSelected ? "border-zinc-900" : "border-zinc-200"
                      } ${
                        isCorrectOpt
                          ? "bg-emerald-50 border-emerald-500"
                          : isSelectedWrong
                          ? "bg-red-50 border-red-400"
                          : ""
                      }`}
                    >
                      <input
                        type={isMulti ? "checkbox" : "radio"}
                        name={q.id}
                        className="mt-1"
                        checked={isSelected}
                        onChange={() => handleSelect(q.id, opt.key, isMulti)}
                      />
                      <span>
                        <span className="font-mono mr-1">{opt.key})</span>
                        {opt.text}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Erklärung – direkt nach Auswahl anzeigen */}
              {hasAnswered && (
                <div className="mt-2 border-t pt-2 text-xs text-zinc-700 whitespace-pre-line">
                  <p className="font-semibold mb-1">Erklärung:</p>
                  <p>{q.explanationDe}</p>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
