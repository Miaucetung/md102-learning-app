/**
 * Fix Table Formatting in Questions
 *
 * Converts dash-based pseudo-tables to proper Markdown tables
 *
 * Run: node scripts/fix-table-formatting.cjs
 */

const fs = require("fs");
const path = require("path");

// Patterns to fix
const TABLE_FIXES = [
  {
    // Azure ATP users table pattern
    pattern:
      /Name-----Member of group ---------------------------Azure Ad role\s*\n\s*_+\s*\n\s*User 1 --- Azure ATP Workspace 1 Administartors --- None\s*\n\s*\n\s*User 2 --- Azure ATP Workspace 1 Users ------------- None\s*\n\s*\n\s*User 3 --- None  ----------------------------------------Security administrator\s*\n\s*\n\s*User 4 --- Azure ATP Workspace 1 Users ------------- Global administrator/g,
    replacement: `| Name | Member of Group | Azure AD Role |
|------|-----------------|---------------|
| User 1 | Azure ATP Workspace 1 Administrators | None |
| User 2 | Azure ATP Workspace 1 Users | None |
| User 3 | None | Security administrator |
| User 4 | Azure ATP Workspace 1 Users | Global administrator |`,
  },
  {
    // Activity time table
    pattern:
      /08:05 - Activity1  ---- Low    ------- Device1[\s\S]*?08:35 - Activity2  ----High    ------- Device2/g,
    replacement: `| Time | Activity | Severity | Device |
|------|----------|----------|--------|
| 08:05 | Activity1 | Low | Device1 |
| 08:07 | Activity1 | Low | Device1 |
| 08:20 | Activity1 | High | Device1 |
| 08:35 | Activity2 | High | Device2 |`,
  },
];

function fixTableFormatting(filePath) {
  console.log(`\nProcessing: ${path.basename(filePath)}`);

  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;
  let fixCount = 0;

  // Fix 1: Azure ATP table
  const atpTableBad = `"Name-----Member of group ---------------------------Azure Ad role",
      "________________________________________________________________________",
      "User 1 --- Azure ATP Workspace 1 Administartors --- None",
      "",
      "User 2 --- Azure ATP Workspace 1 Users ------------- None",
      "",
      "User 3 --- None  ----------------------------------------Security administrator",
      "",
      "User 4 --- Azure ATP Workspace 1 Users ------------- Global administrator",`;

  const atpTableGood = `"| Name | Member of Group | Azure AD Role |",
      "|------|-----------------|---------------|",
      "| User 1 | Azure ATP Workspace 1 Administrators | None |",
      "| User 2 | Azure ATP Workspace 1 Users | None |",
      "| User 3 | None | Security administrator |",
      "| User 4 | Azure ATP Workspace 1 Users | Global administrator |",`;

  if (content.includes("Name-----Member of group")) {
    // Count occurrences
    const matches = content.match(/Name-----Member of group/g);
    if (matches) {
      console.log(`  Found ${matches.length} Azure ATP table(s) to fix`);
    }

    // Replace various formats of this table
    content = content.replace(
      /"Name-----Member of group ---------------------------Azure Ad role",\s*\n\s*"_+",\s*\n\s*"User 1 --- Azure ATP Workspace 1 Administartors --- None",\s*\n\s*"",\s*\n\s*"User 2 --- Azure ATP Workspace 1 Users ------------- None",\s*\n\s*"",\s*\n\s*"User 3 --- None  ----------------------------------------Security administrator",\s*\n\s*"",\s*\n\s*"User 4 --- Azure ATP Workspace 1 Users ------------- Global administrator",/g,
      atpTableGood,
    );

    // Also fix inline versions
    content = content.replace(
      /Name-----Member of group ---------------------------Azure Ad role\s*\\n\s*_+\s*\\n\s*User 1 --- Azure ATP Workspace 1 Administartors --- None\s*\\n\\n\s*User 2 --- Azure ATP Workspace 1 Users ------------- None\s*\\n\\n\s*User 3 --- None  ----------------------------------------Security administrator\s*\\n\\n\s*User 4 --- Azure ATP Workspace 1 Users ------------- Global administrator/g,
      `| Name | Member of Group | Azure AD Role |\\n|------|-----------------|---------------|\\n| User 1 | Azure ATP Workspace 1 Administrators | None |\\n| User 2 | Azure ATP Workspace 1 Users | None |\\n| User 3 | None | Security administrator |\\n| User 4 | Azure ATP Workspace 1 Users | Global administrator |`,
    );
  }

  // Fix 2: Activity table with times
  if (content.includes("08:05 - Activity1")) {
    console.log("  Found Activity time table to fix");
    content = content.replace(
      /"08:05 - Activity1  ---- Low    ------- Device1",\s*\n\s*"",\s*\n\s*"08:07 - Activity1  ---- Low    ------- Device1",[\s\S]*?"08:35 - Activity2  ----High    ------- Device2",/g,
      `"| Time | Activity | Severity | Device |",
      "|------|----------|----------|--------|",
      "| 08:05 | Activity1 | Low | Device1 |",
      "| 08:07 | Activity1 | Low | Device1 |",
      "| 08:20 | Activity1 | High | Device1 |",
      "| 08:35 | Activity2 | High | Device2 |",`,
    );
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log("  ✅ Tables fixed");
    return true;
  } else {
    console.log("  No changes needed or patterns not matched");
    return false;
  }
}

