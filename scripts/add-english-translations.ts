/**
 * ADD ENGLISH TRANSLATIONS TO ALL QUESTIONS
 *
 * This script adds English translations (questionEn, explanationEn, optionsEn)
 * to all MS-102 and MD-102 questions.
 *
 * Run: npx tsx scripts/add-english-translations.ts
 */

import * as fs from "fs";
import * as path from "path";
import { QUESTIONS_MD102 } from "../src/app/lab-md102-exam/questions-md102";
import { QUESTIONS_MS102 } from "../src/app/ms102/data/questions";

// German to English translation mappings
const TRANSLATIONS: Record<string, string> = {
  // Common phrases
  "Du hast": "You have",
  "Du verwendest": "You use",
  "Du musst": "You need to",
  "Du planst": "You plan to",
  "Du möchtest": "You want to",
  "Du konfigurierst": "You configure",
  "Du erstellst": "You create",
  "Du verwaltest": "You manage",
  "Du implementierst": "You implement",
  "Du benötigst": "You need",
  "Was solltest du tun": "What should you do",
  "Was solltest Du tun": "What should you do",
  "Was musst du tun": "What do you need to do",
  Welche: "Which",
  Wie: "How",
  Warum: "Why",
  "Frage:": "Question:",
  "Antwort:": "Answer:",
  "Erklärung:": "Explanation:",
  "Hinweis:": "Note:",
  "Wichtig:": "Important:",
  "Beispiel:": "Example:",

  // Technical terms
  "Szenario:": "Scenario:",
  Benutzer: "User",
  Gerät: "Device",
  Geräte: "Devices",
  Gruppe: "Group",
  Gruppen: "Groups",
  Richtlinie: "Policy",
  Richtlinien: "Policies",
  Konfiguration: "Configuration",
  Einstellung: "Setting",
  Einstellungen: "Settings",
  Berechtigung: "Permission",
  Berechtigungen: "Permissions",
  Zertifikat: "Certificate",
  Zertifikate: "Certificates",
  Anwendung: "Application",
  Anwendungen: "Applications",
  Bereitstellung: "Deployment",
  Registrierung: "Enrollment",
  Synchronisierung: "Synchronization",
  Authentifizierung: "Authentication",
  Autorisierung: "Authorization",
  Verschlüsselung: "Encryption",
  Sicherheit: "Security",
  Verwaltung: "Management",
  Überwachung: "Monitoring",
  Compliance: "Compliance",
  Konformität: "Compliance",

  // Intune/Endpoint specific
  "Intune-Verwaltung": "Intune management",
  Geräteregistrierung: "Device enrollment",
  "App-Schutzrichtlinie": "App protection policy",
  "Geräte-Compliancerichtlinie": "Device compliance policy",
  Konfigurationsprofil: "Configuration profile",
  "Windows Autopilot": "Windows Autopilot",
  "Co-Management": "Co-management",
  "Bedingter Zugriff": "Conditional access",
  "Mehrstufige Authentifizierung": "Multi-factor authentication",

  // MS-102 / Entra specific
  "Entra ID": "Entra ID",
  "Azure AD": "Azure AD",
  Mandant: "Tenant",
  Verzeichnis: "Directory",
  Rolle: "Role",
  Rollen: "Roles",
  Administrator: "Administrator",
  "Globaler Administrator": "Global Administrator",
  Sicherheitsadministrator: "Security Administrator",
  "Defender for Cloud Apps": "Defender for Cloud Apps",
  "Defender for Identity": "Defender for Identity",
  "Defender for Endpoint": "Defender for Endpoint",
  "Defender for Office 365": "Defender for Office 365",
  "Microsoft 365 Defender": "Microsoft 365 Defender",

  // Connectors
  richtig: "correct",
  falsch: "incorrect",
  korrekt: "correct",
  inkorrekt: "incorrect",
  Ja: "Yes",
  Nein: "No",
  wahr: "true",
  "nicht wahr": "not true",

  // Company names stay the same (they are fictional German names)
};

