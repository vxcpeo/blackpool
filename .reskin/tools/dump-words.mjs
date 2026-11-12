import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(path.resolve('.reskin/tools/package.json'));
const { chromium } = req('playwright-core');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);
const lines = await page.evaluate(() => {
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  const wanted = /^(Live|bridge|Private|private|bridge|Shielding…|Shielded.*|Shielding)$/;
  while ((node = walker.nextNode())) {
    const text = (node.nodeValue || '').replace(/\s+/g, ' ').trim();
    if (!wanted.test(text)) continue;
    const el = node.parentElement;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const chain = [];
    let cur = el;
    for (let i = 0; i < 7 && cur; i += 1) {
      chain.push(`${cur.tagName.toLowerCase()}.${(cur.className || '').toString().split(/\s+/).filter(Boolean).join('.')}`);
      cur = cur.parentElement;
    }
    out.push(`${text} || ${chain.join(' > ')}`);
  }
  return out;
});
fs.writeFileSync('.reskin/shots/visible-words.txt', lines.join('\n'), 'utf8');
console.log(lines.join('\n'));
await browser.close();
