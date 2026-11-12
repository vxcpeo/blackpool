import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(path.resolve('.reskin/tools/package.json'));
const { chromium } = req('playwright-core');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);
const result = await page.evaluate(() => {
  const wanted = new Set(['Live', 'bridge', 'Private', 'private', 'Shielded', 'Shielding', 'ETH']);
  const out = [];
  const isVisible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || !isVisible(parent)) continue;
    for (let token of (node.nodeValue || '').split(/\s+/)) {
      token = token.replace(/^[^\p{L}\p{N}$€£¥#]+/u, '').replace(/[^\p{L}\p{N}%]+$/u, '');
      if (!wanted.has(token)) continue;
      const chain = [];
      let cur = parent;
      for (let i = 0; i < 5 && cur; i += 1) {
        chain.push(`${cur.tagName.toLowerCase()}.${(cur.className || '').toString().split(/\s+/).filter(Boolean).join('.')}`);
        cur = cur.parentElement;
      }
      out.push(`${token} || ${chain.join(' > ')} || node: ${(node.nodeValue || '').trim().slice(0, 60)}`);
    }
  }
  return out;
});
console.log(result.join('\n'));
await browser.close();
