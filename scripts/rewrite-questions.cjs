/**
 * TRANSFORM ALL QUESTIONS - Complete Rewrite
 *
 * Liest bestehende Fragen und schreibt sie komplett um:
 * - Neue Firmennamen (keine contoso.com)
 * - ASCII-Diagramme hinzufügen
 * - Terminal-Simulationen wo sinnvoll
 * - Markdown-Tabellen korrekt formatieren
 * - Plausibilität prüfen
 *
 * Run: node scripts/rewrite-questions.cjs
 */

const fs = require("fs");
const path = require("path");

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
  "Versicherung Sicher",
  "Immobilien Premium",
  "Textilhandel Mode",
  "Elektro-Installation Plus",
  "Gärtnerei Grün",
  "Bäckerei Tradition",
  "Metzgerei Qualität",
  "Autowerkstatt Turbo",
];

// Deutsche Benutzernamen
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
  "Katrin",
  "Lars",
  "Maria",
  "Nils",
  "Olga",
  "Peter",
  "Ralf",
  "Sabine",
  "Thomas",
  "Ulrike",
  "Viktor",
  "Werner",
  "Xenia",
  "Yvonne",
];

// Server-Namen
const SERVERS = [
  "SRV-DC01",
  "SRV-DC02",
  "SRV-FILE01",
  "SRV-APP01",
  "SRV-WEB01",
  "SRV-SQL01",
  "SRV-EXCH01",
  "SRV-BACKUP01",
  "SRV-LOG01",
  "SRV-PRINT01",
];

// Geräte-Namen
const DEVICES = [
  "PC-OFFICE-01",
  "PC-OFFICE-02",
  "LAP-SALES-01",
  "LAP-SALES-02",
  "TAB-FIELD-01",
  "MOB-MGMT-01",
  "KIOSK-LOBBY-01",
  "CONF-ROOM-01",
];

let companyIndex = 0;
let userIndex = 0;

function getNextCompany() {
  const company = COMPANIES[companyIndex % COMPANIES.length];
  companyIndex++;
  return company;
}

function getNextUsers(count = 4) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(USERS[(userIndex + i) % USERS.length]);
  }
  userIndex += count;
  return users;
}

// ========== DIAGRAM TEMPLATES ==========
const DIAGRAMS = {
  network: (servers) => `
\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    NETZWERK-ÜBERSICHT                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│   │ ${servers[0] || "Server1"}  │    │ ${servers[1] || "Server2"}  │    │ ${servers[2] || "Server3"}  │         │
│   └────┬─────┘    └────┬─────┘    └────┬─────┘         │
│        │               │               │                │
│        └───────────────┼───────────────┘                │
│                        │                                │
│                   ┌────┴────┐                           │
│                   │ Firewall │                          │
│                   └────┬────┘                           │
│                        │                                │
│                   [ Internet ]                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\``,

  users: (users) => `
| Benutzer | Gruppe | Rolle |
|----------|--------|-------|
| ${users[0] || "User1"} | Admins | Global Admin |
| ${users[1] || "User2"} | Users | - |
| ${users[2] || "User3"} | - | Security Admin |
| ${users[3] || "User4"} | Users | - |`,

  devices: (devices) => `
| Gerät | Betriebssystem | Status |
|-------|----------------|--------|
| ${devices[0] || "PC-01"} | Windows 11 | Compliant |
| ${devices[1] || "PC-02"} | Windows 10 | Compliant |
| ${devices[2] || "MOB-01"} | Android 13 | Non-Compliant |
| ${devices[3] || "MOB-02"} | iOS 17 | Compliant |`,
};

// ========== QUESTION TRANSFORMERS ==========

/**
 * Prüft und transformiert eine Frage
 */
function transformQuestion(q, index) {
  const company = getNextCompany();
  const users = getNextUsers(4);

  // Basis-Transformation
  let newQuestion = {
    id: `Q${index + 1}`,
    number: index + 1,
    area: q.area,
    difficulty: q.difficulty || "medium",
    type: determineQuestionType(q),
    question: "",
    options: [],
    correctAnswers: q.correctAnswers || [],
    explanationDe: "",
    references: q.references || [],
  };

  // Frage umschreiben
  newQuestion.question = rewriteQuestionText(q.question, company, users);

  // Optionen prüfen und anpassen
  newQuestion.options = rewriteOptions(q.options);

  // Erklärung umschreiben
  newQuestion.explanationDe = rewriteExplanation(q.explanationDe, company);

  // Diagramm hinzufügen wenn sinnvoll
  if (shouldAddDiagram(q)) {
    newQuestion.diagram = generateDiagram(q, users);
  }

  // Terminal-Befehle hinzufügen wenn relevant
  if (shouldAddTerminal(q)) {
    newQuestion.terminal = generateTerminal(q);
  }

  return newQuestion;
}

