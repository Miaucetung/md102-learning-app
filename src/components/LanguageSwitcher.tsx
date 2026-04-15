"use client";

import { Language, useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, mounted } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "de" ? "en" : "de");
  };

  // Prevent hydration mismatch - show placeholder until mounted
  if (!mounted) {
    return (
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg
                   bg-blue-100 dark:bg-blue-900
                   text-blue-700 dark:text-blue-300
                   border-2 border-blue-300 dark:border-blue-700
                   text-sm font-semibold min-w-[90px]"
        disabled
      >
        <Globe className="w-4 h-4" />
        <span>DE</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg
                 bg-blue-100 dark:bg-blue-900
                 hover:bg-blue-200 dark:hover:bg-blue-800
                 text-blue-700 dark:text-blue-300
                 border-2 border-blue-300 dark:border-blue-700
                 transition-colors text-sm font-semibold
                 shadow-sm hover:shadow-md"
      title={language === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
    >
      <Globe className="w-4 h-4" />
      <span>{language === "de" ? "🇩🇪 DE" : "🇬🇧 EN"}</span>
    </button>
  );
}

export function LanguageDropdown() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="appearance-none flex items-center gap-2 px-3 py-2 pr-8 rounded-lg
                   bg-gray-100 dark:bg-gray-800
                   hover:bg-gray-200 dark:hover:bg-gray-700
                   text-gray-700 dark:text-gray-300
                   border border-gray-200 dark:border-gray-700
                   transition-colors text-sm font-medium cursor-pointer"
      >
        <option value="de">🇩🇪 Deutsch</option>
        <option value="en">🇬🇧 English</option>
      </select>
      <Globe className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
}
