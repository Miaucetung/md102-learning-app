"use client";

/**
 * StickyNav - Sticky section navigation for long pages
 * Shows current section and allows quick jumps
 */

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface StickyNavProps {
  sections: Section[];
  className?: string;
}

export function StickyNav({ sections, className = "" }: StickyNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`sticky top-20 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {section.icon}
              <span>{section.label}</span>
              {idx < sections.length - 1 && (
                <ChevronRight className="h-3 w-3 text-gray-400 ml-1 hidden sm:block" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// PROGRESS STEPPER - Visual progress through module sections
// ============================================================================

interface StepperProps {
  steps: Array<{
    id: string;
    label: string;
    isCompleted?: boolean;
    isCurrent?: boolean;
  }>;
  onStepClick?: (stepId: string) => void;
}

export function ProgressStepper({ steps, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-4 px-1">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => onStepClick?.(step.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              step.isCurrent
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                : step.isCompleted
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                step.isCompleted
                  ? "bg-green-500 text-white"
                  : step.isCurrent
                    ? "bg-white text-blue-500"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
              }`}
            >
              {step.isCompleted ? "✓" : idx + 1}
            </span>
            <span className="hidden sm:inline whitespace-nowrap">
              {step.label}
            </span>
          </button>

          {idx < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 mx-1 ${
                step.isCompleted
                  ? "bg-green-500"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
