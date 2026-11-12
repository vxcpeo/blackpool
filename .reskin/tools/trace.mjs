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
  const hits = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue || '';
    if (!/0x4a1e|0x77b0|0x9f3c|7Gx4|0x8f3a/.test(text)) continue;
    const el = node.parentElement;
    const chain = [];
    let cur = el;
    for (let i = 0; i < 5 && cur; i += 1) {
      chain.push(`${cur.tagName.toLowerCase()}.${(cur.className || '').toString().split(/\s+/).filter(Boolean).join('.')}`);
      cur = cur.parentElement;
    }
    const cs = getComputedStyle(el);
    hits.push({ text: text.trim().slice(0, 100), chain, display: cs.display, visibility: cs.visibility, rect: [Math.round(el.getBoundingClientRect().width), Math.round(el.getBoundingClientRect().height)] });
  }
  const brand = document.querySelector('.dock-bar .toy-brand');
  return { hits, brand: brand ? { color: getComputedStyle(brand).color, bg: getComputedStyle(brand.parentElement).backgroundColor, cls: brand.className } : null };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
