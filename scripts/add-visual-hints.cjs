/**
 * Add Visual Hints to Top CA/MFA/Device Group Questions
 *
 * Adds text-based visualization hints to complex topic explanations
 *
 * Run: node scripts/add-visual-hints.cjs
 */

const fs = require("fs");
const path = require("path");

// Visual Hints for embedding
const VISUAL_HINTS = {
  conditionalAccess: `
",
      "",
      "📊 **Visualisierung - CA-Entscheidungsflow:**",
      "",
      "\`\`\`",
      "[Benutzer] ──► [Gerät] ──► [App] ──► [CA-Policy]",
      "                                        │",
      "              ┌──────────────────────────┼──────────────────────────┐",
      "              ▼                          ▼                          ▼",
      "     [Conditions erfüllt?]     [Grant Controls]           [Session Controls]",
      "        │ User/Group           │ Require MFA              │ Sign-in Frequency",
      "        │ Device Platform      │ Compliant Device         │ Persistent Browser",
      "        │ Location             │ Approved App             │ CA App Control",
      "        └──────────────────────┴──────────────────────────┴───────────────────",
      "                                        │",
      "                                        ▼",
      "              [✓ Zugriff erlaubt]  oder  [✗ Zugriff blockiert]",
      "\`\`\`"`,

  mfaTrust: `
",
      "",
      "📊 **Visualisierung - MFA/Trusted IP Entscheidung:**",
      "",
      "\`\`\`",
      "Sign-In Request",
      "      │",
      "      ▼",
      "┌─────────────────────────┐",
      "│ IP in MFA Trusted IPs? │",
      "└───────────┬─────────────┘",
      "      JA    │    NEIN",
      "      │     │      │",
      "      ▼     │      ▼",
      "[Skip MFA]  │  [CA-Policy prüfen]",
      "            │          │",
      "            │          ▼",
      "            │  ┌───────────────┐",
      "            │  │ MFA required? │──► JA ──► [MFA anfordern]",
      "            │  └───────┬───────┘",
      "            │         NEIN",
      "            │          │",
      "            │          ▼",
      "            │  [User = Enforced?]──► JA ──► [MFA IMMER]",
      "            │          │",
      "            │         NEIN",
      "            │          ▼",
      "            └────► [Kein MFA]",
      "\`\`\`",
      "",
      "⚠️ **Merke:** MFA-Status Enforced überschreibt ALLE Trusted IP Einstellungen!"`,

  deviceGroups: `
",
      "",
      "📊 **Visualisierung - Device Group Ranking:**",
      "",
      "\`\`\`",
      "Gerät onboarded",
      "      │",
      "      ▼",
      "┌─────────────────────────────────────────────┐",
      "│ Prüfe Matching Rules nach Rank (1 bis N)   │",
      "└─────────────────────────────────────────────┘",
      "      │",
      "      ▼",
      "Rank 1: Passt? ──► JA ──► [Nur Rank 1 zugewiesen] ──► STOP",
      "      │",
      "     NEIN",
      "      │",
      "      ▼",
      "Rank 2: Passt? ──► JA ──► [Nur Rank 2 zugewiesen] ──► STOP",
      "      │",
      "     NEIN",
      "      │",
      "      ▼",
      "  ... weitere Ranks ...",
      "      │",
      "      ▼",
      "[Ungrouped Machines] ◄── Fallback",
      "\`\`\`",
      "",
      "⚡ **Wichtig:** Gerät wird NUR der ERSTEN passenden Gruppe zugewiesen!"`,
};

// Question IDs to enhance (from analysis)
const QUESTIONS_TO_ENHANCE = {
  ms102: {
    conditionalAccess: [
      "Q52",
      "Q62",
      "Q68",
      "Q82",
      "Q85",
      "Q110",
      "Q143",
      "Q158",
      "Q159",
      "Q175",
      "Q185",
      "Q221",
      "Q223",
      "Q259",
      "Q260",
      "Q269",
      "Q343",
    ],
    mfaTrust: ["Q300", "Q301"],
    deviceGroups: ["Q38", "Q57", "Q99", "Q109", "Q121"],
  },
  md102: {
    conditionalAccess: ["Q10", "Q88", "Q155", "Q191", "Q261"],
    enrollment: ["Q24", "Q28", "Q72", "Q73", "Q126", "Q148", "Q199", "Q206"],
  },
};

function addVisualHints(filePath, questionIds, hintType) {
  console.log(`\nProcessing ${path.basename(filePath)} for ${hintType}...`);

  let content = fs.readFileSync(filePath, "utf8");
  let modifiedCount = 0;

  const hint = VISUAL_HINTS[hintType];
  if (!hint) {
    console.log(`  No hint available for ${hintType}`);
    return 0;
  }

  for (const qId of questionIds) {
    // Find question by ID
    const pattern = new RegExp(
      `(id:\\s*["']${qId}["'][\\s\\S]*?explanationDe:\\s*\\[[\\s\\S]*?)(\\]\\.join\\("\\\\n"\\))`,
      "g",
    );

    // Check if already has visualization
    const questionMatch = content.match(
      new RegExp(`id:\\s*["']${qId}["'][\\s\\S]{0,5000}?explanationDe:`),
    );
    if (questionMatch && questionMatch[0].includes("📊")) {
      console.log(`  ${qId}: Already has visualization`);
      continue;
    }

    const newContent = content.replace(pattern, (match, p1, p2) => {
      // Check if visualization already exists
      if (match.includes("📊 **Visualisierung")) {
        return match;
      }
      modifiedCount++;
      console.log(`  ${qId}: Added ${hintType} visualization`);
      return p1 + hint + ",\n" + p2;
    });

    if (newContent !== content) {
      content = newContent;
    }
  }

  if (modifiedCount > 0) {
    fs.writeFileSync(filePath, content);
  }

  console.log(`  Modified: ${modifiedCount} questions`);
  return modifiedCount;
}

// Main execution
const ms102Path = path.join(__dirname, "../src/app/ms102/data/questions.ts");
const md102Path = path.join(
  __dirname,
  "../src/app/lab-md102-exam/questions-md102.ts",
);

console.log("=".repeat(60));
console.log("ADDING VISUAL HINTS TO QUESTIONS");
console.log("=".repeat(60));

let totalModified = 0;

// MS-102 enhancements
totalModified += addVisualHints(
  ms102Path,
  QUESTIONS_TO_ENHANCE.ms102.conditionalAccess,
  "conditionalAccess",
);
totalModified += addVisualHints(
  ms102Path,
  QUESTIONS_TO_ENHANCE.ms102.mfaTrust,
  "mfaTrust",
);
totalModified += addVisualHints(
  ms102Path,
  QUESTIONS_TO_ENHANCE.ms102.deviceGroups,
  "deviceGroups",
);

// MD-102 enhancements
totalModified += addVisualHints(
  md102Path,
  QUESTIONS_TO_ENHANCE.md102.conditionalAccess,
  "conditionalAccess",
);

console.log("\n" + "=".repeat(60));
console.log(`TOTAL MODIFIED: ${totalModified} questions`);
console.log("=".repeat(60));

// Validate TypeScript
console.log("\nValidating TypeScript...");
const { execSync } = require("child_process");
try {
  execSync("npx tsc --noEmit", {
    cwd: path.join(__dirname, ".."),
    stdio: "pipe",
  });
  console.log("✅ TypeScript validation passed");
} catch (error) {
  console.log("⚠️ TypeScript validation warning - check files manually");
}