// Simple translation function
function translateToEnglish(text: string): string {
  if (!text) return "";

  let result = text;

  // Apply all translations
  for (const [de, en] of Object.entries(TRANSLATIONS)) {
    result = result.replace(new RegExp(de, "gi"), en);
  }

  // Convert "## Szenario:" to "## Scenario:"
  result = result.replace(/## Szenario:/gi, "## Scenario:");

  return result;
}

function escapeTS(str: string): string {
  if (!str) return "";
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

// Process MS-102 Questions
console.log("=".repeat(60));
console.log("ADDING ENGLISH TRANSLATIONS TO MS-102 QUESTIONS");
console.log("=".repeat(60));

console.log(`\nProcessing ${QUESTIONS_MS102.length} questions...\n`);

const ms102Output: string[] = [];

for (let i = 0; i < QUESTIONS_MS102.length; i++) {
  const q = QUESTIONS_MS102[i];

  // Generate English versions
  const questionEn = translateToEnglish(q.question);
  const explanationEn = translateToEnglish(q.explanationDe);
  const optionsEn = q.options.map((o) => ({
    key: o.key,
    text: translateToEnglish(o.text),
  }));

  let qStr = `  {
    id: "${q.id}",
    number: ${q.number},
    area: "${q.area}",
    difficulty: "${q.difficulty}",
    type: "${q.type || "standard"}",`;

  if (q.diagram) {
    qStr += `
    diagram: \`${escapeTS(q.diagram)}\`,`;
  }

  if (q.terminal) {
    qStr += `
    terminal: {
      prompt: "${q.terminal.prompt}",
      commands: [${q.terminal.commands.map((c) => `"${escapeTS(c)}"`).join(", ")}]
    },`;
  }

  qStr += `
    question: \`${escapeTS(q.question)}\`,
    questionEn: \`${escapeTS(questionEn)}\`,
    options: [
${q.options.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],
    optionsEn: [
${optionsEn.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],
    correctAnswers: [${q.correctAnswers.map((a) => `"${a}"`).join(", ")}],
    explanationDe: \`${escapeTS(q.explanationDe)}\`,
    explanationEn: \`${escapeTS(explanationEn)}\``;

  if (q.references && q.references.length > 0) {
    qStr += `,
    references: [
${q.references.map((r) => `      "${r}"`).join(",\n")}
    ]`;
  }

  qStr += `
  }`;

  ms102Output.push(qStr);

  if ((i + 1) % 100 === 0) {
    console.log(`  MS-102: Processed ${i + 1}/${QUESTIONS_MS102.length}...`);
  }
}

// Write MS-102 output
const ms102Content = `// MS-102 Questions - BILINGUAL (DE/EN) ${new Date().toISOString().split("T")[0]}
// German and English versions of all questions
// Total: ${QUESTIONS_MS102.length} Fragen / Questions

export type Ms102Question = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard";
  type?: "standard" | "drag-drop" | "hotspot" | "terminal" | "lab" | "diagram";
  diagram?: string;
  terminal?: {
    prompt: string;
    commands: string[];
  };
  question: string;
  questionEn?: string;
  options: { key: string; text: string }[];
  optionsEn?: { key: string; text: string }[];
  correctAnswers: string[];
  explanationDe: string;
  explanationEn?: string;
  references?: string[];
};

export const QUESTIONS_MS102: Ms102Question[] = [
${ms102Output.join(",\n\n")}
];
`;

fs.writeFileSync(
  path.join(__dirname, "../src/app/ms102/data/questions-bilingual.ts"),
  ms102Content,
  "utf8",
);

console.log(
  `\n✅ MS-102: Written ${QUESTIONS_MS102.length} bilingual questions`,
);

// Process MD-102 Questions
console.log("\n" + "=".repeat(60));
console.log("ADDING ENGLISH TRANSLATIONS TO MD-102 QUESTIONS");
console.log("=".repeat(60));

console.log(`\nProcessing ${QUESTIONS_MD102.length} questions...\n`);

const md102Output: string[] = [];

for (let i = 0; i < QUESTIONS_MD102.length; i++) {
  const q = QUESTIONS_MD102[i];

  // Generate English versions
  const questionEn = translateToEnglish(q.question);
  const explanationEn = translateToEnglish(
    q.explanation || q.explanationDe || "",
  );
  const optionsEn = q.options.map((o) => ({
    key: o.key,
    text: translateToEnglish(o.text),
  }));

  let qStr = `  {
    id: "${q.id}",
    number: ${q.number},
    area: "${q.area}",
    difficulty: "${q.difficulty}",
    type: "${q.type || "standard"}",`;

  if (q.diagram) {
    qStr += `
    diagram: \`${escapeTS(q.diagram)}\`,`;
  }

  qStr += `
    question: \`${escapeTS(q.question)}\`,
    questionEn: \`${escapeTS(questionEn)}\`,
    options: [
${q.options.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],
    optionsEn: [
${optionsEn.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],
    correctAnswers: [${q.correctAnswers.map((a) => `"${a}"`).join(", ")}],
    explanation: \`${escapeTS(q.explanation || q.explanationDe || "")}\`,
    explanationEn: \`${escapeTS(explanationEn)}\``;

  if (q.references && q.references.length > 0) {
    qStr += `,
    references: [
${q.references.map((r) => `      "${r}"`).join(",\n")}
    ]`;
  }

  qStr += `
  }`;

  md102Output.push(qStr);

  if ((i + 1) % 50 === 0) {
    console.log(`  MD-102: Processed ${i + 1}/${QUESTIONS_MD102.length}...`);
  }
}

// Write MD-102 output
const md102Content = `// MD-102 Questions - BILINGUAL (DE/EN) ${new Date().toISOString().split("T")[0]}
// German and English versions of all questions
// Total: ${QUESTIONS_MD102.length} Fragen / Questions

export type Md102Question = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard" | "info";
  type?: "standard" | "drag-drop" | "hotspot" | "terminal" | "lab" | "diagram";
  diagram?: string;
  question: string;
  questionEn?: string;
  options: { key: string; text: string }[];
  optionsEn?: { key: string; text: string }[];
  correctAnswers: string[];
  explanation?: string;
  explanationDe?: string;
  explanationEn?: string;
  references?: string[];
};

export const QUESTIONS_MD102: Md102Question[] = [
${md102Output.join(",\n\n")}
];
`;

fs.writeFileSync(
  path.join(
    __dirname,
    "../src/app/lab-md102-exam/questions-md102-bilingual.ts",
  ),
  md102Content,
  "utf8",
);

console.log(
  `\n✅ MD-102: Written ${QUESTIONS_MD102.length} bilingual questions`,
);

console.log("\n" + "=".repeat(60));
console.log("DONE!");
console.log("=".repeat(60));
console.log("\nBilingual files created:");
console.log("  - src/app/ms102/data/questions-bilingual.ts");
console.log("  - src/app/lab-md102-exam/questions-md102-bilingual.ts");
console.log("\nReview and rename to replace original files.");
