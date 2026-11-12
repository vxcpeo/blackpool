import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(path.resolve('.reskin/tools/package.json'));
const { chromium } = req('playwright-core');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const route = process.argv[2] || '/changelog';
const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(700);
const result = await page.evaluate(() => {
  const out = [];
  const root = document.querySelector('#app');
  const measure = (label) => out.push([label, document.documentElement.scrollWidth]);
  measure('start');
  const hideOne = (sel, label) => {
    const el = document.querySelector(sel);
    if (!el) { out.push([`${label} missing`]); return; }
    const prev = el.style.display;
    el.style.display = 'none';
    measure(`hide ${label}`);
    el.style.display = prev;
  };
  hideOne('.dock-bar', 'dock');
  hideOne('.toy-toast', 'toast');
  for (const child of [...root.children]) {
    const prev = child.style.display;
    child.style.display = 'none';
    measure(`hide child ${child.className || child.tagName}`);
    child.style.display = prev;
  }
  return out;
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
