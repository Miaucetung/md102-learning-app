"use client";

import { useLanguage } from "@/contexts/LanguageContext";

type QuestionWithTranslations = {
  question: string;
  questionEn?: string;
  options: { key: string; text: string }[];
  optionsEn?: { key: string; text: string }[];
  explanationDe?: string;
  explanationEn?: string;
  explanation?: string;
};

/**
 * Hook to get the correct language version of question content
 */
export function useBilingualQuestion<T extends QuestionWithTranslations>(
  question: T,
) {
  const { isEnglish } = useLanguage();

  return {
    // Get question text in current language
    questionText:
      isEnglish && question.questionEn
        ? question.questionEn
        : question.question,

    // Get options in current language
    options:
      isEnglish && question.optionsEn ? question.optionsEn : question.options,

    // Get explanation in current language
    explanation:
      isEnglish && question.explanationEn
        ? question.explanationEn
        : question.explanationDe || question.explanation || "",

    // Original for reference
    original: question,
  };
}

/**
 * Utility to get text in current language
 */
export function useLocalizedText() {
  const { isEnglish } = useLanguage();

  return {
    getText: (de: string, en?: string) => (isEnglish && en ? en : de),
    isEnglish,
  };
}
