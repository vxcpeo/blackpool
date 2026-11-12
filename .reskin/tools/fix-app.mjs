import fs from 'node:fs';
import path from 'node:path';

function walkVue(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkVue(p, out);
    else if (p.endsWith('.vue')) out.push(p);
  }
  return out;
}

const NEW_LOGO = '<svg class="logo-mark" viewBox="0 0 48 48" width="26" height="26" aria-hidden="true" focusable="false"><rect x="3" y="3" width="42" height="42" rx="15" fill="currentColor"/><path d="M24 11.5 34 33.5h-6.2l-1.9-4.6h-3.8l-1.9 4.6h-6.2L24 11.5Zm0 8.8-1.5 4.9h3L24 20.3Z" fill="#FBF6E9"/><circle cx="35.5" cy="12.5" r="3.4" fill="#FFC94A"/></svg>';

for (const file of walkVue('src')) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/<svg viewBox="0 0 100 100"[\s\S]*?<\/svg>/g, NEW_LOGO);
  fs.writeFileSync(file, text, 'utf8');
}

// AppView dock wrapper
{
  const file = 'src/views/pages/AppView.vue';
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace('<div class="pod-sign">', '<nav class="dock-bar pod-dock">');
  const teleport = text.indexOf('<Teleport to="body">');
  const before = text.lastIndexOf('</div>', teleport);
  if (before < 0) throw new Error('dock close not found');
  text = `${text.slice(0, before)}</nav>${text.slice(before + 6)}`;
  text = text.replace(
    `:style="{
                padding: '8px 12px',
                background: chain.id === chainId ? 'var(--color-primary)' : 'transparent',
                borderRadius: 'var(--radius-pill)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: chain.id === chainId ? 'var(--color-on-primary)' : 'var(--color-fg2)',
                cursor: 'pointer',
              }"`,
    `:class="{ 'leaf-on': chain.id === chainId }"`,
  );
  text = text.replace(/fontFamily: 'var\(--font-mono\)'/g, "fontFamily: 'var(--face-num)'");
  text = text.replace(
    /function assetTabStyle\(option\) \{[\s\S]*?\n\}/,
    `function assetTabStyle(option) {
  const on = option.symbol === activeSymbol.value
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 9px',
    borderRadius: '999px',
    border: on ? '2px solid var(--ink)' : '2px solid transparent',
    background: on ? 'var(--sun)' : 'transparent',
    color: 'var(--ink)',
    fontFamily: 'var(--face-display)',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
  }
}`,
  );
  text = text.replace('stroke="#34c77b"', 'stroke="#4c63d2"');
  fs.writeFileSync(file, text, 'utf8');
}

// Account menu status pill
{
  const file = 'src/components/app/AccountMenu.vue';
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(
    "return { background: '#34c77b1f', color: '#34c77b', border: '1px solid #34c77b33' }",
    "return { background: '#dde2ff', color: '#3b4cae', border: '2px solid #191820' }",
  );
  fs.writeFileSync(file, text, 'utf8');
}

// NavIcon fallback colors
{
  const file = 'src/components/NavIcon.vue';
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace("dark ? '#0B0C0E' : '#FFFFFF'", "dark ? '#191820' : '#FFFDF6'");
  fs.writeFileSync(file, text, 'utf8');
}

// nav.js icon palette
{
  const file = 'src/data/nav.js';
  let text = fs.readFileSync(file, 'utf8');
  const palette = {
    '#34C77B': '#4C63D2',
    '#5B8DEF': '#FF7A63',
    '#E9A23B': '#FFC94A',
    '#8F7BF2': '#8FE3C0',
    '#EBECEC': '#9CD7F2',
    '#EF5B5B': '#FF7A63',
    '#3FB8C9': '#8FE3C0',
    '#6E7074': '#9CD7F2',
    '#27A563': '#4C63D2',
  };
  for (const [from, to] of Object.entries(palette)) text = text.split(from).join(to);
  fs.writeFileSync(file, text, 'utf8');
}

// rename new tokens to avoid reusing the original token names
for (const file of ['src/styles/toybox/base.css', 'src/styles/toybox/home.css']) {
  let text = fs.readFileSync(file, 'utf8');
  text = text
    .replace(/--radius-/g, '--round-')
    .replace(/--font-display/g, '--face-display')
    .replace(/--font-body/g, '--face-body')
    .replace(/--font-num/g, '--face-num');
  fs.writeFileSync(file, text, 'utf8');
}
console.log('fixes applied');
