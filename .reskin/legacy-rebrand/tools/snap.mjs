import { withChrome, openPage } from 'file:///C:/Users/Administrator/.dsh/skills/rebrand/scripts/lib/chrome.mjs';
import path from 'node:path';

const project = process.argv[2];
const base = process.argv[3];
const out = path.join(project, '.rebrand', 'generated', 'public');

await withChrome({ width: 1200, height: 630 }, async (browser) => {
  const page = await openPage(browser.cdp, { width: 1200, height: 630 });
  try {
    await page.navigate(`${base}/.rebrand/tools/og.html`, { timeoutMs: 30000, delayMs: 900 });
    await page.evaluate('document.fonts.ready.then(() => document.fonts.status)');
    await page.screenshot(path.join(out, 'og.png'), { width: 1200, height: 630 });
  } finally {
    await page.close();
  }
  const icon = await openPage(browser.cdp, { width: 180, height: 180 });
  try {
    await icon.navigate(`${base}/.rebrand/tools/icon.html`, { timeoutMs: 30000, delayMs: 400 });
    await icon.screenshot(path.join(out, 'apple-icon.png'), { width: 180, height: 180 });
  } finally {
    await icon.close();
  }
  const preview = await openPage(browser.cdp, { width: 420, height: 300 });
  try {
    await preview.navigate(`${base}/.rebrand/tools/mark-preview.html`, { timeoutMs: 30000, delayMs: 400 });
    await preview.screenshot(path.join(project, '.rebrand', 'generated', 'mark-preview.png'), { width: 420, height: 300 });
  } finally {
    await preview.close();
  }
});
console.log(JSON.stringify({ ok: true, out }));
