import re

with open(r'c:\Users\mmuja\mainlab-ui\src\app\lab-az104-exam\questions-az104.ts', 'r', encoding='utf-8') as f:
    content = f.read()

count = 0

# Pattern mit DOTALL
pattern = r'\[\s*\n(.*?)\]\.join\(["\']\\n["\']\)'

def replace_func(match):
    global count
    count += 1
    array_content = match.group(1)
    lines = []
    
    for line in array_content.split('\n'):
        stripped = line.strip()
        if not stripped or stripped.startswith('//'):
            continue
        stripped = stripped.rstrip(',').strip()
        if (stripped.startswith('"') and stripped.endswith('"')) or \
           (stripped.startswith("'") and stripped.endswith("'")):
            stripped = stripped[1:-1]
        lines.append(stripped)
    
    joined = '\\n'.join(lines)
    escaped = joined.replace('`', '\\`').replace('${', '\\${')
    
    return f'`{escaped}`'

result = re.sub(pattern, replace_func, content, flags=re.DOTALL)

with open(r'c:\Users\mmuja\mainlab-ui\src\app\lab-az104-exam\questions-az104.ts', 'w', encoding='utf-8') as f:
    f.write(result)

print(f'✓ Converted {count} arrays to template literals')
