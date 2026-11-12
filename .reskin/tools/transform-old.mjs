import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src');
const map = JSON.parse(fs.readFileSync(path.resolve('.reskin/tools/token-map.json'), 'utf8'));

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (p.endsWith('.vue')) files.push(p);
  }
}
walk(ROOT);

const NEW_LOGO = '<svg class="logo-mark" viewBox="0 0 48 48" width="26" height="26" aria-hidden="true" focusable="false"><rect x="3" y="3" width="42" height="42" rx="15" fill="currentColor"/><path d="M24 11.5 34 33.5h-6.2l-1.9-4.6h-3.8l-1.9 4.6h-6.2L24 11.5Zm0 8.8-1.5 4.9h3L24 20.3Z" fill="#FBF6E9"/><circle cx="35.5" cy="12.5" r="3.4" fill="#FFC94A"/></svg>';

function mapClasses(value) {
  const out = [];
  const seen = new Set();
  for (const token of value.split(/\s+/)) {
    if (!token) continue;
    const next = map[token] || token;
    if (seen.has(next)) continue;
    seen.add(next);
    out.push(next);
  }
  return out.join(' ');
}

function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}

function rewriteLogo(html) {
  return html.replace(/<svg viewBox="0 0 100 100"[^>]*class="[^"]*"[^>]*>[\s\S]*?<\/svg>/g, NEW_LOGO);
}

function stripStyles(html) {
  return html.replace(/\sstyle="[^"]*"/g, '');
}

function convertDock(html) {
  const match = html.match(/<header class="(?:cl|dc|an)-nav">[\s\S]*?<\/header>/);
  if (!match) return { html, dock: null };
  let dock = match[0]
    .replace(/<header class="(?:cl|dc|an)-nav">/, '<nav class="dock-bar">')
    .replace(/<\/header>/, '</nav>')
    .replace(/<div class="(?:cl|dc|an)-nav-in">/, '<div class="dock-track">')
    .replace(/<nav class="(?:cl|dc|an)-nav-links">/, '<div class="dock-links">')
    .replace(/<\/nav>/, '</div>');
  return { html: html.replace(match[0], ''), dock };
}

function convertFooterNav(html) {
  return html.replace(/(<footer[\s\S]*?<\/footer>)/, (block) => block
    .replace(/<nav>/, '<div class="leaf-foot-links">')
    .replace(/<\/nav>/, '</div>'));
}

function convertRemainingNavs(html) {
  return html.replace(/<nav\b/g, '<div').replace(/<\/nav>/g, '</div>');
}

function addStage(html, closingMark = '</main>') {
  html = html.replace(/(<main\b[^>]*>)/, '$1<div class="stage"><div class="stage-in">');
  const idx = html.lastIndexOf(closingMark);
  return html.slice(0, idx) + '</div></div>' + html.slice(idx);
}

function insertBeforeMainClose(html, snippet) {
  const idx = html.lastIndexOf('</main>');
  return html.slice(0, idx) + snippet + html.slice(idx);
}

function common(html) {
  html = stripComments(html);
  html = rewriteLogo(html);
  html = stripStyles(html);
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>\s*/g, '');
  html = html.replace(/\sclass=""/g, '');
  return html;
}

