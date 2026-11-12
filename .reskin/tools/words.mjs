import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(path.resolve('.reskin/tools/package.json'));
const { chromium } = req('playwright-core');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);
const info = await page.evaluate(() => {
  const scope = document.querySelector('.toy-window');
  const out = [];
  const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const text = (node.nodeValue || '').trim();
    if (!/\b(Shielding|Shielded|Live|private|Private|bridge|ETH)\b/.test(text)) continue;
    const el = node.parentElement;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const chain = [];
    let cur = el;
    for (let i = 0; i < 6 && cur && cur !== scope; i += 1) {
      chain.push(`${cur.tagName.toLowerCase()}.${(cur.className || '').toString().split(/\s+/).filter(Boolean).join('.')}`);
      cur = cur.parentElement;
    }
    out.push({ text: text.slice(0, 90), chain });
  }
  return out;
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
