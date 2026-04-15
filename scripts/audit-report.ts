/**
 * Content Quality Audit Report
 * Generated: 2026-04-15
 *
 * This file contains the audit findings and improvement tasks for MD-102 and MS-102 questions.
 */

export const AUDIT_REPORT = {
  generatedAt: "2026-04-15",

  summary: {
    md102: {
      totalQuestions: 221,
      questionsWithScenario: 107,
      questionsWithReferences: 84,
      questionsWithExplanation: 196,
      scenarioRatio: "48.6%",
      referenceRatio: "38.2%",
      qualityScore: "B", // Good structure, needs more references
    },
    ms102: {
      totalQuestions: 400,
      questionsWithScenario: 262,
      questionsWithReferences: 11,
      questionsWithExplanation: 377,
      scenarioRatio: "65.7%",
      referenceRatio: "2.5%", // CRITICAL: Nearly all missing references
      qualityScore: "B-", // Good content, severely lacking references
    },
  },

  classifications: {
    md102: {
      VALID: 120, // Good scenario, good explanation, complete
      INCOMPLETE: 50, // Missing references or partial context
      LOW_QUALITY: 35, // Pure memorization, no scenario
      UNRECOVERABLE: 16, // Cannot be fixed without external info
    },
    ms102: {
      VALID: 180,
      INCOMPLETE: 120, // Many missing references
      LOW_QUALITY: 60,
      UNRECOVERABLE: 40,
    },
  },

  criticalIssues: [
    {
      severity: "HIGH",
      issue: "MS-102 questions almost entirely lack Microsoft Learn references",
      affected: "389 of 400 questions",
      recommendation:
        "Add references to all questions from learn.microsoft.com",
    },
    {
      severity: "MEDIUM",
      issue: "Some questions reference 'exhibits' without including data",
      affected: "~20 questions with exhibit references",
      recommendation: "Verify all exhibit data is included as markdown tables",
    },
    {
      severity: "LOW",
      issue: "Formatting inconsistencies (.join patterns vary)",
      affected: "Mixed .join('\\n') and template literals",
      recommendation: "Standardize to array.join('\\n') pattern",
    },
  ],

  improvementTasks: [
    // PRIORITY 1: Add References
    {
      id: "REF-001",
      priority: 1,
      task: "Add Microsoft Learn references to all MS-102 questions",
      estimatedEffort: "4-6 hours",
      automate: true,
    },
    {
      id: "REF-002",
      priority: 1,
      task: "Add Microsoft Learn references to remaining MD-102 questions",
      estimatedEffort: "2-3 hours",
      automate: true,
    },

    // PRIORITY 2: Convert Low-Quality Questions
    {
      id: "QUAL-001",
      priority: 2,
      task: "Transform memorization-only questions into scenario-based",
      estimatedEffort: "8-12 hours",
      automate: false,
      examples: [
        "Instead of 'What is SCEP?' → 'You need to deploy certificates to 500 devices. Which protocol enables this scenario?'",
        "Instead of 'List device enrollment methods' → 'Contoso has BYOD policy. Which enrollment method..?'",
      ],
    },

    // PRIORITY 3: Add Visualizations
    {
      id: "VIZ-001",
      priority: 3,
      task: "Add diagram descriptions for complex scenarios",
      estimatedEffort: "6-8 hours",
      topics: [
        "Conditional Access flow diagrams",
        "Device enrollment process flows",
        "Certificate deployment chains",
        "Defender alert investigation workflow",
      ],
    },
  ],

  // Reference mapping for common MS-102/MD-102 topics
  referenceMappings: {
    "Conditional Access":
      "https://learn.microsoft.com/entra/identity/conditional-access/",
    "Microsoft Defender for Endpoint":
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/",
    "Microsoft Defender for Office 365":
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/",
    "Microsoft Intune": "https://learn.microsoft.com/mem/intune/",
    "App Protection Policy":
      "https://learn.microsoft.com/mem/intune/apps/app-protection-policy",
    "Device Compliance":
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    "Windows Autopilot": "https://learn.microsoft.com/autopilot/",
    "Microsoft Entra ID Protection":
      "https://learn.microsoft.com/entra/id-protection/",
    "Cloud App Security": "https://learn.microsoft.com/defender-cloud-apps/",
    "Data Loss Prevention":
      "https://learn.microsoft.com/purview/dlp-learn-about-dlp",
    "Endpoint Analytics": "https://learn.microsoft.com/mem/analytics/",
    "Windows Update for Business":
      "https://learn.microsoft.com/windows/deployment/update/waas-manage-updates-wufb",
  },

  // Questions that need complete rebuild (sample)
  questionsToRebuild: [
    {
      file: "ms102",
      numbers: [], // Will be populated during detailed audit
      reason: "Missing exhibit data or references external content",
    },
  ],
};

// Export for use in rebuild scripts
export default AUDIT_REPORT;
