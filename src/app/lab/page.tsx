"use client";

import { PageHeader, Section } from "@/components/layout";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Cloud,
  Code,
  Database,
  FlaskConical,
  Globe,
  Monitor,
  Network,
  Server,
} from "lucide-react";
import Link from "next/link";

interface LabCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  category: "infrastructure" | "exam" | "theory" | "practice";
}

function LabCard({
  href,
  title,
  description,
  icon: Icon,
  iconColor,
  category,
}: LabCardProps) {
  const categoryColors = {
    infrastructure: "border-l-blue-500",
    exam: "border-l-purple-500",
    theory: "border-l-emerald-500",
    practice: "border-l-orange-500",
  };

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className={`group relative bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 border-l-4 ${categoryColors[category]} hover:shadow-lg transition-all duration-300`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${iconColor} shrink-0`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function LabHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <PageHeader
        title="Labs & Prüfungen"
        subtitle="Hands-on Übungen und Prüfungsvorbereitung"
        icon={FlaskConical}
        iconGradient="from-indigo-500 to-purple-500"
        backUrl="/"
        crossLinks={[
          { label: "MD-102 Lernen", href: "/learn/md-102", variant: "primary" },
          { label: "MS-102 Lernen", href: "/learn/ms-102" },
        ]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Infrastructure Labs */}
        <Section
          title="Infrastruktur Labs"
          description="Baue deine eigene Lab-Umgebung auf"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <LabCard
              href="/lab-hyperv"
              title="Hyper-V Infrastruktur"
              description="vSwitch, Templates, DC01 - Grundlage für alle weiteren Labs"
              icon={Server}
              iconColor="from-blue-500 to-blue-600"
              category="infrastructure"
            />
            <LabCard
              href="/lab-addns"
              title="AD / DNS / DHCP"
              description="Forest mainlab.local, DHCP-Scopes, Organisationseinheiten"
              icon={Database}
              iconColor="from-cyan-500 to-blue-500"
              category="infrastructure"
            />
            <LabCard
              href="/lab-intune"
              title="Entra / Intune"
              description="Dev-Tenant, Entra Connect (PHS), Device Enrollment"
              icon={Cloud}
              iconColor="from-purple-500 to-indigo-500"
              category="infrastructure"
            />
            <LabCard
              href="/lab-md102"
              title="MD-102 Lab"
              description="Enrollment, Policies, Apps, Windows Update for Business"
              icon={Monitor}
              iconColor="from-blue-600 to-blue-700"
              category="infrastructure"
            />
          </div>
        </Section>

        {/* Exam Practice */}
        <Section
          title="Prüfungsvorbereitung"
          description="Multiple-Choice Tests mit detaillierten Erklärungen"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <LabCard
              href="/lab-md102-exam"
              title="MD-102 Exam"
              description="Endpoint Administrator - Prüfungsfragen mit Erklärungen"
              icon={Award}
              iconColor="from-blue-500 to-blue-700"
              category="exam"
            />
            <LabCard
              href="/lab-ms102-exam"
              title="MS-102 Exam"
              description="Microsoft 365 Administrator - Prüfungsfragen"
              icon={Award}
              iconColor="from-purple-500 to-purple-700"
              category="exam"
            />
            <LabCard
              href="/lab-az104-exam"
              title="AZ-104 Exam"
              description="Azure Administrator - Prüfungsfragen"
              icon={Award}
              iconColor="from-sky-500 to-sky-700"
              category="exam"
            />
          </div>
        </Section>

        {/* Theory & Practice */}
        <Section
          title="Theorie & Praxis"
          description="Lernmodule und praktische Übungen"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <LabCard
              href="/theory/network-basics"
              title="Network Essentials"
              description="IP, NAT, VLAN, DNS, Subnetting - Interaktive Diagramme"
              icon={Network}
              iconColor="from-emerald-500 to-teal-500"
              category="theory"
            />
            <LabCard
              href="/lab-powershell"
              title="PowerShell Labs"
              description="Übe mit echten Tenant- und AD-Befehlen"
              icon={Code}
              iconColor="from-orange-500 to-amber-500"
              category="practice"
            />
          </div>
        </Section>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4">
          <Link
            href="/learn/md-102"
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            MD-102 Lernpfad
          </Link>
          <Link
            href="/learn/ms-102"
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            MS-102 Lernpfad
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-500/10 border border-gray-500/20 text-gray-600 dark:text-gray-400 hover:bg-gray-500/20 transition-colors"
          >
            <Globe className="w-5 h-5" />
            Startseite
          </Link>
        </div>
      </main>
    </div>
  );
}
