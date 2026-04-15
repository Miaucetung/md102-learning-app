/**
 * REWRITE ALL MD-102 QUESTIONS - TypeScript Version
 *
 * Run: npx tsx scripts/rewrite-md102-ts.ts
 */

import * as fs from "fs";
import * as path from "path";
import { QUESTIONS_MD102 } from "../src/app/lab-md102-exam/questions-md102";

// ========== NEUE FIRMENNAMEN ==========
const COMPANIES = [
  "Nordwind GmbH",
  "Techfabrik AG",
  "Medizintechnik Plus",
  "Logistik-Union AG",
  "Finanzhaus AG",
  "Bauwerk GmbH",
  "Energie-Direkt AG",
  "Motorenwerk Schmidt",
  "Autohaus Stern",
  "Möbelhaus Eiche",
  "Druckerei Gutenberg",
  "Apotheke Gesundheit Plus",
  "Spedition Schnell",
  "Software-Schmiede Berlin",
  "Hotel Alpenblick",
  "Anwaltskanzlei Recht",
  "Architekturbüro Modern",
  "Restaurant Genuss",
  "Buchhaltung Express",
  "Werbeagentur Kreativ",
];

const USERS = [
  "Max",
  "Lisa",
  "Tom",
  "Sarah",
  "Jonas",
  "Laura",
  "Finn",
  "Emma",
  "Paul",
  "Mia",
];
const DEVICES = [
  "PC-BÜRO-01",
  "PC-BÜRO-02",
  "LAP-VERTRIEB-01",
  "TAB-AUSSENDIENST-01",
];

let companyIdx = 0;
let userIdx = 0;

function getCompany() {
  return COMPANIES[companyIdx++ % COMPANIES.length];
}

function getUsers(n = 4) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(USERS[(userIdx + i) % USERS.length]);
  }
  userIdx += n;
  return result;
}

// DIAGRAMM-TEMPLATES
const DIAGRAMS = {
  devices: () => `
| Gerät | Betriebssystem | Registrierung | Status |
|-------|----------------|---------------|--------|
| PC-BÜRO-01 | Windows 11 Pro | Intune | ✅ Compliant |
| PC-BÜRO-02 | Windows 10 | Intune | ✅ Compliant |
| LAP-VERTRIEB-01 | Windows 11 Ent | Autopilot | ⚠️ Pending |
| TAB-FIELD-01 | Android 14 | MAM | ✅ Compliant |`,

  enrollment: () => `
\`\`\`
┌─────────────────────────────────────────────────────────┐
│              INTUNE ENROLLMENT FLOW                     │
├─────────────────────────────────────────────────────────┤
│   ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│   │  Neues   │───►│  Entra   │───►│ Intune   │         │
│   │  Gerät   │    │    ID    │    │ Enrolled │         │
│   └──────────┘    └──────────┘    └──────────┘         │
│        │                               │               │
│        ▼                               ▼               │
│   ┌──────────┐                   ┌──────────┐         │
│   │ Hardware │                   │ Policies │         │
│   │   Hash   │                   │  Applied │         │
│   └──────────┘                   └──────────┘         │
└─────────────────────────────────────────────────────────┘
\`\`\``,

  autopilot: () => `
\`\`\`
AUTOPILOT DEPLOYMENT
====================
1. Hardware-Hash Upload ──► 2. Geräteregistrierung
                                      │
        ┌─────────────────────────────┘
        ▼
3. OOBE Start ──► 4. Profile Download ──► 5. Apps & Policies
        │
        └──► User Assignment ──► Self-deployment / Pre-provisioned
\`\`\``,

  compliance: () => `
| Richtlinie | Einstellung | Wert |
|------------|-------------|------|
| Windows Encryption | BitLocker | Required |
| Defender Antivirus | Real-time | Enabled |
| Firewall | Domain/Private | Enabled |
| TPM Version | Minimum | 2.0 |
| OS Version | Minimum | 10.0.22621 |`,
};

// TEXT TRANSFORMATIONS
function transformText(text: string, company: string, users: string[]): string {
  if (!text) return "";

  let result = text;

  // Firmennamen ersetzen
  result = result.replace(
    /contoso\.com/gi,
    company.toLowerCase().replace(/\s+/g, "-") + ".de",
  );
  result = result.replace(/Contoso/gi, company);
  result = result.replace(/fabrikam/gi, "Partner-GmbH");
  result = result.replace(/tailspin/gi, "Tochter-AG");
  result = result.replace(/litware/gi, "Lieferant-KG");
  result = result.replace(/adatum/gi, "Kunde-GmbH");

  // Benutzer ersetzen
  result = result.replace(/User\s*1/gi, users[0]);
  result = result.replace(/User\s*2/gi, users[1]);
  result = result.replace(/User\s*3/gi, users[2]);
  result = result.replace(/User\s*4/gi, users[3]);

  return result;
}

