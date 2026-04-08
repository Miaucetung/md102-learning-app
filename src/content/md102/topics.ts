// ============================================================================
// MD-102 Certification Topics & Tracks
// ============================================================================
// Microsoft Endpoint Administrator (MD-102)
// Exam Weight Distribution and Learning Tracks
// ============================================================================

import type { Certification, Topic, Track } from "../types";

// ============================================================================
// MD-102 TRACKS (Learning Paths)
// ============================================================================

export const md102Tracks: Track[] = [
  {
    id: "md102-fundamentals",
    title: "Grundlagen",
    description:
      "Windows Client-Grundlagen und Intune-Einführung für Einsteiger",
    icon: "📚",
    color: "#3b82f6",
    order: 1,
    topics: ["windows-basics", "intune-intro"],
    estimatedHours: 6,
    difficulty: "beginner",
  },
  {
    id: "md102-deployment",
    title: "Windows Deployment",
    description:
      "Windows installieren und bereitstellen mit Autopilot und anderen Methoden",
    icon: "💻",
    color: "#8b5cf6",
    order: 2,
    topics: ["windows-deployment", "autopilot", "usmt"],
    estimatedHours: 10,
    difficulty: "intermediate",
  },
  {
    id: "md102-identity",
    title: "Identität & Compliance",
    description:
      "Entra ID Integration, Device Enrollment und Compliance Policies",
    icon: "🔐",
    color: "#6366f1",
    order: 3,
    topics: ["entra-integration", "device-enrollment", "compliance"],
    estimatedHours: 8,
    difficulty: "intermediate",
  },
  {
    id: "md102-device-management",
    title: "Geräteverwaltung",
    description:
      "Device Configuration, Update Management und Endpoint Security",
    icon: "⚙️",
    color: "#10b981",
    order: 4,
    topics: ["device-config", "update-management", "endpoint-security"],
    estimatedHours: 12,
    difficulty: "intermediate",
  },
  {
    id: "md102-security",
    title: "Sicherheit",
    description: "Microsoft Defender, Threat Protection und Security Baselines",
    icon: "🛡️",
    color: "#ef4444",
    order: 5,
    topics: ["defender-endpoint", "security-baselines", "threat-protection"],
    estimatedHours: 10,
    difficulty: "advanced",
  },
  {
    id: "md102-applications",
    title: "Anwendungen",
    description: "App Deployment, App Protection Policies und Microsoft Store",
    icon: "📦",
    color: "#f59e0b",
    order: 6,
    topics: ["app-deployment", "app-protection", "microsoft-store"],
    estimatedHours: 8,
    difficulty: "intermediate",
  },
];

// ============================================================================
// MD-102 TOPICS
// ============================================================================

