/**
 * MS-102 Questions Enhancement Script
 * Adds Microsoft Learn references based on question content
 */

const fs = require("fs");

// Comprehensive reference mappings
const REFERENCE_MAPPINGS = [
  // Defender for Cloud Apps
  {
    patterns: ["defender for cloud apps", "cloud discovery", "mcas"],
    refs: [
      "https://learn.microsoft.com/defender-cloud-apps/what-is-defender-for-cloud-apps",
    ],
  },
  {
    patterns: ["activity policy", "activity policies"],
    refs: [
      "https://learn.microsoft.com/defender-cloud-apps/user-activity-policies",
    ],
  },
  {
    patterns: ["session policy", "session policies"],
    refs: [
      "https://learn.microsoft.com/defender-cloud-apps/session-policy-aad",
    ],
  },
  {
    patterns: ["file policy", "file policies"],
    refs: [
      "https://learn.microsoft.com/defender-cloud-apps/data-protection-policies",
    ],
  },
  {
    patterns: ["anomaly detection"],
    refs: [
      "https://learn.microsoft.com/defender-cloud-apps/anomaly-detection-policy",
    ],
  },
  {
    patterns: ["app governance"],
    refs: [
      "https://learn.microsoft.com/defender-cloud-apps/app-governance-manage-app-governance",
    ],
  },

  // Defender for Endpoint
  {
    patterns: ["defender for endpoint", "mde", "device group"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/microsoft-defender-endpoint",
    ],
  },
  {
    patterns: ["attack surface reduction", "asr"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/overview-attack-surface-reduction",
    ],
  },
  {
    patterns: ["endpoint detection and response", "edr"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/overview-endpoint-detection-response",
    ],
  },
  {
    patterns: ["automated investigation"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/automated-investigations",
    ],
  },
  {
    patterns: ["live response"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/live-response",
    ],
  },
  {
    patterns: ["threat and vulnerability"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/defender-vulnerability-management/defender-vulnerability-management",
    ],
  },

  // Defender for Office 365
  {
    patterns: ["defender for office", "mdo"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/defender-for-office-365",
    ],
  },
  {
    patterns: ["safe attachments", "safe attachment"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/safe-attachments-about",
    ],
  },
  {
    patterns: ["safe links", "safe link"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/safe-links-about",
    ],
  },
  {
    patterns: ["anti-phishing", "antiphishing", "phishing"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/anti-phishing-protection-about",
    ],
  },
  {
    patterns: ["anti-malware", "antimalware", "malware policy"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/anti-malware-protection-about",
    ],
  },
  {
    patterns: ["anti-spam", "antispam", "spam filter"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/anti-spam-protection-about",
    ],
  },
  {
    patterns: ["impersonation protection", "impersonation"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/anti-phishing-policies-about#impersonation-settings-in-anti-phishing-policies",
    ],
  },
  {
    patterns: ["quarantine", "quarantined"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/quarantine-about",
    ],
  },
  {
    patterns: ["attack simulation", "simulation training"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/attack-simulation-training-get-started",
    ],
  },
  {
    patterns: ["threat explorer", "explorer"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/office-365-security/threat-explorer-about",
    ],
  },

  // Secure Score
  {
    patterns: ["secure score"],
    refs: [
      "https://learn.microsoft.com/microsoft-365/security/defender/microsoft-secure-score",
    ],
  },

  // Identity Protection
  {
    patterns: ["identity protection", "id protection"],
    refs: [
      "https://learn.microsoft.com/entra/id-protection/overview-identity-protection",
    ],
  },
  {
    patterns: ["sign-in risk", "signin risk"],
    refs: [
      "https://learn.microsoft.com/entra/id-protection/concept-identity-protection-risks",
    ],
  },
  {
    patterns: ["user risk"],
    refs: [
      "https://learn.microsoft.com/entra/id-protection/concept-identity-protection-risks",
    ],
  },
  {
    patterns: ["risk policy", "risk policies"],
    refs: [
      "https://learn.microsoft.com/entra/id-protection/concept-identity-protection-policies",
    ],
  },
  {
    patterns: ["risky user", "risky users"],
    refs: [
      "https://learn.microsoft.com/entra/id-protection/howto-identity-protection-remediate-unblock",
    ],
  },

  // Conditional Access
  {
    patterns: ["conditional access"],
    refs: [
      "https://learn.microsoft.com/entra/identity/conditional-access/overview",
    ],
  },
  {
    patterns: ["named location", "named locations"],
    refs: [
      "https://learn.microsoft.com/entra/identity/conditional-access/location-condition",
    ],
  },
  {
    patterns: ["device compliance", "compliant device"],
    refs: [
      "https://learn.microsoft.com/entra/identity/conditional-access/concept-conditional-access-grant#require-device-to-be-marked-as-compliant",
    ],
  },
  {
    patterns: ["session control", "session controls"],
    refs: [
      "https://learn.microsoft.com/entra/identity/conditional-access/concept-conditional-access-session",
    ],
  },
  {
    patterns: ["grant control", "grant controls"],
    refs: [
      "https://learn.microsoft.com/entra/identity/conditional-access/concept-conditional-access-grant",
    ],
  },

  // Authentication
  {
    patterns: ["mfa", "multi-factor", "multifactor"],
    refs: [
      "https://learn.microsoft.com/entra/identity/authentication/concept-mfa-howitworks",
    ],
  },
  {
    patterns: ["sspr", "self-service password"],
    refs: [
      "https://learn.microsoft.com/entra/identity/authentication/concept-sspr-howitworks",
    ],
  },
  {
    patterns: ["passwordless"],
    refs: [
      "https://learn.microsoft.com/entra/identity/authentication/concept-authentication-passwordless",
    ],
  },
  {
    patterns: ["fido2", "security key"],
    refs: [
      "https://learn.microsoft.com/entra/identity/authentication/concept-authentication-passwordless#fido2-security-keys",
    ],
  },
  {
    patterns: ["microsoft authenticator", "authenticator app"],
    refs: [
      "https://learn.microsoft.com/entra/identity/authentication/concept-authentication-authenticator-app",
    ],
  },
  {
    patterns: ["authentication method", "authentication methods"],
    refs: [
      "https://learn.microsoft.com/entra/identity/authentication/concept-authentication-methods",
    ],
  },
  {
    patterns: ["password protection"],
    refs: [
      "https://learn.microsoft.com/entra/identity/authentication/concept-password-ban-bad",
    ],
  },
  {
    patterns: ["legacy authentication"],
    refs: [
      "https://learn.microsoft.com/entra/identity/conditional-access/block-legacy-authentication",
    ],
  },

  // PIM & Governance
  {
    patterns: ["privileged identity", "pim"],
    refs: [
      "https://learn.microsoft.com/entra/id-governance/privileged-identity-management/pim-configure",
    ],
  },
  {
    patterns: ["access review", "access reviews"],
    refs: [
      "https://learn.microsoft.com/entra/id-governance/access-reviews-overview",
    ],
  },
  {
    patterns: ["entitlement management"],
    refs: [
      "https://learn.microsoft.com/entra/id-governance/entitlement-management-overview",
    ],
  },
  {
    patterns: ["access package"],
    refs: [
      "https://learn.microsoft.com/entra/id-governance/entitlement-management-access-package-create",
    ],
  },

  // Hybrid Identity
  {
    patterns: ["azure ad connect", "entra connect"],
    refs: [
      "https://learn.microsoft.com/entra/identity/hybrid/connect/whatis-azure-ad-connect",
    ],
  },
  {
    patterns: ["password hash sync", "phs"],
    refs: [
      "https://learn.microsoft.com/entra/identity/hybrid/connect/whatis-phs",
    ],
  },
  {
    patterns: ["pass-through authentication", "pta"],
    refs: [
      "https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-pta",
    ],
  },
  {
    patterns: ["federation", "federated", "ad fs", "adfs"],
    refs: [
      "https://learn.microsoft.com/entra/identity/hybrid/connect/whatis-fed",
    ],
  },
  {
    patterns: ["seamless sso", "seamless single sign"],
    refs: [
      "https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-sso",
    ],
  },
  {
    patterns: ["cloud sync"],
    refs: [
      "https://learn.microsoft.com/entra/identity/hybrid/cloud-sync/what-is-cloud-sync",
    ],
  },

  // Roles & Admin
  {
    patterns: ["administrative unit", "admin unit"],
    refs: [
      "https://learn.microsoft.com/entra/identity/role-based-access-control/administrative-units",
    ],
  },
  {
    patterns: ["directory role", "azure ad role", "entra role"],
    refs: [
      "https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference",
    ],
  },
  {
    patterns: ["global administrator", "global admin"],
    refs: [
      "https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#global-administrator",
    ],
  },
  {
    patterns: ["security administrator"],
    refs: [
      "https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#security-administrator",
    ],
  },

  // Intune / Endpoint
  {
    patterns: ["intune", "endpoint manager"],
    refs: [
      "https://learn.microsoft.com/mem/intune/fundamentals/what-is-intune",
    ],
  },
  {
    patterns: ["device configuration"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/device-profiles",
    ],
  },
  {
    patterns: ["compliance policy", "device compliance"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },
  {
    patterns: ["endpoint protection"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-protection-windows-10",
    ],
  },

  // Data Protection / Purview
  {
    patterns: ["data loss prevention", "dlp"],
    refs: ["https://learn.microsoft.com/purview/dlp-learn-about-dlp"],
  },
  {
    patterns: ["sensitivity label", "sensitivity labels"],
    refs: ["https://learn.microsoft.com/purview/sensitivity-labels"],
  },
  {
    patterns: ["retention policy", "retention policies", "retention label"],
    refs: ["https://learn.microsoft.com/purview/retention"],
  },
  {
    patterns: ["information protection"],
    refs: ["https://learn.microsoft.com/purview/information-protection"],
  },
  {
    patterns: ["insider risk"],
    refs: ["https://learn.microsoft.com/purview/insider-risk-management"],
  },
  {
    patterns: ["communication compliance"],
    refs: ["https://learn.microsoft.com/purview/communication-compliance"],
  },
  {
    patterns: ["ediscovery", "e-discovery"],
    refs: ["https://learn.microsoft.com/purview/ediscovery"],
  },
  {
    patterns: ["audit log", "unified audit"],
    refs: ["https://learn.microsoft.com/purview/audit-log-search"],
  },

  // Exchange / Mail
  {
    patterns: ["exchange online", "exo"],
    refs: ["https://learn.microsoft.com/exchange/exchange-online"],
  },
  {
    patterns: ["mail flow rule", "transport rule"],
    refs: [
      "https://learn.microsoft.com/exchange/security-and-compliance/mail-flow-rules/mail-flow-rules",
    ],
  },
  {
    patterns: ["connector"],
    refs: [
      "https://learn.microsoft.com/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/use-connectors-to-configure-mail-flow",
    ],
  },
  {
    patterns: ["accepted domain"],
    refs: [
      "https://learn.microsoft.com/exchange/mail-flow-best-practices/manage-accepted-domains/manage-accepted-domains",
    ],
  },
  {
    patterns: ["remote domain"],
    refs: [
      "https://learn.microsoft.com/exchange/mail-flow-best-practices/remote-domains/remote-domains",
    ],
  },

  // SharePoint / Teams
  {
    patterns: ["sharepoint"],
    refs: ["https://learn.microsoft.com/sharepoint/introduction"],
  },
  {
    patterns: ["teams"],
    refs: ["https://learn.microsoft.com/microsoftteams/teams-overview"],
  },
  {
    patterns: ["external sharing"],
    refs: ["https://learn.microsoft.com/sharepoint/external-sharing-overview"],
  },
  {
    patterns: ["guest access"],
    refs: ["https://learn.microsoft.com/microsoftteams/guest-access"],
  },

  // Alerts
  {
    patterns: ["alert policy", "alert policies"],
    refs: ["https://learn.microsoft.com/purview/alert-policies"],
  },
];

// Fallback by area
const AREA_FALLBACKS = {
  "Defender XDR":
    "https://learn.microsoft.com/microsoft-365/security/defender/microsoft-365-defender",
  Entra: "https://learn.microsoft.com/entra/fundamentals/whatis",
  identity: "https://learn.microsoft.com/entra/fundamentals/whatis",
  tenant:
    "https://learn.microsoft.com/microsoft-365/enterprise/microsoft-365-overview",
  email: "https://learn.microsoft.com/exchange/exchange-online",
  collaboration: "https://learn.microsoft.com/sharepoint/introduction",
  threat:
    "https://learn.microsoft.com/microsoft-365/security/defender/microsoft-365-defender",
  endpoint:
    "https://learn.microsoft.com/mem/intune/fundamentals/what-is-intune",
};

function findReferences(questionText, area) {
  const refs = new Set();
  const textLower = questionText.toLowerCase();

  // Check all pattern mappings
  for (const mapping of REFERENCE_MAPPINGS) {
    for (const pattern of mapping.patterns) {
      if (textLower.includes(pattern)) {
        mapping.refs.forEach((r) => refs.add(r));
        break;
      }
    }
  }

  // Add area fallback if no specific refs found
  if (refs.size === 0 && area) {
    for (const [keyword, url] of Object.entries(AREA_FALLBACKS)) {
      if (area.toLowerCase().includes(keyword.toLowerCase())) {
        refs.add(url);
        break;
      }
    }
  }

  return [...refs].slice(0, 3);
}

function processFile() {
  const filePath = "src/app/ms102/data/questions.ts";
  let content = fs.readFileSync(filePath, "utf8");

  // Find all questions and add references where missing
  let modified = 0;
  let alreadyHas = 0;

  // Split into question blocks
  const blocks = content.split(/(?=\s*{\s*id:\s*["']Q)/);

  const processedBlocks = blocks.map((block, index) => {
    if (index === 0) return block; // File header

    // Check if block already has references
    if (block.includes("references:")) {
      alreadyHas++;
      return block;
    }

    // Extract question text and area
    const questionMatch = block.match(
      /question:\s*(?:\[[\s\S]*?\]\.join\([^)]+\)|`[\s\S]*?`|"[\s\S]*?")/,
    );
    const areaMatch = block.match(/area:\s*["']([^"']+)["']/);

    if (!questionMatch) return block;

    const questionText = questionMatch[0];
    const area = areaMatch ? areaMatch[1] : "";

    // Find appropriate references
    const refs = findReferences(questionText, area);

    if (refs.length === 0) return block;

    // Add references before the closing brace
    const refsString = `\n\n    references: [\n      "${refs.join('",\n      "')}"\n    ],`;

    // Find the last property (usually explanationDe) and add references after it
    const insertPoint = block.lastIndexOf('].join("\\n"),');
    if (insertPoint > -1) {
      const endOfJoin = insertPoint + '].join("\\n"),'.length;
      block = block.slice(0, endOfJoin) + refsString + block.slice(endOfJoin);
      modified++;
    } else {
      // Try template literal ending
      const templatePoint = block.lastIndexOf("`,");
      if (templatePoint > -1) {
        block =
          block.slice(0, templatePoint + 2) +
          refsString +
          block.slice(templatePoint + 2);
        modified++;
      }
    }

    return block;
  });

  const newContent = processedBlocks.join("");

  // Write back
  fs.writeFileSync(filePath, newContent, "utf8");

  console.log("\n✅ MS-102 Questions Updated");
  console.log(`   Modified: ${modified} questions`);
  console.log(`   Already had refs: ${alreadyHas} questions`);
  console.log(`   Total processed: ${blocks.length - 1} questions`);
}

processFile();
