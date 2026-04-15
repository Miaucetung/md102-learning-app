/**
 * Transform All Questions - Complete Overhaul
 *
 * This script transforms all questions to use:
 * - Proper Markdown tables (no dash-based pseudo-tables)
 * - Consistent formatting
 * - Clear scenarios
 * - Microsoft Learn references
 *
 * Run: node scripts/transform-all-questions.cjs
 */

const fs = require("fs");
const path = require("path");

// ========== TABLE CONVERSION PATTERNS ==========

// Pattern 1: Azure ATP Users Table
const ATP_TABLE_PATTERN = {
  search: [
    /"Name-----Member of group ---------------------------Azure Ad role",/,
    /"_+",/,
    /"User 1 --- Azure ATP Workspace 1 Administartors --- None",/,
    /"",/,
    /"User 2 --- Azure ATP Workspace 1 Users ------------- None",/,
    /"",/,
    /"User 3 --- None  ----------------------------------------Security administrator",/,
    /"",/,
    /"User 4 --- Azure ATP Workspace 1 Users ------------- Global administrator",/,
  ],
  replace: `"| Name | Member of Group | Azure AD Role |",
      "|------|-----------------|---------------|",
      "| User 1 | Azure ATP Workspace 1 Administrators | None |",
      "| User 2 | Azure ATP Workspace 1 Users | None |",
      "| User 3 | None | Security administrator |",
      "| User 4 | Azure ATP Workspace 1 Users | Global administrator |",`,
};

// Pattern 2: Activity Time Table
const ACTIVITY_TABLE = {
  old: `"Time - Alert name - Severity- Impacted asssets",
      "",

      "08:05 - Activity1  ---- Low    ------- Device1",
      "",
      "08:07 - Activity1  ---- Low    ------- Device1",
      "",
      "08:08 - Activity1  --- Medium   --- Device1",
      "",
      "08:15 - Activity2  ----Medium   --- Device2",
      "",
      "08:16 - Activity2  ----Medium   --- Device2",
      "",
      "08:20 - Activity1  ----High    ------- Device1",
      "",
      "08:30 - Activity3  ----Medium   --- Device2",
      "",
      "08:35 - Activity2  ----High    ------- Device2",`,
  new: `"| Time | Alert Name | Severity | Impacted Assets |",
      "|------|------------|----------|-----------------|",
      "| 08:05 | Activity1 | Low | Device1 |",
      "| 08:07 | Activity1 | Low | Device1 |",
      "| 08:08 | Activity1 | Medium | Device1 |",
      "| 08:15 | Activity2 | Medium | Device2 |",
      "| 08:16 | Activity2 | Medium | Device2 |",
      "| 08:20 | Activity1 | High | Device1 |",
      "| 08:30 | Activity3 | Medium | Device2 |",
      "| 08:35 | Activity2 | High | Device2 |",`,
};

// Pattern 3: Server Configuration Table
const SERVER_TABLE = {
  old: `"NAME---------OS-------------------------------------------------CONFIGURATION",
      "",
      "Server1 -------Windows Server 2022 ----------------------------Domain Controller",
      "",
      "Server2 -------Windows Server 2016 ----------------------------Member Server",
      "",
      "Server3 -------Server Core installation of Win. Server 2022 ----Member Server",`,
  new: `"| Name | OS | Configuration |",
      "|------|----|---------------|",
      "| Server1 | Windows Server 2022 | Domain Controller |",
      "| Server2 | Windows Server 2016 | Member Server |",
      "| Server3 | Server Core (Windows Server 2022) | Member Server |",`,
};

