/**
 * Learning Paths Configuration
 * Defines thematic learning paths with modules, prerequisites, and progress tracking
 */

export type PathId = "md-102" | "ms-102" | "network-fundamentals";

export interface PathStep {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "theory" | "learn" | "lab" | "exam";
  estimatedMinutes: number;
  isOptional?: boolean;
  examWeight?: number; // 0-100, how much this topic appears in exam
}

export interface LearningPath {
  id: PathId;
  title: string;
  subtitle: string;
  description: string;
  color: string; // Tailwind gradient classes
  icon: string; // Icon name for dynamic rendering
  totalHours: number;
  certification?: string;
  steps: PathStep[];
}

// ============================================================================
// LEARNING PATHS DEFINITIONS
// ============================================================================

export const learningPaths: LearningPath[] = [
  {
    id: "network-fundamentals",
    title: "Netzwerk-Grundlagen",
    subtitle: "Basis für alle Microsoft-Zertifizierungen",
    description:
      "Verstehe die Grundlagen von IP-Adressen, Subnetting, DNS, NAT und VLANs. Diese Kenntnisse sind essentiell für MD-102 und MS-102.",
    color: "from-indigo-500 to-purple-600",
    icon: "Network",
    totalHours: 8,
    steps: [
      {
        id: "net-basics",
        title: "Network Essentials",
        description: "IP-Adressen, Subnetting, DNS, NAT interaktiv erklärt",
        href: "/theory/network-basics",
        type: "theory",
        estimatedMinutes: 90,
        examWeight: 15,
      },
      {
        id: "net-azure",
        title: "Azure Networking Basics",
        description: "VNets, Subnets, NSGs für die Cloud",
        href: "/theory/network-basics?tab=azure",
        type: "theory",
        estimatedMinutes: 45,
        examWeight: 10,
        isOptional: true,
      },
    ],
  },
  {
    id: "md-102",
    title: "MD-102",
    subtitle: "Endpoint Administrator",
    description:
      "Verwalte Windows-Geräte mit Microsoft Intune. Lerne Autopilot, Compliance Policies, App Deployment und Security Baselines.",
    color: "from-blue-500 to-blue-700",
    icon: "Monitor",
    totalHours: 40,
    certification: "Microsoft 365 Certified: Endpoint Administrator Associate",
    steps: [
      {
        id: "md102-prereq",
        title: "Netzwerk-Grundlagen",
        description: "IP, DNS, Subnetting - Basis für Intune",
        href: "/theory/network-basics",
        type: "theory",
        estimatedMinutes: 60,
        examWeight: 5,
        isOptional: true,
      },
      {
        id: "md102-enrollment",
        title: "Device Enrollment",
        description: "Geräte in Intune registrieren",
        href: "/learn/md-102/device-enrollment",
        type: "learn",
        estimatedMinutes: 45,
        examWeight: 15,
      },
      {
        id: "md102-autopilot",
        title: "Windows Autopilot",
        description: "Zero-Touch Deployment meistern",
        href: "/learn/md-102/autopilot",
        type: "learn",
        estimatedMinutes: 50,
        examWeight: 20,
      },
      {
        id: "md102-compliance",
        title: "Compliance Policies",
        description: "Gerätecompliance definieren und überwachen",
        href: "/learn/md-102/compliance-policies",
        type: "learn",
        estimatedMinutes: 40,
        examWeight: 15,
      },
      {
        id: "md102-config",
        title: "Device Configuration",
        description: "Konfigurationsprofile erstellen",
        href: "/learn/md-102/device-configuration",
        type: "learn",
        estimatedMinutes: 50,
        examWeight: 15,
      },
      {
        id: "md102-apps",
        title: "App Deployment",
        description: "Apps bereitstellen und verwalten",
        href: "/learn/md-102/app-deployment",
        type: "learn",
        estimatedMinutes: 45,
        examWeight: 15,
      },
      {
        id: "md102-security",
        title: "Security Baselines",
        description: "Sicherheitsrichtlinien implementieren",
        href: "/learn/md-102/security-baselines",
        type: "learn",
        estimatedMinutes: 55,
        examWeight: 10,
      },
      {
        id: "md102-updates",
        title: "Update Management",
        description: "Windows Updates steuern",
        href: "/learn/md-102/update-management",
        type: "learn",
        estimatedMinutes: 45,
        examWeight: 5,
      },
      {
        id: "md102-lab",
        title: "Hands-on Labs",
        description: "Praktische Übungen durchführen",
        href: "/lab-md102",
        type: "lab",
        estimatedMinutes: 120,
        isOptional: true,
      },
      {
        id: "md102-exam",
        title: "Prüfungssimulation",
        description: "Teste dein Wissen mit echten Prüfungsfragen",
        href: "/lab-md102-exam",
        type: "exam",
        estimatedMinutes: 90,
      },
    ],
  },
  {
    id: "ms-102",
    title: "MS-102",
    subtitle: "Microsoft 365 Administrator",
    description:
      "Konfiguriere Microsoft 365 Tenants, verwalte Identitäten und implementiere Sicherheit für Exchange, SharePoint und Teams.",
    color: "from-purple-500 to-purple-700",
    icon: "Cloud",
    totalHours: 50,
    certification: "Microsoft 365 Certified: Administrator Expert",
    steps: [
      {
        id: "ms102-prereq",
        title: "Netzwerk-Grundlagen",
        description: "DNS, IP - Basis für M365",
        href: "/theory/network-basics",
        type: "theory",
        estimatedMinutes: 60,
        examWeight: 5,
        isOptional: true,
      },
      {
        id: "ms102-tenant",
        title: "Tenant Management",
        description: "Microsoft 365 Tenant konfigurieren",
        href: "/learn/ms-102/tenant-management",
        type: "learn",
        estimatedMinutes: 50,
        examWeight: 15,
      },
      {
        id: "ms102-users",
        title: "User & License Management",
        description: "Benutzer und Lizenzen verwalten",
        href: "/learn/ms-102/user-management",
        type: "learn",
        estimatedMinutes: 50,
        examWeight: 15,
      },
      {
        id: "ms102-security",
        title: "Entra ID Security",
        description: "Conditional Access und MFA implementieren",
        href: "/learn/ms-102/entra-security",
        type: "learn",
        estimatedMinutes: 60,
        examWeight: 25,
      },
      {
        id: "ms102-exam",
        title: "Prüfungssimulation",
        description: "MS-102 Prüfungsfragen",
        href: "/lab-ms102-exam",
        type: "exam",
        estimatedMinutes: 90,
      },
    ],
  },
];

