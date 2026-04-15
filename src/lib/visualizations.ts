/**
 * Visualization Mappings for MS-102 and MD-102 Questions
 *
 * Maps question IDs to visualization types for rendering in the UI
 * Keeps visualizations separate from question data to avoid escaping issues
 */

export type VisualizationType =
  | "conditionalAccess"
  | "mfaTrust"
  | "deviceGroups"
  | "intuneEnrollment"
  | "appProtection"
  | "certificateChain"
  | "azureAdConnect";

// Question IDs that should show specific visualizations
export const MS102_VISUALIZATIONS: Record<string, VisualizationType> = {
  // Conditional Access Flow
  Q7: "conditionalAccess",
  Q52: "conditionalAccess",
  Q62: "conditionalAccess",
  Q68: "conditionalAccess",
  Q82: "conditionalAccess",
  Q85: "conditionalAccess",
  Q110: "conditionalAccess",
  Q143: "conditionalAccess",
  Q158: "conditionalAccess",
  Q159: "conditionalAccess",
  Q175: "conditionalAccess",
  Q185: "conditionalAccess",
  Q221: "conditionalAccess",
  Q223: "conditionalAccess",
  Q259: "conditionalAccess",
  Q260: "conditionalAccess",
  Q269: "conditionalAccess",
  Q343: "conditionalAccess",

  // MFA & Trusted IPs
  Q300: "mfaTrust",
  Q301: "mfaTrust",

  // Device Groups
  Q38: "deviceGroups",
  Q57: "deviceGroups",
  Q99: "deviceGroups",
  Q109: "deviceGroups",
  Q121: "deviceGroups",

  // Azure AD Connect
  Q170: "azureAdConnect",
  Q186: "azureAdConnect",
};

export const MD102_VISUALIZATIONS: Record<string, VisualizationType> = {
  // Conditional Access
  Q10: "conditionalAccess",
  Q88: "conditionalAccess",
  Q155: "conditionalAccess",
  Q191: "conditionalAccess",
  Q261: "conditionalAccess",

  // Intune Enrollment
  Q24: "intuneEnrollment",
  Q28: "intuneEnrollment",
  Q72: "intuneEnrollment",
  Q73: "intuneEnrollment",
  Q126: "intuneEnrollment",
  Q148: "intuneEnrollment",
  Q199: "intuneEnrollment",
  Q206: "intuneEnrollment",

  // App Protection
  Q1: "appProtection",
  Q3: "appProtection",
};

