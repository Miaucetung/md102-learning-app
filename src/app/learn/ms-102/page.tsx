"use client";

import {
  LearningObjectives,
  ModuleCard,
  NextSteps,
  PageHeader,
  Prerequisites,
  Section,
} from "@/components/layout";
import { ms102LearningModules } from "@/content/ms102";
import { motion } from "framer-motion";
import { BookOpen, Cloud, Monitor, Target } from "lucide-react";

export default function MS102LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <PageHeader
        title="MS-102"
        subtitle="Microsoft 365 Administrator"
        icon={Cloud}
        iconGradient="from-purple-500 to-purple-700"
        crossLinks={[
          {
            href: "/lab-ms102-exam",
            label: "Prüfungsfragen",
            icon: Target,
            variant: "accent",
          },
          {
            href: "/learn/md-102",
            label: "MD-102",
            icon: Monitor,
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
            MS-102 Lernpfad
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Werde Microsoft 365 Certified: Administrator Expert. Verwalte
            Microsoft 365 Tenants, konfiguriere Sicherheit mit Conditional
            Access und meistere Identitätsmanagement.
          </p>
        </motion.section>

        {/* Learning Objectives */}
        <LearningObjectives
          objectives={[
            "Microsoft 365 Tenants planen und konfigurieren",
            "Benutzer, Gruppen und Lizenzen effizient verwalten",
            "Conditional Access Policies implementieren",
            "MFA und Identity Protection konfigurieren",
            "Exchange Online und SharePoint administrieren",
            "Compliance und Security Center nutzen",
          ]}
          estimatedMinutes={600}
          difficulty="advanced"
          examRelevance="critical"
        />

        {/* Prerequisites */}
        <Prerequisites
          required={[
            { title: "Grundlegendes IT-Wissen", completed: true },
            { title: "Microsoft 365 Basics", completed: true },
          ]}
          recommended={[
            {
              title: "Netzwerk-Grundlagen (DNS, IP)",
              href: "/theory/network-basics",
            },
            {
              title: "MD-102 Endpoint Administration",
              href: "/learn/md-102",
            },
          ]}
        />

        {/* Learning Modules */}
        <Section
          title="Lernmodule"
          description="Arbeite die Module der Reihe nach durch für optimales Lernen"
        >
          <div className="grid gap-4">
            {ms102LearningModules.map((module, index) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                description={
                  (module.realWorldProblem || "").slice(0, 150) + "..."
                }
                href={`/learn/ms-102/${module.slug}`}
                icon={BookOpen}
                iconColor="from-purple-500 to-purple-600"
                estimatedMinutes={module.estimatedMinutes}
                difficulty={
                  module.difficulty as "beginner" | "intermediate" | "advanced"
                }
                blockCount={module.blocks?.length}
                examRelevance={index === 2 ? "critical" : "high"}
                index={index}
              />
            ))}
          </div>
        </Section>

        {/* Next Steps */}
        <NextSteps
          examLink={{
            title: "MS-102 Prüfungssimulation",
            href: "/lab-ms102-exam",
            questionCount: 50,
          }}
          relatedModules={[
            {
              title: "Netzwerk-Grundlagen",
              href: "/theory/network-basics",
              type: "theory",
            },
            {
              title: "MD-102 Endpoint Admin",
              href: "/learn/md-102",
              type: "learn",
            },
            {
              title: "Alle MS-102 Themen",
              href: "/ms102",
              type: "learn",
            },
          ]}
        />
      </main>
    </div>
  );
}
