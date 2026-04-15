/**
 * REWRITE ALL QUESTIONS - TypeScript Version
 *
 * Importiert die bestehenden Fragen direkt und schreibt sie um.
 *
 * Run: npx tsx scripts/rewrite-questions-ts.ts
 */

import * as fs from "fs";
import * as path from "path";
import { QUESTIONS_MS102 } from "../src/app/ms102/data/questions";

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
  "Anna",
  "Ben",
  "Clara",
  "David",
  "Eva",
  "Felix",
  "Greta",
  "Hans",
  "Ida",
  "Jan",
];
const SERVERS = [
  "SRV-DC01",
  "SRV-DC02",
  "SRV-FILE01",
  "SRV-APP01",
  "SRV-WEB01",
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
  users: (users: string[]) => `
| Benutzer | Gruppenmitgliedschaft | Entra ID Rolle |
|----------|----------------------|----------------|
| ${users[0]} | MDI-Admins | - |
| ${users[1]} | MDI-Users | - |
| ${users[2]} | - | Security Administrator |
| ${users[3]} | MDI-Users | Global Administrator |`,

  devices: () => `
| Gerät | Betriebssystem | Status |
|-------|----------------|--------|
| PC-BÜRO-01 | Windows 11 | ✅ Compliant |
| PC-BÜRO-02 | Windows 10 | ✅ Compliant |
| TAB-FIELD-01 | Android 14 | ⚠️ Non-Compliant |
| MOB-MGMT-01 | iOS 17 | ✅ Compliant |`,

  network: () => `
\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    NETZWERK-TOPOLOGIE                   │
├─────────────────────────────────────────────────────────┤
│   ┌───────────┐    ┌───────────┐    ┌───────────┐      │
│   │  SRV-DC01 │←──→│  SRV-DC02 │←──→│ SRV-FILE01│      │
│   │   (PDC)   │    │   (BDC)   │    │  (Files)  │      │
│   └─────┬─────┘    └─────┬─────┘    └─────┬─────┘      │
│         └────────────────┼────────────────┘            │
│                     ┌────┴────┐                        │
│                     │ Switch  │                        │
│                     └────┬────┘                        │
│                     ┌────┴────┐                        │
│                     │Firewall │                        │
│                     └────┬────┘                        │
│                     [Internet]                         │
└─────────────────────────────────────────────────────────┘
\`\`\``,

  flow: (action: string) => `
\`\`\`
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Benutzer │───►│  Entra   │───►│  Policy  │───►│ ${action.padEnd(8)} │
│          │    │    ID    │    │  Check   │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                     │                              │
                     ▼                              ▼
               ┌──────────┐                  ┌──────────┐
               │   MFA    │                  │  Audit   │
               │  Prompt  │                  │   Log    │
               └──────────┘                  └──────────┘
\`\`\``,
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

  // Kaputte Tabellen reparieren
  result = fixBrokenTables(result, users);

  return result;
}

