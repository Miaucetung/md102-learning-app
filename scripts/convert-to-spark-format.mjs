#!/usr/bin/env node
/**
 * Konvertiert questions-az104.ts für GitHub Spark:
 * - Array.join("\n") wird zu Template Literals (Backticks)
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFile = join(__dirname, '..', 'src', 'app', 'lab-az104-exam', 'questions-az104.ts');

console.log('Lese Datei:', inputFile);
let content = readFileSync(inputFile, 'utf-8');

let count = 0;

// Funktion zum Parsen eines Array-Literals
function parseArrayLiteral(arrayContent) {
  const lines = [];
  let currentToken = '';
  let inString = false;
  let stringChar = null;
  let bracketDepth = 0;
  let i = 0;
  
  while (i < arrayContent.length) {
    const char = arrayContent[i];
    const prevChar = i > 0 ? arrayContent[i - 1] : '';
    
    // Escape-Sequenzen handhaben
    if (char === '\\' && inString) {
      currentToken += char;
      i++;
      if (i < arrayContent.length) {
        currentToken += arrayContent[i];
      }
      i++;
      continue;
    }
    
    // String-Grenzen erkennen
    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
        currentToken += char;
      } else if (char === stringChar) {
        inString = false;
        currentToken += char;
        stringChar = null;
      } else {
        currentToken += char;
      }
      i++;
      continue;
    }
    
    if (inString) {
      currentToken += char;
      i++;
      continue;
    }
    
    // Nicht im String: Array-Verschachtelung tracken
    if (char === '[') {
      bracketDepth++;
      currentToken += char;
    } else if (char === ']') {
      bracketDepth--;
      currentToken += char;
    } else if (char === ',' && bracketDepth === 0) {
      // Element-Trenner auf oberster Ebene
      const trimmed = currentToken.trim();
      if (trimmed) {
        lines.push(trimmed);
      }
      currentToken = '';
    } else {
      currentToken += char;
    }
    
    i++;
  }
  
  // Letztes Element
  const trimmed = currentToken.trim();
  if (trimmed) {
    lines.push(trimmed);
  }
  
  return lines;
}

// Konvertiere alle [].join("\n") oder [].join('\n') zu Template Literals
// Verwende eine nicht-greedy Regex für besseres Matching
content = content.replace(
  /\[\s*\n([\s\S]*?)\]\.join\(["']\\n["']\)/g,
  (match, arrayContent) => {
    count++;
    
    // Parse Array-Elemente
    const elements = parseArrayLiteral(arrayContent);
    
    // Entferne Quotes von jedem Element
    const unquoted = elements.map(el => {
      let cleaned = el.trim();
      // Entferne äußere Quotes (aber behalte escaped Quotes)
      if ((cleaned.startsWith('"') && cleaned.endsWith('"')) ||
          (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
        cleaned = cleaned.slice(1, -1);
      }
      return cleaned;
    });
    
    // Füge zusammen und escape für Template Literal
    const joined = unquoted.join('\\n');
    const escaped = joined
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');
    
    return '`' + escaped + '`';
  }
);

console.log(`✓ ${count} Array.join() Konstrukte konvertiert`);

// Schreibe zurück
writeFileSync(inputFile, content, 'utf-8');
console.log('✓ Datei erfolgreich aktualisiert!');