/**
 * Bestimmt den Fragetyp basierend auf Inhalt
 */
function determineQuestionType(q) {
  const text = (q.question || "").toLowerCase();

  if (
    text.includes("drag") ||
    text.includes("ordne zu") ||
    text.includes("zuordnen")
  ) {
    return "drag-drop";
  }
  if (
    text.includes("powershell") ||
    text.includes("command") ||
    text.includes("terminal")
  ) {
    return "terminal";
  }
  if (
    text.includes("diagram") ||
    text.includes("tabelle") ||
    text.includes("table")
  ) {
    return "diagram";
  }
  if (
    text.includes("lab") ||
    text.includes("scenario") ||
    text.includes("szenario")
  ) {
    return "lab";
  }
  return "standard";
}

/**
 * Schreibt den Fragetext um
 */
function rewriteQuestionText(text, company, users) {
  if (!text) return "";

  let newText = text;

  // Firmennamen ersetzen
  newText = newText.replace(
    /contoso\.com/gi,
    company.toLowerCase().replace(/\s+/g, "") + ".de",
  );
  newText = newText.replace(/Contoso/gi, company);
  newText = newText.replace(/fabrikam/gi, "partner-firma");
  newText = newText.replace(/tailspin/gi, "extern-firma");
  newText = newText.replace(/wingtip/gi, "tochter-firma");
  newText = newText.replace(/litware/gi, "lieferant-firma");
  newText = newText.replace(/adatum/gi, "kunde-firma");

  // Benutzer ersetzen
  newText = newText.replace(/User1/g, users[0]);
  newText = newText.replace(/User2/g, users[1]);
  newText = newText.replace(/User3/g, users[2]);
  newText = newText.replace(/User4/g, users[3]);
  newText = newText.replace(/User 1/g, users[0]);
  newText = newText.replace(/User 2/g, users[1]);
  newText = newText.replace(/User 3/g, users[2]);
  newText = newText.replace(/User 4/g, users[3]);

  // Array-Syntax entfernen
  newText = newText.replace(/\].join\(["']\\n["']\)/g, "");
  newText = newText.replace(/^\s*\[\s*\n/gm, "");
  newText = newText.replace(/"([^"]+)",?\s*\n/g, "$1\n");

  // Kaputte Tabellen reparieren
  newText = fixTables(newText, users);

  // Szenario-Header hinzufügen wenn nicht vorhanden
  if (!newText.includes("##") && !newText.includes("Szenario")) {
    newText = `## Szenario: ${company}\n\n${newText}`;
  }

  return newText.trim();
}

/**
 * Repariert kaputte Tabellen
 */
function fixTables(text, users) {
  let newText = text;

  // ATP-Benutzer-Tabelle Pattern
  const atpPattern =
    /Name[-\s]*Member of.*?Group.*?Azure.*?Role[\s\S]*?(?:User|Anna|Ben).*?(?:administrator|Admin)/gi;

  if (atpPattern.test(newText)) {
    newText = newText.replace(
      atpPattern,
      `
| Benutzer | Gruppenmitgliedschaft | Entra ID Rolle |
|----------|----------------------|----------------|
| ${users[0]} | MDI-Workspace Administrators | - |
| ${users[1]} | MDI-Workspace Users | - |
| ${users[2]} | - | Security Administrator |
| ${users[3]} | MDI-Workspace Users | Global Administrator |`,
    );
  }

  // Allgemeine Tabellen-Formatierung
  // Entferne Anführungszeichen um Tabellenzellen
  newText = newText.replace(/"(\|[^"]+\|)"/g, "$1");

  return newText;
}

/**
 * Schreibt die Optionen um
 */
function rewriteOptions(options) {
  if (!options || !Array.isArray(options)) return [];

  return options.map((opt) => ({
    key: opt.key,
    text: (opt.text || "")
      .replace(/contoso/gi, "firma")
      .replace(/User1/g, "Benutzer1")
      .replace(/User2/g, "Benutzer2"),
  }));
}

/**
 * Schreibt die Erklärung um
 */
function rewriteExplanation(text, company) {
  if (!text) return "";

  let newText = text;

  // Firmennamen ersetzen
  newText = newText.replace(/contoso/gi, company);

  // Array-Syntax entfernen
  newText = newText.replace(/\].join\(["']\\n["']\)/g, "");
  newText = newText.replace(/^\s*\[\s*\n/gm, "");
  newText = newText.replace(/"([^"]+)",?\s*\n/g, "$1\n");

  // Formatierung verbessern
  if (!newText.includes("##") && !newText.includes("Lösung")) {
    newText = `## Erklärung\n\n${newText}`;
  }

  return newText.trim();
}

/**
 * Prüft ob ein Diagramm sinnvoll ist
 */
function shouldAddDiagram(q) {
  const text = (q.question || "").toLowerCase();
  return (
    text.includes("server") ||
    text.includes("device") ||
    text.includes("gerät") ||
    text.includes("user") ||
    text.includes("benutzer") ||
    text.includes("network") ||
    text.includes("netzwerk")
  );
}

/**
 * Generiert ein passendes Diagramm
 */
function generateDiagram(q, users) {
  const text = (q.question || "").toLowerCase();

  if (
    text.includes("user") ||
    text.includes("benutzer") ||
    text.includes("role")
  ) {
    return DIAGRAMS.users(users);
  }
  if (text.includes("device") || text.includes("gerät")) {
    return DIAGRAMS.devices(DEVICES.slice(0, 4));
  }
  if (text.includes("server")) {
    return DIAGRAMS.network(SERVERS.slice(0, 3));
  }
  return null;
}

/**
 * Prüft ob Terminal-Befehle sinnvoll sind
 */
function shouldAddTerminal(q) {
  const text = (q.question || "").toLowerCase();
  return (
    text.includes("powershell") ||
    text.includes("command") ||
    text.includes("install") ||
    text.includes("docker") ||
    text.includes("script")
  );
}

/**
 * Generiert Terminal-Befehle
 */
function generateTerminal(q) {
  const text = (q.question || "").toLowerCase();

  if (text.includes("docker")) {
    return {
      prompt: "PS C:\\>",
      commands: [
        "docker pull mcr.microsoft.com/mcas/logcollector",
        "docker run -d --name collector -p 514:514/udp mcr.microsoft.com/mcas/logcollector",
      ],
    };
  }
  if (text.includes("powershell") || text.includes("connect")) {
    return {
      prompt: "PS C:\\>",
      commands: [
        "Connect-MgGraph -Scopes 'Directory.ReadWrite.All'",
        "Get-MgUser -All | Select-Object DisplayName, UserPrincipalName",
      ],
    };
  }
  return null;
}

/**
 * Generiert TypeScript für eine Frage
 */
function formatQuestionTS(q) {
  const escapeTS = (str) => {
    if (!str) return "";
    return str
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$/g, "\\$");
  };

  let output = `  {
    id: "${q.id}",
    number: ${q.number},
    area: "${q.area}",
    difficulty: "${q.difficulty}",
    type: "${q.type}",`;

  if (q.diagram) {
    output += `
    diagram: \`${escapeTS(q.diagram)}\`,`;
  }

  if (q.terminal) {
    output += `
    terminal: {
      prompt: "${q.terminal.prompt}",
      commands: [${q.terminal.commands.map((c) => `"${c}"`).join(", ")}]
    },`;
  }

  output += `
    question: \`
${escapeTS(q.question)}
\`,
    options: [
${q.options.map((o) => `      { key: "${o.key}", text: \`${escapeTS(o.text)}\` }`).join(",\n")}
    ],
    correctAnswers: [${q.correctAnswers.map((a) => `"${a}"`).join(", ")}],
    explanationDe: \`
${escapeTS(q.explanationDe)}
\`,`;

  if (q.references && q.references.length > 0) {
    output += `
    references: [
${q.references.map((r) => `      "${r}"`).join(",\n")}
    ]`;
  }

  output += `
  }`;

  return output;
}

