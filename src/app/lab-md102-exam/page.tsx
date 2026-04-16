"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PageHeader } from "@/components/layout";
import { Markdown } from "@/components/ui/Markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, BookOpen } from "lucide-react";
import { useState } from "react";
import { QUESTIONS_MD102 } from "./questions-md102";

export default function LabMd102ExamPage() {
  const [showAll, setShowAll] = useState(false);
  const { isEnglish } = useLanguage();
  const displayQuestions = showAll
    ? QUESTIONS_MD102
    : QUESTIONS_MD102.slice(0, 20);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <PageHeader
        title={
          isEnglish ? "MD-102 Exam Simulation" : "MD-102 Prüfungssimulation"
        }
        subtitle="Endpoint Administrator"
        icon={Award}
        iconGradient="from-blue-500 to-blue-700"
        crossLinks={[
          {
            href: "/learn/md-102",
            label: isEnglish ? "Learning Modules" : "Lernmodule",
            icon: BookOpen,
          },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language + Stats Bar */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isEnglish ? "Questions" : "Fragen"}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {QUESTIONS_MD102.length}
              </p>
            </div>
            <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isEnglish ? "Displayed" : "Angezeigt"}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {displayQuestions.length}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {showAll
              ? isEnglish
                ? "Show less"
                : "Weniger anzeigen"
              : isEnglish
                ? "Show all"
                : "Alle anzeigen"}
          </button>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {displayQuestions.map((q) => (
            <QuestionCard
              key={`${q.id ?? `Q${q.number}`}-${q.number}`}
              question={q}
            />
          ))}
        </div>

        {!showAll && QUESTIONS_MD102.length > 20 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
            >
              {isEnglish
                ? `Load all ${QUESTIONS_MD102.length} questions`
                : `Alle ${QUESTIONS_MD102.length} Fragen laden`}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

type QuestionProps = {
  question: (typeof QUESTIONS_MD102)[number];
};

function QuestionCard({ question: q }: QuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const { isEnglish } = useLanguage();

  const isAnswered = !!selected;
  const isCorrectSingle =
    isAnswered &&
    q.correctAnswers.length === 1 &&
    q.correctAnswers[0] === selected;

  // Use existing content (questions are in English, explanations in German)
  const questionText = q.question;
  const options = q.options;
  const explanation = q.explanation ?? q.explanationDe ?? "";

  return (
    <article
      className={`rounded-xl border p-5 space-y-4 transition shadow-sm ${
        isAnswered && !isCorrectSingle
          ? "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20"
          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      }`}
    >
      {/* Header */}
      <div className="text-xs text-gray-500 dark:text-gray-400 font-mono flex items-center gap-2">
        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
          {q.number}
        </span>
        <span>{q.area}</span>
        <span>·</span>
        <span
          className={`uppercase ${
            q.difficulty === "hard"
              ? "text-red-600 dark:text-red-400"
              : q.difficulty === "medium"
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-green-600 dark:text-green-400"
          }`}
        >
          {q.difficulty}
        </span>
      </div>

      {/* Question */}
      <Markdown
        content={questionText}
        className="text-sm leading-relaxed text-gray-900 dark:text-white"
      />

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = selected === opt.key;
          const isCorrectOption = q.correctAnswers.includes(opt.key);

          let optionClass =
            "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm cursor-pointer transition ";

          if (isAnswered) {
            if (isCorrectOption) {
              optionClass +=
                "border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
            } else if (isSelected) {
              optionClass +=
                "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300";
            } else {
              optionClass +=
                "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400";
            }
          } else {
            optionClass +=
              "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 text-gray-900 dark:text-white";
          }

          return (
            <label key={opt.key} className={optionClass}>
              <input
                type="radio"
                name={q.id}
                value={opt.key}
                className="h-4 w-4 accent-blue-500"
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

      {/* Explanation */}
      {isAnswered && (
        <div className="mt-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 text-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded font-medium text-xs">
              {isEnglish ? "Correct:" : "Richtig:"}{" "}
              {q.correctAnswers.join(", ")}
            </span>
          </div>

          <Markdown
            content={explanation}
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
          />

          {q.references && q.references.length > 0 && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                {isEnglish ? "References:" : "Referenzen:"}
              </p>
              <ul className="list-disc pl-5 text-xs text-gray-500 dark:text-gray-400">
                {q.references.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
