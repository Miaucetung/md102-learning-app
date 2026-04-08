"use client";

import type { CertificationId } from "@/content/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Cloud,
  GraduationCap,
  Home,
  Laptop,
  Layers,
  Lock,
  Settings,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

// ============================================================================
// NAVIGATION ITEMS
// ============================================================================

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Lernfortschritt", href: "/progress", icon: TrendingUp },
  { name: "Prüfungsvorbereitung", href: "/exam-prep", icon: GraduationCap },
  { name: "Statistiken", href: "/stats", icon: BarChart3 },
];

// ============================================================================
// MD-102 TRACKS
// ============================================================================

const md102Tracks = [
  {
    id: "fundamentals",
    name: "Grundlagen",
    href: "/md102/fundamentals",
    icon: BookOpen,
    weight: "15-20%",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "deployment",
    name: "Windows Deployment",
    href: "/md102/deployment",
    icon: Laptop,
    weight: "15-20%",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "identity",
    name: "Identität & Compliance",
    href: "/md102/identity",
    icon: Users,
    weight: "15-20%",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    id: "device-management",
    name: "Geräteverwaltung",
    href: "/md102/device-management",
    icon: Settings,
    weight: "40-45%",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "security",
    name: "Sicherheit",
    href: "/md102/security",
    icon: Shield,
    weight: "15-20%",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "applications",
    name: "Anwendungen",
    href: "/md102/applications",
    icon: Layers,
    weight: "15-20%",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

// ============================================================================
// MS-102 TRACKS
// ============================================================================

const ms102Tracks = [
  {
    id: "tenant",
    name: "Tenant-Verwaltung",
    href: "/ms102/tenant",
    icon: Cloud,
    weight: "25-30%",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "security-threats",
    name: "Defender XDR",
    href: "/ms102/security-threats",
    icon: Shield,
    weight: "30-35%",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "compliance",
    name: "Compliance",
    href: "/ms102/compliance",
    icon: Lock,
    weight: "20-25%",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "identity",
    name: "Entra ID",
    href: "/ms102/identity",
    icon: Users,
    weight: "15-20%",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
];

// ============================================================================
// CERTIFICATION SWITCHER
// ============================================================================

interface Certification {
  id: CertificationId;
  name: string;
  fullName: string;
  color: string;
  bgGradient: string;
}

const certifications: Certification[] = [
  {
    id: "md102",
    name: "MD-102",
    fullName: "Endpoint Administrator",
    color: "#0078D4",
    bgGradient: "from-[#0078D4] to-[#00BCF2]",
  },
  {
    id: "ms102",
    name: "MS-102",
    fullName: "Microsoft 365 Administrator",
    color: "#742774",
    bgGradient: "from-[#742774] to-[#B4009E]",
  },
];

function CertificationSwitcher({
  current,
  onSwitch,
}: {
  current: CertificationId;
  onSwitch: (id: CertificationId) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentCert = certifications.find((c) => c.id === current)!;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl font-medium transition-all bg-gradient-to-r ${currentCert.bgGradient} text-white shadow-lg hover:shadow-xl`}
      >
        <GraduationCap className="w-5 h-5" />
        <div className="flex-1 text-left">
          <div className="font-bold">{currentCert.name}</div>
          <div className="text-xs opacity-80">{currentCert.fullName}</div>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
            >
              <div className="p-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 font-medium">
                  Zertifizierung wählen
                </div>
                {certifications.map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => {
                      onSwitch(cert.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-colors ${
                      cert.id === current
                        ? `bg-gradient-to-r ${cert.bgGradient} text-white`
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-xs opacity-80">{cert.fullName}</div>
                    </div>
                    {cert.id === current && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

export function Sidebar({
  onNavigate,
  certification = "md102",
  onCertificationChange,
}: {
  onNavigate?: () => void;
  certification?: CertificationId;
  onCertificationChange?: (id: CertificationId) => void;
}) {
  const pathname = usePathname();
  const [isTracksExpanded, setIsTracksExpanded] = useState(true);
  const tracks = certification === "md102" ? md102Tracks : ms102Tracks;

  const handleCertSwitch = (id: CertificationId) => {
    if (onCertificationChange) {
      onCertificationChange(id);
    }
  };

  return (
    <motion.div
      initial={{ x: -264 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl z-50 transition-colors duration-200 flex flex-col"
    >
      {/* Premium Gradient Border */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-sky-500/20 via-blue-500/10 to-purple-500/20" />

      {/* Logo with Theme Toggle */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onNavigate}
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/25 group-hover:shadow-sky-500/40 transition-all"
            >
              <Target className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white text-lg">
                Microsoft
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Learning Platform
              </p>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Certification Switcher */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <CertificationSwitcher
          current={certification}
          onSwitch={handleCertSwitch}
        />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Primary Navigation */}
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Tracks Section */}
        <div>
          <button
            onClick={() => setIsTracksExpanded(!isTracksExpanded)}
            className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            <span>Lernpfade</span>
            {isTracksExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <AnimatePresence>
            {isTracksExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1 mt-2"
              >
                {tracks.map((track) => {
                  const Icon = track.icon;
                  const isActive = pathname.startsWith(track.href);
                  return (
                    <Link
                      key={track.id}
                      href={track.href}
                      onClick={onNavigate}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                        isActive
                          ? `${track.bgColor} ${track.color} font-medium`
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg ${track.bgColor} ${track.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm">{track.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {track.weight}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
              Lernender
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              0 XP • Level 1
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
