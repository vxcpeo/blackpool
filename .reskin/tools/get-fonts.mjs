import fs from 'node:fs/promises';
import path from 'node:path';

const cssUrl = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400..700&family=Nunito:wght@400..800&display=swap';
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const res = await fetch(cssUrl, { headers: { 'user-agent': ua } });
const css = await res.text();
console.log(css.slice(0, 800));
const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
console.log('font files:', urls.length);
const outDir = path.resolve('public/fonts');
await fs.mkdir(outDir, { recursive: true });
for (const url of urls) {
  const name = url.split('/').pop();
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await fs.writeFile(path.join(outDir, name), buf);
  console.log(name, buf.length);
}
await fs.writeFile(path.resolve('.reskin/tools/fonts.css'), css, 'utf8');
