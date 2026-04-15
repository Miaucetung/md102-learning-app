/**
 * Question Quality Audit Script
 * Classifies questions into: VALID, INCOMPLETE, LOW_QUALITY, UNRECOVERABLE
 */

import fs from "fs";
import path from "path";

// Classification criteria
const QUALITY_CRITERIA = {
  MIN_QUESTION_LENGTH: 100,
  MIN_EXPLANATION_LENGTH: 150,
  REQUIRED_SCENARIO_KEYWORDS: [
    "You have",
    "Du hast",
    "Your company",
    "Ein Unternehmen",
    "manage",
    "verwaltest",
  ],
  REQUIRED_ACTION_KEYWORDS: [
    "need to",
    "must",
    "should",
    "want to",
    "musst",
    "sollst",
    "möchtest",
  ],
  LOW_QUALITY_INDICATORS: [
    "What is",
    "Which of the following",
    "True or False",
    "Define",
  ],
};

function classifyQuestion(q, index) {
  const issues = [];
  let classification = "VALID";

  const questionText =
    typeof q.question === "string"
      ? q.question
      : q.question?.join?.("\n") || "";
  const explanationText = q.explanation || q.explanationDe || "";

  // Check question length
  if (questionText.length < QUALITY_CRITERIA.MIN_QUESTION_LENGTH) {
    issues.push(`Question too short (${questionText.length} chars)`);
    classification = "LOW_QUALITY";
  }

  // Check for scenario context
  const hasScenario = QUALITY_CRITERIA.REQUIRED_SCENARIO_KEYWORDS.some((kw) =>
    questionText.toLowerCase().includes(kw.toLowerCase()),
  );
  if (!hasScenario) {
    issues.push("Missing scenario context");
    if (classification !== "UNRECOVERABLE") classification = "LOW_QUALITY";
  }

  // Check for action requirement
  const hasAction = QUALITY_CRITERIA.REQUIRED_ACTION_KEYWORDS.some((kw) =>
    questionText.toLowerCase().includes(kw.toLowerCase()),
  );
  if (!hasAction && !hasScenario) {
    issues.push("Missing clear action requirement");
    classification = "LOW_QUALITY";
  }

  // Check explanation quality
  if (
    !explanationText ||
    explanationText.length < QUALITY_CRITERIA.MIN_EXPLANATION_LENGTH
  ) {
    issues.push(
      `Explanation missing or too short (${explanationText.length} chars)`,
    );
    if (classification === "VALID") classification = "INCOMPLETE";
  }

  // Check for low-quality indicators
  const isLowQuality = QUALITY_CRITERIA.LOW_QUALITY_INDICATORS.some(
    (indicator) => questionText.includes(indicator),
  );
  if (isLowQuality && classification === "VALID") {
    issues.push("Contains low-quality pattern (pure memorization)");
    classification = "LOW_QUALITY";
  }

  // Check for unrecoverable content
  if (questionText.length < 30 || !q.options || q.options.length < 2) {
    classification = "UNRECOVERABLE";
    issues.push("Content too minimal to reconstruct");
  }

  // Check for broken formatting
  if (
    questionText.includes("\\n\\n") ||
    questionText.includes("[object Object]")
  ) {
    issues.push("Broken formatting detected");
    if (classification === "VALID") classification = "INCOMPLETE";
  }

  return {
    number: q.number || index + 1,
    id: q.id || `Q${q.number || index + 1}`,
    classification,
    issues,
    questionPreview: questionText.substring(0, 100).replace(/\n/g, " ") + "...",
    hasReferences: !!(q.references && q.references.length > 0),
    area: q.area || "Unknown",
  };
}

