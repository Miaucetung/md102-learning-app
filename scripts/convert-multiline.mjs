#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFile = join(__dirname, '..', 'src', 'app', 'lab-az104-exam', 'questions-az104.ts');

console.log('Reading file...');
let content = readFileSync(inputFile, 'utf-8');

let totalCount = 0;

// Multi-line regex: Finde [  \n   ...  \n  ].join("\n")
// Mit s-flag für dotall
const regex = /\[\s*\n([\s\S]*?)\s*\n\s*\]\.join\(["']\\n["']\)/gm;

content = content.replace(regex, (match, arrayContent) => {
  totalCount++;
  
  // Extrahiere String-Zeilen
  const lines = arrayContent.split('\n');
  const strings = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Überspringe leere Zeilen und Kommentare
    if (!trimmed || trimmed.startsWith('//')) continue;
    
    // Entferne trailing Komma
    let cleaned = trimmed.replace(/,$/, '');
    
    // Entferne Quotes
    if ((cleaned.startsWith('"') && cleaned.endsWith('"')) ||
        (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
      cleaned = cleaned.slice(1, -1);
    }
    
    strings.push(cleaned);
  }
  
  // Füge mit \n zusammen
  const joined = strings.join('\\n');
  
  // Escape für Template Literal
  const escaped = joined
    .replace(/\\/g, '\\\\')  // Erst Backslashes escapen
    .replace(/`/g, '\\`')     // Dann Backticks
    .replace(/\$\{/g, '\\${'); // Dann Template-Expressions
  
  return '`' + escaped + '`';
});

console.log(`✓ Total: ${totalCount} arrays converted to template literals`);

writeFileSync(inputFile, content, 'utf-8');
console.log('✓ File updated successfully!');
