#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFile = join(__dirname, '..', 'src', 'app', 'lab-az104-exam', 'questions-az104.ts');

console.log('Reading file...');
const lines = readFileSync(inputFile, 'utf-8').split('\n');

const result = [];
let i = 0;
let count = 0;

while (i < lines.length) {
  const line = lines[i];
  
  // Prüfe ob Zeile mit Array-Start beginnt (z.B. "question: [" oder "text: [")
  if (/^\s*(question|text|explanation):\s*\[/.test(line)) {
    count++;
    
    // Finde die passende schließende Klammer und .join()
    const arrayLines = [line];
    let j = i + 1;
    let foundEnd = false;
    
    while (j < lines.length && !foundEnd) {
      arrayLines.push(lines[j]);
      if (/^\s*\]\.join\(["']\\n["']\)/.test(lines[j])) {
        foundEnd = true;
      }
      j++;
    }
    
    if (foundEnd) {
      // Konvertiere das Array zu einem Template Literal
      const converted = convertArrayToTemplate(arrayLines);
      result.push(...converted);
      i = j;
      continue;
    }
  }
  
  result.push(line);
  i++;
}

console.log(`✓ Converted ${count} arrays to template literals`);
writeFileSync(inputFile, result.join('\n'), 'utf-8');
console.log('✓ File updated successfully!');

function convertArrayToTemplate(arrayLines) {
  // Extrahiere den Präfix (z.B. "    question: ")
  const firstLine = arrayLines[0];
  const match = firstLine.match(/^(\s*(?:question|text|explanation):\s*)\[/);
  if (!match) return arrayLines;
  
  const prefix = match[1];
  
  // Sammle alle String-Werte aus dem Array
  const strings = [];
  
  for (let i = 1; i < arrayLines.length - 1; i++) {
    const line = arrayLines[i].trim();
    
    // Überspringe leere Zeilen und Kommentare
    if (!line || line.startsWith('//')) continue;
    
    // Entferne trailing Komma
    let cleaned = line.replace(/,$/, '').trim();
    
    // Entferne Quotes
    if ((cleaned.startsWith('"') && cleaned.endsWith('"')) ||
        (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
      cleaned = cleaned.slice(1, -1);
    }
    
    strings.push(cleaned);
  }
  
  // Füge alle Strings zusammen
  const content = strings.join('\\n');
  
  // Escape Backticks und ${
  const escaped = content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  
  // Erstelle neue Zeile mit Template Literal
  return [prefix + '`' + escaped + '`' + ','];
}
