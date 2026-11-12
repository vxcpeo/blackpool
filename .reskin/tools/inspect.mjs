import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(path.resolve('.reskin/tools/package.json'));
const { chromium } = req('playwright-core');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox', '--hide-scrollbars'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' }).catch(() => {});
await page.waitForTimeout(1200);
const data = await page.evaluate(() => {
  const vis = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const anchors = [...document.querySelectorAll('a[href]')].filter(vis).map((a) => ({
    href: a.getAttribute('href'),
    name: (a.getAttribute('aria-label') || a.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60),
    cls: a.className,
    rect: [Math.round(a.getBoundingClientRect().width), Math.round(a.getBoundingClientRect().height)],
  }));
  const drawers = [...document.querySelectorAll('.toy-drawer, .toy-menu-board, .toy-scenario')].map((el) => ({
    cls: el.className,
    display: getComputedStyle(el).display,
    visibility: getComputedStyle(el).visibility,
    rect: [Math.round(el.getBoundingClientRect().width), Math.round(el.getBoundingClientRect().height)],
  }));
  return { anchors, drawers, title: document.title };
});
console.log(JSON.stringify(data.anchors.filter((a) => !a.name), null, 2));
console.log('DRAWERS', JSON.stringify(data.drawers.slice(0, 10), null, 2));
await browser.close();
