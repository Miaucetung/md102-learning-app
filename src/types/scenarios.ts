// ============================================================================
// Enterprise IT Training Platform - Core Types
// ============================================================================
// These types define the structure of the B2B scenario-based training platform.
// Focused on real-world Microsoft 365 admin simulations.
// ============================================================================

// ----------------------------------------------------------------------------
// Scenario Categories (MS-102 / MD-102 Focus)
// ----------------------------------------------------------------------------

export type ScenarioCategory =
  | "identity-access" // Entra ID, Users, Groups
  | "conditional-access" // CA Policies, MFA, Named Locations
  | "defender" // Microsoft Defender, Security Incidents
  | "exchange" // Exchange Online, Mail Flow
  | "intune" // Device Compliance, App Protection
  | "tenant-admin"; // Governance, Domains, Subscriptions

export type ScenarioDifficulty = "beginner" | "intermediate" | "advanced";

export type SubscriptionTier = "free" | "premium" | "enterprise";

// ----------------------------------------------------------------------------
// Tenant Environment Simulation
// ----------------------------------------------------------------------------

export interface TenantEnvironment {
  readonly name: string; // e.g., "Contoso Ltd."
  readonly domain: string; // e.g., "contoso.onmicrosoft.com"
  readonly customDomain?: string; // e.g., "contoso.com"
  readonly userCount: number;
  readonly licenseType: "Business Basic" | "Business Premium" | "E3" | "E5";
  readonly region: string;
  readonly existingPolicies: ExistingPolicy[];
  readonly existingUsers: SimulatedUser[];
  readonly existingGroups: SimulatedGroup[];
  readonly existingDevices: SimulatedDevice[];
}

export interface ExistingPolicy {
  readonly id: string;
  readonly name: string;
  readonly type:
    | "conditional-access"
    | "compliance"
    | "configuration"
    | "app-protection";
  readonly status: "enabled" | "disabled" | "report-only";
  readonly description: string;
}

export interface SimulatedUser {
  readonly id: string;
  readonly displayName: string;
  readonly upn: string;
  readonly role: "admin" | "user" | "guest";
  readonly department?: string;
  readonly location?: string;
  readonly licenses: string[];
  readonly mfaStatus: "enabled" | "disabled" | "enforced";
  readonly deviceCount: number;
}

export interface SimulatedGroup {
  readonly id: string;
  readonly name: string;
  readonly type: "security" | "m365" | "distribution" | "dynamic";
  readonly memberCount: number;
  readonly description: string;
}

export interface SimulatedDevice {
  readonly id: string;
  readonly name: string;
  readonly type: "windows" | "macos" | "ios" | "android";
  readonly complianceStatus: "compliant" | "non-compliant" | "unknown";
  readonly owner: string;
  readonly enrollmentType: "corporate" | "personal" | "byod";
}

// ----------------------------------------------------------------------------
// Scenario Context & Problem
// ----------------------------------------------------------------------------

export interface ScenarioContext {
  /** Real enterprise situation description */
  readonly situation: string;
  /** The actual problem or incident */
  readonly problem: string;
  /** What the user is expected to achieve */
  readonly objective: string;
  /** Time pressure or urgency (optional) */
  readonly urgency?: "low" | "medium" | "high" | "critical";
  /** Stakeholders involved */
  readonly stakeholders: Stakeholder[];
}

export interface Stakeholder {
  readonly name: string;
  readonly role: string;
  readonly concern: string;
}

// ----------------------------------------------------------------------------
// Decision Points & Consequences
// ----------------------------------------------------------------------------

export interface DecisionPoint {
  readonly id: string;
  readonly order: number;
  readonly question: string;
  readonly context?: string;
  readonly options: DecisionOption[];
  readonly hints?: string[];
  /** Time limit in seconds (optional) */
  readonly timeLimit?: number;
}

export interface DecisionOption {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  /** Technical action this represents */
  readonly action: string;
  /** Is this the optimal choice? */
  readonly isOptimal: boolean;
  /** Partial credit (0-100) */
  readonly score: number;
  /** The consequence ID to show */
  readonly consequenceId: string;
  /** Next decision point (or null for end) */
  readonly nextDecisionId: string | null;
}

