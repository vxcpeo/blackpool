import fs from 'node:fs';
import path from 'node:path';

const { analyzeProject, contractDiff } = await import('file:///C:/Users/Administrator/.dsh/skills/reskin/scripts/inventory.mjs').catch(async () => {
  const { pathToFileURL } = await import('node:url');
  return import(pathToFileURL('C:/Users/Administrator/.dsh/skills/reskin/scripts/inventory.mjs').href);
});

const baseline = JSON.parse(fs.readFileSync('.reskin/baseline/inventory.json', 'utf8'));
const current = await analyzeProject(process.cwd());
const diff = contractDiff(baseline.contentContract, current.contentContract, { allowAdditions: true });
console.log('archetype', JSON.stringify(current.archetype));
console.log('palette', current.palette.slice(0, 6).map((c) => c.hex).join(' '));
console.log('accentVars', JSON.stringify(current.designSignals.colorVars.slice(0, 6)));
console.log('ISSUES', diff.issues.length);
for (const issue of diff.issues.slice(0, 40)) console.log(' -', issue);
console.log('WARNINGS', diff.warnings.length);
for (const w of diff.warnings.slice(0, 15)) console.log(' +', w);

const srcFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else srcFiles.push(p);
  }
}
walk('src');
let aside = 0; let header = 0; let nav = 0;
for (const f of srcFiles) {
  if (!/\.(vue|js|css)$/.test(f)) continue;
  const text = fs.readFileSync(f, 'utf8');
  for (const m of text.matchAll(/<aside\b|<header\b|<nav\b/g)) {
    if (m[0] === '<aside') aside += 1;
    if (m[0] === '<header') header += 1;
    if (m[0] === '<nav') nav += 1;
  }
  if (/\bsidebar\b/i.test(text)) console.log('SIDEBAR WORD', f);
}
console.log({ aside, header, nav });