async function auditFile(filePath, variableName) {
  console.log(`\n${"=".repeat(80)}`);
  console.log(`AUDITING: ${path.basename(filePath)}`);
  console.log("=".repeat(80));

  const content = fs.readFileSync(filePath, "utf8");

  // Extract the questions array using regex
  const match = content.match(
    new RegExp(
      `export const ${variableName}[^=]*=\\s*\\[([\\s\\S]*?)\\];`,
      "m",
    ),
  );

  if (!match) {
    console.error(`Could not find ${variableName} in ${filePath}`);
    return null;
  }

  // Simple counting approach
  const questionMatches = content.match(/{\s*(?:id|number):/g) || [];
  const totalQuestions = questionMatches.length - 1; // Subtract type definition

  // Count patterns
  const stats = {
    total: totalQuestions,
    withScenario: (content.match(/You have|Du hast|verwaltest/gi) || []).length,
    withExplanation: (content.match(/explanation(?:De)?:\s*\[/g) || []).length,
    withReferences: (content.match(/references:\s*\[/g) || []).length,
    brokenFormatting: (content.match(/\\\\n\\\\n|\\\\n/g) || []).length,
    shortQuestions: 0,
    emptyOptions: 0,
  };

  // Classification summary
  const classifications = {
    VALID: 0,
    INCOMPLETE: 0,
    LOW_QUALITY: 0,
    UNRECOVERABLE: 0,
  };

  // Estimate based on patterns
  const scenarioRatio = stats.withScenario / stats.total;
  const explanationRatio = stats.withExplanation / stats.total;
  const referenceRatio = stats.withReferences / stats.total;

  // Heuristic classification
  classifications.VALID = Math.floor(
    stats.total * Math.min(scenarioRatio, explanationRatio) * 0.7,
  );
  classifications.INCOMPLETE = Math.floor(stats.total * 0.2);
  classifications.LOW_QUALITY = Math.floor(
    stats.total * (1 - scenarioRatio) * 0.5,
  );
  classifications.UNRECOVERABLE =
    stats.total -
    classifications.VALID -
    classifications.INCOMPLETE -
    classifications.LOW_QUALITY;
  if (classifications.UNRECOVERABLE < 0) classifications.UNRECOVERABLE = 0;

  console.log("\n📊 AUDIT SUMMARY:");
  console.log(`   Total Questions: ${stats.total}`);
  console.log(
    `   With Scenario Context: ${stats.withScenario} (${((stats.withScenario / stats.total) * 100).toFixed(1)}%)`,
  );
  console.log(
    `   With Explanations: ${stats.withExplanation} (${((stats.withExplanation / stats.total) * 100).toFixed(1)}%)`,
  );
  console.log(
    `   With References: ${stats.withReferences} (${((stats.withReferences / stats.total) * 100).toFixed(1)}%)`,
  );
  console.log(`   Formatting Issues: ${stats.brokenFormatting}`);

  console.log("\n📋 CLASSIFICATION ESTIMATE:");
  console.log(`   ✅ VALID: ~${classifications.VALID}`);
  console.log(`   ⚠️  INCOMPLETE: ~${classifications.INCOMPLETE}`);
  console.log(`   📉 LOW QUALITY: ~${classifications.LOW_QUALITY}`);
  console.log(`   ❌ UNRECOVERABLE: ~${classifications.UNRECOVERABLE}`);

  console.log("\n🔧 RECOMMENDED ACTIONS:");
  if (referenceRatio < 0.5) {
    console.log("   • Add Microsoft Learn references to all questions");
  }
  if (scenarioRatio < 0.8) {
    console.log("   • Convert pure memorization questions to scenario-based");
  }
  if (stats.brokenFormatting > 0) {
    console.log(
      `   • Fix ${stats.brokenFormatting} formatting issues (escaped newlines)`,
    );
  }

  return { stats, classifications };
}

// Main execution
console.log("🔍 QUESTION QUALITY AUDIT");
console.log("==========================\n");

const md102Result = await auditFile(
  "src/app/lab-md102-exam/questions-md102.ts",
  "QUESTIONS_MD102",
);

const ms102Result = await auditFile(
  "src/app/ms102/data/questions.ts",
  "QUESTIONS_MS102",
);

console.log("\n" + "=".repeat(80));
console.log("OVERALL RECOMMENDATIONS");
console.log("=".repeat(80));
console.log(`
1. PRIORITY: Fix formatting issues (literal \\n showing in UI)
2. Add Microsoft Learn references to all questions
3. Transform memorization-only questions into scenario-based exercises
4. Create decision-tree style questions for complex topics
5. Add visualization descriptions for network/identity flows
`);
