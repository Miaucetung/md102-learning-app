// src/app/page.tsx
"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  ChevronRight,
  Clock,
  Cloud,
  Globe,
  HelpCircle,
  Monitor,
  Network,
  Play,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";

// Certification data
const certifications = [
  {
    id: "md-102",
    title: "MD-102",
    subtitle: "Endpoint Administrator",
    description:
      "Verwalte Windows-Geräte mit Intune, Autopilot und Microsoft 365. Lerne Compliance, App-Bereitstellung und Sicherheitsrichtlinien.",
    icon: Monitor,
    color: "from-blue-500 to-blue-700",
    bgGlow: "bg-blue-500/20",
    topics: 8,
    labs: 12,
    estimatedHours: 40,
    tracks: [
      { name: "Device Enrollment", progress: 0 },
      { name: "Autopilot", progress: 0 },
      { name: "Compliance Policies", progress: 0 },
      { name: "App Deployment", progress: 0 },
    ],
  },
  {
    id: "ms-102",
    title: "MS-102",
    subtitle: "Microsoft 365 Administrator",
    description:
      "Konfiguriere Microsoft 365 Tenants, Identitäten und Sicherheit. Meistere Exchange Online, SharePoint und Teams Administration.",
    icon: Cloud,
    color: "from-purple-500 to-purple-700",
    bgGlow: "bg-purple-500/20",
    topics: 10,
    labs: 15,
    estimatedHours: 50,
    tracks: [
      { name: "Tenant Configuration", progress: 0 },
      { name: "Identity & Access", progress: 0 },
      { name: "Security & Compliance", progress: 0 },
      { name: "Microsoft Teams", progress: 0 },
    ],
  },
];

// Learning approach features
const learningFeatures = [
  {
    icon: Target,
    title: "Szenario-basiert",
    description: "Lerne durch realistische IT-Probleme aus dem Arbeitsalltag",
  },
  {
    icon: Zap,
    title: "Predict-First",
    description: "Aktiviere dein Vorwissen bevor du neue Konzepte lernst",
  },
  {
    icon: BookOpen,
    title: "Interaktive Blöcke",
    description: "10 verschiedene Lernblock-Typen für optimales Verständnis",
  },
  {
    icon: Award,
    title: "Prüfungsfokus",
    description: "Lerne typische Fallen und Formulierungen der Prüfung",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-white">
                Microsoft Learning
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Endpoint & M365 Administration
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/lab"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Alle Labs
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Werde Microsoft Certified
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Interaktive Lernplattform mit szenario-basiertem Lernen, Hands-on
            Labs und Prüfungsvorbereitung für MD-102 und MS-102
            Zertifizierungen.
          </p>
        </motion.section>

        {/* Certification Cards */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/learn/${cert.id}`}>
                <div className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl overflow-hidden">
                  {/* Background glow */}
                  <div
                    className={`absolute -top-20 -right-20 w-40 h-40 ${cert.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Header */}
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${cert.color}`}
                      >
                        <cert.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {cert.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                    {cert.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <BookOpen className="h-4 w-4" />
                      <span>{cert.topics} Themen</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <Play className="h-4 w-4" />
                      <span>{cert.labs} Labs</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>~{cert.estimatedHours}h</span>
                    </div>
                  </div>

                  {/* Tracks Preview */}
                  <div className="space-y-2">
                    {cert.tracks.map((track) => (
                      <div key={track.name} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-400">
                              {track.name}
                            </span>
                            <span className="text-gray-400">
                              {track.progress}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${cert.color} rounded-full transition-all duration-500`}
                              style={{ width: `${track.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span
                      className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${cert.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}
                    >
                      Jetzt starten
                      <ChevronRight className="h-4 w-4 text-blue-500" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Learning Approach */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Unser Lernansatz
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
              >
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg w-fit mb-3">
                  <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Resources Section - Network Essentials & Exam Practice */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Lernressourcen
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Network Essentials */}
            <Link href="/theory/network-basics">
              <div className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-xl overflow-hidden h-full">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 w-fit mb-4">
                    <Network className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Network Essentials
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Interaktive Netzwerk-Grundlagen mit modernen Diagrammen. IP,
                    DNS, NAT, VLANs und mehr.
                  </p>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Grundlagen lernen
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* MD-102 Exam Practice */}
            <Link href="/lab-md102-exam">
              <div className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl overflow-hidden h-full">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 w-fit mb-4">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    MD-102 Prüfungsfragen
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Übe mit Original-Stil Prüfungsfragen für Endpoint
                    Administrator.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Fragen üben
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* MS-102 Exam Practice */}
            <Link href="/lab-ms102-exam">
              <div className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-xl overflow-hidden h-full">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 w-fit mb-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    MS-102 Prüfungsfragen
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Übe mit Original-Stil Prüfungsfragen für M365 Administrator.
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Fragen üben
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.section>

        {/* Quick Start */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-3">Bereit durchzustarten?</h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Wähle deine Zertifizierung und beginne mit dem ersten Modul. Keine
            Vorkenntnisse erforderlich - wir führen dich Schritt für Schritt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn/md-102"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              <Monitor className="h-5 w-5" />
              MD-102 starten
            </Link>
            <Link
              href="/learn/ms-102"
              className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
            >
              <Cloud className="h-5 w-5" />
              MS-102 starten
            </Link>
          </div>
        </motion.section>

        {/* Legacy Labs Access */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Suchst du die klassischen Labs?{" "}
            <Link
              href="/lab"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Zur Lab-Übersicht
            </Link>
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Microsoft Learning Platform - MD-102 & MS-102 Prüfungsvorbereitung
          </p>
          <p className="mt-1">
            Designed for{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Umschüler & IT-Einsteiger
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
