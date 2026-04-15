/**
 * Complete Question Overhaul Script
 *
 * 1. Renumbers ALL questions sequentially (1, 2, 3, 4...)
 * 2. Fixes ID format to consistent "Q1", "Q2", etc.
 * 3. Ensures number field matches sequence
 * 4. Preserves all content
 *
 * Run: node scripts/fix-question-numbering.cjs
 */

const fs = require("fs");
const path = require("path");

function fixQuestionNumbering(filePath, prefix = "Q") {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Processing: ${path.basename(filePath)}`);
  console.log("=".repeat(60));

  let content = fs.readFileSync(filePath, "utf8");

  // Create backup
  const backupPath = filePath.replace(".ts", ".pre-renumber.backup.ts");
  fs.writeFileSync(backupPath, content);
  console.log(`📦 Backup created: ${path.basename(backupPath)}`);

  // Find the array start
  const arrayMatch = content.match(
    /(export const QUESTIONS_\w+:\s*\w+\[\]\s*=\s*\[)/,
  );
  if (!arrayMatch) {
    console.log("❌ Could not find questions array");
    return;
  }

  // Split into header and questions part
  const headerEnd = content.indexOf(arrayMatch[0]) + arrayMatch[0].length;
  const header = content.substring(0, headerEnd);
  const rest = content.substring(headerEnd);

  // Find all question objects
  // Pattern: starts with { and contains id: or number:
  const questionPattern = /\{\s*(?:id:\s*["'][^"']*["'],?\s*)?number:\s*\d+/g;

  // Better approach: split by question boundaries
  // Each question starts with "  {" (2 spaces) followed by id or number
  const questions = [];
  let currentQuestion = "";
  let braceCount = 0;
  let inQuestion = false;
  let lineNumber = 0;

  const lines = rest.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for question start: line with { followed by id: or number:
    if (!inQuestion && /^\s{2,4}\{/.test(line)) {
      // Look ahead to see if this is a question object
      const nextLines = lines.slice(i, i + 3).join("\n");
      if (/id:|number:/.test(nextLines)) {
        inQuestion = true;
        currentQuestion = line + "\n";
        braceCount =
          (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        continue;
      }
    }

    if (inQuestion) {
      currentQuestion += line + "\n";
      braceCount +=
        (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;

      // Question ends when braces are balanced and line ends with },
      if (braceCount === 0 && /^\s{2,4}\},?\s*$/.test(line)) {
        questions.push(currentQuestion);
        currentQuestion = "";
        inQuestion = false;
      }
    }
  }

  console.log(`Found ${questions.length} questions`);

  // Renumber each question
  const renumberedQuestions = questions.map((q, index) => {
    const newNumber = index + 1;
    const newId = `${prefix}${newNumber}`;

    // Replace or add id
    let modified = q;

    // If has id: field, replace it
    if (/id:\s*["'][^"']*["']/.test(modified)) {
      modified = modified.replace(/id:\s*["'][^"']*["']/, `id: "${newId}"`);
    } else {
      // Add id after opening brace
      modified = modified.replace(/^(\s*\{)/, `$1\n    id: "${newId}",`);
    }

    // Replace number field
    modified = modified.replace(/number:\s*\d+/, `number: ${newNumber}`);

    return modified;
  });

  // Reconstruct file
  let newContent = header + "\n" + renumberedQuestions.join("") + "];";

  // Fix any formatting issues
  newContent = newContent.replace(/,\s*,/g, ",");
  newContent = newContent.replace(/\}\s*\{/g, "},\n  {");

  fs.writeFileSync(filePath, newContent);

  console.log(
    `✅ Renumbered ${questions.length} questions (${prefix}1 - ${prefix}${questions.length})`,
  );

  return questions.length;
}

// Alternative simpler approach using regex
function fixQuestionNumberingSimple(filePath, prefix = "Q") {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Processing: ${path.basename(filePath)}`);
  console.log("=".repeat(60));

  let content = fs.readFileSync(filePath, "utf8");

  // Create backup
  const backupPath = filePath.replace(".ts", ".pre-renumber.backup.ts");
  fs.writeFileSync(backupPath, content);
  console.log(`📦 Backup created: ${path.basename(backupPath)}`);

  // Count questions by counting id: patterns
  const idMatches = content.match(/id:\s*["']Q?R?\d+["']/g) || [];
  const numberMatches = content.match(/number:\s*\d+/g) || [];

  console.log(
    `Found ${idMatches.length} id fields, ${numberMatches.length} number fields`,
  );

  // Replace each id sequentially
  let questionCounter = 0;

  // First pass: fix all ids
  content = content.replace(/id:\s*["'](?:Q|QR)?\d+["']/g, (match) => {
    questionCounter++;
    return `id: "${prefix}${questionCounter}"`;
  });

  // Second pass: fix all numbers to match
  questionCounter = 0;
  content = content.replace(/number:\s*\d+/g, (match) => {
    questionCounter++;
    return `number: ${questionCounter}`;
  });

  fs.writeFileSync(filePath, content);

  console.log(
    `✅ Renumbered ${questionCounter} questions (${prefix}1 - ${prefix}${questionCounter})`,
  );

  return questionCounter;
}

// Main execution
const ms102Path = path.join(__dirname, "../src/app/ms102/data/questions.ts");
const md102Path = path.join(
  __dirname,
  "../src/app/lab-md102-exam/questions-md102.ts",
);

console.log("\n🔧 QUESTION NUMBERING FIX");
console.log("=".repeat(60));

const ms102Count = fixQuestionNumberingSimple(ms102Path, "Q");
const md102Count = fixQuestionNumberingSimple(md102Path, "Q");

console.log("\n" + "=".repeat(60));
console.log("SUMMARY");
console.log("=".repeat(60));
console.log(`MS-102: ${ms102Count} questions renumbered (Q1 - Q${ms102Count})`);
console.log(`MD-102: ${md102Count} questions renumbered (Q1 - Q${md102Count})`);

// Verify
console.log("\nVerifying...");
const { execSync } = require("child_process");
try {
  execSync("npx tsc --noEmit", {
    cwd: path.join(__dirname, ".."),
    stdio: "pipe",
  });
  console.log("✅ TypeScript validation passed");
} catch (error) {
  console.log("⚠️ TypeScript errors - may need manual review");
  console.log(error.stdout?.toString().substring(0, 500));
}
