#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFile = join(__dirname, '..', 'src', 'app', 'lab-az104-exam', 'questions-az104.ts');

console.log('Reading file...');
let content = readFileSync(inputFile, 'utf-8');

let totalCount = 0;

// Strategie: Finde alle [...]join("\n") Muster und ersetze sie
// Arbeite solange, bis keine mehr gefunden werden
let changed = true;
let iterations = 0;
const maxIterations = 50;

while (changed && iterations < maxIterations) {
  changed = false;
  iterations++;
  
  // Regex um [...].join("\n") zu finden - nicht greedy
  const regex = /\[([^\[\]]*(?:\[[^\]]*\][^\[\]]*)*)\]\.join\(["']\\n["']\)/g;
  
  content = content.replace(regex, (match, arrayContent) => {
    changed = true;
    totalCount++;
    
    // Parse die Array-Elemente
    const elements = [];
    let current = '';
    let inString = false;
    let stringChar = null;
    let depth = 0;
    
    for (let i = 0; i < arrayContent.length; i++) {
      const char = arrayContent[i];
      const prevChar = i > 0 ? arrayContent[i - 1] : '';
      
      // Escape-Sequenzen überspringen
      if (prevChar === '\\') {
        current += char;
        continue;
      }
      
      // String-Start/-Ende
      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = null;
        }
      }
      
      // Nested Arrays tracken
      if (!inString) {
        if (char === '[') depth++;
        if (char === ']') depth--;
        
        // Komma auf Top-Level
        if (char === ',' && depth === 0) {
          if (current.trim()) {
            elements.push(current.trim());
          }
          current = '';
          continue;
        }
      }
      
      current += char;
    }
    
    if (current.trim()) {
      elements.push(current.trim());
    }
    
    // Entferne Quotes von Strings
    const unquoted = elements.map(el => {
      let s = el.trim();
      if ((s.startsWith('"') && s.endsWith('"')) ||
          (s.startsWith("'") && s.endsWith("'"))) {
        s = s.slice(1, -1);
      }
      return s;
    });
    
    // Füge mit \n zusammen
    const joined = unquoted.join('\\n');
    
    // Escape Backticks und ${
    const escaped = joined
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');
    
    return '`' + escaped + '`';
  });
  
  if (changed) {
    console.log(`Iteration ${iterations}: ${totalCount} conversions so far`);
  }
}

console.log(`\n✓ Total: ${totalCount} arrays converted to template literals`);
console.log(`✓ Completed in ${iterations} iteration(s)`);

writeFileSync(inputFile, content, 'utf-8');
console.log('✓ File updated successfully!');
