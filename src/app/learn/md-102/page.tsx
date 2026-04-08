"use client";

import {
  LearningObjectives,
  ModuleCard,
  NextSteps,
  PageHeader,
  Prerequisites,
  Section,
} from "@/components/layout";
import { md102LearningModules } from "@/content/md102";
import { motion } from "framer-motion";
import { Award, BookOpen, Monitor, Target } from "lucide-react";

export default function MD102LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <PageHeader
        title="MD-102"
        subtitle="Endpoint Administrator"
        icon={Monitor}
        iconGradient="from-blue-500 to-blue-700"
        crossLinks={[
          {
            href: "/lab-md102-exam",
            label: "Prüfungsfragen",
            icon: Target,
            variant: "primary",
          },
          {
            href: "/learn/ms-102",
            label: "MS-102",
            icon: Award,
          },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            MD-102 Lernpfad
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Werde Microsoft 365 Certified: Endpoint Administrator Associate.
            Lerne Geräte mit Intune zu verwalten, Autopilot zu konfigurieren und
            Sicherheitsrichtlinien zu implementieren.
          </p>
        </motion.section>

        {/* Learning Objectives */}
        <LearningObjectives
          objectives={[
            "Windows-Geräte mit Microsoft Intune registrieren und verwalten",
            "Windows Autopilot für Zero-Touch Deployment konfigurieren",
            "Compliance Policies und Configuration Profiles erstellen",
            "Apps über Intune bereitstellen und aktualisieren",
            "Security Baselines und Endpoint Security implementieren",
            "Windows Update Rings konfigurieren",
          ]}
          estimatedMinutes={480}
          difficulty="intermediate"
          examRelevance="critical"
        />

        {/* Prerequisites */}
        <Prerequisites
          required={[
            { title: "Grundlegendes IT-Wissen", completed: true },
            { title: "Windows 10/11 Grundkenntnisse", completed: true },
          ]}
          recommended={[
            {
              title: "Netzwerk-Grundlagen",
              href: "/theory/network-basics",
            },
            {
              title: "Azure AD / Entra ID Basics",
              href: "/learn/ms-102/tenant-management",
            },
          ]}
        />

        {/* Learning Modules */}
        <Section
          title="Lernmodule"
          description="Arbeite die Module der Reihe nach durch für optimales Lernen"
        >
          <div className="grid gap-4">
            {md102LearningModules.map((module, index) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                description={
                  (module.realWorldProblem || "").slice(0, 150) + "..."
                }
                href={`/learn/md-102/${module.slug}`}
                icon={BookOpen}
                iconColor="from-blue-500 to-blue-600"
                estimatedMinutes={module.estimatedMinutes}
                difficulty={
                  module.difficulty as "beginner" | "intermediate" | "advanced"
                }
                blockCount={module.blocks?.length}
                examRelevance={index < 3 ? "high" : "medium"}
                index={index}
              />
            ))}
          </div>
        </Section>

        {/* Next Steps */}
        <NextSteps
          examLink={{
            title: "MD-102 Prüfungssimulation",
            href: "/lab-md102-exam",
            questionCount: 65,
          }}
          relatedModules={[
            {
              title: "Netzwerk-Grundlagen",
              href: "/theory/network-basics",
              type: "theory",
            },
            {
              title: "Praktische Labs",
              href: "/lab-md102",
              type: "lab",
            },
            {
              title: "MS-102 Lernpfad",
              href: "/learn/ms-102",
              type: "learn",
            },
          ]}
        />
      </main>
    </div>
  );
}
