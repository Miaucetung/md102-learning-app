/**
 * MD-102 Questions Enhancement Script
 * Adds Microsoft Learn references based on question content
 */

const fs = require("fs");

// MD-102 specific reference mappings (Endpoint Administrator focus)
const REFERENCE_MAPPINGS = [
  // App Protection & MAM
  {
    patterns: ["app protection policy", "app protection policies", "mam"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/app-protection-policy"],
  },
  {
    patterns: ["app configuration policy", "app configuration"],
    refs: [
      "https://learn.microsoft.com/mem/intune/apps/app-configuration-policies-overview",
    ],
  },
  {
    patterns: ["managed browser", "edge for business"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/manage-microsoft-edge"],
  },
  {
    patterns: ["selective wipe", "app wipe"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/apps-selective-wipe"],
  },
  {
    patterns: ["copy paste", "copy and paste", "data transfer"],
    refs: [
      "https://learn.microsoft.com/mem/intune/apps/app-protection-policy-settings-ios",
    ],
  },

  // App Deployment
  {
    patterns: ["lob app", "line-of-business", "line of business"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/lob-apps-windows"],
  },
  {
    patterns: [".ipa", "ios app"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/lob-apps-ios"],
  },
  {
    patterns: [".apk", "android app"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/lob-apps-android"],
  },
  {
    patterns: [".msi", ".msix", "win32 app", "windows app"],
    refs: [
      "https://learn.microsoft.com/mem/intune/apps/apps-win32-app-management",
    ],
  },
  {
    patterns: ["microsoft 365 apps", "office apps", "m365 apps"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/apps-add-office365"],
  },
  {
    patterns: ["store app", "microsoft store"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/store-apps-microsoft"],
  },
  {
    patterns: ["required app", "available app", "app assignment"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/apps-deploy"],
  },
  {
    patterns: ["webview2"],
    refs: [
      "https://learn.microsoft.com/mem/intune/apps/apps-add-office365#webview2-runtime-integration",
    ],
  },

  // Device Enrollment
  {
    patterns: ["autopilot", "auto pilot"],
    refs: ["https://learn.microsoft.com/autopilot/windows-autopilot"],
  },
  {
    patterns: ["enrollment restriction", "enrollment restrictions"],
    refs: [
      "https://learn.microsoft.com/mem/intune/enrollment/enrollment-restrictions-set",
    ],
  },
  {
    patterns: ["device limit", "device enrollment limit"],
    refs: [
      "https://learn.microsoft.com/mem/intune/enrollment/create-device-limit-restrictions",
    ],
  },
  {
    patterns: ["apple business manager", "abm", "dep"],
    refs: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    patterns: ["android enterprise", "work profile"],
    refs: [
      "https://learn.microsoft.com/mem/intune/enrollment/android-work-profile-enroll",
    ],
  },
  {
    patterns: ["device administrator", "android legacy"],
    refs: [
      "https://learn.microsoft.com/mem/intune/enrollment/android-enroll-device-administrator",
    ],
  },
  {
    patterns: ["corporate-owned", "cope", "fully managed"],
    refs: [
      "https://learn.microsoft.com/mem/intune/enrollment/android-fully-managed-enroll",
    ],
  },
  {
    patterns: ["kiosk", "dedicated device"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/device-restrictions-android-for-work#device-experience",
    ],
  },
  {
    patterns: ["user enrollment", "byod ios"],
    refs: [
      "https://learn.microsoft.com/mem/intune/enrollment/ios-user-enrollment",
    ],
  },
  {
    patterns: ["automated device enrollment", "ade"],
    refs: [
      "https://learn.microsoft.com/mem/intune/enrollment/device-enrollment-program-enroll-ios",
    ],
  },
  {
    patterns: ["co-management", "co management"],
    refs: ["https://learn.microsoft.com/mem/configmgr/comanage/overview"],
  },

  // Device Configuration
  {
    patterns: ["device configuration profile", "configuration profile"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/device-profiles",
    ],
  },
  {
    patterns: ["administrative template", "admx"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/administrative-templates-windows",
    ],
  },
  {
    patterns: ["settings catalog"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/settings-catalog",
    ],
  },
  {
    patterns: ["vpn profile", "vpn configuration"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/vpn-settings-configure",
    ],
  },
  {
    patterns: ["wifi profile", "wi-fi profile", "wifi configuration"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/wi-fi-settings-configure",
    ],
  },
  {
    patterns: ["certificate profile", "scep", "pkcs"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/certificates-configure",
    ],
  },
  {
    patterns: ["trusted certificate", "root certificate"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/certificates-trusted-root",
    ],
  },
  {
    patterns: ["email profile", "exchange activesync"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/email-settings-configure",
    ],
  },
  {
    patterns: ["custom profile", "oma-uri"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/custom-settings-configure",
    ],
  },
  {
    patterns: ["applicability rule", "applicability rules"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/device-profile-assign#applicability-rules",
    ],
  },
  {
    patterns: ["scope tag", "scope tags"],
    refs: ["https://learn.microsoft.com/mem/intune/fundamentals/scope-tags"],
  },
  {
    patterns: ["assignment filter", "filter"],
    refs: ["https://learn.microsoft.com/mem/intune/fundamentals/filters"],
  },

  // Compliance & Conditional Access
  {
    patterns: ["compliance policy", "compliance policies", "device compliance"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started",
    ],
  },
  {
    patterns: ["actions for noncompliance", "noncompliance action"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/actions-for-noncompliance",
    ],
  },
  {
    patterns: ["conditional access", "ca policy"],
    refs: ["https://learn.microsoft.com/mem/intune/protect/conditional-access"],
  },
  {
    patterns: ["compliance policy settings", "mark devices"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/device-compliance-get-started#compliance-policy-settings",
    ],
  },

  // Security & Protection
  {
    patterns: ["endpoint security", "endpoint protection"],
    refs: ["https://learn.microsoft.com/mem/intune/protect/endpoint-security"],
  },
  {
    patterns: ["bitlocker", "disk encryption"],
    refs: ["https://learn.microsoft.com/mem/intune/protect/encrypt-devices"],
  },
  {
    patterns: ["filevault", "macos encryption"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/encrypt-devices-filevault",
    ],
  },
  {
    patterns: ["windows defender", "microsoft defender antivirus"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-antivirus-policy",
    ],
  },
  {
    patterns: ["firewall", "windows firewall"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-firewall-policy",
    ],
  },
  {
    patterns: ["attack surface reduction", "asr"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-asr-policy",
    ],
  },
  {
    patterns: ["security baseline", "security baselines"],
    refs: ["https://learn.microsoft.com/mem/intune/protect/security-baselines"],
  },
  {
    patterns: ["account protection"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/endpoint-security-account-protection-policy",
    ],
  },

  // Updates
  {
    patterns: ["windows update", "update ring", "update rings"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/windows-update-for-business-configure",
    ],
  },
  {
    patterns: ["feature update", "feature updates"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/windows-10-feature-updates",
    ],
  },
  {
    patterns: ["quality update", "quality updates"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/windows-10-expedite-updates",
    ],
  },
  {
    patterns: ["driver update", "driver updates"],
    refs: [
      "https://learn.microsoft.com/mem/intune/protect/windows-driver-updates-overview",
    ],
  },
  {
    patterns: ["delivery optimization"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/delivery-optimization-windows",
    ],
  },

  // Endpoint Analytics
  {
    patterns: ["endpoint analytics"],
    refs: ["https://learn.microsoft.com/mem/analytics/overview"],
  },
  {
    patterns: ["startup performance", "boot performance"],
    refs: ["https://learn.microsoft.com/mem/analytics/startup-performance"],
  },
  {
    patterns: ["proactive remediation", "proactive remediations"],
    refs: ["https://learn.microsoft.com/mem/analytics/proactive-remediations"],
  },
  {
    patterns: ["application reliability"],
    refs: ["https://learn.microsoft.com/mem/analytics/app-reliability"],
  },
  {
    patterns: ["restart frequency"],
    refs: ["https://learn.microsoft.com/mem/analytics/restart-frequency"],
  },

  // Remote Actions
  {
    patterns: ["remote wipe", "wipe device", "factory reset"],
    refs: [
      "https://learn.microsoft.com/mem/intune/remote-actions/devices-wipe",
    ],
  },
  {
    patterns: ["remote lock", "lock device"],
    refs: [
      "https://learn.microsoft.com/mem/intune/remote-actions/device-remote-lock",
    ],
  },
  {
    patterns: ["retire", "remove company data"],
    refs: [
      "https://learn.microsoft.com/mem/intune/remote-actions/devices-wipe#retire",
    ],
  },
  {
    patterns: ["fresh start"],
    refs: [
      "https://learn.microsoft.com/mem/intune/remote-actions/device-fresh-start",
    ],
  },
  {
    patterns: ["collect diagnostics"],
    refs: [
      "https://learn.microsoft.com/mem/intune/remote-actions/collect-diagnostics",
    ],
  },
  {
    patterns: ["locate device", "find device"],
    refs: [
      "https://learn.microsoft.com/mem/intune/remote-actions/device-locate",
    ],
  },

  // Scripts & Automation
  {
    patterns: ["powershell script", "intune script"],
    refs: [
      "https://learn.microsoft.com/mem/intune/apps/intune-management-extension",
    ],
  },
  {
    patterns: ["remediation script"],
    refs: ["https://learn.microsoft.com/mem/analytics/proactive-remediations"],
  },
  {
    patterns: ["shell script", "macos script"],
    refs: ["https://learn.microsoft.com/mem/intune/apps/macos-shell-scripts"],
  },

  // Reporting & Monitoring
  {
    patterns: ["intune report", "device report"],
    refs: ["https://learn.microsoft.com/mem/intune/fundamentals/reports"],
  },
  {
    patterns: ["log analytics", "azure monitor"],
    refs: [
      "https://learn.microsoft.com/mem/intune/fundamentals/review-logs-using-azure-monitor",
    ],
  },
  {
    patterns: ["data warehouse"],
    refs: [
      "https://learn.microsoft.com/mem/intune/developer/reports-nav-intune-data-warehouse",
    ],
  },

  // Group Policy Analytics
  {
    patterns: ["group policy analytics", "gpo migration"],
    refs: [
      "https://learn.microsoft.com/mem/intune/configuration/group-policy-analytics",
    ],
  },

  // RBAC
  {
    patterns: ["role-based access", "rbac", "intune role"],
    refs: [
      "https://learn.microsoft.com/mem/intune/fundamentals/role-based-access-control",
    ],
  },
];

// Fallback references by area
const AREA_FALLBACKS = {
  "Protect Devices": "https://learn.microsoft.com/mem/intune/protect/",
  "Manage Applications": "https://learn.microsoft.com/mem/intune/apps/",
  "Prepare infrastructure":
    "https://learn.microsoft.com/mem/intune/enrollment/",
  "Deploy Windows": "https://learn.microsoft.com/autopilot/windows-autopilot",
  "Enroll devices": "https://learn.microsoft.com/mem/intune/enrollment/",
};

function findReferences(questionText, area) {
  const refs = new Set();
  const textLower = questionText.toLowerCase();

  for (const mapping of REFERENCE_MAPPINGS) {
    for (const pattern of mapping.patterns) {
      if (textLower.includes(pattern)) {
        mapping.refs.forEach((r) => refs.add(r));
        break;
      }
    }
  }

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
  const filePath = "src/app/lab-md102-exam/questions-md102.ts";
  let content = fs.readFileSync(filePath, "utf8");

  let modified = 0;
  let alreadyHas = 0;

  // Find each question block
  const blocks = content.split(/(?=\s*{\s*(?:id:\s*["']Q|\s*number:\s*\d))/);

  const processedBlocks = blocks.map((block, index) => {
    if (index === 0) return block;

    // Check if already has references
    if (/references:\s*\[/.test(block)) {
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

    const refs = findReferences(questionText, area);

    if (refs.length === 0) return block;

    // Find the best insertion point
    const refsString = `\n\n    references: [\n      "${refs.join('",\n      "')}"\n    ],`;

    // Try different ending patterns
    const patterns = [
      /(\]\.join\("\n"\),?\s*)(?=\s*},?)/,
      /(\]\.join\('\\n'\),?\s*)(?=\s*},?)/,
      /(explanationDe.*?\]\.join\([^)]+\),?\s*)(?=\s*},?)/s,
      /(explanation.*?\]\.join\([^)]+\),?\s*)(?=\s*},?)/s,
    ];

    for (const pattern of patterns) {
      const match = block.match(pattern);
      if (match) {
        const insertPos = block.indexOf(match[1]) + match[1].length;
        const beforeComma = block[insertPos - 1] === "," ? "" : "";
        block = block.slice(0, insertPos) + refsString + block.slice(insertPos);
        modified++;
        return block;
      }
    }

    return block;
  });

  const newContent = processedBlocks.join("");
  fs.writeFileSync(filePath, newContent, "utf8");

  console.log("\n✅ MD-102 Questions Updated");
  console.log(`   Modified: ${modified} questions`);
  console.log(`   Already had refs: ${alreadyHas} questions`);
  console.log(`   Total processed: ${blocks.length - 1} questions`);
}

// Backup first
const src = "src/app/lab-md102-exam/questions-md102.ts";
const backup = "src/app/lab-md102-exam/questions-md102.backup.ts";
fs.copyFileSync(src, backup);
console.log("📦 Created backup: questions-md102.backup.ts");

processFile();
