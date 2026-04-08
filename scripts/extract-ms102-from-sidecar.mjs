import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SIDE_DIR = path.join(__dirname, "..", "public", "ms102", "deploy_sidecar");
const OUT_DIR = path.join(__dirname, "..", "src", "app", "lab-ms102-exam", "data");
const CSV_PATH = path.join(OUT_DIR, "questionsDeploy_drafts.csv");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(SIDE_DIR).filter(f => f.toLowerCase().endsWith(".txt"));

function normalize(s) {
  return s
    .replace(/\r/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// smartere Heuristik
function parseOne(raw) {
  const t = normalize(raw);
  const lines = t.split("\n").map(l => l.trim()).filter(Boolean);

  // ID/Nummer
  const mNum = t.match(/\b(Q|Question|Frage)\s*#?\s*(\d{1,4})/i);
  const number = mNum ? mNum[2] : "";

  // Alles vor "A)" als Frage
  const iA = lines.findIndex(l => /^A[\)\.\s]/.test(l));
  const question = iA > 0 ? lines.slice(0, iA).join(" ") : lines.join(" ");

  // Optionen sammeln
  const options = [];
  const regex = /^([A-D])[\)\.\s]\s*(.+)$/;
  for (let i = iA; i < lines.length; i++) {
    const m = lines[i].match(regex);
    if (!m) continue;
    const label = m[1];
    const rest = [m[2]];

    // Folgezeilen einfügen, bis neue Option oder "Answer"/"Explanation"
    for (let j = i + 1; j < lines.length; j++) {
      if (/^[A-D][\)\.\s]/.test(lines[j])) break;
      if (/^(Answer|Explanation|Reference|Result)/i.test(lines[j])) break;
      rest.push(lines[j]);
      i = j;
    }

    options.push(`${label}) ${rest.join(" ")}`);
  }

  // Richtige Antwort erkennen (falls vorhanden)
  let correct = "";
  const mAns = t.match(/Answer\s*[:\-]?\s*([A-D])/i);
  if (mAns) correct = options.find(o => o.startsWith(mAns[1] + ")")) || "";

  // Erklärung
  const mExp = t.match(/Explanation[:\-]?\s*(.+)/i);
  const explanation = mExp ? mExp[1].trim() : "";

  return { number, question, options, correctAnswer: correct, explanation };
}

const rows = [];
for (const f of files) {
  const p = path.join(SIDE_DIR, f);
  const raw = fs.readFileSync(p, "utf8");
  const parsed = parseOne(raw);
  rows.push([
    path.basename(f, ".txt"),
    parsed.number || "",
    parsed.question || "",
    (parsed.options || []).join("||"),
    parsed.correctAnswer || "",
    parsed.explanation || ""
  ]);
}

const header = "id;number;question;options;correctAnswer;explanation";
const csv = [header, ...rows.map(r => r.map(x => x.replace(/;/g, ",")).join(";"))].join("\n");
fs.writeFileSync(CSV_PATH, csv, "utf8");
console.log(`✅ CSV geschrieben: ${CSV_PATH} — ${rows.length} Zeilen`);
