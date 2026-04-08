"use client";
import { QUESTIONS_MS102 } from "@/app/ms102/data/questions";
import { PageHeader } from "@/components/layout";
import { Award, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [showAll, setShowAll] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(
    new Set(),
  );

  const displayedQuestions = showAll
    ? QUESTIONS_MS102
    : QUESTIONS_MS102.slice(0, 20);

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <PageHeader
        title="MS-102 Exam Practice"
        subtitle="Microsoft 365 Administrator - Prüfungsvorbereitung"
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
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {QUESTIONS_MS102.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Fragen
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {revealedAnswers.size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Beantwortet
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
                Weniger anzeigen
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Alle {QUESTIONS_MS102.length} Fragen
              </>
            )}
          </button>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {displayedQuestions.map((q, i) => (
            <div
              key={q.id}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm"
            >
              {/* Question Header */}
              <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold text-sm">
                    {i + 1}
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
                <p className="whitespace-pre-line text-gray-900 dark:text-gray-100">
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isCorrect = q.correctAnswers.includes(opt.key);
                    const isRevealed = revealedAnswers.has(q.id);

                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-lg border transition-colors ${
                          isRevealed && isCorrect
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600"
                        }`}
                      >
                        <span
                          className={`font-semibold ${
                            isRevealed && isCorrect
                              ? "text-green-700 dark:text-green-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {opt.key})
                        </span>{" "}
                        <span className="text-gray-800 dark:text-gray-200">
                          {opt.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Reveal Button */}
                <button
                  onClick={() => toggleAnswer(q.id)}
                  className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  {revealedAnswers.has(q.id) ? (
                    <>
                      <EyeOff className="w-4 h-4" /> Antwort verstecken
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" /> Antwort anzeigen
                    </>
                  )}
                </button>

                {/* Explanation */}
                {revealedAnswers.has(q.id) && (
                  <div className="mt-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                    <div className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
                      Erklärung:
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {q.explanationDe}
                    </p>
                    {q.references && q.references.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
                        <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                          Referenzen:
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
            </div>
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
