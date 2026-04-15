/**
 * COMPLETE QUESTIONS REBUILD
 *
 * Liest alle Fragen, extrahiert die Kerndaten, und erstellt sie komplett neu
 * mit sauberem, einheitlichem Markdown-Format.
 *
 * Run: node scripts/rebuild-all-questions.cjs
 */

const fs = require("fs");
const path = require("path");

// ========== CONFIGURATION ==========
const MS102_PATH = path.join(__dirname, "../src/app/ms102/data/questions.ts");
const MD102_PATH = path.join(
  __dirname,
  "../src/app/lab-md102-exam/questions-md102.ts",
);

// ========== TABLE PATTERNS TO FIX ==========
const TABLE_FIXES = [
  // Azure ATP Users Table - verschiedene kaputte Formate
  {
    patterns: [
      /["']?\|?\s*Name\s*[-|]+\s*Member of.*?[-|]+\s*Azure.*?Role\s*\|?["']?,?\s*\n.*?["']?\|?[-|]+\|?["']?,?\s*\n.*?User\s*1.*?User\s*4[^"'\n]*["']?,?/gis,
      /"?\| Name \| Member of Group \| Azure AD Role \|",\s*\n\s*"\|[-|]+\|",\s*\n.*?User 4[^"]*"/gis,
    ],
    replacement: `| Name | Member of Group | Azure AD Role |
|------|-----------------|---------------|
| User 1 | Azure ATP Workspace 1 Administrators | None |
| User 2 | Azure ATP Workspace 1 Users | None |
| User 3 | None | Security administrator |
| User 4 | Azure ATP Workspace 1 Users | Global administrator |`,
  },
];

// ========== HELPER FUNCTIONS ==========

/**
 * Clean up a question string - remove array artifacts, fix tables
 */
function cleanQuestionText(text) {
  if (!text) return "";

  let cleaned = text;

  // Remove array join artifacts
  cleaned = cleaned.replace(/\].join\("\n"\)/g, "");
  cleaned = cleaned.replace(/\[\s*\n/g, "");

  // Fix quoted table rows that should be plain markdown
  // Pattern: "| Header |", followed by lines
  cleaned = cleaned.replace(/"(\| [^"]+\|)",?\s*\n\s*/g, "$1\n");

  // Fix separator lines with quotes
  cleaned = cleaned.replace(/"\|[-|]+\|",?\s*\n/g, (match) => {
    const dashes = match.match(/\|[-|]+\|/)?.[0] || "|------|";
    return dashes + "\n";
  });

  // Remove stray quotes around table cells
  cleaned = cleaned.replace(/"\|([^"]+)\|",?/g, "|$1|");

  // Fix empty string artifacts
  cleaned = cleaned.replace(/"",?\s*\n/g, "\n");

  // Clean up multiple newlines
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  // Trim
  cleaned = cleaned.trim();

  return cleaned;
}

/**
 * Extract questions from TypeScript source
 */