export interface Consequence {
  readonly id: string;
  readonly type: "success" | "partial" | "failure" | "disaster";
  readonly title: string;
  /** What happened as a result */
  readonly outcome: string;
  /** Impact on the organization */
  readonly businessImpact: string;
  /** Technical explanation of why */
  readonly technicalReason: string;
  /** Visual feedback (terminal output, screenshot, etc.) */
  readonly visualization?: ConsequenceVisualization;
}

export interface ConsequenceVisualization {
  readonly type: "terminal" | "screenshot" | "diagram" | "log";
  readonly content: string;
  readonly caption?: string;
}

// ----------------------------------------------------------------------------
// Solution Path & Explanation
// ----------------------------------------------------------------------------

export interface SolutionStep {
  readonly order: number;
  readonly title: string;
  readonly description: string;
  /** Portal navigation path */
  readonly navigation?: string[];
  /** PowerShell/CLI command */
  readonly command?: {
    readonly type: "powershell" | "cli" | "graph-api";
    readonly code: string;
    readonly output?: string;
  };
  /** Screenshot reference */
  readonly screenshot?: string;
  /** Warning/caution */
  readonly warning?: string;
  /** Pro tip */
  readonly tip?: string;
}

export interface TechnicalExplanation {
  /** Why this solution works */
  readonly why: string;
  /** How it works under the hood */
  readonly how: string;
  /** Deep dive into the technology */
  readonly deepDive: string;
  /** Common misconceptions */
  readonly misconceptions: string[];
  /** Related Microsoft documentation */
  readonly references: DocumentationReference[];
}

export interface DocumentationReference {
  readonly title: string;
  readonly url: string;
  readonly type: "learn" | "docs" | "blog" | "video";
}

// ----------------------------------------------------------------------------
// Complete Enterprise Scenario
// ----------------------------------------------------------------------------

export interface EnterpriseScenario {
  /** Unique identifier */
  readonly id: string;
  /** URL-friendly slug */
  readonly slug: string;
  /** Display title */
  readonly title: string;
  /** Brief description */
  readonly description: string;

  // Classification
  readonly category: ScenarioCategory;
  readonly subcategory?: string;
  readonly difficulty: ScenarioDifficulty;
  readonly tier: SubscriptionTier;

  // Time & Prerequisites
  readonly estimatedMinutes: number;
  readonly prerequisites: string[];
  readonly skillTags: string[];

  // Scenario Content
  readonly environment: TenantEnvironment;
  readonly context: ScenarioContext;
  readonly decisionPoints: DecisionPoint[];
  readonly consequences: Record<string, Consequence>;
  readonly solutionPath: SolutionStep[];
  readonly explanation: TechnicalExplanation;

  // Related Content
  readonly relatedScenarios: string[];
  readonly chainedScenarios?: ChainedScenario[];

  // Metadata
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly version: string;
  readonly author?: string;
}

export interface ChainedScenario {
  readonly scenarioId: string;
  readonly triggerCondition: string;
  readonly description: string;
}

// ----------------------------------------------------------------------------
// Scenario Category Configuration
// ----------------------------------------------------------------------------

export interface ScenarioCategoryConfig {
  readonly id: ScenarioCategory;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly color: string;
  readonly subcategories: {
    readonly id: string;
    readonly title: string;
    readonly description: string;
  }[];
}

