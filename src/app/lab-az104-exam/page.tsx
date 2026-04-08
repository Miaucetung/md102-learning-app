// src/app/lab-az104-exam/page.tsx
"use client";

import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { memo, useMemo, useState } from "react";
import { QUESTIONS_AZ104, type Az104Question } from "./data/questions-az104";

// Markdown einmal global konfigurieren
marked.setOptions({
  gfm: true, // GitHub-Flavored Markdown (Tabellen, usw.)
  breaks: true, // einfache Zeilenumbrüche respektieren
});

type Mode = "study" | "exam";

type QuestionUiState = {
  selected: string[]; // unterstützt Single- und Multi-Choice
  isCorrect: boolean | null;
  marked: boolean;
};

const buildInitialState = (): Record<string, QuestionUiState> => {
  const initial: Record<string, QuestionUiState> = {};
  for (const q of QUESTIONS_AZ104) {
    initial[q.id] = {
      selected: [],
      isCorrect: null,
      marked: false,
    };
  }
  return initial;
};

export default function LabAz104ExamPage() {
  const [mode, setMode] = useState<Mode>("study");
  const [showSolutions, setShowSolutions] = useState(false);
  const [questionState, setQuestionState] = useState<
    Record<string, QuestionUiState>
  >(() => buildInitialState());

  const totalQuestions = QUESTIONS_AZ104.length;
  const stateValues = Object.values(questionState);

  const answeredCount = stateValues.filter((s) => s.selected.length > 0).length;
  const correctCount = stateValues.filter((s) => s.isCorrect).length;

  const handleSelect = (questionId: Az104Question["id"], optionKey: string) => {
    setQuestionState((prev) => {
      const question = QUESTIONS_AZ104.find((q) => q.id === questionId);
      if (!question) return prev;

      const prevState: QuestionUiState = prev[questionId] ?? {
        selected: [],
        isCorrect: null,
        marked: false,
      };

      let nextSelected: string[];

      // Single-Choice → Radio-Verhalten
      if (question.correctAnswers.length === 1) {
        nextSelected = [optionKey];
      } else {
        // Multi-Choice → Checkbox-Toggle
        if (prevState.selected.includes(optionKey)) {
          nextSelected = prevState.selected.filter((k) => k !== optionKey);
        } else {
          nextSelected = [...prevState.selected, optionKey];
        }
      }

      // Korrektheit (Mengenvergleich)
      let isCorrect: boolean | null = null;
      if (nextSelected.length > 0) {
        const sortedSelected = [...nextSelected].sort();
        const sortedCorrect = [...question.correctAnswers].sort();
        isCorrect =
          sortedSelected.length === sortedCorrect.length &&
          sortedSelected.every((v, i) => v === sortedCorrect[i]);
      }

      return {
        ...prev,
        [questionId]: {
          ...prevState,
          selected: nextSelected,
          isCorrect,
        },
      };
    });
  };

  const handleReset = (questionId: Az104Question["id"]) => {
    setQuestionState((prev) => ({
      ...prev,
      [questionId]: {
        selected: [],
        isCorrect: null,
        marked: prev[questionId]?.marked ?? false,
      },
    }));
  };

  const handleResetAll = () => {
    setQuestionState(buildInitialState());
    setShowSolutions(false);
  };

  const handleToggleMark = (questionId: Az104Question["id"]) => {
    setQuestionState((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        marked: !prev[questionId]?.marked,
      },
    }));
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 md:px-6 py-6 space-y-6">
      {/* Kopfbereich */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">AZ-104 – Multiple-Choice-Test</h1>
        <p className="text-sm text-zinc-600">
          Übungsfragen mit Lösungen und Erklärungen — basierend auf deiner
          eigenen AZ-104-Sammlung.
        </p>
      </header>

      {/* Steuerung: Modus, Statistik, globale Aktionen */}
      <section className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Modus-Schalter */}
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Modus
            </p>
            <div className="inline-flex overflow-hidden rounded-lg border border-zinc-300 text-xs">
              <button
                type="button"
                onClick={() => handleModeChange("study")}
                className={
                  "px-3 py-1.5 " +
                  (mode === "study"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-zinc-700 hover:bg-zinc-100")
                }
              >
                Lernmodus
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("exam")}
                className={
                  "px-3 py-1.5 border-l border-zinc-300 " +
                  (mode === "exam"
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-700 hover:bg-zinc-100")
                }
              >
                Prüfungsmodus
              </button>
            </div>
          </div>

          {/* Statistik */}
          <div className="text-right space-y-1">
            <p className="text-xs font-mono text-zinc-500">
              Beantwortet: {answeredCount}/{totalQuestions}
            </p>
            <p className="text-xs font-mono text-emerald-600">
              Richtig (Single- &amp; Multi-Choice): {correctCount}
            </p>
          </div>
        </div>

        {/* Prüfungsmodus: Lösungen ein-/ausblenden */}
        {mode === "exam" && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-xs text-zinc-700">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={showSolutions}
                onChange={(e) => setShowSolutions(e.target.checked)}
              />
              <span>Lösungen und Erklärungen anzeigen</span>
            </label>

            <button
              type="button"
              onClick={handleResetAll}
              className="text-xs font-medium text-rose-600 hover:text-rose-700"
            >
              Alle Antworten zurücksetzen
            </button>
          </div>
        )}

        {mode === "study" && (
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleResetAll}
              className="text-xs font-medium text-rose-600 hover:text-rose-700"
            >
              Alle Antworten zurücksetzen
            </button>
          </div>
        )}
      </section>

      {/* Fragenliste */}
      <div className="space-y-6">
        {QUESTIONS_AZ104.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            state={questionState[q.id]}
            mode={mode}
            showSolutions={showSolutions}
            onSelect={handleSelect}
            onReset={handleReset}
            onToggleMark={handleToggleMark}
          />
        ))}
      </div>
    </main>
  );
}