function transformQuestions(filePath) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Processing: ${path.basename(filePath)}`);
  console.log("=".repeat(60));

  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;
  let fixCount = 0;

  // Fix 1: Activity Table
  if (content.includes("Time - Alert name - Severity- Impacted asssets")) {
    content = content.replace(ACTIVITY_TABLE.old, ACTIVITY_TABLE.new);
    console.log("✅ Fixed Activity Time Table");
    fixCount++;
  }

  // Fix 2: Server Configuration Table
  if (
    content.includes(
      "NAME---------OS-------------------------------------------------CONFIGURATION",
    )
  ) {
    content = content.replace(SERVER_TABLE.old, SERVER_TABLE.new);
    console.log("✅ Fixed Server Configuration Table");
    fixCount++;
  }

  // Fix 3: Azure ATP Tables (multiple occurrences)
  // Using regex to catch variations
  const atpPattern =
    /"Name-----Member of group ---------------------------Azure Ad role",\s*\n\s*"_+",\s*\n\s*"User 1 --- Azure ATP Workspace 1 Administartors --- None",\s*\n\s*"",\s*\n\s*"User 2 --- Azure ATP Workspace 1 Users ------------- None",\s*\n\s*"",\s*\n\s*"User 3 --- None  ----------------------------------------Security administrator",\s*\n\s*"",\s*\n\s*"User 4 --- Azure ATP Workspace 1 Users ------------- Global administrator",/g;

  const atpReplacement = `"| Name | Member of Group | Azure AD Role |",
      "|------|-----------------|---------------|",
      "| User 1 | Azure ATP Workspace 1 Administrators | None |",
      "| User 2 | Azure ATP Workspace 1 Users | None |",
      "| User 3 | None | Security administrator |",
      "| User 4 | Azure ATP Workspace 1 Users | Global administrator |",`;

  const atpMatches = content.match(atpPattern);
  if (atpMatches) {
    content = content.replace(atpPattern, atpReplacement);
    console.log(`✅ Fixed ${atpMatches.length} Azure ATP Table(s)`);
    fixCount += atpMatches.length;
  }

  // Fix 4: Inline ATP tables (without quotes as array items)
  const inlineAtpPattern =
    /Name-----Member of group ---------------------------Azure Ad role\s*\n\s*_+\s*\n\s*User 1 --- Azure ATP Workspace 1 Administartors --- None\n\n\s*User 2 --- Azure ATP Workspace 1 Users ------------- None\n\n\s*User 3 --- None  ----------------------------------------Security administrator\n\n\s*User 4 --- Azure ATP Workspace 1 Users ------------- Global administrator/g;

  const inlineAtpReplacement = `| Name | Member of Group | Azure AD Role |
|------|-----------------|---------------|
| User 1 | Azure ATP Workspace 1 Administrators | None |
| User 2 | Azure ATP Workspace 1 Users | None |
| User 3 | None | Security administrator |
| User 4 | Azure ATP Workspace 1 Users | Global administrator |`;

  if (content.match(inlineAtpPattern)) {
    content = content.replace(inlineAtpPattern, inlineAtpReplacement);
    console.log("✅ Fixed inline ATP Tables");
    fixCount++;
  }

  // Fix 5: Remove standalone separator lines
  const separatorPattern = /"\-{20,}",?\s*\n/g;
  const separatorMatches = content.match(separatorPattern);
  if (separatorMatches) {
    content = content.replace(separatorPattern, "");
    console.log(`✅ Removed ${separatorMatches.length} separator lines`);
    fixCount += separatorMatches.length;
  }

  // Fix 6: Clean up empty string lines in arrays (consecutive empty strings)
  content = content.replace(/"",\s*\n\s*"",\s*\n/g, '"",\n');

  // Fix 7: Fix typos - "Administartors" -> "Administrators"
  content = content.replace(/Administartors/g, "Administrators");

  // Fix 8: Clean up "asssets" -> "assets"
  content = content.replace(/asssets/g, "assets");

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`\n✅ Total fixes applied: ${fixCount}`);
    return true;
  } else {
    console.log("\n⚠️ No changes made");
    return false;
  }
}

// Find remaining dash patterns for manual review
function findRemainingDashPatterns(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const dashLines = [];

  lines.forEach((line, index) => {
    // Look for lines with 3+ consecutive dashes that aren't proper table separators
    if (line.match(/[^|]-{3,}[^|]/) && !line.includes("|---")) {
      dashLines.push({
        line: index + 1,
        content: line.trim().substring(0, 80),
      });
    }
  });

  if (dashLines.length > 0) {
    console.log(
      `\n⚠️ Found ${dashLines.length} remaining dash patterns to review:`,
    );
    dashLines.slice(0, 10).forEach((d) => {
      console.log(`  Line ${d.line}: ${d.content}...`);
    });
    if (dashLines.length > 10) {
      console.log(`  ... and ${dashLines.length - 10} more`);
    }
  }

  return dashLines;
}

// Main execution
const ms102Path = path.join(__dirname, "../src/app/ms102/data/questions.ts");
const md102Path = path.join(
  __dirname,
  "../src/app/lab-md102-exam/questions-md102.ts",
);

console.log("\n🚀 QUESTION TRANSFORMATION SCRIPT");
console.log("=".repeat(60));

// Transform MS-102
if (fs.existsSync(ms102Path)) {
  transformQuestions(ms102Path);
  const remaining = findRemainingDashPatterns(ms102Path);
}

// Transform MD-102
if (fs.existsSync(md102Path)) {
  transformQuestions(md102Path);
  const remaining = findRemainingDashPatterns(md102Path);
}

console.log("\n✅ Transformation complete!");
console.log("Run the app to verify: npm run dev");
