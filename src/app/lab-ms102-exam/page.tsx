"use client";
import { QUESTIONS_MS102 } from "@/app/ms102/data/questions";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PageHeader } from "@/components/layout";
import { Markdown } from "@/components/ui/Markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type QuestionType = (typeof QUESTIONS_MS102)[number];

function QuestionCard({
  question: q,
  index,
}: {
  question: QuestionType;
  index: number;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const { isEnglish } = useLanguage();

  const isAnswered = !!selected;
  const isCorrectSingle =
    isAnswered &&
    q.correctAnswers.length === 1 &&
    q.correctAnswers[0] === selected;

  // Get language-specific content (questions are English, explanations German)
  const questionText = q.question;
  const options = q.options;
  const explanation = q.explanationDe ?? "";

  return (
    <article
      className={`rounded-xl border overflow-hidden shadow-sm transition ${
        isAnswered && !isCorrectSingle
          ? "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      }`}
    >
      {/* Question Header */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold text-sm">
            {index + 1}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            {q.area.split("(")[0].trim()}
          </span>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            q.difficulty === "easy"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : q.difficulty === "medium"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {q.difficulty}
        </span>
      </div>

      {/* Question Body */}
      <div className="p-5 space-y-4">
        <Markdown
          content={questionText}
          className="text-gray-900 dark:text-gray-100"
        />

        {/* Options - Clickable Radio Buttons */}
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
                "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 text-gray-900 dark:text-white";
            }

            return (
              <label key={opt.key} className={optionClass}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt.key}
                  className="h-4 w-4 accent-purple-500"
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

        {/* Explanation - shows after answering */}
        {isAnswered && (
          <div className="mt-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded font-medium text-xs">
                {isEnglish ? "Correct:" : "Richtig:"}{" "}
                {q.correctAnswers.join(", ")}
              </span>
            </div>
            <Markdown
              content={explanation}
              className="text-sm text-gray-700 dark:text-gray-300"
            />
            {q.references && q.references.length > 0 && (
              <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
                <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                  {isEnglish ? "References:" : "Referenzen:"}
                </div>
                {q.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-blue-600 dark:text-blue-400 hover:underline truncate"
                  >
                    {ref}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Page() {
  const [showAll, setShowAll] = useState(false);
  const { isEnglish } = useLanguage();

  const displayedQuestions = showAll
    ? QUESTIONS_MS102
    : QUESTIONS_MS102.slice(0, 20);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <PageHeader
        title={isEnglish ? "MS-102 Exam Practice" : "MS-102 Prüfungssimulation"}
        subtitle="Microsoft 365 Administrator"
        icon={Award}
        iconGradient="from-purple-500 to-pink-500"
        backUrl="/learn/ms-102"
        crossLinks={[
          { label: "MS-102 Learn", href: "/learn/ms-102", variant: "primary" },
          { label: "MD-102 Exam", href: "/lab-md102-exam", variant: "default" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Bar */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {QUESTIONS_MS102.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {isEnglish ? "Questions" : "Fragen"}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                {isEnglish ? "Show less" : "Weniger anzeigen"}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                {isEnglish
                  ? `All ${QUESTIONS_MS102.length} Questions`
                  : `Alle ${QUESTIONS_MS102.length} Fragen`}
              </>
            )}
          </button>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {displayedQuestions.map((q, i) => (
            <QuestionCard key={q.id} question={q} index={i} />
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && QUESTIONS_MS102.length > 20 && (
          <div className="text-center py-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
            >
              Alle {QUESTIONS_MS102.length} Fragen laden
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
