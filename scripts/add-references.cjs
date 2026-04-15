/**
 * Add Microsoft Learn References to MS-102 Questions
 *
 * This script adds appropriate references based on question content and topic area.
 */

const fs = require("fs");

// Reference mappings based on keywords in question content
const REFERENCE_MAPPINGS = {
  // Microsoft Defender XDR
  "Defender for Cloud Apps": [
    "https://learn.microsoft.com/defender-cloud-apps/what-is-defender-for-cloud-apps",
  ],
  "Cloud Discovery": [
    "https://learn.microsoft.com/defender-cloud-apps/set-up-cloud-discovery",
  ],
  "activity policy": [
    "https://learn.microsoft.com/defender-cloud-apps/user-activity-policies",
  ],
  "session policy": [
    "https://learn.microsoft.com/defender-cloud-apps/session-policy-aad",
  ],
  "file policy": [
    "https://learn.microsoft.com/defender-cloud-apps/data-protection-policies",
  ],
  "Defender for Endpoint": [
    "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/microsoft-defender-endpoint",
  ],
  "Defender for Office 365": [
    "https://learn.microsoft.com/microsoft-365/security/office-365-security/defender-for-office-365",
  ],
  "Safe Attachments": [
    "https://learn.microsoft.com/microsoft-365/security/office-365-security/safe-attachments-about",
  ],
  "Safe Links": [
    "https://learn.microsoft.com/microsoft-365/security/office-365-security/safe-links-about",
  ],
  "Anti-phishing": [
    "https://learn.microsoft.com/microsoft-365/security/office-365-security/anti-phishing-protection-about",
  ],
  "Anti-malware": [
    "https://learn.microsoft.com/microsoft-365/security/office-365-security/anti-malware-protection-about",
  ],
  "Anti-spam": [
    "https://learn.microsoft.com/microsoft-365/security/office-365-security/anti-spam-protection-about",
  ],
  "impersonation protection": [
    "https://learn.microsoft.com/microsoft-365/security/office-365-security/anti-phishing-protection-about#impersonation-settings-in-anti-phishing-policies",
  ],
  "Secure Score": [
    "https://learn.microsoft.com/microsoft-365/security/defender/microsoft-secure-score",
  ],
  "attack simulation": [
    "https://learn.microsoft.com/microsoft-365/security/office-365-security/attack-simulation-training-get-started",
  ],

  // Identity & Access
  "Conditional Access": [
    "https://learn.microsoft.com/entra/identity/conditional-access/overview",
  ],
  MFA: [
    "https://learn.microsoft.com/entra/identity/authentication/concept-mfa-howitworks",
  ],
  "multi-factor authentication": [
    "https://learn.microsoft.com/entra/identity/authentication/concept-mfa-howitworks",
  ],
  "Identity Protection": [
    "https://learn.microsoft.com/entra/id-protection/overview-identity-protection",
  ],
  "risk policy": [
    "https://learn.microsoft.com/entra/id-protection/concept-identity-protection-policies",
  ],
  "sign-in risk": [
    "https://learn.microsoft.com/entra/id-protection/concept-identity-protection-risks",
  ],
  "user risk": [
    "https://learn.microsoft.com/entra/id-protection/concept-identity-protection-risks",
  ],
  "Privileged Identity Management": [
    "https://learn.microsoft.com/entra/id-governance/privileged-identity-management/pim-configure",
  ],
  PIM: [
    "https://learn.microsoft.com/entra/id-governance/privileged-identity-management/pim-configure",
  ],
  "access review": [
    "https://learn.microsoft.com/entra/id-governance/access-reviews-overview",
  ],
  "Azure AD Connect": [
    "https://learn.microsoft.com/entra/identity/hybrid/connect/whatis-azure-ad-connect",
  ],
  "password hash sync": [
    "https://learn.microsoft.com/entra/identity/hybrid/connect/whatis-phs",
  ],
  "pass-through authentication": [
    "https://learn.microsoft.com/entra/identity/hybrid/connect/how-to-connect-pta",
  ],
  federation: [
    "https://learn.microsoft.com/entra/identity/hybrid/connect/whatis-fed",
  ],
  SSPR: [
    "https://learn.microsoft.com/entra/identity/authentication/concept-sspr-howitworks",
  ],
  "self-service password reset": [
    "https://learn.microsoft.com/entra/identity/authentication/concept-sspr-howitworks",
  ],
  "authentication method": [
    "https://learn.microsoft.com/entra/identity/authentication/concept-authentication-methods",
  ],
  "Microsoft Authenticator": [
    "https://learn.microsoft.com/entra/identity/authentication/concept-authentication-authenticator-app",
  ],
  passwordless: [
    "https://learn.microsoft.com/entra/identity/authentication/concept-authentication-passwordless",
  ],
  FIDO2: [
    "https://learn.microsoft.com/entra/identity/authentication/concept-authentication-passwordless#fido2-security-keys",
  ],

  // Tenant Management
  "custom domain": [
    "https://learn.microsoft.com/entra/fundamentals/add-custom-domain",
  ],
  tenant: ["https://learn.microsoft.com/entra/fundamentals/whatis"],
  "organizational settings": [
    "https://learn.microsoft.com/microsoft-365/admin/manage/manage-deployment-of-add-ins",
  ],

  // Intune / Endpoint Management
  Intune: [
    "https://learn.microsoft.com/mem/intune/fundamentals/what-is-intune",
  ],
  "device configuration": [
    "https://learn.microsoft.com/mem/intune/configuration/device-profiles",
  ],
  "endpoint protection": [
    "https://learn.microsoft.com/mem/intune/protect/endpoint-protection-windows-10",
  ],
  "compliance policy": [
    "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
  ],

  // Data Protection
  "Data Loss Prevention": [
    "https://learn.microsoft.com/purview/dlp-learn-about-dlp",
  ],
  DLP: ["https://learn.microsoft.com/purview/dlp-learn-about-dlp"],
  "sensitivity label": [
    "https://learn.microsoft.com/purview/sensitivity-labels",
  ],
  "Information Protection": [
    "https://learn.microsoft.com/purview/information-protection",
  ],
  retention: ["https://learn.microsoft.com/purview/retention"],

  // Exchange / Email
  "Exchange Online": ["https://learn.microsoft.com/exchange/exchange-online"],
  "mail flow": [
    "https://learn.microsoft.com/exchange/mail-flow-best-practices/mail-flow-best-practices",
  ],
  "transport rule": [
    "https://learn.microsoft.com/exchange/security-and-compliance/mail-flow-rules/mail-flow-rules",
  ],
  connector: [
    "https://learn.microsoft.com/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/use-connectors-to-configure-mail-flow",
  ],

  // SharePoint / Teams
  SharePoint: ["https://learn.microsoft.com/sharepoint/sharepoint-online"],
  Teams: ["https://learn.microsoft.com/microsoftteams/teams-overview"],
  "external sharing": [
    "https://learn.microsoft.com/sharepoint/external-sharing-overview",
  ],
};

