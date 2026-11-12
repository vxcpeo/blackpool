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
  const width = () => document.documentElement.scrollWidth;
  const label = (el) => `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(/\s+/).filter(Boolean).join('.')}`;
  const path = [];
  let current = document.querySelector('.leaf-page') || document.querySelector('#app');
  for (let depth = 0; depth < 8 && current; depth += 1) {
    let culprit = null;
    for (const child of [...current.children]) {
      const prev = child.style.display;
      child.style.display = 'none';
      const shrunk = width() <= 390;
      child.style.display = prev;
      if (shrunk) { culprit = child; break; }
    }
    if (!culprit) break;
    path.push(label(culprit));
    current = culprit;
  }
  return { width: width(), path };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
