// ============================================================================
// MS-102 Questions Audit Script
// ============================================================================
// This script:
// 1. Removes duplicate questions (keeps first occurrence)
// 2. Removes references to "cert2brain"
// 3. Renumbers all questions sequentially
// 4. Ensures consistent formatting
// ============================================================================

import fs from "fs";

const INPUT_FILE = "./src/app/ms102/data/questions.ts";
const OUTPUT_FILE = "./src/app/ms102/data/questions-audited.ts";
const REPORT_FILE = "./docs/MS102_AUDIT_REPORT.md";

// Read the file
console.log("📖 Reading questions file...");
const content = fs.readFileSync(INPUT_FILE, "utf-8");

// Extract the type definition
const typeDefEnd = content.indexOf("export const QUESTIONS_MS102");
const arrayStart = content.indexOf("= [", typeDefEnd) + 2; // Find "= [" and include just the [
const typeDef = content.slice(0, arrayStart + 1);

console.log("🔍 Parsing questions with proper brace matching...");

const rawContent = content.slice(arrayStart + 1);

// Extract question blocks by properly matching braces
const questionBlocks = [];
let i = 0;

while (i < rawContent.length) {
  // Find next opening brace that starts a question object
  const openBraceIdx = rawContent.slice(i).search(/\{\s*\n\s*id:\s*"/);

  if (openBraceIdx === -1) break;

  const blockStart = i + openBraceIdx;
  let depth = 0;
  let j = blockStart;
  let inString = false;
  let stringChar = "";
  let prevChar = "";

  // Find matching closing brace
  while (j < rawContent.length) {
    const char = rawContent[j];

    // Handle escape sequences in strings
    if (inString && prevChar === "\\") {
      prevChar = ""; // Reset so double backslash doesn't confuse us
      j++;
      continue;
    }

    // Track string state (for regular strings and template literals)
    if (!inString && (char === '"' || char === "'" || char === "`")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar) {
      inString = false;
    }

    // Count braces only when not in string
    if (!inString) {
      if (char === "{") depth++;
      if (char === "}") {
        depth--;
        if (depth === 0) {
          const block = rawContent.slice(blockStart, j + 1);
          questionBlocks.push(block);
          i = j + 1;
          break;
        }
      }
    }

    prevChar = char;
    j++;
  }

  // Safety check
  if (j >= rawContent.length && depth !== 0) {
    console.error(`❌ Brace mismatch starting at position ${blockStart}`);
    i = rawContent.length;
  }
}

console.log(`📊 Found ${questionBlocks.length} question blocks`);

// Process questions - deduplicate and clean
const seenIds = new Set();
const uniqueQuestions = [];
const duplicates = [];
const cert2brainRemovals = [];

for (const block of questionBlocks) {
  const idMatch = block.match(/id:\s*"(QR?\d+)"/);
  if (!idMatch) {
    console.log("⚠️  Block without valid ID found, skipping...");
    continue;
  }

  const id = idMatch[1];

  if (seenIds.has(id)) {
    duplicates.push(id);
    console.log(`  ⚠️  Duplicate removed: ${id}`);
    continue;
  }
  seenIds.add(id);

  if (/cert2brain/i.test(block)) {
    cert2brainRemovals.push(id);
  }

  uniqueQuestions.push({ id, block });
}

console.log(`\n📈 Statistics:`);
console.log(`   Total blocks parsed: ${questionBlocks.length}`);
console.log(`   Unique questions: ${uniqueQuestions.length}`);
console.log(`   Duplicates removed: ${duplicates.length}`);
console.log(`   Cert2brain references found: ${cert2brainRemovals.length}`);

// Clean cert2brain references and renumber
console.log("\n🧹 Cleaning and renumbering...");
const cleanedQuestions = uniqueQuestions.map((q, index) => {
  let block = q.block;

  // Remove cert2brain references
  block = block.replace(
    /\(laut Cert2Brain & MS-Doku\)/gi,
    "(laut MS-Dokumentation)",
  );
  block = block.replace(/\(und im Cert2Brain-Text erwähnt\)/gi, "");
  block = block.replace(
    /Laut Microsoft-Dokumentation \(und im Cert2Brain-Text erwähnt\):/gi,
    "Laut Microsoft-Dokumentation:",
  );
  block = block.replace(
    /In der Doku und auch in der Cert2Brain-Erklärung steht explizit:/gi,
    "Laut Microsoft-Dokumentation:",
  );
  block = block.replace(
    /Vorgehen laut Microsoft-Dokumentation und Cert2Brain:/gi,
    "Vorgehen laut Microsoft-Dokumentation:",
  );
  block = block.replace(
    /Dies stimmt mit der Cert2Brain-Erklärung überein:/gi,
    "Laut Microsoft-Dokumentation:",
  );
  block = block.replace(/Cert2Brain[-\s]*Erklärung/gi, "Dokumentation");
  block = block.replace(/Cert2Brain/gi, "Microsoft-Dokumentation");

  // Update the number
  const newNumber = index + 1;
  block = block.replace(/number:\s*\d+/, `number: ${newNumber}`);

  return block;
});

// Build the output file
console.log("\n📝 Writing audited file...");
const output = typeDef + "\n  " + cleanedQuestions.join(",\n  ") + "\n];";

fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
console.log(`✅ Written to ${OUTPUT_FILE}`);

// Generate audit report
console.log("\n📋 Generating audit report...");
const report = `# MS-102 Questions Audit Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Value |
|--------|-------|
| Original question blocks | ${questionBlocks.length} |
| Unique questions after deduplication | ${uniqueQuestions.length} |
| Duplicates removed | ${duplicates.length} |
| Questions with cert2brain references cleaned | ${cert2brainRemovals.length} |

## Duplicate Questions Removed

The following question IDs appeared more than once. The first occurrence was kept:

${duplicates.map((id) => `- ${id}`).join("\n") || "(none)"}

## Cert2Brain References Cleaned

The following questions had cert2brain references that were replaced with "Microsoft-Dokumentation":

${cert2brainRemovals.map((id) => `- ${id}`).join("\n") || "(none)"}

## Renumbering

All questions have been renumbered sequentially from 1 to ${uniqueQuestions.length}.

## Next Steps

1. Review the audited file: \`${OUTPUT_FILE}\`
2. If satisfied, replace the original file:
   \`\`\`powershell
   Move-Item -Force "${OUTPUT_FILE}" "${INPUT_FILE}"
   \`\`\`
3. Test the application to ensure all questions render correctly
`;

fs.writeFileSync(REPORT_FILE, report, "utf-8");
console.log(`✅ Audit report written to ${REPORT_FILE}`);

console.log("\n🎉 Audit complete!");
