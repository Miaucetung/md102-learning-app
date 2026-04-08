#!/usr/bin/env python3
"""
Konvertiert questions-az104.ts für GitHub Spark:
- Array.join("\\n") wird zu Template Literals (Backticks)
- Verbessert Lesbarkeit und Kompatibilität
"""

import re
import sys

def convert_array_join_to_template_literal(content):
    """Konvertiert [].join('\\n') Konstrukte zu Template Literals"""
    
    def replace_array(match):
        # Extrahiere den Array-Inhalt
        array_content = match.group(1)
        
        # Entferne führende/trailing Whitespace von jeder Zeile
        lines = []
        current_string = ""
        bracket_depth = 0
        in_string = False
        string_char = None
        i = 0
        
        # Parse den Array-Content
        while i < len(array_content):
            char = array_content[i]
            
            # String-Handling
            if char in ['"', "'"] and (i == 0 or array_content[i-1] != '\\\\'):
                if not in_string:
                    in_string = True
                    string_char = char
                elif char == string_char:
                    in_string = False
                    string_char = None
            
            # Wenn wir außerhalb eines Strings sind und ein Komma finden
            if not in_string and char == ',' and bracket_depth == 0:
                lines.append(current_string.strip())
                current_string = ""
            else:
                # Klammer-Tracking für verschachtelte Strukturen
                if not in_string:
                    if char == '[':
                        bracket_depth += 1
                    elif char == ']':
                        bracket_depth -= 1
                current_string += char
            
            i += 1
        
        # Letzten String hinzufügen
        if current_string.strip():
            lines.append(current_string.strip())
        
        # Verarbeite jede Zeile
        processed_lines = []
        for line in lines:
            # Entferne führende/trailing Quotes
            line = line.strip()
            if line.startswith('"') and line.endswith('"'):
                line = line[1:-1]
            elif line.startswith("'") and line.endswith("'"):
                line = line[1:-1]
            
            # Escape Backticks in der Zeile
            line = line.replace('`', '\\`')
            # Escape ${} in der Zeile
            line = re.sub(r'\$\{', r'\\${', line)
            
            processed_lines.append(line)
        
        # Erstelle Template Literal
        result = '`' + '\\n'.join(processed_lines) + '`'
        return result
    
    # Regex-Pattern für Array.join("\\n") oder Array.join('\\n')
    # Matche Arrays mit join
    pattern = r'\[\s*\n((?:[^[\]]|\[[^\]]*\])*?)\s*\]\.join\(["\']\\n["\']\)'
    
    # Ersetze alle Vorkommen
    converted = re.sub(pattern, replace_array, content, flags=re.MULTILINE | re.DOTALL)
    
    return converted

def main():
    input_file = r"c:\Users\mmuja\mainlab-ui\src\app\lab-az104-exam\questions-az104.ts"
    output_file = r"c:\Users\mmuja\mainlab-ui\src\app\lab-az104-exam\questions-az104.ts.new"
    
    print(f"Lese {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("Konvertiere Array.join() zu Template Literals...")
    converted = convert_array_join_to_template_literal(content)
    
    print(f"Schreibe {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(converted)
    
    print("✓ Konvertierung abgeschlossen!")
    print(f"Neue Datei: {output_file}")
    print("Bitte überprüfen und dann die alte Datei ersetzen.")

if __name__ == "__main__":
    main()