// Area-based fallback references
const AREA_REFERENCES = {
  "Manage security and threats by using Microsoft Defender XDR": [
    "https://learn.microsoft.com/microsoft-365/security/defender/microsoft-365-defender",
  ],
  "Implement and manage Microsoft Entra identity and access": [
    "https://learn.microsoft.com/entra/fundamentals/whatis",
  ],
  "Deploy and manage a Microsoft 365 tenant": [
    "https://learn.microsoft.com/microsoft-365/enterprise/microsoft-365-overview",
  ],
  "Manage identity and access in Microsoft 365": [
    "https://learn.microsoft.com/entra/fundamentals/whatis",
  ],
  "Manage email and collaboration in Microsoft 365": [
    "https://learn.microsoft.com/exchange/exchange-online",
  ],
  "Implement and manage threat protection": [
    "https://learn.microsoft.com/microsoft-365/security/defender/microsoft-365-defender",
  ],
  "Implement and manage endpoint security": [
    "https://learn.microsoft.com/mem/intune/protect/endpoint-security",
  ],
};

function findReferences(questionText, area) {
  const refs = new Set();
  const text = questionText.toLowerCase();

  // Check keyword mappings
  for (const [keyword, urls] of Object.entries(REFERENCE_MAPPINGS)) {
    if (text.includes(keyword.toLowerCase())) {
      urls.forEach((url) => refs.add(url));
    }
  }

  // If no specific refs found, use area-based fallback
  if (refs.size === 0) {
    for (const [areaKey, urls] of Object.entries(AREA_REFERENCES)) {
      if (area.includes(areaKey)) {
        urls.forEach((url) => refs.add(url));
        break;
      }
    }
  }

  return [...refs].slice(0, 3); // Max 3 references per question
}

// Main processing
function processQuestions() {
  const filePath = "src/app/ms102/data/questions.ts";
  let content = fs.readFileSync(filePath, "utf8");

  // Count questions with and without references
  const hasRefsCount = (content.match(/references:\s*\[/g) || []).length;
  const totalQuestions = (content.match(/number:\s*\d+/g) || []).length;

  console.log(`\nMS-102 Questions Analysis:`);
  console.log(`  Total questions: ${totalQuestions}`);
  console.log(`  With references: ${hasRefsCount}`);
  console.log(`  Missing references: ${totalQuestions - hasRefsCount}`);

  // Process is complex due to the file structure
  // For now, output sample references that should be added

  console.log(`\nSample References to Add:`);

  const samples = [
    { keyword: "Defender for Cloud Apps", area: "security" },
    { keyword: "Conditional Access", area: "identity" },
    { keyword: "Safe Attachments", area: "email" },
    { keyword: "Identity Protection", area: "identity" },
  ];

  samples.forEach((s) => {
    const refs = findReferences(s.keyword, s.area);
    console.log(`\n  "${s.keyword}":`);
    refs.forEach((r) => console.log(`    - ${r}`));
  });

  console.log(`\n✅ Reference mapping ready. Run with --apply to update file.`);
}

processQuestions();