export const md102Topics: Topic[] = [
  // =========================================================================
  // DEPLOYMENT TOPICS (15-20%)
  // =========================================================================
  {
    id: "windows-deployment",
    title: "Windows Deployment Methoden",
    description:
      "Verschiedene Methoden zur Windows-Bereitstellung verstehen und anwenden",
    icon: "💻",
    color: "#8b5cf6",
    bgColor: "bg-purple-500/10",
    weight: "15-20%",
    estimatedTime: "4 Stunden",
    totalLessons: 5,
    completedLessons: 0,
    track: "md102-deployment",
    subtopics: [
      {
        id: "deployment-overview",
        title: "Deployment-Methoden Übersicht",
        description:
          "Vergleich von In-Place Upgrade, Clean Install, und anderen Methoden",
        completed: false,
        keyPoints: [
          "In-Place Upgrade behält Apps, Einstellungen und Dateien",
          "Clean Install erfordert Neuinstallation aller Anwendungen",
          "Windows Autopilot ist die moderne Cloud-basierte Methode",
          "MDT und SCCM für traditionelle Enterprise-Szenarien",
        ],
      },
      {
        id: "in-place-upgrade",
        title: "In-Place Upgrade",
        description: "Upgrade von älteren Windows-Versionen auf Windows 11",
        completed: false,
        keyPoints: [
          "Setup.exe von ISO ausführen",
          "Kompatibilitätsprüfung vor dem Upgrade",
          "Rollback-Option für 10 Tage verfügbar",
        ],
      },
    ],
  },
  {
    id: "autopilot",
    title: "Windows Autopilot",
    description: "Zero-Touch Deployment mit Windows Autopilot konfigurieren",
    icon: "🚀",
    color: "#0ea5e9",
    bgColor: "bg-cyan-500/10",
    weight: "15-20%",
    estimatedTime: "5 Stunden",
    totalLessons: 6,
    completedLessons: 0,
    track: "md102-deployment",
    subtopics: [
      {
        id: "autopilot-overview",
        title: "Autopilot Grundlagen",
        description: "Was ist Autopilot und wie funktioniert es?",
        completed: false,
        keyPoints: [
          "Cloud-basiertes Deployment ohne Imaging",
          "Geräte werden direkt vom OEM registriert",
          "Hardware Hash identifiziert das Gerät eindeutig",
        ],
      },
      {
        id: "autopilot-profiles",
        title: "Deployment Profile",
        description: "User-driven vs Self-deploying Mode konfigurieren",
        completed: false,
        keyPoints: [
          "User-driven: Benutzer meldet sich während Setup an",
          "Self-deploying: Vollautomatisch ohne Benutzerinteraktion",
          "Pre-provisioning: IT richtet Gerät vor aus",
        ],
      },
      {
        id: "autopilot-enrollment",
        title: "Device Registration",
        description: "Geräte bei Autopilot registrieren",
        completed: false,
        keyPoints: [
          "CSV-Import über Intune Admin Center",
          "OEM-Registrierung durch Partner",
          "Hardware Hash mit PowerShell extrahieren",
        ],
      },
    ],
  },
  // =========================================================================
  // IDENTITY & COMPLIANCE TOPICS (15-20%)
  // =========================================================================
  {
    id: "device-enrollment",
    title: "Device Enrollment",
    description: "Geräte in Microsoft Intune registrieren",
    icon: "📱",
    color: "#6366f1",
    bgColor: "bg-indigo-500/10",
    weight: "15-20%",
    estimatedTime: "4 Stunden",
    totalLessons: 5,
    completedLessons: 0,
    track: "md102-identity",
    subtopics: [
      {
        id: "enrollment-methods",
        title: "Enrollment-Methoden",
        description: "BYOD, Corporate, und Autopilot Enrollment verstehen",
        completed: false,
        keyPoints: [
          "BYOD: Benutzer registriert persönliches Gerät selbst",
          "Corporate: IT-verwaltete Geräte mit voller Kontrolle",
          "Automatic Enrollment über Azure AD Join",
        ],
      },
      {
        id: "enrollment-restrictions",
        title: "Enrollment Restrictions",
        description: "Plattformen und Gerätetypen einschränken",
        completed: false,
        keyPoints: [
          "Platform Restrictions: Windows, iOS, Android erlauben/blockieren",
          "Device Limit: Maximale Geräte pro Benutzer",
          "Corporate Restrictions: Nur verwaltete Geräte zulassen",
        ],
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance Policies",
    description: "Gerätecompliance definieren und durchsetzen",
    icon: "✅",
    color: "#10b981",
    bgColor: "bg-emerald-500/10",
    weight: "15-20%",
    estimatedTime: "5 Stunden",
    totalLessons: 6,
    completedLessons: 0,
    track: "md102-identity",
    subtopics: [
      {
        id: "compliance-overview",
        title: "Compliance Grundlagen",
        description: "Was ist Gerätecompliance und wozu dient sie?",
        completed: false,
        keyPoints: [
          "Compliance = Gerät erfüllt Sicherheitsanforderungen",
          "Non-compliant Geräte können blockiert werden",
          "Integration mit Conditional Access",
        ],
      },
      {
        id: "compliance-policies",
        title: "Compliance Policies erstellen",
        description: "Regeln für Windows, iOS und Android definieren",
        completed: false,
        keyPoints: [
          "Minimum OS Version erzwingen",
          "BitLocker-Verschlüsselung fordern",
          "Antivirus und Firewall aktiviert verlangen",
        ],
      },
    ],
  },
  // =========================================================================
  // DEVICE MANAGEMENT TOPICS (40-45%)
  // =========================================================================
  {
    id: "device-config",
    title: "Device Configuration",
    description: "Gerätekonfiguration mit Intune Policies",
    icon: "⚙️",
    color: "#10b981",
    bgColor: "bg-emerald-500/10",
    weight: "40-45%",
    estimatedTime: "6 Stunden",
    totalLessons: 8,
    completedLessons: 0,
    track: "md102-device-management",
    subtopics: [
      {
        id: "config-profiles",
        title: "Configuration Profiles",
        description: "Geräteeinstellungen zentral verwalten",
        completed: false,
        keyPoints: [
          "Templates: Vordefinierte Einstellungskategorien",
          "Settings Catalog: Granulare Einzeleinstellungen",
          "Administrative Templates: GPO-ähnliche ADMX-Settings",
        ],
      },
      {
        id: "settings-catalog",
        title: "Settings Catalog",
        description: "Der moderne Ansatz für Gerätekonfiguration",
        completed: false,
        keyPoints: [
          "Tausende individuelle Einstellungen",
          "Durchsuchbar und filterbar",
          "Ersetzt schrittweise alte Profile-Typen",
        ],
      },
    ],
  },
  {
    id: "update-management",
    title: "Update Management",
    description: "Windows Updates mit Intune verwalten",
    icon: "🔄",
    color: "#3b82f6",
    bgColor: "bg-blue-500/10",
    weight: "40-45%",
    estimatedTime: "4 Stunden",
    totalLessons: 5,
    completedLessons: 0,
    track: "md102-device-management",
    subtopics: [
      {
        id: "update-rings",
        title: "Update Rings",
        description: "Windows Update for Business Ringe konfigurieren",
        completed: false,
        keyPoints: [
          "Deferral: Updates verzögern (Quality 0-30 Tage, Feature 0-365 Tage)",
          "Deadline: Updates nach X Tagen erzwingen",
          "Active Hours: Keine Neustarts während Arbeitszeit",
        ],
      },
      {
        id: "feature-updates",
        title: "Feature Update Policies",
        description: "Windows 11 Feature Updates ausrollen",
        completed: false,
        keyPoints: [
          "Spezifische Windows-Version festlegen",
          "Rollout-Plan mit Ringen erstellen",
          "Safeguard Holds beachten",
        ],
      },
    ],
  },
  // =========================================================================
  // APPLICATION MANAGEMENT TOPICS (15-20%)
  // =========================================================================
  {
    id: "app-deployment",
    title: "App Deployment",
    description: "Anwendungen mit Intune bereitstellen",
    icon: "📦",
    color: "#f59e0b",
    bgColor: "bg-amber-500/10",
    weight: "15-20%",
    estimatedTime: "5 Stunden",
    totalLessons: 6,
    completedLessons: 0,
    track: "md102-applications",
    subtopics: [
      {
        id: "app-types",
        title: "App-Typen",
        description: "LOB, Store, Web Apps und Win32 Apps verstehen",
        completed: false,
        keyPoints: [
          "Microsoft Store Apps: Moderne UWP/MSIX Apps",
          "Win32 Apps: Klassische EXE/MSI-Installer (als .intunewin)",
          "LOB Apps: Unternehmenseigene Apps",
          "Web Links: Verknüpfungen zu Web-Anwendungen",
        ],
      },
      {
        id: "win32-apps",
        title: "Win32 App Deployment",
        description: "Klassische Windows-Apps mit Intune verteilen",
        completed: false,
        keyPoints: [
          "IntuneWinAppUtil.exe zum Verpacken nutzen",
          "Install/Uninstall Commands definieren",
          "Detection Rules: Wie erkennt Intune, ob App installiert ist?",
        ],
      },
    ],
  },
  {
    id: "app-protection",
    title: "App Protection Policies",
    description: "MAM ohne MDM - App-Daten schützen ohne Geräteverwaltung",
    icon: "🛡️",
    color: "#ef4444",
    bgColor: "bg-red-500/10",
    weight: "15-20%",
    estimatedTime: "4 Stunden",
    totalLessons: 5,
    completedLessons: 0,
    track: "md102-applications",
    subtopics: [
      {
        id: "app-overview",
        title: "APP Grundlagen",
        description: "Was sind App Protection Policies?",
        completed: false,
        keyPoints: [
          "Schutz von Unternehmensdaten in Apps",
          "Funktioniert auch auf nicht-verwalteten Geräten (BYOD)",
          "Separiert Unternehmens- und persönliche Daten",
        ],
      },
      {
        id: "data-protection",
        title: "Data Protection Settings",
        description: "Copy/Paste, Save As und Backup einschränken",
        completed: false,
        keyPoints: [
          "Prevent Backup: Keine iCloud/iTunes-Sicherung von App-Daten",
          "Restrict Copy/Paste: Kein Kopieren in unmanaged Apps",
          "Encryption: App-Daten verschlüsseln",
        ],
      },
    ],
  },
];

// ============================================================================
// MD-102 CERTIFICATION
// ============================================================================

export const md102Certification: Certification = {
  id: "md102",
  name: "MD-102",
  fullName: "Microsoft 365 Certified: Endpoint Administrator Associate",
  description:
    "Verwalte Identitäten, Geräte, Apps und Datenschutz mit Microsoft Intune und Endpoint Manager",
  color: "#0078D4",
  bgGradient: "from-[#0078D4] to-[#00BCF2]",
  icon: "💻",
  passingScore: 700,
  totalQuestions: 40,
  examDuration: "100 Minuten",
  tracks: md102Tracks,
  topics: md102Topics,
};
