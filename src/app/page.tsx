// src/app/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  ChevronRight,
  Cloud,
  Code,
  GraduationCap,
  Monitor,
  Network,
  Server,
  Shield,
  Terminal,
} from "lucide-react";
import Link from "next/link";

// ============================================================================
// DATA
// ============================================================================

const labItems = [
  {
    name: "Hyper-V Infrastruktur",
    description: "vSwitch, Templates, DC01 – Grundlage für alle Labs",
    href: "/lab-hyperv",
    icon: Server,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    steps: 10,
  },
  {
    name: "AD / DNS / DHCP",
    description: "Forest, DNS-Zonen, DHCP-Scopes, OUs konfigurieren",
    href: "/lab-addns",
    icon: Network,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    steps: 12,
  },
  {
    name: "Intune & Entra",
    description: "Dev-Tenant, Entra Connect, Device Enrollment",
    href: "/lab-intune",
    icon: Cloud,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    steps: 12,
  },
  {
    name: "PowerShell",
    description: "AD- und Tenant-Befehle interaktiv üben",
    href: "/lab-powershell",
    icon: Terminal,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    steps: 6,
  },
  {
    name: "MD-102 Lab",
    description: "Enrollment, Policies, Apps, Windows Update",
    href: "/lab-md102",
    icon: Monitor,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    steps: 8,
  },
];

const examItems = [
  {
    name: "MD-102 Prüfung",
    description: "Endpoint Administrator – Multiple-Choice mit Erklärungen",
    href: "/lab-md102-exam",
    icon: Award,
    gradient: "from-blue-500 to-blue-700",
    badge: "MD-102",
  },
  {
    name: "MS-102 Prüfung",
    description: "Microsoft 365 Administrator – Prüfungsfragen",
    href: "/lab-ms102-exam",
    icon: Award,
    gradient: "from-purple-500 to-purple-700",
    badge: "MS-102",
  },
  {
    name: "AZ-104 Prüfung",
    description: "Azure Administrator – Prüfungsfragen",
    href: "/lab-az104-exam",
    icon: Award,
    gradient: "from-sky-500 to-indigo-600",
    badge: "AZ-104",
  },
];

const learnItems = [
  {
    name: "MD-102 Lernpfad",
    description: "Endpoint Administrator – Alle Module Schritt für Schritt",
    href: "/learn/md-102",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500",
    badge: "8 Module",
  },
  {
    name: "MS-102 Lernpfad",
    description:
      "Microsoft 365 Administrator – Alle Module Schritt für Schritt",
    href: "/learn/ms-102",
    icon: BookOpen,
    gradient: "from-purple-500 to-pink-500",
    badge: "10 Module",
  },
  {
    name: "Netzwerk-Grundlagen",
    description: "IP, DNS, NAT, VLANs, Subnetting – Interaktive Diagramme",
    href: "/theory/network-basics",
    icon: Code,
    gradient: "from-emerald-500 to-teal-500",
    badge: "Theorie",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

function SectionHeader({
  title,
  description,
  gradient,
}: {
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="mb-4">
      <h2
        className={`text-lg font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
      >
        {title}
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}

function LabCard({
  item,
}: {
  item: {
    name: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    steps: number;
  };
}) {
  const Icon = item.icon;
  return (
    <Link href={item.href}>
      <motion.div
        whileHover={{ scale: 1.01, y: -2 }}
        className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all"
      >
        <div
          className={`p-2.5 rounded-xl ${item.bgColor} ${item.color} shrink-0`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-zinc-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.name}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {item.description}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {item.steps} Steps
          </span>
          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      </motion.div>
    </Link>
  );
}

function BigCard({
  item,
}: {
  item: {
    name: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    badge: string;
  };
}) {
  const Icon = item.icon;
  return (
    <Link href={item.href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -3 }}
        className="group relative bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl transition-all overflow-hidden h-full"
      >
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`}
        />
        <div className="flex items-start justify-between mb-3">
          <div
            className={`p-2.5 rounded-xl bg-gradient-to-br ${item.gradient}`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {item.badge}
          </span>
        </div>
        <h3 className="font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
          {item.description}
        </p>
        <div className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
          Öffnen
          <ChevronRight className="w-4 h-4" />
        </div>
      </motion.div>
    </Link>
  );
}

// ============================================================================
// PAGE
// ============================================================================

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0xMHY2aC02VjI0aDZ6bTAtMTB2Nmgt NlYxNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="relative flex items-center gap-5">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Shield className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Microsoft Learning Platform
              </h1>
              <p className="text-blue-100 mt-1">
                Labs, Prüfungsvorbereitung & Lernpfade für MD-102, MS-102 &
                AZ-104
              </p>
            </div>
          </div>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Server className="w-4 h-4" />
              Alle Labs
            </Link>
            <Link
              href="/learn/md-102"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              MD-102 Lernen
            </Link>
            <Link
              href="/learn/ms-102"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              MS-102 Lernen
            </Link>
          </div>
        </motion.div>

        {/* Labs Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <SectionHeader
            title="Hands-On Labs"
            description="Schritt-für-Schritt Server- und Cloud-Umgebungen aufbauen"
            gradient="from-blue-500 to-cyan-500"
          />
          <div className="space-y-2">
            {labItems.map((item) => (
              <LabCard key={item.href} item={item} />
            ))}
          </div>
        </motion.section>

        {/* Exams Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <SectionHeader
            title="Prüfungsvorbereitung"
            description="Multiple-Choice Tests mit detaillierten Erklärungen"
            gradient="from-purple-500 to-pink-500"
          />
          <div className="grid sm:grid-cols-3 gap-4">
            {examItems.map((item) => (
              <BigCard key={item.href} item={item} />
            ))}
          </div>
        </motion.section>

        {/* Learn Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <SectionHeader
            title="Lernpfade & Theorie"
            description="Strukturierte Module mit interaktiven Lernblöcken"
            gradient="from-emerald-500 to-teal-500"
          />
          <div className="grid sm:grid-cols-3 gap-4">
            {learnItems.map((item) => (
              <BigCard key={item.href} item={item} />
            ))}
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Labs", value: "5", icon: Server, color: "text-blue-500" },
            {
              label: "Prüfungen",
              value: "3",
              icon: GraduationCap,
              color: "text-purple-500",
            },
            {
              label: "Lernmodule",
              value: "18+",
              icon: BookOpen,
              color: "text-emerald-500",
            },
            {
              label: "Lab-Steps",
              value: "48+",
              icon: Monitor,
              color: "text-amber-500",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 text-center"
              >
                <Icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.section>
      </main>
    </div>
  );
}
