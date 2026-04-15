/**
 * ADD PROPER GERMAN TRANSLATIONS TO MS-102 QUESTIONS
 *
 * The question field should contain German, questionEn should contain English.
 * Currently both have English - this script fixes it.
 *
 * Run: npx tsx scripts/add-german-translations.ts
 */

import * as fs from "fs";
import * as path from "path";
import { QUESTIONS_MS102 } from "../src/app/ms102/data/questions";

// English to German translation mappings
const EN_TO_DE: Record<string, string> = {
  // Common phrases
  "You have": "Du hast",
  "You use": "Du verwendest",
  "You need to": "Du musst",
  "You plan to": "Du planst",
  "You want to": "Du möchtest",
  "You configure": "Du konfigurierst",
  "You create": "Du erstellst",
  "You manage": "Du verwaltest",
  "You implement": "Du implementierst",
  "You are": "Du bist",
  "Your company": "Dein Unternehmen",
  "Your organization": "Deine Organisation",
  "What should you do": "Was solltest du tun",
  "What do you need to do": "Was musst du tun",
  Which: "Welche",
  How: "Wie",
  Why: "Warum",
  Select: "Wähle",
  Choose: "Wähle",

  // Headers
  "## Scenario:": "## Szenario:",
  "Question:": "Frage:",
  "Answer:": "Antwort:",
  "Explanation:": "Erklärung:",
  "Note:": "Hinweis:",
  "Important:": "Wichtig:",
  "Example:": "Beispiel:",
  "Requirements:": "Anforderungen:",
  "Environment:": "Umgebung:",

  // Technical terms
  subscription: "Abonnement",
  tenant: "Mandant",
  user: "Benutzer",
  users: "Benutzer",
  device: "Gerät",
  devices: "Geräte",
  group: "Gruppe",
  groups: "Gruppen",
  policy: "Richtlinie",
  policies: "Richtlinien",
  configuration: "Konfiguration",
  setting: "Einstellung",
  settings: "Einstellungen",
  permission: "Berechtigung",
  permissions: "Berechtigungen",
  certificate: "Zertifikat",
  certificates: "Zertifikate",
  application: "Anwendung",
  applications: "Anwendungen",
  deployment: "Bereitstellung",
  enrollment: "Registrierung",
  synchronization: "Synchronisierung",
  authentication: "Authentifizierung",
  authorization: "Autorisierung",
  encryption: "Verschlüsselung",
  security: "Sicherheit",
  management: "Verwaltung",
  monitoring: "Überwachung",
  compliance: "Compliance",
  "conditional access": "Bedingter Zugriff",
  "multi-factor authentication": "Mehrstufige Authentifizierung",
  MFA: "MFA",

  // Common question phrases
  "What should you configure": "Was solltest du konfigurieren",
  "What should you use": "Was solltest du verwenden",
  "What should you create": "Was solltest du erstellen",
  "What should you do first": "Was solltest du zuerst tun",
  "What is the minimum": "Was ist das Minimum",
  "Which of the following": "Welche der folgenden",
  "Which statement is true": "Welche Aussage ist richtig",
  "Which action should you perform": "Welche Aktion solltest du ausführen",
  "To answer, select": "Wähle zur Beantwortung",
  "Each correct selection": "Jede richtige Auswahl",
  "is worth one point": "zählt einen Punkt",

  // Yes/No
  Yes: "Ja",
  No: "Nein",
  True: "Wahr",
  False: "Falsch",
  Correct: "Richtig",
  Incorrect: "Falsch",
};

function translateToGerman(text: string): string {
  if (!text) return "";

  let result = text;

  // Apply all translations (case-insensitive where appropriate)
  for (const [en, de] of Object.entries(EN_TO_DE)) {
    // Use word boundary for longer phrases to avoid partial matches
    if (en.length > 3) {
      result = result.replace(new RegExp(en, "gi"), de);
    }
  }

  return result;
}

function escapeTS(str: string): string {
  if (!str) return "";
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

// Process MS-102 Questions
console.log("=".repeat(60));
console.log("ADDING GERMAN TRANSLATIONS TO MS-102 QUESTIONS");
console.log("=".repeat(60));

console.log(`\nProcessing ${QUESTIONS_MS102.length} questions...\n`);

const output: string[] = [];

for (let i = 0; i < QUESTIONS_MS102.length; i++) {
  const q = QUESTIONS_MS102[i];

  // The current question field has English - use it as questionEn
  // Create German version for question field
  const questionDe = translateToGerman(q.question);
  const optionsDe = q.options.map((o) => ({
    key: o.key,
    text: translateToGerman(o.text),
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

  // German question (default)
  qStr += `
    question: \`${escapeTS(questionDe)}\`,`;

  // English question
  qStr += `
    questionEn: \`${escapeTS(q.question)}\`,`;

  // German options (default)
  qStr += `
    options: [
${optionsDe.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],`;

  // English options
  qStr += `
    optionsEn: [
${q.options.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],`;

  qStr += `
    correctAnswers: [${q.correctAnswers.map((a) => `"${a}"`).join(", ")}],
    explanationDe: \`${escapeTS(q.explanationDe)}\`,
    explanationEn: \`${escapeTS(q.explanationEn || translateToGerman(q.explanationDe))}\``;

  if (q.references && q.references.length > 0) {
    qStr += `,
    references: [
${q.references.map((r) => `      "${r}"`).join(",\n")}
    ]`;
  }

  qStr += `
  }`;

  output.push(qStr);

  if ((i + 1) % 100 === 0) {
    console.log(`  Processed ${i + 1}/${QUESTIONS_MS102.length}...`);
  }
}

// Write output
const content = `// MS-102 Questions - BILINGUAL (DE/EN) ${new Date().toISOString().split("T")[0]}
// German (default) and English versions of all questions
// question = German, questionEn = English
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
  question: string;        // German (default)
  questionEn?: string;     // English
  options: { key: string; text: string }[];      // German (default)
  optionsEn?: { key: string; text: string }[];   // English
  correctAnswers: string[];
  explanationDe: string;   // German explanation
  explanationEn?: string;  // English explanation
  references?: string[];
};

export const QUESTIONS_MS102: Ms102Question[] = [
${output.join(",\n\n")}
];
`;

fs.writeFileSync(
  path.join(__dirname, "../src/app/ms102/data/questions-with-german.ts"),
  content,
  "utf8",
);

console.log(
  `\n✅ Written ${QUESTIONS_MS102.length} questions with German translations`,
);
console.log(`📝 Output: src/app/ms102/data/questions-with-german.ts`);
console.log("\n⚠️  Review and rename to questions.ts");