type QuestionProps = {
  question: Az104Question;
  state: QuestionUiState;
  mode: Mode;
  showSolutions: boolean;
  onSelect: (questionId: Az104Question["id"], optionKey: string) => void;
  onReset: (questionId: Az104Question["id"]) => void;
  onToggleMark: (questionId: Az104Question["id"]) => void;
};

const QuestionCard = memo(function QuestionCard({
  question: q,
  state,
  mode,
  showSolutions,
  onSelect,
  onReset,
  onToggleMark,
}: QuestionProps) {
  const isAnswered = state.selected.length > 0;
  const showFeedback = isAnswered && (mode === "study" || showSolutions);
  const isMulti = q.correctAnswers.length > 1;

  const cardBase = "rounded-xl border p-5 space-y-4 transition shadow-sm";
  let cardClass = cardBase + " border-zinc-200 bg-white";

  if (showFeedback) {
    if (state.isCorrect === true) {
      cardClass = cardBase + " border-emerald-500 bg-emerald-50";
    } else if (state.isCorrect === false) {
      cardClass = cardBase + " border-rose-400 bg-rose-50";
    }
  }

  // Frage-Text (inkl. Tabellen) → Markdown → HTML → Sanitizing
  const questionHtml = useMemo(() => {
    if (!q.question) return "";
    const md = marked.parse(q.question);
    return DOMPurify.sanitize(md as string);
  }, [q.question]);

  // Erklärung → Markdown → HTML → Sanitizing
  const explanationHtml = useMemo(() => {
    if (!q.explanationDe) return "";
    const md = marked.parse(q.explanationDe);
    return DOMPurify.sanitize(md as string);
  }, [q.explanationDe]);

  return (
    <article className={cardClass}>
      {/* Kopfzeile */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            {q.number}. {q.id}
          </span>
          <span>·</span>
          <span>{q.area}</span>
          <span>·</span>
          <span className="uppercase">{q.difficulty}</span>
          {state.marked && (
            <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-800">
              Markiert
            </span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleMark(q.id)}
            className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 hover:text-amber-900"
          >
            {state.marked ? "Markierung entfernen" : "Markieren"}
          </button>
          {isAnswered && (
            <button
              type="button"
              onClick={() => onReset(q.id)}
              className="text-[10px] font-semibold uppercase tracking-wide text-rose-600 hover:text-rose-800"
            >
              Zurücksetzen
            </button>
          )}
        </div>
      </div>

      {/* Frage als gerendertes Markdown */}
      <div
        className="text-sm leading-relaxed exam-explanation markdown-table"
        dangerouslySetInnerHTML={{ __html: questionHtml }}
      />

      {/* Optionen */}
      <div className="space-y-2">
        {q.options.map((opt) => {
          const isSelected = state.selected.includes(opt.key);
          const isCorrectOption = q.correctAnswers.includes(opt.key);

          const base =
            "flex items-start gap-3 rounded border px-3 py-2 text-sm cursor-pointer transition bg-white border-zinc-200";
          let optionClass = base + " hover:border-emerald-400";

          if (isSelected && !showFeedback) {
            optionClass = base + " border-sky-400 bg-sky-50";
          }

          if (showFeedback) {
            if (isCorrectOption) {
              optionClass =
                base + " border-emerald-500 bg-emerald-50 text-emerald-900";
            }
            if (isSelected && !isCorrectOption) {
              optionClass = base + " border-rose-400 bg-rose-50 text-rose-900";
            }
          }

          return (
            <label key={opt.key} className={optionClass}>
              <input
                type={isMulti ? "checkbox" : "radio"}
                name={q.id}
                value={opt.key}
                className="mt-1 h-4 w-4"
                checked={isSelected}
                onChange={() => onSelect(q.id, opt.key)}
              />
              <div className="whitespace-pre-line">
                <span className="font-semibold mr-1">({opt.key})</span>
                <span>{opt.text}</span>
              </div>
            </label>
          );
        })}
      </div>

      {/* Lösung / Erklärung */}
      {showFeedback && (
        <div className="mt-3 rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-sm space-y-2">
          <div>
            <span className="font-semibold">Richtige Antwort(en): </span>
            <span>{q.correctAnswers.join(", ")}</span>
          </div>

          <div className="exam-explanation-wrapper">
            <div
              className="exam-explanation markdown-table"
              dangerouslySetInnerHTML={{ __html: explanationHtml }}
            />
          </div>
        </div>
      )}
    </article>
  );
});
