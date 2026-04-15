/**
 * Script to enhance MS-102 and MD-102 questions with ASCII diagrams
 * Adds visual representations for complex topics in explanations
 *
 * Run: node scripts/add-diagrams.cjs
 */

const fs = require("fs");
const path = require("path");

// ASCII Diagrams to add to explanations
const ASCII_DIAGRAMS = {
  conditionalAccessFlow: `
\`\`\`
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
└─────────────────────────────────────────────────────────────────────┘
\`\`\``,

  mfaTrustFlow: `
\`\`\`
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
│  ⚠️  Merke: MFA "Enforced" User MUSS IMMER MFA nutzen!          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
\`\`\``,

  defenderDeviceGroups: `
\`\`\`
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
└─────────────────────────────────────────────────────────────────┘
\`\`\``,

  intuneEnrollmentFlow: `
\`\`\`
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
└─────────────────────────────────────────────────────────────────┘
\`\`\``,

  appProtectionDataFlow: `
\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│              APP PROTECTION POLICY - DATA FLOW                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   MANAGED APP                    UNMANAGED APP                  │
│  ┌──────────────┐               ┌──────────────┐                │
│  │  Outlook     │               │  WhatsApp    │                │
│  │  (Corporate) │               │  (Personal)  │                │
│  └──────┬───────┘               └──────────────┘                │
│         │                              ↑                        │
│         │ Copy/Paste                   │                        │
│         │ blocked by APP               │                        │
│         ↓                              │ ✗                      │
│  ┌──────────────┐                      │                        │
│  │   Teams      │ ─────────────────────┘                        │
│  │  (Corporate) │   "Cut/Copy disabled to unmanaged apps"      │
│  └──────────────┘                                               │
│                                                                  │
│  ✓ Copy within managed apps     ✗ Copy to unmanaged apps       │
│  ✓ Share via managed apps       ✗ Share via personal apps      │
│  ✓ Save to OneDrive corporate   ✗ Save to personal storage     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
\`\`\``,
};

// Topic patterns and corresponding diagrams
const DIAGRAM_MAPPINGS = [
  {
    patterns: [
      /Conditional Access.*MFA|MFA.*Conditional|Trusted.*IP.*MFA|Named Location.*MFA/i,
    ],
    diagram: "mfaTrustFlow",
    insertAfter: "Fazit:",
  },
  {
    patterns: [
      /Conditional Access.*policy|CA-Policy|conditional access policy/i,
    ],
    diagram: "conditionalAccessFlow",
    insertAfter: "Fazit:",
  },
  {
    patterns: [
      /device group.*rank|Defender.*device group|matching rule.*group/i,
    ],
    diagram: "defenderDeviceGroups",
    insertAfter: "WICHTIG:",
  },
  {
    patterns: [/Intune.*enrollment|enrollment.*method|Autopilot.*enrollment/i],
    diagram: "intuneEnrollmentFlow",
    insertAfter: "Fazit:",
  },
  {
    patterns: [/App Protection.*copy|copy.*paste.*policy|MAM.*data/i],
    diagram: "appProtectionDataFlow",
    insertAfter: "Fazit:",
  },
];

function addDiagramsToFile(filePath) {
  console.log(`\nProcessing: ${filePath}`);

  let content = fs.readFileSync(filePath, "utf8");
  let modifiedCount = 0;

  // Find all explanationDe blocks
  const questionBlocks = content.split(/(?=\{\s*(?:id|number):)/);

  let newContent = "";

  for (const block of questionBlocks) {
    let modifiedBlock = block;

    // Check if this question matches any diagram pattern
    for (const mapping of DIAGRAM_MAPPINGS) {
      const matchesPattern = mapping.patterns.some((p) => p.test(block));

      if (matchesPattern && !block.includes("┌───")) {
        // Check if diagram not already present
        // Find where to insert the diagram
        const diagram = ASCII_DIAGRAMS[mapping.diagram];

        if (diagram) {
          // Try to insert after explanationDe closing bracket or add to explanation
          const explanationMatch = block.match(
            /(explanationDe:\s*\[[\s\S]*?)\]\.join\("\\n"\)/,
          );

          if (explanationMatch) {
            // Add diagram as additional content in the explanation array
            const insertText = `",\n      "",\n      "📊 **Visualisierung:**",\n      "${diagram.replace(/\n/g, '",\n      "').replace(/"/g, '\\"')}`;
            modifiedBlock = block.replace(
              explanationMatch[0],
              explanationMatch[1] + insertText + '].join("\\n")',
            );
            modifiedCount++;
            console.log(`  Added ${mapping.diagram} diagram`);
            break; // Only add one diagram per question
          }
        }
      }
    }

    newContent += modifiedBlock;
  }

  if (modifiedCount > 0) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Modified ${modifiedCount} questions with diagrams`);
  } else {
    console.log(
      "No questions modified (diagrams already present or no matches)",
    );
  }

  return modifiedCount;
}

// Simpler approach: Just report which questions could benefit from diagrams
function analyzeForDiagrams(filePath) {
  console.log(`\nAnalyzing: ${filePath}`);

  const content = fs.readFileSync(filePath, "utf8");
  const results = [];

  // Extract question IDs and content
  const questionMatches = content.matchAll(
    /id:\s*"(Q\w+)"[\s\S]*?question:\s*[\[`]([\s\S]*?)[\]`]/g,
  );

  for (const match of questionMatches) {
    const id = match[1];
    const questionText = match[2];

    for (const mapping of DIAGRAM_MAPPINGS) {
      if (mapping.patterns.some((p) => p.test(questionText))) {
        results.push({
          id,
          diagram: mapping.diagram,
          preview: questionText.substring(0, 100).replace(/\n/g, " "),
        });
        break;
      }
    }
  }

  console.log(
    `\nFound ${results.length} questions that could benefit from diagrams:`,
  );
  for (const r of results) {
    console.log(`  ${r.id}: ${r.diagram}`);
    console.log(`    Preview: ${r.preview}...`);
  }

  return results;
}

// Main execution
const ms102Path = path.join(__dirname, "../src/app/ms102/data/questions.ts");
const md102Path = path.join(
  __dirname,
  "../src/app/lab-md102-exam/questions-md102.ts",
);

console.log("=".repeat(60));
console.log("DIAGRAM ANALYSIS FOR MS-102 AND MD-102 QUESTIONS");
console.log("=".repeat(60));

const ms102Results = analyzeForDiagrams(ms102Path);
const md102Results = analyzeForDiagrams(md102Path);

console.log("\n" + "=".repeat(60));
console.log("SUMMARY");
console.log("=".repeat(60));
console.log(`MS-102: ${ms102Results.length} questions could use diagrams`);
console.log(`MD-102: ${md102Results.length} questions could use diagrams`);
console.log("\nDiagram types available:");
Object.keys(ASCII_DIAGRAMS).forEach((k) => console.log(`  - ${k}`));
