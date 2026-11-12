// Renders the X media frames from shot.html through a headless Chrome CDP session.
// Usage: node render.mjs loop <outDir> [fps] [seconds]
//        node render.mjs stills <outFilePrefix>
import fs from 'node:fs';
import path from 'node:path';

const CDP = process.env.CDP || 'http://127.0.0.1:9333';
const BASE = process.env.BASE || 'http://127.0.0.1:5173/xmedia/shot.html';

const mode = process.argv[2] || 'loop';
const arg = process.argv[3] || 'frames';

const tab = await (await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.addEventListener('open', res, { once: true });
  ws.addEventListener('error', rej, { once: true });
});

let seq = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function evaluate(expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true });
  return r.result?.value;
}

async function ready() {
  for (let i = 0; i < 80; i++) {
    const ok = await evaluate(
      "document.readyState === 'complete' && document.fonts.status === 'loaded' && window.__ready !== false"
    );
    if (ok) return;
    await sleep(80);
  }
}

async function shoot(url, file, width = 1600, height = 900) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.navigate', { url });
  await ready();
  await sleep(160);
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.from(data, 'base64'));
  console.log(path.basename(file));
}

await send('Page.enable');
await send('Runtime.enable');

if (mode === 'loop') {
  const fps = Number(process.argv[4] || 12.5);
  const seconds = Number(process.argv[5] || 8);
  const total = Math.round(fps * seconds);
  for (let i = 0; i < total; i++) {
    const t = (i / fps).toFixed(3);
    await shoot(`${BASE}?scene=loop&t=${t}`, path.join(arg, `${String(i).padStart(3, '0')}.png`));
  }
} else if (mode === 'stills') {
  await shoot(`${BASE}?scene=split`, `${arg}-04-split.png`);
  await shoot(`${BASE}?scene=three`, `${arg}-07-sign-shield-send.png`);
}

ws.close();
process.exit(0);
