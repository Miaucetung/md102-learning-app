"use client";

import { useState } from "react";
import { QUESTIONS_MD102 } from "./questions-md102"; // <- WICHTIG: geschweifte Klammern

export default function LabMd102ExamPage() {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">MD-102 – Multiple-Choice-Test</h1>
        <p className="text-sm text-zinc-600">
          Übungsfragen mit Lösungen und Erklärungen — basierend auf deiner
          eigenen MD-102-Sammlung.
        </p>
      </header>

      <div className="space-y-6">
        {QUESTIONS_MD102.map((q) => (
          <QuestionCard key={`${q.id}-${q.number}`} question={q} />
        ))}
      </div>
    </main>
  );
}

type QuestionProps = {
  question: (typeof QUESTIONS_MD102)[number];
};

function QuestionCard({ question: q }: QuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const isAnswered = !!selected;
  const isCorrectSingle =
    isAnswered &&
    q.correctAnswers.length === 1 &&
    q.correctAnswers[0] === selected;

  const cardBase =
    "rounded-xl border p-5 bg-white space-y-4 transition shadow-sm";
  const cardClass =
    isAnswered && !isCorrectSingle
      ? cardBase + " border-rose-300 bg-rose-50"
      : cardBase + " border-zinc-200";

  return (
    <article className={cardClass}>
      {/* Kopfzeile */}
      <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
        <span>
          {q.number}. {q.id}
        </span>
        <span>·</span>
        <span>{q.area}</span>
        <span>·</span>
        <span className="uppercase">{q.difficulty}</span>
      </div>

      {/* Frage */}
      <div className="whitespace-pre-line text-sm leading-relaxed">
        {q.question}
      </div>

      {/* Optionen */}
      <div className="space-y-2">
        {q.options.map((opt) => {
          const isSelected = selected === opt.key;
          const isCorrectOption = q.correctAnswers.includes(opt.key);

          let optionClass =
            "flex items-center gap-3 rounded border px-3 py-2 text-sm cursor-pointer transition bg-white border-zinc-200 hover:border-emerald-400";

          if (isAnswered) {
            if (isCorrectOption) {
              optionClass =
                "flex items-center gap-3 rounded border px-3 py-2 text-sm cursor-pointer transition border-emerald-500 bg-emerald-50";
            }
            if (isSelected && !isCorrectOption) {
              optionClass =
                "flex items-center gap-3 rounded border px-3 py-2 text-sm cursor-pointer transition border-rose-400 bg-rose-50";
            }
          }

          return (
            <label key={opt.key} className={optionClass}>
              <input
                type="radio"
                name={q.id}
                value={opt.key}
                className="h-4 w-4"
                checked={isSelected}
                onChange={() => setSelected(opt.key)}
              />
              <div>
                <span className="font-semibold mr-1">{opt.key})</span>
                <span>{opt.text}</span>
              </div>
            </label>
          );
        })}
      </div>

      {/* Lösung / Erklärung */}
      {isAnswered && (
        <div className="mt-3 rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-sm space-y-2">
          <div>
            <span className="font-semibold">Richtige Antwort(en): </span>
            <span>{q.correctAnswers.join(", ")}</span>
          </div>

          <div className="whitespace-pre-line text-[13px] leading-relaxed">
            {q.explanation}
          </div>

          {q.references && q.references.length > 0 && (
            <ul className="list-disc pl-5 text-xs text-zinc-500">
              {q.references.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
