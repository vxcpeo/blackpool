import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(path.resolve('.reskin/tools/package.json'));
const { chromium } = req('playwright-core');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const route = process.argv[2] || '/changelog';
const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(900);
const info = await page.evaluate(() => {
  const cw = document.documentElement.clientWidth;
  const wide = [];
  for (const el of document.body.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.right > cw + 2) {
      wide.push({
        tag: el.tagName,
        cls: (el.className || '').toString().slice(0, 70),
        right: Math.round(r.right),
        width: Math.round(r.width),
        pos: getComputedStyle(el).position,
        overflowX: getComputedStyle(el).overflowX,
      });
    }
    if (wide.length > 25) break;
  }
  const dock = document.querySelector('.dock-bar');
  const links = document.querySelector('.dock-links');
  const track = document.querySelector('.dock-track');
  return {
    cw,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScroll: document.body.scrollWidth,
    wide,
    dock: dock ? { w: Math.round(dock.getBoundingClientRect().width), right: Math.round(dock.getBoundingClientRect().right), scroll: dock.scrollWidth } : null,
    links: links ? { w: Math.round(links.getBoundingClientRect().width), scroll: links.scrollWidth } : null,
    track: track ? { w: Math.round(track.getBoundingClientRect().width), scroll: track.scrollWidth } : null,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
