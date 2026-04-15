/**
 * PROPER BILINGUAL MS-102 QUESTIONS
 *
 * Keep English as primary (original exam questions)
 * Add proper German translations
 *
 * Run: npx tsx scripts/create-bilingual-questions.ts
 */

import * as fs from "fs";
import * as path from "path";
import { QUESTIONS_MS102 } from "../src/app/ms102/data/questions-backup";

// Full sentence/phrase translations for common patterns
const TRANSLATIONS: [RegExp, string][] = [
  // Opening phrases
  [
    /You have a Microsoft 365 E5 subscription/gi,
    "Du hast ein Microsoft 365 E5-Abonnement",
  ],
  [
    /You have a Microsoft 365 subscription/gi,
    "Du hast ein Microsoft 365-Abonnement",
  ],
  [/You have an Azure AD tenant/gi, "Du hast einen Azure AD-Mandanten"],
  [
    /You have a Microsoft Entra tenant/gi,
    "Du hast einen Microsoft Entra-Mandanten",
  ],
  [/You have a hybrid/gi, "Du hast eine hybride"],
  [/Your company has/gi, "Dein Unternehmen hat"],
  [/Your organization has/gi, "Deine Organisation hat"],
  [/You are the administrator/gi, "Du bist der Administrator"],
  [/You are a global administrator/gi, "Du bist ein globaler Administrator"],

  // Requirement phrases
  [/You need to ensure that/gi, "Du musst sicherstellen, dass"],
  [/You need to configure/gi, "Du musst konfigurieren"],
  [/You need to create/gi, "Du musst erstellen"],
  [/You need to be notified/gi, "Du musst benachrichtigt werden"],
  [/You need to implement/gi, "Du musst implementieren"],
  [/You need to prevent/gi, "Du musst verhindern"],
  [/You need to allow/gi, "Du musst erlauben"],
  [/You need to restrict/gi, "Du musst einschränken"],
  [/You need to enable/gi, "Du musst aktivieren"],
  [/You need to disable/gi, "Du musst deaktivieren"],
  [/You plan to/gi, "Du planst"],
  [/You want to/gi, "Du möchtest"],

  // Question endings
  [/What should you configure\?/gi, "Was solltest du konfigurieren?"],
  [/What should you use\?/gi, "Was solltest du verwenden?"],
  [/What should you create\?/gi, "Was solltest du erstellen?"],
  [/What should you do\?/gi, "Was solltest du tun?"],
  [/What should you do first\?/gi, "Was solltest du zuerst tun?"],
  [/What should you recommend\?/gi, "Was solltest du empfehlen?"],
  [/Which of the following/gi, "Welche der folgenden"],
  [/Which statement is true/gi, "Welche Aussage ist richtig"],
  [/Which action should you perform/gi, "Welche Aktion solltest du ausführen"],
  [/What is the minimum/gi, "Was ist das Minimum"],
  [/What is required/gi, "Was ist erforderlich"],
  [/How many/gi, "Wie viele"],
  [/How should you/gi, "Wie solltest du"],

  // Technical terms
  [
    /that uses Microsoft Defender for Cloud Apps/gi,
    "das Microsoft Defender for Cloud Apps verwendet",
  ],
  [
    /that uses Microsoft Defender for Identity/gi,
    "das Microsoft Defender for Identity verwendet",
  ],
  [
    /that uses Microsoft Defender for Endpoint/gi,
    "das Microsoft Defender for Endpoint verwendet",
  ],
  [/that uses Microsoft Intune/gi, "das Microsoft Intune verwendet"],
  [/that contains the following/gi, "das Folgendes enthält"],
  [/that syncs with/gi, "das synchronisiert wird mit"],
  [/in the following table/gi, "in der folgenden Tabelle"],
  [/shown in the exhibit/gi, "wie in der Abbildung gezeigt"],
  [/shown in the table/gi, "wie in der Tabelle gezeigt"],

  // Common words
  [/subscription/gi, "Abonnement"],
  [/tenant/gi, "Mandant"],
  [/users/gi, "Benutzer"],
  [/user/gi, "Benutzer"],
  [/devices/gi, "Geräte"],
  [/device/gi, "Gerät"],
  [/groups/gi, "Gruppen"],
  [/group/gi, "Gruppe"],
  [/policies/gi, "Richtlinien"],
  [/policy/gi, "Richtlinie"],
  [/settings/gi, "Einstellungen"],
  [/setting/gi, "Einstellung"],
  [/permissions/gi, "Berechtigungen"],
  [/permission/gi, "Berechtigung"],
  [/requirements/gi, "Anforderungen"],
  [/requirement/gi, "Anforderung"],
  [/downloads/gi, "Downloads"],
  [/files/gi, "Dateien"],
  [/file/gi, "Datei"],

  // Scenario header
  [/## Scenario:/gi, "## Szenario:"],
  [/## Szenario:/gi, "## Szenario:"],
];

function translateToGerman(text: string): string {
  if (!text) return "";

  let result = text;

  // Apply translations in order (longer phrases first)
  for (const [pattern, replacement] of TRANSLATIONS) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

function escapeTS(str: string): string {
  if (!str) return "";
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

console.log("=".repeat(60));
console.log("CREATING PROPER BILINGUAL MS-102 QUESTIONS");
console.log("=".repeat(60));

console.log(`\nProcessing ${QUESTIONS_MS102.length} questions...\n`);

const output: string[] = [];

for (let i = 0; i < QUESTIONS_MS102.length; i++) {
  const q = QUESTIONS_MS102[i];

  // Original question is English - create German translation
  const questionEn = q.question;
  const questionDe = translateToGerman(q.question);

  // Options - keep English originals, create German translations
  const optionsEn = q.options;
  const optionsDe = q.options.map((o) => ({
    key: o.key,
    text: translateToGerman(o.text),
  }));

  let qStr = `  {
    id: "${q.id}",
    number: ${q.number},
    area: "${q.area}",
    difficulty: "${q.difficulty}",
    question: \`${escapeTS(questionDe)}\`,
    questionEn: \`${escapeTS(questionEn)}\`,
    options: [
${optionsDe.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],
    optionsEn: [
${optionsEn.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],
    correctAnswers: [${q.correctAnswers.map((a) => `"${a}"`).join(", ")}],
    explanationDe: \`${escapeTS(q.explanationDe)}\``;

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

const content = `// MS-102 Questions - BILINGUAL (DE/EN) ${new Date().toISOString().split("T")[0]}
// question = German (default), questionEn = English
// options = German (default), optionsEn = English
// Total: ${QUESTIONS_MS102.length} Questions

export type Ms102Question = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard";
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
  path.join(__dirname, "../src/app/ms102/data/questions.ts"),
  content,
  "utf8",
);

console.log(`\n✅ Written ${QUESTIONS_MS102.length} bilingual questions`);
console.log(`📝 Saved to: src/app/ms102/data/questions.ts`);
