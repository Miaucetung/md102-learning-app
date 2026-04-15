"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Language = "de" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isGerman: boolean;
  isEnglish: boolean;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// UI Translations
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.exams": "Prüfungen",
    "nav.lab": "Labor",
    "nav.learn": "Lernen",
    "nav.settings": "Einstellungen",

    // Quiz Page
    "quiz.question": "Frage",
    "quiz.of": "von",
    "quiz.check": "Überprüfen",
    "quiz.next": "Nächste Frage",
    "quiz.previous": "Vorherige",
    "quiz.finish": "Beenden",
    "quiz.correct": "Richtig!",
    "quiz.incorrect": "Falsch!",
    "quiz.correctAnswer": "Richtige Antwort",
    "quiz.yourAnswer": "Deine Antwort",
    "quiz.explanation": "Erklärung",
    "quiz.references": "Referenzen",
    "quiz.score": "Ergebnis",
    "quiz.passed": "Bestanden!",
    "quiz.failed": "Nicht bestanden",
    "quiz.tryAgain": "Erneut versuchen",
    "quiz.selectAnswer": "Bitte wähle eine Antwort",
    "quiz.startExam": "Prüfung starten",
    "quiz.examMode": "Prüfungsmodus",
    "quiz.practiceMode": "Übungsmodus",
    "quiz.timeRemaining": "Verbleibende Zeit",
    "quiz.questionsAnswered": "Fragen beantwortet",
    "quiz.flagQuestion": "Frage markieren",
    "quiz.unflagQuestion": "Markierung entfernen",
    "quiz.flagged": "Markiert",
    "quiz.review": "Überprüfen",
    "quiz.submit": "Abgeben",
    "quiz.confirmSubmit":
      "Bist du sicher, dass du die Prüfung abgeben möchtest?",
    "quiz.resultsTitle": "Prüfungsergebnis",
    "quiz.correctAnswers": "Richtige Antworten",
    "quiz.incorrectAnswers": "Falsche Antworten",
    "quiz.passingScore": "Bestehensgrenze",
    "quiz.yourScore": "Dein Ergebnis",

    // Question Types
    "qtype.standard": "Standard",
    "qtype.diagram": "Diagramm",
    "qtype.terminal": "Terminal",
    "qtype.lab": "Labor-Szenario",
    "qtype.drag-drop": "Drag & Drop",
    "qtype.hotspot": "Hotspot",

    // Difficulty
    "difficulty.easy": "Einfach",
    "difficulty.medium": "Mittel",
    "difficulty.hard": "Schwer",

    // Common
    "common.loading": "Lädt...",
    "common.error": "Fehler",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.close": "Schließen",
    "common.back": "Zurück",
    "common.continue": "Weiter",
    "common.yes": "Ja",
    "common.no": "Nein",
    "common.language": "Sprache",
    "common.german": "Deutsch",
    "common.english": "Englisch",

    // Exam Areas MS-102
    "area.ms102.security":
      "Sicherheit und Bedrohungen managen mit Microsoft Defender XDR",
    "area.ms102.identity":
      "Microsoft Entra Identität implementieren und verwalten",
    "area.ms102.tenant": "Microsoft 365 Tenant bereitstellen und verwalten",
    "area.ms102.access": "Identität und Zugriff in Microsoft 365 verwalten",

    // Exam Areas MD-102
    "area.md102.deploy": "Windows-Client bereitstellen",
    "area.md102.manage": "Geräte verwalten",
    "area.md102.protect": "Geräte schützen",
    "area.md102.apps": "Anwendungen verwalten",

    // Scenario
    "scenario.title": "Szenario",
    "scenario.company": "Unternehmen",
    "scenario.requirements": "Anforderungen",
    "scenario.environment": "Umgebung",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.exams": "Exams",
    "nav.lab": "Lab",
    "nav.learn": "Learn",
    "nav.settings": "Settings",

    // Quiz Page
    "quiz.question": "Question",
    "quiz.of": "of",
    "quiz.check": "Check",
    "quiz.next": "Next Question",
    "quiz.previous": "Previous",
    "quiz.finish": "Finish",
    "quiz.correct": "Correct!",
    "quiz.incorrect": "Incorrect!",
    "quiz.correctAnswer": "Correct Answer",
    "quiz.yourAnswer": "Your Answer",
    "quiz.explanation": "Explanation",
    "quiz.references": "References",
    "quiz.score": "Score",
    "quiz.passed": "Passed!",
    "quiz.failed": "Failed",
    "quiz.tryAgain": "Try Again",
    "quiz.selectAnswer": "Please select an answer",
    "quiz.startExam": "Start Exam",
    "quiz.examMode": "Exam Mode",
    "quiz.practiceMode": "Practice Mode",
    "quiz.timeRemaining": "Time Remaining",
    "quiz.questionsAnswered": "Questions Answered",
    "quiz.flagQuestion": "Flag Question",
    "quiz.unflagQuestion": "Unflag Question",
    "quiz.flagged": "Flagged",
    "quiz.review": "Review",
    "quiz.submit": "Submit",
    "quiz.confirmSubmit": "Are you sure you want to submit the exam?",
    "quiz.resultsTitle": "Exam Results",
    "quiz.correctAnswers": "Correct Answers",
    "quiz.incorrectAnswers": "Incorrect Answers",
    "quiz.passingScore": "Passing Score",
    "quiz.yourScore": "Your Score",

    // Question Types
    "qtype.standard": "Standard",
    "qtype.diagram": "Diagram",
    "qtype.terminal": "Terminal",
    "qtype.lab": "Lab Scenario",
    "qtype.drag-drop": "Drag & Drop",
    "qtype.hotspot": "Hotspot",

    // Difficulty
    "difficulty.easy": "Easy",
    "difficulty.medium": "Medium",
    "difficulty.hard": "Hard",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.back": "Back",
    "common.continue": "Continue",
    "common.yes": "Yes",
    "common.no": "No",
    "common.language": "Language",
    "common.german": "German",
    "common.english": "English",

    // Exam Areas MS-102
    "area.ms102.security":
      "Manage security and threats using Microsoft Defender XDR",
    "area.ms102.identity": "Implement and manage Microsoft Entra identity",
    "area.ms102.tenant": "Deploy and manage a Microsoft 365 tenant",
    "area.ms102.access": "Manage identity and access in Microsoft 365",

    // Exam Areas MD-102
    "area.md102.deploy": "Deploy Windows client",
    "area.md102.manage": "Manage devices",
    "area.md102.protect": "Protect devices",
    "area.md102.apps": "Manage applications",

    // Scenario
    "scenario.title": "Scenario",
    "scenario.company": "Company",
    "scenario.requirements": "Requirements",
    "scenario.environment": "Environment",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted to prevent hydration mismatch
    setMounted(true);
    // Load saved language from localStorage
    const saved = localStorage.getItem("app-language") as Language;
    if (saved && (saved === "de" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isGerman: language === "de",
    isEnglish: language === "en",
    mounted,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Hook for question content
export function useQuestionText(
  questionDe: string,
  questionEn?: string,
): string {
  const { isEnglish } = useLanguage();
  return isEnglish && questionEn ? questionEn : questionDe;
}
