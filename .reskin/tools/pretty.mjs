import fs from 'node:fs';

const file = process.argv[2];
const text = fs.readFileSync(file, 'utf8');
const start = text.indexOf('<template>');
const end = text.lastIndexOf('</template>');
let tpl = text.slice(start + 10, end);
tpl = tpl.replace(/>\s*</g, '>\n<');
const lines = tpl.split('\n');
let depth = 0;
for (const raw of lines) {
  const line = raw.trim();
  if (!line) continue;
  if (/^<\//.test(line)) depth = Math.max(0, depth - 1);
  console.log(`${String(depth).padStart(2)} ${'  '.repeat(Math.min(depth, 12))}${line.length > 300 ? line.slice(0, 300) + '…' : line}`);
  if (/^<(?!\/)(?!.*\/>)(?!.*<\/)/.test(line) && !/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b/i.test(line)) depth += 1;
}
