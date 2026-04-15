/**
 * Transform Questions - Phase 2
 *
 * More comprehensive fixes for remaining dash patterns:
 * - User/Group tables with underscores
 * - Decorative separators in explanations
 * - Nested configuration displays
 *
 * Run: node scripts/transform-questions-phase2.cjs
 */

const fs = require("fs");
const path = require("path");

function transformQuestions(filePath) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Processing: ${path.basename(filePath)}`);
  console.log("=".repeat(60));

  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;
  let fixCount = 0;

  // Fix 1: Replace decorative separator lines in explanationDe
  // -----------------------------------------  →  ---
  // These are markdown horizontal rules used in explanations
  const decorativeSeparators = content.match(/-{30,}/g);
  if (decorativeSeparators) {
    content = content.replace(/-{30,}/g, "---");
    console.log(
      `✅ Simplified ${decorativeSeparators.length} decorative separators`,
    );
    fixCount++;
  }

  // Fix 2: User/Group table Q213 pattern
  // Name______Member of___Assigned license
  // User1------Group1--------Microsoft 365 E5
  const userGroupTablePattern =
    /`Name______Member of___Assigned license\s*\n\s*User1------Group1--------Microsoft 365 E5\s*\n\s*User2------Group2--------None\s*\n\s*User3------None----------Microsoft 365 E5\s*\n\s*User4------None----------None`/g;

  if (content.match(userGroupTablePattern)) {
    content = content.replace(
      userGroupTablePattern,
      `"| Name | Member of | Assigned License |\\n|------|-----------|------------------|\\n| User1 | Group1 | Microsoft 365 E5 |\\n| User2 | Group2 | None |\\n| User3 | None | Microsoft 365 E5 |\\n| User4 | None | None |"`,
    );
    console.log("✅ Fixed User membership table");
    fixCount++;
  }

  // Fix 3: Group membership table
  const groupTablePattern =
    /`Group1------None---------None\s*\n\s*Group2------Group3-------Microsoft365 E5\s*\n\s*Group3------Group4-------None\s*\n\s*Group4------None---------Microsoft 365 E5`/g;

  if (content.match(groupTablePattern)) {
    content = content.replace(
      groupTablePattern,
      `"| Group | Member of | Assigned License |\\n|-------|-----------|------------------|\\n| Group1 | None | None |\\n| Group2 | Group3 | Microsoft 365 E5 |\\n| Group3 | Group4 | None |\\n| Group4 | None | Microsoft 365 E5 |"`,
    );
    console.log("✅ Fixed Group membership table");
    fixCount++;
  }

  // Fix 4: Configuration items with leading dashes
  // --Enforce custom list: YES  →  • Enforce custom list: YES
  // ----Enable password protection  →    • Enable password protection
  content = content.replace(/"----([A-Za-z])/g, '"  • $1');
  content = content.replace(/"--([A-Za-z])/g, '"• $1');
  console.log("✅ Converted configuration dashes to bullets");
  fixCount++;

  // Fix 5: Empty lines between table rows (cleanup)
  content = content.replace(
    /"\| ([^|]+) \|",\s*\n\s*"",\s*\n\s*"\| /g,
    '"| $1 |",\n      "| ',
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`\n✅ Total fixes applied: ${fixCount}`);
    return true;
  } else {
    console.log("\n⚠️ No changes made");
    return false;
  }
}

// Find remaining issues
function findRemainingIssues(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const issues = [];

  lines.forEach((line, index) => {
    // Tables with dashes that aren't proper markdown
    if (line.match(/[A-Za-z0-9]-{3,}[A-Za-z0-9]/) && !line.includes("|---")) {
      const trimmed = line.trim().substring(0, 60);
      if (!issues.some((i) => i.content === trimmed)) {
        issues.push({ line: index + 1, content: trimmed });
      }
    }
  });

  if (issues.length > 0) {
    console.log(`\n⚠️ Found ${issues.length} unique remaining patterns:`);
    issues.slice(0, 15).forEach((i) => {
      console.log(`  Line ${i.line}: ${i.content}`);
    });
    if (issues.length > 15) {
      console.log(`  ... and ${issues.length - 15} more`);
    }
  } else {
    console.log("\n✅ No remaining dash patterns found!");
  }

  return issues;
}

// Main
const ms102Path = path.join(__dirname, "../src/app/ms102/data/questions.ts");
const md102Path = path.join(
  __dirname,
  "../src/app/lab-md102-exam/questions-md102.ts",
);

console.log("\n🚀 PHASE 2 TRANSFORMATION");
console.log("=".repeat(60));

if (fs.existsSync(ms102Path)) {
  transformQuestions(ms102Path);
  findRemainingIssues(ms102Path);
}

if (fs.existsSync(md102Path)) {
  transformQuestions(md102Path);
  findRemainingIssues(md102Path);
}

console.log("\n✅ Phase 2 complete!");