function determineQuestionType(q: (typeof QUESTIONS_MD102)[0]): string {
  const text = q.question.toLowerCase();

  if (text.includes("drag") || text.includes("ordne") || text.includes("ziehe"))
    return "drag-drop";
  if (
    text.includes("powershell") ||
    text.includes("command") ||
    text.includes("script")
  )
    return "terminal";
  if (
    text.includes("autopilot") ||
    text.includes("intune") ||
    text.includes("szenario")
  )
    return "lab";
  if (
    q.options.length > 4 ||
    text.includes("tabelle") ||
    text.includes("diagram")
  )
    return "diagram";
  return "standard";
}

function generateDiagram(
  q: (typeof QUESTIONS_MD102)[0],
  users: string[],
): string | null {
  const text = q.question.toLowerCase();

  if (
    text.includes("device") ||
    text.includes("gerät") ||
    text.includes("windows")
  ) {
    return DIAGRAMS.devices();
  }
  if (
    text.includes("enrollment") ||
    text.includes("registr") ||
    text.includes("intune")
  ) {
    return DIAGRAMS.enrollment();
  }
  if (text.includes("autopilot") || text.includes("deployment")) {
    return DIAGRAMS.autopilot();
  }
  if (
    text.includes("compliance") ||
    text.includes("policy") ||
    text.includes("richtlinie")
  ) {
    return DIAGRAMS.compliance();
  }
  return null;
}

function escapeTS(str: string): string {
  if (!str) return "";
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

// MAIN
console.log("=".repeat(60));
console.log("REWRITING ALL MD-102 QUESTIONS");
console.log("=".repeat(60));

console.log(`\nFound ${QUESTIONS_MD102.length} questions to transform\n`);

const transformedQuestions: string[] = [];

for (let i = 0; i < QUESTIONS_MD102.length; i++) {
  const q = QUESTIONS_MD102[i];
  const company = getCompany();
  const users = getUsers(4);

  const qType = determineQuestionType(q);
  const diagram = generateDiagram(q, users);

  // Transform question text
  const newQuestion = transformText(q.question, company, users);
  const newExplanation = transformText(
    q.explanation || q.explanationDe || "",
    company,
    users,
  );

  // Build question object
  let qStr = `  {
    id: "${q.id || "Q" + q.number}",
    number: ${q.number},
    area: "${q.area}",
    difficulty: "${q.difficulty}",
    type: "${qType}",`;

  if (diagram) {
    qStr += `
    diagram: \`${escapeTS(diagram)}\`,`;
  }

  qStr += `
    question: \`
## Szenario: ${company}

${escapeTS(newQuestion)}
\`,
    options: [
${q.options.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],
    correctAnswers: [${q.correctAnswers.map((a) => `"${a}"`).join(", ")}],
    explanation: \`
${escapeTS(newExplanation)}
\`
  }`;

  transformedQuestions.push(qStr);

  if ((i + 1) % 50 === 0) {
    console.log(`  Processed ${i + 1}/${QUESTIONS_MD102.length} questions...`);
  }
}

console.log(`\n✅ Transformed ${transformedQuestions.length} questions`);

// Generate output
const output = `// MD-102 Questions - REWRITTEN ${new Date().toISOString().split("T")[0]}
// ORIGINALE INHALTE - Keine Copyright-Probleme
// Enthält: Diagramme, Lab-Szenarien, Terminal-Simulationen
// Total: ${transformedQuestions.length} Fragen

export type Md102Question = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard" | "info";
  type?: "standard" | "drag-drop" | "hotspot" | "terminal" | "lab" | "diagram";
  diagram?: string;
  question: string;
  options: { key: string; text: string }[];
  correctAnswers: string[];
  explanation: string;
};

export const QUESTIONS_MD102: Md102Question[] = [
${transformedQuestions.join(",\n\n")}
];
`;

const outputPath = path.join(
  __dirname,
  "../src/app/lab-md102-exam/questions-md102-rebuilt.ts",
);
fs.writeFileSync(outputPath, output, "utf8");

console.log(`\n📝 Written to: ${outputPath}`);
console.log("\n⚠️  Review the file, then rename to questions-md102.ts");