const report = [];

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const original = fs.readFileSync(file, 'utf8');
  const start = original.indexOf('<template>');
  const end = original.lastIndexOf('</template>');
  if (start < 0 || end < 0) {
    report.push([rel, 'no template']);
    continue;
  }
  let before = original.slice(0, start + 10);
  let tpl = common(original.slice(start + 10, end));
  let after = original.slice(end);

  const name = path.basename(file);

  // ---- page-family structural rewrites -------------------------------------
  if (rel.startsWith('views/pages/') || name === 'NotFoundView.vue') {
    if (name === 'AppView.vue') {
      tpl = tpl.replace(/<div class="container"[^>]*>/, '<div class="pod"><div class="stage"><div class="stage-in">');
      const navStart = tpl.indexOf('<div class="navbar"');
      const navEnd = tpl.indexOf('<main class="app_main"');
      const navBlock = tpl.slice(navStart, navEnd).trim();
      tpl = tpl.slice(0, navStart) + tpl.slice(navEnd);
      let dock = navBlock
        .replace('<div class="navbar">', '<nav class="dock-bar pod-dock">')
        .replace(/<\/div>\s*$/, '</nav>');
      tpl = tpl.replace(/<main class="app_main"[^>]*>/, '<main class="pod-main">');
      tpl = tpl.replace('<AppFooter />', '<AppFooter />\n\n    ' + dock);
      const idx = tpl.lastIndexOf('</div>');
      tpl = tpl.slice(0, idx) + '</div></div>' + tpl.slice(idx);
    } else if (name === 'NotFoundView.vue') {
      tpl = tpl.replace('<div class="next-404-page">', '<main class="lost-page"><div class="stage"><div class="stage-in">');
      tpl = tpl.replace(/<\/div>\s*$/, '</div></div></main>');
    } else {
      const converted = convertDock(tpl);
      tpl = converted.html;
      tpl = convertFooterNav(tpl);
      if (name === 'DocsView.vue') {
        tpl = tpl.replace('<aside class="dc-side">', '<div class="book-index">')
          .replace('<nav>', '<div class="book-index-links">')
          .replace(/<\/aside>/, '</div>');
      }
      if (name === 'AgentsView.vue') {
        tpl = tpl.replace('<aside class="ag-toc">', '<div class="bot-index">')
          .replace('<nav>', '<div class="bot-index-links">')
          .replace(/<\/aside>/, '</div>');
      }
      tpl = convertRemainingNavs(tpl);
      tpl = tpl
        .replace('<main class="cl sp">', '<main class="leaf-page is-static">')
        .replace('<main class="cl ag">', '<main class="leaf-page is-bot">')
        .replace('<main class="cl rc">', '<main class="leaf-page is-sweep">')
        .replace('<main class="cl anim-ready">', '<main class="leaf-page is-log">')
        .replace('<main class="dc">', '<main class="leaf-page is-book">')
        .replace('<main class="an">', '<main class="leaf-page is-chart">')
        .replace(/<section>/g, '<section class="leaf-beat">');
      tpl = addStage(tpl);
      if (converted.dock) tpl = insertBeforeMainClose(tpl, converted.dock);
      else report.push([rel, 'NO HEADER NAV FOUND']);
    }
  } else if (name === 'HomeView.vue') {
    tpl = tpl.replace('<main ref="root" class="lp">', '<main ref="root" class="playground"><div class="stage"><div class="stage-in">');
    tpl = tpl.replace('<div class="lp-rails" aria-hidden="true"></div>', '<div class="toy-confetti" aria-hidden="true"></div>');
    tpl = tpl.replace(/\s*<SiteNav \/>\s*/, '\n');
    tpl = tpl.replace('<SiteFooter />', '<SiteFooter />\n      <SiteNav />');
    tpl = tpl.replace('</main>', '</div></div></main>');
  } else if (name === 'SiteNav.vue') {
    tpl = tpl.replace('<header class="lp-nav"', '<nav class="dock-bar toy-dock"')
      .replace(/<\/header>/, '</nav>')
      .replace('<nav class="lp-links">', '<div class="dock-links">')
      .replace(/<\/nav>/, '</div>');
  } else if (name === 'ProductWindow.vue') {
    tpl = tpl.replace('<aside class="lp-sb">', '<div class="toy-sb">').replace(/<\/aside>/, '</div>');
  } else if (name === 'HeroSection.vue') {
    tpl = tpl.replace('</section>', `<svg class="toy-mascot" viewBox="0 0 260 240" aria-hidden="true" focusable="false">
  <path d="M60 196c-18-14-26-38-22-64 5-34 30-62 62-70 30-8 60 3 78 26 15 19 20 45 12 69-8 26-30 46-57 52-26 6-54 0-73-13Z" fill="#FFFDF6" stroke="#191820" stroke-width="6" stroke-linejoin="round"/>
  <path d="M92 106c8-10 22-16 36-16 14 0 28 6 36 16" fill="none" stroke="#191820" stroke-width="6" stroke-linecap="round"/>
  <circle cx="108" cy="126" r="9" fill="#191820"/><circle cx="152" cy="126" r="9" fill="#191820"/>
  <path d="M112 152c9 10 27 10 36 0" fill="none" stroke="#191820" stroke-width="6" stroke-linecap="round"/>
  <path d="M172 74l30 11v27c0 20-13 36-30 43-17-7-30-23-30-43V85l30-11Z" fill="#4C63D2" stroke="#191820" stroke-width="6" stroke-linejoin="round"/>
  <path d="M161 116l8 8 15-17" fill="none" stroke="#FFFDF6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M40 84c6-2 10-6 12-12 2 6 6 10 12 12-6 2-10 6-12 12-2-6-6-10-12-12Z" fill="#FFC94A" stroke="#191820" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="222" cy="150" r="7" fill="#FF7A63" stroke="#191820" stroke-width="4"/>
</svg>
  </section>`);
  }

  // ---- class attribute rename ---------------------------------------------
  tpl = tpl.replace(/(?<![:@\w-])class="([^"]*)"/g, (whole, value) => {
    const next = mapClasses(value.replace(/\s*\{[\s\S]*$/, ''));
    return next ? `class="${next}"` : '';
  });

  // ---- dynamic class strings + JS selector strings ------------------------
  const longTokens = Object.entries(map)
    .filter(([old, next]) => old !== next && old.length >= 5 && /[-_]/.test(old))
    .sort((a, b) => b[0].length - a[0].length);
  for (const [oldToken, nextToken] of longTokens) {
    const re = new RegExp(`(?<![\\w-])${oldToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`, 'g');
    tpl = tpl.replace(re, nextToken);
  }
  tpl = tpl.replace(/(?<![\w-])rc-spin(?![\w-])/g, 'sweep-spin');

  const result = (before + tpl + after).replace(/<!--[\\s\\S]*?-->/g, '');
  if (result !== original) fs.writeFileSync(file, result, 'utf8');
  report.push([rel, 'ok']);
}