// Alternative: Manual line-by-line fix
function fixTablesManual(filePath) {
  console.log(`\nProcessing (manual): ${path.basename(filePath)}`);

  let content = fs.readFileSync(filePath, "utf8");
  let lines = content.split("\n");
  let newLines = [];
  let i = 0;
  let fixCount = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check for ATP table header
    if (line.includes("Name-----Member of group")) {
      // Find and replace the whole table block
      let tableBlock = [];
      let j = i;
      while (j < lines.length && j < i + 15) {
        if (lines[j].includes("User 4 ---")) {
          // Found end of table
          newLines.push('      "| Name | Member of Group | Azure AD Role |",');
          newLines.push('      "|------|-----------------|---------------|",');
          newLines.push(
            '      "| User 1 | Azure ATP Workspace 1 Administrators | None |",',
          );
          newLines.push(
            '      "| User 2 | Azure ATP Workspace 1 Users | None |",',
          );
          newLines.push('      "| User 3 | None | Security administrator |",');
          newLines.push(
            '      "| User 4 | Azure ATP Workspace 1 Users | Global administrator |",',
          );
          i = j + 1;
          fixCount++;
          break;
        }
        j++;
      }
      if (j >= i + 15) {
        // Didn't find table end, keep original
        newLines.push(line);
        i++;
      }
    } else {
      newLines.push(line);
      i++;
    }
  }

  if (fixCount > 0) {
    fs.writeFileSync(filePath, newLines.join("\n"));
    console.log(`  ✅ Fixed ${fixCount} tables`);
    return true;
  }
  return false;
}

// Main
const ms102Path = path.join(__dirname, "../src/app/ms102/data/questions.ts");

console.log("=".repeat(60));
console.log("TABLE FORMATTING FIX");
console.log("=".repeat(60));

// First check what's there
const content = fs.readFileSync(ms102Path, "utf8");
const dashTableCount = (content.match(/---+.*---+/g) || []).length;
console.log(`Found ${dashTableCount} potential dash-table patterns`);

// Try fixes
fixTablesManual(ms102Path);

// Verify
console.log("\nVerifying...");
const { execSync } = require("child_process");
try {
  execSync("npx tsc --noEmit src/app/ms102/data/questions.ts", {
    cwd: path.join(__dirname, ".."),
    stdio: "pipe",
  });
  console.log("✅ TypeScript validation passed");
} catch (e) {
  console.log("⚠️ TypeScript errors - check file");
}
