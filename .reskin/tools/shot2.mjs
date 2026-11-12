import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(path.resolve('.reskin/tools/package.json'));
const { chromium } = req('playwright-core');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const route = process.argv[2] || '/';
const y = Number(process.argv[3] || 0);
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);
const out = process.argv[6] || '.reskin/shots/view.png';

const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox', '--hide-scrollbars'] });
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(900);
await page.evaluate((top) => window.scrollTo(0, top), y);
await page.waitForTimeout(400);
await page.screenshot({ path: out });
console.log('shot', route, y, width, height, out);
await browser.close();
