import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(path.resolve('.reskin/tools/package.json'));
const { chromium } = req('playwright-core');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const routes = process.argv.slice(2);
if (!routes.length) routes.push('/', '/docs', '/agents', '/analytics', '/app', '/changelog', '/token', '/status', '/recover', '/privacy');

const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox', '--hide-scrollbars'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await fs.mkdir('.reskin/shots', { recursive: true });
for (const route of routes) {
  await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await sleep(40);
    }
    window.scrollTo(0, 0);
    await sleep(120);
  });
  const slug = route === '/' ? 'home' : route.replace(/^\/+/, '').replace(/[/?]/g, '-');
  await page.screenshot({ path: `.reskin/shots/${slug}.png`, fullPage: true });
  console.log('shot', route);
}
await browser.close();