// ============================================================================
// CROSS-LINKS CONFIGURATION
// ============================================================================

export interface CrossLink {
  from: string; // Module slug or page path
  to: Array<{
    href: string;
    title: string;
    type: "prerequisite" | "related" | "next" | "exam";
    description?: string;
  }>;
}

export const crossLinks: CrossLink[] = [
  {
    from: "autopilot",
    to: [
      {
        href: "/learn/md-102/device-enrollment",
        title: "Device Enrollment",
        type: "prerequisite",
        description: "Grundlagen der Geräteregistrierung",
      },
      {
        href: "/learn/md-102/device-configuration",
        title: "Device Configuration",
        type: "next",
        description: "Geräte nach Enrollment konfigurieren",
      },
      {
        href: "/lab-md102-exam",
        title: "Prüfungsfragen zu Autopilot",
        type: "exam",
      },
    ],
  },
  {
    from: "device-enrollment",
    to: [
      {
        href: "/theory/network-basics",
        title: "Netzwerk-Grundlagen",
        type: "prerequisite",
      },
      {
        href: "/learn/md-102/autopilot",
        title: "Windows Autopilot",
        type: "next",
      },
    ],
  },
  {
    from: "compliance-policies",
    to: [
      {
        href: "/learn/md-102/device-enrollment",
        title: "Device Enrollment",
        type: "prerequisite",
      },
      {
        href: "/learn/md-102/security-baselines",
        title: "Security Baselines",
        type: "related",
      },
    ],
  },
  {
    from: "entra-security",
    to: [
      {
        href: "/learn/ms-102/user-management",
        title: "User & License Management",
        type: "prerequisite",
      },
      {
        href: "/lab-ms102-exam",
        title: "MS-102 Prüfungssimulation",
        type: "exam",
      },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getPathById(id: PathId): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id);
}

export function getCrossLinksFor(moduleSlug: string): CrossLink["to"] {
  const link = crossLinks.find((c) => c.from === moduleSlug);
  return link?.to ?? [];
}

export function getNextStep(
  pathId: PathId,
  currentStepId: string,
): PathStep | undefined {
  const path = getPathById(pathId);
  if (!path) return undefined;

  const currentIndex = path.steps.findIndex((s) => s.id === currentStepId);
  if (currentIndex === -1 || currentIndex >= path.steps.length - 1)
    return undefined;

  return path.steps[currentIndex + 1];
}

export function calculatePathProgress(
  pathId: PathId,
  completedStepIds: string[],
): number {
  const path = getPathById(pathId);
  if (!path) return 0;

  const requiredSteps = path.steps.filter((s) => !s.isOptional);
  const completedRequired = requiredSteps.filter((s) =>
    completedStepIds.includes(s.id),
  );

  return Math.round((completedRequired.length / requiredSteps.length) * 100);
}
