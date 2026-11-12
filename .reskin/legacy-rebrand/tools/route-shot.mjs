import { withChrome, openPage } from 'file:///C:/Users/Administrator/.dsh/skills/rebrand/scripts/lib/chrome.mjs';
import path from 'node:path';

const project = process.argv[2];
const base = process.argv[3];
const route = process.argv[4];
const name = process.argv[5];
const out = path.join(project, '.rebrand', 'screenshots', `${name}.png`);

await withChrome({ width: 1440, height: 1000 }, async (browser) => {
  const page = await openPage(browser.cdp, { width: 1440, height: 1000 });
  try {
    await page.navigate(`${base}${route}`, { timeoutMs: 40000, delayMs: 1500, width: 1440, height: 1000 });
    await page.screenshot(out, { width: 1440, height: 1000, fullPage: true });
    const text = await page.bodyText();
    console.log(JSON.stringify({ route, hasGithub: /github/i.test(text), title: await page.title(), errors: page.pageErrors.slice(0, 5) }));
  } finally {
    await page.close();
  }
});