export const SCENARIO_CATEGORIES: ScenarioCategoryConfig[] = [
  {
    id: "identity-access",
    title: "Identity & Access Management",
    description:
      "User provisioning, group management, and access control in Entra ID",
    icon: "Users",
    color: "#3b82f6",
    subcategories: [
      {
        id: "user-lifecycle",
        title: "User Lifecycle",
        description: "Onboarding, offboarding, and user management",
      },
      {
        id: "group-management",
        title: "Group Management",
        description: "Security groups, M365 groups, dynamic membership",
      },
      {
        id: "guest-access",
        title: "Guest Access",
        description: "B2B collaboration and external user management",
      },
      {
        id: "identity-governance",
        title: "Identity Governance",
        description: "Access reviews, entitlement management, PIM",
      },
    ],
  },
  {
    id: "conditional-access",
    title: "Conditional Access & MFA",
    description:
      "Zero Trust security policies, authentication methods, and risk-based access",
    icon: "Shield",
    color: "#8b5cf6",
    subcategories: [
      {
        id: "ca-policies",
        title: "Policy Design",
        description: "Creating and troubleshooting Conditional Access policies",
      },
      {
        id: "mfa-config",
        title: "MFA Configuration",
        description: "Authentication methods and MFA enforcement",
      },
      {
        id: "named-locations",
        title: "Named Locations",
        description: "Trusted networks and location-based policies",
      },
      {
        id: "risk-policies",
        title: "Risk-Based Policies",
        description: "Sign-in risk and user risk policies",
      },
    ],
  },
  {
    id: "defender",
    title: "Microsoft Defender",
    description:
      "Security incident response, threat detection, and protection policies",
    icon: "ShieldAlert",
    color: "#ef4444",
    subcategories: [
      {
        id: "incident-response",
        title: "Incident Response",
        description: "Investigating and remediating security incidents",
      },
      {
        id: "threat-protection",
        title: "Threat Protection",
        description: "Safe links, safe attachments, anti-phishing",
      },
      {
        id: "endpoint-security",
        title: "Endpoint Security",
        description: "Defender for Endpoint policies and alerts",
      },
      {
        id: "compliance-alerts",
        title: "Compliance Alerts",
        description: "DLP alerts and compliance policy violations",
      },
    ],
  },
  {
    id: "exchange",
    title: "Exchange Online",
    description:
      "Mail flow troubleshooting, transport rules, and mailbox management",
    icon: "Mail",
    color: "#0ea5e9",
    subcategories: [
      {
        id: "mail-flow",
        title: "Mail Flow Issues",
        description: "Troubleshooting email delivery problems",
      },
      {
        id: "transport-rules",
        title: "Transport Rules",
        description: "Mail flow rules and connectors",
      },
      {
        id: "mailbox-management",
        title: "Mailbox Management",
        description: "Shared mailboxes, permissions, delegation",
      },
      {
        id: "retention-ediscovery",
        title: "Retention & eDiscovery",
        description: "Legal hold, retention policies, content search",
      },
    ],
  },
  {
    id: "intune",
    title: "Intune & Device Management",
    description:
      "Device compliance, app deployment, and endpoint configuration",
    icon: "Smartphone",
    color: "#22c55e",
    subcategories: [
      {
        id: "device-compliance",
        title: "Device Compliance",
        description: "Compliance policies and non-compliant device handling",
      },
      {
        id: "device-enrollment",
        title: "Device Enrollment",
        description: "Autopilot, enrollment restrictions, profile assignment",
      },
      {
        id: "app-deployment",
        title: "App Deployment",
        description: "Application deployment and management",
      },
      {
        id: "configuration-profiles",
        title: "Configuration Profiles",
        description: "Device configuration and settings management",
      },
    ],
  },
  {
    id: "tenant-admin",
    title: "Tenant Administration",
    description:
      "Domain management, licensing, governance, and organizational settings",
    icon: "Building",
    color: "#f59e0b",
    subcategories: [
      {
        id: "domain-management",
        title: "Domain Management",
        description: "Custom domains, DNS configuration, federation",
      },
      {
        id: "licensing",
        title: "License Management",
        description: "License assignment, optimization, and reporting",
      },
      {
        id: "governance",
        title: "Governance & Settings",
        description: "Organizational settings, external sharing, policies",
      },
      {
        id: "hybrid-config",
        title: "Hybrid Configuration",
        description: "Azure AD Connect, hybrid identity scenarios",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// User Progress & Analytics Types
// ----------------------------------------------------------------------------

export interface ScenarioAttempt {
  readonly id: string;
  readonly scenarioId: string;
  readonly userId: string;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly decisions: AttemptDecision[];
  readonly score: number;
  readonly maxScore: number;
  readonly timeSpentSeconds: number;
  readonly status: "in-progress" | "completed" | "abandoned";
}

export interface AttemptDecision {
  readonly decisionPointId: string;
  readonly selectedOptionId: string;
  readonly isOptimal: boolean;
  readonly score: number;
  readonly timeSpentSeconds: number;
  readonly timestamp: string;
}

export interface UserSkillProfile {
  readonly userId: string;
  readonly skills: Record<string, SkillLevel>;
  readonly totalScenariosCompleted: number;
  readonly totalTimeSpentMinutes: number;
  readonly lastActivityAt: string;
  readonly streak: number;
  readonly achievements: Achievement[];
}

export interface SkillLevel {
  readonly category: ScenarioCategory;
  readonly level: number; // 0-100
  readonly scenariosCompleted: number;
  readonly averageScore: number;
  readonly strongAreas: string[];
  readonly improvementAreas: string[];
}

export interface Achievement {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly unlockedAt: string;
  readonly icon: string;
}