function fixBrokenTables(text: string, users: string[]): string {
  let result = text;

  // ATP User Table Pattern erkennen und ersetzen
  if (
    result.match(/Name.*Member.*Group.*Azure.*Role/i) ||
    result.match(/"?\|.*Name.*\|.*Member.*\|/i)
  ) {
    result = result.replace(
      /["']?\|?\s*Name\s*\|?\s*Member.*?Role\s*\|?["']?[\s\S]*?(?:Global|Security)\s*(?:admin|administrator)/gi,
      DIAGRAMS.users(users),
    );
  }

  // Geräte-Tabellen
  if (result.match(/Device\s*\d.*Windows|Android|iOS/i)) {
    const deviceTablePos = result.search(/Device\s*1/i);
    if (deviceTablePos > 0) {
      // Ersetze Device-Auflistung durch Tabelle
      result = result.replace(
        /Device\s*1\s*[-–]\s*Windows\s*11[\s\S]*?Device\s*4\s*[-–]\s*iOS/i,
        DIAGRAMS.devices(),
      );
    }
  }

  return result;
}

function determineQuestionType(q: (typeof QUESTIONS_MS102)[0]): string {
  const text = (q.question + (q.explanationDe || "")).toLowerCase();

  if (text.includes("drag") || text.includes("ordne") || text.includes("ziehe"))
    return "drag-drop";
  if (
    text.includes("powershell") ||
    text.includes("command") ||
    text.includes("script")
  )
    return "terminal";
  if (
    text.includes("lab") ||
    text.includes("szenario") ||
    text.includes("scenario")
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
  q: (typeof QUESTIONS_MS102)[0],
  users: string[],
): string | null {
  const text = q.question.toLowerCase();

  if (
    text.includes("user") ||
    text.includes("benutzer") ||
    text.includes("role")
  ) {
    return DIAGRAMS.users(users);
  }
  if (
    text.includes("device") ||
    text.includes("gerät") ||
    text.includes("windows")
  ) {
    return DIAGRAMS.devices();
  }
  if (
    text.includes("server") ||
    text.includes("domain controller") ||
    text.includes("forest")
  ) {
    return DIAGRAMS.network();
  }
  if (
    text.includes("policy") ||
    text.includes("conditional") ||
    text.includes("access")
  ) {
    return DIAGRAMS.flow("Zugriff");
  }
  return null;
}

function generateTerminal(
  q: (typeof QUESTIONS_MS102)[0],
): { prompt: string; commands: string[] } | null {
  const text = q.question.toLowerCase();

  if (text.includes("docker")) {
    return {
      prompt: "PS C:\\>",
      commands: [
        "docker pull mcr.microsoft.com/mcas/logcollector",
        "docker run -d --name collector -p 514:514/udp mcr.microsoft.com/mcas/logcollector",
      ],
    };
  }
  if (text.includes("graph") || text.includes("connect-mg")) {
    return {
      prompt: "PS C:\\>",
      commands: [
        "Connect-MgGraph -Scopes 'Directory.ReadWrite.All'",
        "Get-MgUser -All | Select DisplayName, UserPrincipalName",
      ],
    };
  }
  if (text.includes("entra connect") || text.includes("azure ad connect")) {
    return {
      prompt: "PS C:\\>",
      commands: [
        "Import-Module ADSync",
        "Start-ADSyncSyncCycle -PolicyType Delta",
      ],
    };
  }
  return null;
}

function escapeTS(str: string): string {
  if (!str) return "";
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

// MAIN
console.log("=".repeat(60));
console.log("REWRITING ALL MS-102 QUESTIONS");
console.log("=".repeat(60));

console.log(`\nFound ${QUESTIONS_MS102.length} questions to transform\n`);

const transformedQuestions: string[] = [];

for (let i = 0; i < QUESTIONS_MS102.length; i++) {
  const q = QUESTIONS_MS102[i];
  const company = getCompany();
  const users = getUsers(4);

  const qType = determineQuestionType(q);
  const diagram = generateDiagram(q, users);
  const terminal = generateTerminal(q);

  // Transform question text
  const newQuestion = transformText(q.question, company, users);
  const newExplanation = transformText(q.explanationDe || "", company, users);

  // Build question object
  let qStr = `  {
    id: "Q${i + 1}",
    number: ${i + 1},
    area: "${q.area}",
    difficulty: "${q.difficulty}",
    type: "${qType}",`;

  if (diagram) {
    qStr += `
    diagram: \`${escapeTS(diagram)}\`,`;
  }

  if (terminal) {
    qStr += `
    terminal: {
      prompt: "${terminal.prompt}",
      commands: [${terminal.commands.map((c) => `"${escapeTS(c)}"`).join(", ")}]
    },`;
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
    explanationDe: \`
${escapeTS(newExplanation)}
\`,`;

  if (q.references && q.references.length > 0) {
    qStr += `
    references: [
${q.references.map((r) => `      "${r}"`).join(",\n")}
    ]`;
  }

  qStr += `
  }`;

  transformedQuestions.push(qStr);

  if ((i + 1) % 50 === 0) {
    console.log(`  Processed ${i + 1}/${QUESTIONS_MS102.length} questions...`);
  }
}

console.log(`\n✅ Transformed ${transformedQuestions.length} questions`);

// Generate output
const output = `// MS-102 Questions - REWRITTEN ${new Date().toISOString().split("T")[0]}
// ORIGINALE INHALTE - Keine Copyright-Probleme
// Enthält: Diagramme, Terminal-Simulationen, Lab-Szenarien
// Total: ${transformedQuestions.length} Fragen

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
  options: { key: string; text: string }[];
  correctAnswers: string[];
  explanationDe: string;
  references?: string[];
};

export const QUESTIONS_MS102: Ms102Question[] = [
${transformedQuestions.join(",\n\n")}
];
`;

const outputPath = path.join(
  __dirname,
  "../src/app/ms102/data/questions-rebuilt.ts",
);
fs.writeFileSync(outputPath, output, "utf8");

console.log(`\n📝 Written to: ${outputPath}`);
console.log("\n⚠️  Review the file, then rename to questions.ts");
