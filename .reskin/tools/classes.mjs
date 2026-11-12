import fs from 'node:fs';
import path from 'node:path';

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (p.endsWith('.vue')) files.push(p);
  }
}
walk('src');

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const start = text.indexOf('<template>');
  const end = text.lastIndexOf('</template>');
  if (start < 0 || end < 0) continue;
  const tpl = text.slice(start + 10, end);
  const tokens = new Set();
  for (const m of tpl.matchAll(/\bclass="([^"]*)"/g)) {
    for (const c of m[1].split(/\s+/)) if (c && !c.includes('{')) tokens.add(c);
  }
  const sorted = [...tokens].sort();
  console.log(`\n### ${file.replace(/\\/g, '/')}  (${sorted.length} classes)`);
  console.log(sorted.join(' '));
}