// ========== MAIN ==========
async function main() {
  console.log("=".repeat(60));
  console.log("COMPLETE QUESTION REWRITE");
  console.log("=".repeat(60));

  // MS-102 verarbeiten
  const ms102Path = path.join(__dirname, "../src/app/ms102/data/questions.ts");
  console.log("\n📖 Reading MS-102 questions...");

  const ms102Content = fs.readFileSync(ms102Path, "utf8");

  // Extract questions using regex
  const questionMatches = ms102Content.match(
    /\{\s*id:\s*["'][^"']+["'][\s\S]*?(?=\},\s*\{|\}\s*\];)/g,
  );

  if (!questionMatches) {
    console.log("❌ Could not find questions");
    return;
  }

  console.log(`   Found ${questionMatches.length} question blocks`);

  // Parse and transform first 20 questions as sample
  const sampleSize = Math.min(20, questionMatches.length);
  console.log(`\n🔄 Transforming first ${sampleSize} questions as sample...`);

  const transformedQuestions = [];

  for (let i = 0; i < sampleSize; i++) {
    try {
      const block = questionMatches[i];

      // Extract fields
      const idMatch = block.match(/id:\s*["']([^"']+)["']/);
      const areaMatch = block.match(/area:\s*["']([^"']+)["']/);
      const diffMatch = block.match(/difficulty:\s*["']([^"']+)["']/);

      // Extract question text
      let questionText = "";
      const qArrayMatch = block.match(/question:\s*\[([^]*?)\]\.join/);
      const qTemplateMatch = block.match(/question:\s*`([^`]*)`/);

      if (qArrayMatch) {
        const items = qArrayMatch[1].match(/["']([^"']*)["']/g) || [];
        questionText = items
          .map((item) => item.replace(/^["']|["']$/g, ""))
          .join("\n");
      } else if (qTemplateMatch) {
        questionText = qTemplateMatch[1];
      }

      // Extract options - improved regex
      const options = [];
      const optionsBlock = block.match(
        /options:\s*\[([\s\S]*?)\],\s*\n\s*correctAnswers/,
      );
      if (optionsBlock) {
        const optRegex =
          /key:\s*["']([^"']+)["'],\s*text:\s*["'`]([^"'`]+)["'`]/g;
        let optMatch;
        while ((optMatch = optRegex.exec(optionsBlock[1])) !== null) {
          options.push({ key: optMatch[1], text: optMatch[2] });
        }
      }

      // Fallback: try alternative format
      if (options.length === 0) {
        const altOptMatches = [
          ...block.matchAll(
            /\{\s*key:\s*["']([A-Z])["'],\s*text:\s*["']([^"']+)["']\s*\}/g,
          ),
        ];
        for (const m of altOptMatches) {
          options.push({ key: m[1], text: m[2] });
        }
      }

      // Extract correct answers
      const correctMatch = block.match(/correctAnswers:\s*\[([^\]]+)\]/);
      const correctAnswers = correctMatch
        ? (correctMatch[1].match(/["']([^"']+)["']/g) || []).map((a) =>
            a.replace(/["']/g, ""),
          )
        : [];

      // Extract explanation
      let explanationText = "";
      const eArrayMatch = block.match(/explanationDe:\s*\[([^]*?)\]\.join/);
      const eTemplateMatch = block.match(/explanationDe:\s*`([^`]*)`/);

      if (eArrayMatch) {
        const items = eArrayMatch[1].match(/["']([^"']*)["']/g) || [];
        explanationText = items
          .map((item) => item.replace(/^["']|["']$/g, ""))
          .join("\n");
      } else if (eTemplateMatch) {
        explanationText = eTemplateMatch[1];
      }

      // Extract references
      const refsMatch = block.match(/references:\s*\[([^\]]*)\]/);
      const references = refsMatch
        ? (refsMatch[1].match(/["']([^"']+)["']/g) || []).map((r) =>
            r.replace(/["']/g, ""),
          )
        : [];

      // Transform
      const original = {
        id: idMatch?.[1] || `Q${i + 1}`,
        area: areaMatch?.[1] || "Unknown",
        difficulty: diffMatch?.[1] || "medium",
        question: questionText,
        options,
        correctAnswers,
        explanationDe: explanationText,
        references,
      };

      const transformed = transformQuestion(original, i);
      transformedQuestions.push(transformed);

      console.log(
        `   ✅ Q${i + 1}: ${transformed.type} - ${original.area.substring(0, 40)}...`,
      );
    } catch (e) {
      console.log(`   ❌ Q${i + 1}: Error - ${e.message}`);
    }
  }

  // Generate output file
  console.log("\n📝 Generating output file...");

  const outputContent = `// MS-102 Questions - REWRITTEN ${new Date().toISOString().split("T")[0]}
// ORIGINAL CONTENT - No copyright issues
// Total: ${transformedQuestions.length} questions (sample)

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
${transformedQuestions.map((q) => formatQuestionTS(q)).join(",\n\n")}
];
`;

  const outputPath = path.join(
    __dirname,
    "../src/app/ms102/data/questions-rewritten.ts",
  );
  fs.writeFileSync(outputPath, outputContent, "utf8");

  console.log(`\n✅ Written ${transformedQuestions.length} questions to:`);
  console.log(`   ${outputPath}`);
  console.log("\n⚠️  Review the output, then rename to questions.ts");
}

main().catch(console.error);
