import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(path.resolve('.reskin/tools/package.json'));
const { chromium } = req('playwright-core');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(800);
const info = await page.evaluate(() => {
  const dock = document.querySelector('.dock-bar');
  const out = { dock: { h: Math.round(dock.getBoundingClientRect().height), top: Math.round(dock.getBoundingClientRect().top) }, children: [] };
  for (const el of dock.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.height > 55) out.children.push({ tag: el.tagName, cls: el.className, h: Math.round(r.height), w: Math.round(r.width), display: getComputedStyle(el).display, hidden: el.hidden, text: (el.innerText || '').trim().slice(0, 40) });
  }
  return out;
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
