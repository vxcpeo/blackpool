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

const ESCAPE = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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

function rewriteLogo(html) {
  return html.replace(/<svg viewBox="0 0 100 100"[^>]*class="[^"]*"[^>]*>[\s\S]*?<\/svg>/g, NEW_LOGO);
}

function convertDock(html) {
  const match = html.match(/<header class="(?:cl|dc|an)-nav">[\s\S]*?<\/header>/);
  if (!match) return { html, dock: null };
  const dock = match[0]
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

function addStage(html) {
  html = html.replace(/(<main\b[^>]*>)/, '$1<div class="play-stage"><div class="play-inner">');
  const idx = html.lastIndexOf('</main>');
  return html.slice(0, idx) + '</div></div>' + html.slice(idx);
}

function insertBeforeMainClose(html, snippet) {
  const idx = html.lastIndexOf('</main>');
  return html.slice(0, idx) + snippet + html.slice(idx);
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
  const before = original.slice(0, start + 10);
  let tpl = original.slice(start + 10, end);
  const after = original.slice(end);
  const name = path.basename(file);

  if ((rel.startsWith('views/pages/') && name !== 'AppView.vue') || name === 'NotFoundView.vue') {
    if (name === 'NotFoundView.vue') {
      tpl = tpl.replace('<div class="next-404-page">', '<main class="lost-page"><div class="play-stage"><div class="play-inner">');
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
  } else if (name === 'AppView.vue') {
    tpl = tpl.replace(/<div class="container"[^>]*>/, '<div class="pod"><div class="play-stage"><div class="play-inner">');
    const navStart = tpl.indexOf('<div class="navbar"');
    const navEnd = tpl.indexOf('<main class="app_main"');
    const navBlock = tpl.slice(navStart, navEnd).trim();
    tpl = tpl.slice(0, navStart) + tpl.slice(navEnd);
    const dock = navBlock
      .replace('<div class="navbar">', '<nav class="dock-bar pod-dock">')
      .replace(/<\/div>\s*$/, '</nav>');
    tpl = tpl.replace(/<main class="app_main"[^>]*>/, '<main class="pod-main">');
    tpl = tpl.replace('<AppFooter />', '<AppFooter />\n\n    ' + dock);
    const idx = tpl.lastIndexOf('</div>');
    tpl = tpl.slice(0, idx) + '</div></div>' + tpl.slice(idx);
  } else if (name === 'HomeView.vue') {
    tpl = tpl.replace('<main ref="root" class="lp">', '<main ref="root" class="playground"><div class="play-stage"><div class="play-inner">');
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
    tpl = tpl.replace('</section>', `</section><svg class="toy-mascot" viewBox="0 0 260 240" aria-hidden="true" focusable="false">
  <path d="M60 196c-18-14-26-38-22-64 5-34 30-62 62-70 30-8 60 3 78 26 15 19 20 45 12 69-8 26-30 46-57 52-26 6-54 0-73-13Z" fill="#FFFDF6" stroke="#191820" stroke-width="6" stroke-linejoin="round"/>
  <path d="M92 106c8-10 22-16 36-16 14 0 28 6 36 16" fill="none" stroke="#191820" stroke-width="6" stroke-linecap="round"/>
  <circle cx="108" cy="126" r="9" fill="#191820"/><circle cx="152" cy="126" r="9" fill="#191820"/>
  <path d="M112 152c9 10 27 10 36 0" fill="none" stroke="#191820" stroke-width="6" stroke-linecap="round"/>
  <path d="M172 74l30 11v27c0 20-13 36-30 43-17-7-30-23-30-43V85l30-11Z" fill="#4C63D2" stroke="#191820" stroke-width="6" stroke-linejoin="round"/>
  <path d="M161 116l8 8 15-17" fill="none" stroke="#FFFDF6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M40 84c6-2 10-6 12-12 2 6 6 10 12 12-6 2-10 6-12 12-2-6-6-10-12-12Z" fill="#FFC94A" stroke="#191820" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="222" cy="150" r="7" fill="#FF7A63" stroke="#191820" stroke-width="4"/>
</svg>`);
  }

  tpl = tpl.replace(/(?<![:@\w-])class="([^"]*)"/g, (whole, value) => {
    const next = mapClasses(value);
    return next ? `class="${next}"` : '';
  });

  tpl = tpl
    .replace(/'withdraw_card_head_active'/g, "'pod-tab-on'")
    .replace(/'withdraw_card_head_inactive'/g, "'pod-tab-off'")
    .replace(/(?<![\w-])rc-spin(?![\w-])/g, 'sweep-spin');

  let result = before + tpl + after;

  const longTokens = Object.entries(map)
    .filter(([old, next]) => old !== next && old.length >= 5 && /[-_]/.test(old))
    .sort((a, b) => b[0].length - a[0].length);
  for (const [oldToken, nextToken] of longTokens) {
    result = result.replace(new RegExp(`(?<![\\w-])${ESCAPE(oldToken)}(?![\\w-])`, 'g'), nextToken);
  }

  result = rewriteLogo(result)
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>\s*/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\sclass=""/g, '');

  if (result !== original) fs.writeFileSync(file, result, 'utf8');
  report.push([rel, 'ok']);
}

const recoverFile = path.join(ROOT, 'views/pages/RecoverView.vue');
let recover = fs.readFileSync(recoverFile, 'utf8');
recover = recover
  .replace(/'\.rc \.cl-kv b'/g, "'.sweep-root .leaf-kv b'")
  .replace(/'\.rc \.rc-btn'/g, "'.sweep-root .sweep-btn'")
  .replace(/'\.rc-log'/g, "'.sweep-log'")
  .replace(/'\.rc-console \.cl-pill'/g, "'.sweep-console .leaf-pill'");
fs.writeFileSync(recoverFile, recover, 'utf8');

console.log(report.map(([rel, status]) => `${status.padEnd(22)} ${rel}`).join('\n'));