// ---- JS selector / comment updates ---------------------------------------
const jsEdits = {
  'composables/useLandingEffects.js': [
    [/\.lp-bc/g, '.toy-brick'],
    [/bento cards replay their demo/, 'sticker bricks replay their demo'],
    [/pointer-position custom property drives the card glow/, 'pointer-position custom property drives the brick glow'],
    [/\bconst cards = Array/, 'const bricks = Array'],
    [/cards\.forEach/g, 'bricks.forEach'],
    [/cards\.filter/g, 'bricks.filter'],
    [/observe\(card\)/g, 'observe(brick)'],
    [/visibleCards/g, 'visibleBricks'],
    [/const playCard = \(card\)/, 'const playBrick = (brick)'],
    [/playCard\(/g, 'playBrick('],
    [/playCounts\.get\(card\)/g, 'playCounts.get(brick)'],
    [/playCounts\.set\(card, count\)/g, 'playCounts.set(brick, count)'],
    [/card\.setAttribute/g, 'brick.setAttribute'],
    [/\(card\) => \{/g, '(brick) => {'],
    [/card\.addEventListener/g, 'brick.addEventListener'],
    [/card\.removeEventListener/g, 'brick.removeEventListener'],
    [/const card = event\.currentTarget/, 'const brick = event.currentTarget'],
    [/const rect = card\.getBoundingClientRect\(\)/, 'const rect = brick.getBoundingClientRect()'],
    [/card\.style\.setProperty/g, 'brick.style.setProperty'],
    [/card\.matches/g, 'brick.matches'],
    [/entry\.target\)\)/, 'entry.target))'],
  ],
  'composables/useCopyControls.js': [
    [/\.tk-addr button/g, '.coin-addr button'],
    [/button\.hl-copy/g, 'button.syn-copy'],
    [/button\.ag-btn/g, 'button.bot-btn'],
  ],
};
for (const [rel, edits] of Object.entries(jsEdits)) {
  const file = path.join(ROOT, rel);
  let text = fs.readFileSync(file, 'utf8');
  for (const [re, replacement] of edits) text = text.replace(re, replacement);
  fs.writeFileSync(file, text, 'utf8');
}

console.log(report.map(([rel, status]) => `${status.padEnd(22)} ${rel}`).join('\n'));
