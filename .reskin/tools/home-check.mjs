import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const skill = 'C:/Users/Administrator/.dsh/skills/reskin/scripts';
const { capturePages } = await import(pathToFileURL(`${skill}/lib/browser.mjs`).href);
const { splitWords, multisetDiff } = await import(pathToFileURL(`${skill}/lib/compare.mjs`).href);

const route = process.argv[2] || '/';
const baselineFile = process.argv[3] || '.reskin/baseline/pages.json';
const pages = await capturePages({
  projectRoot: path.resolve('.'),
  outDir: path.resolve('.reskin'),
  baseUrl: 'http://127.0.0.1:4321/',
  routes: [route],
  label: 'current',
});
const base = JSON.parse(fs.readFileSync(baselineFile, 'utf8')).pages[route].desktop.words;
const cur = pages.pages[route].desktop.words;
const diff = multisetDiff(splitWords(base).stable, splitWords(cur).stable, 'word');
console.log('baseline stable', splitWords(base).stable.length, 'current stable', splitWords(cur).stable.length);
console.log('MISSING', JSON.stringify(diff.missing));
console.log('EXTRA', JSON.stringify(diff.extra));
