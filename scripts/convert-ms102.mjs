// scripts/convert-ms102.mjs
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const inFile  = resolve(__dirname, "../src/app/lab-ms102-exam/data/questionsDeploy.ts");
const outDir  = resolve(__dirname, "../src/app/ms102-test/data");
const outFile = resolve(outDir, "questions.ts");

function extractArrayFromTS(ts) {
  // erwartet: export const QUESTIONS_DEPLOY = [ ... ];
  const m = ts.match(/QUESTIONS_DEPLOY\s*=\s*(\[[\s\S]*\]);/);
  if (!m) return [];
  // quick&dirty eval-sicher machen: ersetze "export type" usw.
  // Wir transformieren zu JSON-ähnlich:
  let body = m[1]
    .replace(/(\w+)\s*:/g, '"$1":')          // Keys in Strings
    .replace(/'([^']*)'/g, (_, s) => `"${s.replace(/"/g, '\\"')}"`) // single->double
    .replace(/,\s*}/g, "}")                  // trailing commas
    .replace(/,\s*]/g, "]");

  // JSON parse versuchen
  try {
    return JSON.parse(body);
  } catch {
    // Fallback: sehr robuste Minimal-Konvertierung nicht möglich → leeres Array
    return [];
  }
}

function pickOptions(q) {
  // Falls im alten Datensatz "options" fehlt/leer, versuche aus Text zu ziehen
  const txt = q.question || q.text || "";
  const re = /(?:^|\s)([A-F])[\)\.:]\s+/gi;
  const idxs = [];
  let m;
  while ((m = re.exec(txt))) idxs.push(m.index + m[0].length);
  if (idxs.length < 2) return Array.isArray(q.options) ? q.options : [];
  const parts = [];
  for (let i = 0; i < idxs.length; i++) {
    const start = idxs[i];
    const end = i < idxs.length - 1 ? idxs[i + 1] - 3 : txt.length;
    parts.push(txt.substring(start, end).trim());
  }
  return parts.map(p => p.replace(/\s+/g, " ").trim()).filter(Boolean);
}

function normalize(old) {
  return old.map((q, i) => {
    const options = Array.isArray(q.options) && q.options.length ? q.options : pickOptions(q);
    return {
      id: q.id || `Q${q.number ?? i + 1}`,
      number: q.number ?? i + 1,
      text: (q.question || "").trim(),
      options,
      correctAnswer: q.correctAnswer || "",
      explanation: (q.explanation || "").trim() || undefined,
    };
  })
  // linear, keine Randomisierung – sortiere nach number, dann id
  .sort((a, b) => (a.number ?? 0) - (b.number ?? 0) || a.id.localeCompare(b.id));
}

function stringifyTS(arr) {
  const head = `export type SimpleQuestion = {
  id: string;
  number?: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

export const QUESTIONS: SimpleQuestion[] = `;
  return head + JSON.stringify(arr, null, 2) + ";\n";
}

(function run() {
  const ts = readFileSync(inFile, "utf8");
  const raw = extractArrayFromTS(ts);
  const norm = normalize(raw);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, stringifyTS(norm), "utf8");
  console.log(`✅ Konvertiert: ${outFile} — ${norm.length} Fragen`);
})();