// ASCII Art Diagrams (safe for rendering in code blocks)
export const VISUALIZATION_DIAGRAMS: Record<VisualizationType, string> = {
  conditionalAccess: `
┌─────────────────────────────────────────────────────────────────────┐
│                    CONDITIONAL ACCESS FLOW                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐  │
│  │  Benutzer│ --> │  Gerät   │ --> │ Standort │ --> │   App    │  │
│  │ (Groups) │     │(Platform)│     │(Location)│     │ (Target) │  │
│  └────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘  │
│       │                │                │                │         │
│       v                v                v                v         │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │               CONDITIONAL ACCESS POLICY                      │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │  │
│  │  │ IF Conditions   │->│ THEN Controls   │->│  RESULT     │  │  │
│  │  │ - All Users     │  │ - Require MFA   │  │ ✓ Allow     │  │  │
│  │  │ - Cloud Apps    │  │ - Compliant Dev │  │ ✗ Block     │  │  │
│  │  │ - Locations     │  │ - App Enforced  │  │ 🔐 MFA      │  │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────┘  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘`,

  mfaTrust: `
┌─────────────────────────────────────────────────────────────────┐
│              MFA & TRUSTED LOCATIONS EVALUATION                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Sign-In Request                                            │
│        │                                                         │
│        v                                                         │
│  ┌─────────────────────────────┐                                │
│  │ Check: Is IP in MFA Service │                                │
│  │    Trusted IPs? (legacy)    │                                │
│  └──────────────┬──────────────┘                                │
│           Yes   │   No                                           │
│    ┌────────────┴────────────┐                                  │
│    v                         v                                   │
│  ┌──────────┐      ┌─────────────────────────┐                  │
│  │ Skip MFA │      │ Check: CA Policy with   │                  │
│  │ (bypass) │      │   Named Location?       │                  │
│  └──────────┘      └───────────┬─────────────┘                  │
│                          Yes   │   No                            │
│                   ┌────────────┴────────────┐                   │
│                   v                         v                    │
│            ┌──────────────┐        ┌──────────────┐             │
│            │ Location is  │        │ ALL Policies │             │
│            │ Trusted? CA  │        │   Evaluated  │             │
│            │ Excludes MFA │        │ -> MFA/Block │             │
│            └──────────────┘        └──────────────┘             │
│                                                                  │
│  ⚠️  Remember: MFA "Enforced" users ALWAYS need MFA!            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`,

  deviceGroups: `
┌─────────────────────────────────────────────────────────────────┐
│           DEFENDER FOR ENDPOINT - DEVICE GROUPS                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Device onboarded -> Evaluate matching rules (by rank order)    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Rank │ Device Group │ Matching Rule                     │    │
│  ├──────┼──────────────┼───────────────────────────────────┤    │
│  │  1   │ Group1       │ Tag = "demo" AND OS = "Windows 10"│    │
│  │  2   │ Group2       │ Tag = "demo"                      │    │
│  │  3   │ Group3       │ Domain = "contoso.com"            │    │
│  │  4   │ Group4       │ ComputerName starts with "SRV-"   │    │
│  │ Last │ Ungrouped    │ (catch-all)                       │    │
│  └──────┴──────────────┴───────────────────────────────────┘    │
│                                                                  │
│  ⚠️  WICHTIG: Device wird NUR der ERSTEN passenden Gruppe       │
│      zugewiesen (höchster Rank gewinnt)!                        │
│                                                                  │
│  Beispiel: Device mit Tag="demo", OS=Windows 10, Domain=contoso │
│            -> Passt zu Rank 1,2,3 -> Wird nur Group1 zugewiesen │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`,

  intuneEnrollment: `
┌─────────────────────────────────────────────────────────────────┐
│                  INTUNE ENROLLMENT FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. DISCOVER              2. AUTHENTICATE         3. ENROLL     │
│  ┌─────────────┐         ┌─────────────┐        ┌────────────┐ │
│  │   Device    │ ------> │   Entra ID  │ -----> │   Intune   │ │
│  │  (Windows/  │  Azure  │   (Azure AD)│  MDM   │   Service  │ │
│  │  iOS/And.)  │  AD DNS │             │  URL   │            │ │
│  └─────────────┘         └─────────────┘        └──────┬─────┘ │
│                                                         │       │
│  4. CONFIGURE             5. POLICIES            6. COMPLIANT  │
│  ┌─────────────┐         ┌─────────────┐        ┌────────────┐ │
│  │   Install   │ <------ │   Apply     │ <----- │   Check    │ │
│  │   MDM Agent │  Mgmt   │   Profiles  │  Push  │ Compliance │ │
│  │   + Certs   │  Cert   │   & Apps    │        │   Status   │ │
│  └─────────────┘         └─────────────┘        └────────────┘ │
│                                                                  │
│  Enrollment Types:                                              │
│  • Autopilot (Windows) - OOBE mit Vorregistrierung              │
│  • User Enrollment (iOS) - Persönliche Geräte, getrennte Daten  │
│  • Device Enrollment (iOS/Android) - Unternehmenseigentum       │
│  • Android Enterprise - Work Profile oder Dedicated/Full        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`,

  appProtection: `
┌─────────────────────────────────────────────────────────────────┐
│              APP PROTECTION POLICY - DATA FLOW                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   MANAGED APPS (Corporate Container)    UNMANAGED APPS          │
│  ┌────────────────────────────────┐   ┌──────────────────────┐ │
│  │  ┌─────────┐    ┌─────────┐   │   │   Personal Apps      │ │
│  │  │ Outlook │◄──►│ Teams   │   │   │  ┌───────────────┐   │ │
│  │  └─────────┘    └─────────┘   │   │  │ WhatsApp      │   │ │
│  │       │              │        │   │  │ Personal Mail │   │ │
│  │       │   ✓ Copy OK  │        │   │  │ Dropbox       │   │ │
│  │       └──────────────┘        │   │  └───────────────┘   │ │
│  │              │                │   │         ↑            │ │
│  │              │  ✗ BLOCKED     │   │         │            │ │
│  │              └────────────────┼───┼─────────┘            │ │
│  │                               │   │                      │ │
│  │  Policy Controls:             │   │  No policy control   │ │
│  │  • PIN on app launch          │   │                      │ │
│  │  • Block copy to unmanaged    │   │                      │ │
│  │  • Require managed location   │   │                      │ │
│  │  • Selective wipe on unenroll │   │                      │ │
│  └────────────────────────────────┘   └──────────────────────┘ │
│                                                                  │
│  ⚡ Key: MAM policies protect data WITHOUT requiring MDM!       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`,

  certificateChain: `
┌─────────────────────────────────────────────────────────────────┐
│                    CERTIFICATE CHAIN                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────┐                 │
│  │           ROOT CA (Self-Signed)             │                 │
│  │  Issuer: Root CA  |  Subject: Root CA       │                 │
│  │  Validity: 10-20 Jahre  |  Trust Anchor     │                 │
│  └──────────────────────┬─────────────────────┘                 │
│                         │ signs                                  │
│                         v                                        │
│  ┌────────────────────────────────────────────┐                 │
│  │        INTERMEDIATE CA (Issuing CA)         │                 │
│  │  Issuer: Root CA  |  Subject: Issuing CA    │                 │
│  │  Validity: 5-10 Jahre  |  Issues end certs  │                 │
│  └──────────────────────┬─────────────────────┘                 │
│                         │ signs                                  │
│                         v                                        │
│  ┌────────────────────────────────────────────┐                 │
│  │          END-ENTITY CERTIFICATE             │                 │
│  │  Issuer: Issuing CA  |  Subject: server.com │                 │
│  │  Validity: 1-2 Jahre  |  TLS/Auth/Code Sign │                 │
│  └────────────────────────────────────────────┘                 │
│                                                                  │
│  Chain Validation: End-Entity -> Intermediate -> Root (Trusted) │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`,

  azureAdConnect: `
┌─────────────────────────────────────────────────────────────────┐
│               AZURE AD CONNECT SYNC TOPOLOGY                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ON-PREMISES                              CLOUD                  │
│  ┌─────────────────┐                   ┌─────────────────┐     │
│  │  Active         │     Sync          │  Microsoft      │     │
│  │  Directory      │ ═══════════════►  │  Entra ID       │     │
│  │  (AD DS)        │                   │  (Azure AD)     │     │
│  │                 │  ◄═══════════════ │                 │     │
│  │  Users, Groups  │    Writeback      │  Cloud Users    │     │
│  │  Computers      │    (optional)     │  Cloud Groups   │     │
│  └────────┬────────┘                   └─────────────────┘     │
│           │                                   │                  │
│           │                                   │                  │
│  ┌────────┴────────┐                   ┌─────┴─────────┐       │
│  │  Azure AD       │                   │  Authentication│       │
│  │  Connect Server │                   │  Methods:      │       │
│  │                 │                   │  • PHS         │       │
│  │  Components:    │                   │  • PTA         │       │
│  │  • Sync Engine  │                   │  • Federation  │       │
│  │  • AAD Connect  │                   └────────────────┘       │
│  │  • Password     │                                            │
│  │    Writeback    │                                            │
│  └─────────────────┘                                            │
│                                                                  │
│  Sync Scope: OUs, Groups, Attribute Filtering                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`,
};

// Helper function to get visualization for a question
export function getVisualizationForQuestion(
  questionId: string,
  examType: "ms102" | "md102",
): { type: VisualizationType; diagram: string } | null {
  const mappings =
    examType === "ms102" ? MS102_VISUALIZATIONS : MD102_VISUALIZATIONS;
  const vizType = mappings[questionId];

  if (!vizType) return null;

  return {
    type: vizType,
    diagram: VISUALIZATION_DIAGRAMS[vizType],
  };
}

// Human-readable labels for visualization types
export const VISUALIZATION_LABELS: Record<VisualizationType, string> = {
  conditionalAccess: "Conditional Access Flow",
  mfaTrust: "MFA & Trusted Locations",
  deviceGroups: "Device Group Ranking",
  intuneEnrollment: "Intune Enrollment Flow",
  appProtection: "App Protection Data Flow",
  certificateChain: "Certificate Chain",
  azureAdConnect: "Azure AD Connect Sync",
};
