import fs from "node:fs";
import path from "node:path";
import { QUESTIONS_MS102 } from "../src/app/ms102/data/questions";

const outDir = path.join(process.cwd(), "obsidian");
fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, "ms102-110-questions.md");

let md = "";
md += "# 📚 MS-102 – 110 Prüfungsfragen (Cert2Brain-Basis)\n\n";
md += "> Jede Frage basiert auf einer ursprünglichen ID (z. B. Q4, Q11 …) und wurde für Lernzwecke\n";
md += "> in eigenes Format umgebaut. Nutze die Erklärungen und Tags für deine Obsidian-Karteikarten.\n\n";

for (const q of QUESTIONS_MS102) {
  const tags = [
    "#MS102",
    "#Microsoft365",
    "#Exam",
    `#${q.area.replace(/\s+/g, "")}`,
    `#${q.difficulty}`,
    `#${q.id}`
  ];

  md += `---\n\n`;
  md += `## 🧩 ${q.number}. ${q.id}\n\n`;
  md += `**Bereich:** ${q.area}  \n`;
  md += `**Schwierigkeit:** ${q.difficulty}  \n`;
  md += `**Original-ID:** \`${q.id}\`\n\n`;

  md += `### 🧾 Fragestellung\n\n`;
  md += q.question + "\n\n";

  md += `### 🔡 Antwortmöglichkeiten\n\n`;
  for (const opt of q.options) {
    md += `- **${opt.key})** ${opt.text}\n`;
  }
  md += "\n";

  md += `### ✅ Richtige Antwort(en)\n\n`;
  for (const key of q.correctAnswers) {
    md += `- **${key}**\n`;
  }
  md += "\n";

  md += `### 🧩 Erklärung (DE)\n\n`;
  md += q.explanationDe + "\n\n";

  md += `### 🏷️ Tags\n\n`;
  md += tags.join(" ") + "\n\n";
}

// letzte Trennlinie optional
md += "---\n";

fs.writeFileSync(outFile, md, "utf8");
console.log("✅ Obsidian-Datei geschrieben:", outFile);
