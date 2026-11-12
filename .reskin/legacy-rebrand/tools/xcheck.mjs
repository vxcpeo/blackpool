import { withChrome, openPage } from 'file:///C:/Users/Administrator/.dsh/skills/rebrand/scripts/lib/chrome.mjs';
const out = process.argv[2];
await withChrome({ width: 1280, height: 900 }, async (browser) => {
  const page = await openPage(browser.cdp, { width: 1280, height: 900 });
  try {
    await page.navigate('https://x.com/agpool_robin', { timeoutMs: 45000, delayMs: 2500 });
    await page.screenshot(out, { width: 1280, height: 900 });
    const text = await page.bodyText();
    console.log(JSON.stringify({ title: await page.title(), text: text.slice(0, 600) }));
  } finally { await page.close(); }
});