function extractQuestions(content) {
  const questions = [];

  // Match question objects
  const questionRegex =
    /\{\s*id:\s*["']([^"']+)["'],\s*number:\s*(\d+),\s*area:\s*["']([^"']+)["'],\s*difficulty:\s*["']([^"']+)["'],\s*question:\s*([^]*?),\s*options:\s*\[([^]*?)\],\s*correctAnswers:\s*\[([^\]]+)\],\s*explanationDe:\s*([^]*?),?\s*(?:references:\s*\[([^\]]*)\])?\s*\}/g;

  // Simpler approach: use eval-like parsing
  // First, extract the array content
  const arrayMatch = content.match(
    /export const QUESTIONS_MS102[^=]*=\s*\[([^]*)\];?\s*$/,
  );
  if (!arrayMatch) {
    console.log("Could not find QUESTIONS_MS102 array");
    return questions;
  }

  // Split by question boundaries
  const arrayContent = arrayMatch[1];
  const questionBlocks = arrayContent.split(/\},\s*\{/).map((block, i) => {
    if (i === 0) return block.replace(/^\s*\{/, "");
    if (i === arrayContent.split(/\},\s*\{/).length - 1)
      return block.replace(/\}\s*$/, "");
    return block;
  });

  console.log(`Found ${questionBlocks.length} question blocks`);

  for (const block of questionBlocks) {
    try {
      // Extract id
      const idMatch = block.match(/id:\s*["']([^"']+)["']/);
      const numberMatch = block.match(/number:\s*(\d+)/);
      const areaMatch = block.match(/area:\s*["']([^"']+)["']/);
      const difficultyMatch = block.match(/difficulty:\s*["']([^"']+)["']/);

      // Extract question - handle both array and template string formats
      let questionText = "";
      const questionArrayMatch = block.match(
        /question:\s*\[([^]*?)\]\.join\(["']\\n["']\)/,
      );
      const questionTemplateMatch = block.match(/question:\s*`([^`]*)`/);
      const questionStringMatch = block.match(/question:\s*["']([^"']+)["']/);

      if (questionArrayMatch) {
        // Parse array items
        const items = questionArrayMatch[1].match(/["']([^"']*)["']/g) || [];
        questionText = items
          .map((item) => item.replace(/^["']|["']$/g, ""))
          .join("\n");
      } else if (questionTemplateMatch) {
        questionText = questionTemplateMatch[1];
      } else if (questionStringMatch) {
        questionText = questionStringMatch[1];
      }

      // Extract options
      const optionsMatch = block.match(/options:\s*\[([^]*?)\]/);
      const options = [];
      if (optionsMatch) {
        const optRegex =
          /\{\s*key:\s*["']([^"']+)["'],\s*text:\s*["']([^"']+)["']\s*\}/g;
        let optMatch;
        while ((optMatch = optRegex.exec(optionsMatch[1])) !== null) {
          options.push({ key: optMatch[1], text: optMatch[2] });
        }
      }

      // Extract correct answers
      const correctMatch = block.match(/correctAnswers:\s*\[([^\]]+)\]/);
      const correctAnswers = correctMatch
        ? correctMatch[1]
            .match(/["']([^"']+)["']/g)
            ?.map((a) => a.replace(/["']/g, "")) || []
        : [];

      // Extract explanation
      let explanationText = "";
      const explArrayMatch = block.match(
        /explanationDe:\s*\[([^]*?)\]\.join\(["']\\n["']\)/,
      );
      const explTemplateMatch = block.match(/explanationDe:\s*`([^`]*)`/);

      if (explArrayMatch) {
        const items = explArrayMatch[1].match(/["']([^"']*)["']/g) || [];
        explanationText = items
          .map((item) => item.replace(/^["']|["']$/g, ""))
          .join("\n");
      } else if (explTemplateMatch) {
        explanationText = explTemplateMatch[1];
      }

      // Extract references
      const refsMatch = block.match(/references:\s*\[([^\]]*)\]/);
      const references = refsMatch
        ? refsMatch[1]
            .match(/["']([^"']+)["']/g)
            ?.map((r) => r.replace(/["']/g, "")) || []
        : [];

      if (idMatch && numberMatch) {
        questions.push({
          id: idMatch[1],
          number: parseInt(numberMatch[1]),
          area: areaMatch?.[1] || "",
          difficulty: difficultyMatch?.[1] || "medium",
          question: cleanQuestionText(questionText),
          options,
          correctAnswers,
          explanationDe: cleanQuestionText(explanationText),
          references,
        });
      }
    } catch (e) {
      console.log(`Error parsing question block: ${e.message}`);
    }
  }

  return questions;
}

/**
 * Generate clean TypeScript for a question
 */
function generateQuestionTS(q, index) {
  const questionStr = q.question
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  const explanationStr = q.explanationDe
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  const optionsStr = q.options
    .map(
      (opt) =>
        `      { key: "${opt.key}", text: "${opt.text.replace(/"/g, '\\"')}" }`,
    )
    .join(",\n");

  const refsStr =
    q.references.length > 0
      ? `\n    references: [\n${q.references.map((r) => `      "${r}"`).join(",\n")}\n    ],`
      : "";

  return `  {
    id: "Q${q.number}",
    number: ${q.number},
    area: "${q.area}",
    difficulty: "${q.difficulty}",
    question: \`${questionStr}\`,
    options: [
${optionsStr}
    ],
    correctAnswers: [${q.correctAnswers.map((a) => `"${a}"`).join(", ")}],
    explanationDe: \`${explanationStr}\`,${refsStr}
  }`;
}

/**
 * Generate complete TypeScript file
 */
function generateFullFile(questions, isMS102 = true) {
  const typeName = isMS102 ? "Ms102Question" : "Md102Question";
  const arrayName = isMS102 ? "QUESTIONS_MS102" : "QUESTIONS_MD102";

  const typeDefinition = `export type ${typeName} = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: { key: string; text: string }[];
  correctAnswers: string[];
  explanationDe: string;
  references?: string[];
};`;

  const questionsStr = questions
    .map((q, i) => generateQuestionTS(q, i))
    .join(",\n\n");

  return `// Auto-generated - Rebuilt ${new Date().toISOString()}

${typeDefinition}

export const ${arrayName}: ${typeName}[] = [
${questionsStr}
];
`;
}

// ========== MAIN ==========
async function main() {
  console.log("=".repeat(60));
  console.log("COMPLETE QUESTIONS REBUILD");
  console.log("=".repeat(60));

  // Read MS-102
  console.log("\n📖 Reading MS-102 questions...");
  const ms102Content = fs.readFileSync(MS102_PATH, "utf8");

  console.log("🔍 Extracting questions...");
  const ms102Questions = extractQuestions(ms102Content);
  console.log(`   Found ${ms102Questions.length} questions`);

  if (ms102Questions.length > 0) {
    console.log("\n📝 Generating clean TypeScript...");
    const newContent = generateFullFile(ms102Questions, true);

    // Backup
    const backupPath = MS102_PATH.replace(".ts", ".backup.ts");
    fs.writeFileSync(backupPath, ms102Content);
    console.log(`   Backup saved to: ${backupPath}`);

    // Write new file
    fs.writeFileSync(MS102_PATH, newContent);
    console.log(
      `   ✅ Written ${ms102Questions.length} questions to: ${MS102_PATH}`,
    );
  }

  console.log("\n✅ Rebuild complete!");
}

main().catch(console.error);
