/**
 * Find questions without proper scenario context
 */

const fs = require("fs");

function analyzeQuestions(filePath, prefix) {
  const content = fs.readFileSync(filePath, "utf8");

  // Extract each question block using regex
  const questionBlocks = [];
  const regex =
    /{\s*id:\s*["']([^"']+)["'],\s*number:\s*(\d+),[\s\S]*?question:\s*([\s\S]*?)(?:options:|correctAnswers:)/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    questionBlocks.push({
      id: match[1],
      number: parseInt(match[2]),
      questionText: match[3],
    });
  }

  // Classify each question
  const classifications = {
    VALID: [],
    INCOMPLETE: [],
    LOW_QUALITY: [],
    UNRECOVERABLE: [],
  };

  const scenarioKeywords = [
    "you have",
    "du hast",
    "verwaltest",
    "company",
    "unternehmen",
    "subscription",
    "tenant",
    "organization",
  ];
  const actionKeywords = [
    "need to",
    "must",
    "should",
    "want to",
    "musst",
    "sollst",
    "möchtest",
    "ensure",
    "configure",
  ];
  const lowQualityIndicators = [
    "what is the",
    "define",
    "which of the following is true",
    "true or false",
  ];

  questionBlocks.forEach((q) => {
    const text = q.questionText.toLowerCase();
    const hasScenario = scenarioKeywords.some((kw) => text.includes(kw));
    const hasAction = actionKeywords.some((kw) => text.includes(kw));
    const isLowQuality = lowQualityIndicators.some((kw) => text.includes(kw));
    const textLength = q.questionText.length;

    if (textLength < 50) {
      classifications.UNRECOVERABLE.push(q);
    } else if (isLowQuality && !hasScenario) {
      classifications.LOW_QUALITY.push(q);
    } else if (!hasScenario && !hasAction) {
      classifications.LOW_QUALITY.push(q);
    } else if (!hasScenario || textLength < 100) {
      classifications.INCOMPLETE.push(q);
    } else {
      classifications.VALID.push(q);
    }
  });

  console.log(`\n=== ${prefix} Classification Results ===`);
  console.log(`Total: ${questionBlocks.length}`);
  console.log(`VALID: ${classifications.VALID.length}`);
  console.log(`INCOMPLETE: ${classifications.INCOMPLETE.length}`);
  console.log(`LOW_QUALITY: ${classifications.LOW_QUALITY.length}`);
  console.log(`UNRECOVERABLE: ${classifications.UNRECOVERABLE.length}`);

  // Show examples of each category
  console.log("\n--- LOW QUALITY Examples (first 5) ---");
  classifications.LOW_QUALITY.slice(0, 5).forEach((q) => {
    console.log(
      `\nQ${q.number}: ${q.questionText.substring(0, 150).replace(/[\n\r]+/g, " ")}...`,
    );
  });

  console.log("\n--- INCOMPLETE Examples (first 5) ---");
  classifications.INCOMPLETE.slice(0, 5).forEach((q) => {
    console.log(
      `\nQ${q.number}: ${q.questionText.substring(0, 150).replace(/[\n\r]+/g, " ")}...`,
    );
  });

  return classifications;
}

console.log("DETAILED QUESTION QUALITY ANALYSIS");
console.log("==================================\n");

const md102 = analyzeQuestions(
  "src/app/lab-md102-exam/questions-md102.ts",
  "MD-102",
);
const ms102 = analyzeQuestions("src/app/ms102/data/questions.ts", "MS-102");
