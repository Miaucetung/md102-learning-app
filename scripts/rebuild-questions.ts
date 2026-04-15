/**
 * REBUILD ALL QUESTIONS - Direct Import Approach
 *
 * Importiert die bestehenden Fragen und schreibt sie mit sauberem Format neu.
 *
 * Run: npx tsx scripts/rebuild-questions.ts
 */

import * as fs from "fs";
import * as path from "path";
import { QUESTIONS_MS102 } from "../src/app/ms102/data/questions";

const OUTPUT_PATH = path.join(
  __dirname,
  "../src/app/ms102/data/questions-new.ts",
);

/**
 * Clean text - fix broken tables, remove array artifacts
 */
function cleanText(text: string): string {
  if (!text) return "";

  let cleaned = text;

  // Fix table rows that have quotes and commas
  // "| Name | ... |",  →  | Name | ... |
  cleaned = cleaned.replace(/"(\|[^"]*\|)",?\s*/g, "$1\n");

  // Fix table separator that's broken
  cleaned = cleaned.replace(/"\|[-|]+\|",?\s*/g, (match) => {
    const dashes = match.match(/\|[-|]+\|/)?.[0];
    return dashes ? dashes + "\n" : "";
  });

  // Remove empty quoted strings
  cleaned = cleaned.replace(/"",?\s*\n?/g, "\n");

  // Fix specific broken table pattern
  cleaned = cleaned.replace(
    /"?\|?\s*Name\s*\|?\s*Member of Group\s*\|?\s*Azure AD Role\s*\|?",?\s*\n\s*"\|[-]+\|[-]+\|[-]+\|",?\s*\n\s*"\|\s*User 1[^"]*",?\s*\n\s*"\|\s*User 2[^"]*",?\s*\n\s*"\|\s*User 3[^"]*",?\s*\n\s*"\|\s*User 4[^"]*",?/g,
    `| Name | Member of Group | Azure AD Role |
|------|-----------------|---------------|
| User 1 | Azure ATP Workspace 1 Administrators | None |
| User 2 | Azure ATP Workspace 1 Users | None |
| User 3 | None | Security administrator |
| User 4 | Azure ATP Workspace 1 Users | Global administrator |`,
  );

  // Clean multiple newlines
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  return cleaned.trim();
}

/**
 * Escape template literal characters
 */
function escapeTemplate(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

/**
 * Generate TypeScript for one question
 */
function generateQuestion(q: (typeof QUESTIONS_MS102)[0]): string {
  const questionClean = escapeTemplate(cleanText(q.question));
  const explanationClean = escapeTemplate(cleanText(q.explanationDe));

  const optionsStr = q.options
    .map(
      (opt) =>
        `      { key: "${opt.key}", text: \`${escapeTemplate(opt.text)}\` }`,
    )
    .join(",\n");

  const refsStr =
    q.references && q.references.length > 0
      ? `\n    references: [\n${q.references.map((r) => `      "${r}"`).join(",\n")}\n    ],`
      : "";

  return `  {
    id: "Q${q.number}",
    number: ${q.number},
    area: "${q.area}",
    difficulty: "${q.difficulty}",
    question: \`
${questionClean}
\`,
    options: [
${optionsStr}
    ],
    correctAnswers: [${q.correctAnswers.map((a) => `"${a}"`).join(", ")}],
    explanationDe: \`
${explanationClean}
\`,${refsStr}
  }`;
}

/**
 * Generate full file
 */
function generateFile(): string {
  const header = `// MS-102 Questions - Rebuilt ${new Date().toISOString().split("T")[0]}
// Total: ${QUESTIONS_MS102.length} questions

export type Ms102Question = {
  id: string;
  number: number;
  area: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: { key: string; text: string }[];
  correctAnswers: string[];
  explanationDe: string;
  references?: string[];
};

export const QUESTIONS_MS102: Ms102Question[] = [
`;

  const questions = QUESTIONS_MS102.map((q) => generateQuestion(q)).join(
    ",\n\n",
  );

  const footer = `
];
`;

  return header + questions + footer;
}

// Main
console.log("=".repeat(60));
console.log("REBUILDING ALL QUESTIONS");
console.log("=".repeat(60));

console.log(`\n📖 Processing ${QUESTIONS_MS102.length} MS-102 questions...`);

const newContent = generateFile();

// Write to new file first
fs.writeFileSync(OUTPUT_PATH, newContent, "utf8");
console.log(`\n✅ Written to: ${OUTPUT_PATH}`);
console.log("\nReview the file, then rename to questions.ts");
