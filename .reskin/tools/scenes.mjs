import fs from 'node:fs';

const text = fs.readFileSync('src/components/ProductWindow.vue', 'utf8');
const tpl = text.slice(text.indexOf('<template>') + 10, text.lastIndexOf('</template>'));
const firstScene = tpl.indexOf('toy-scenario');
const consolePart = tpl.slice(0, firstScene);
const scenes = tpl.slice(firstScene).split('toy-scenario').slice(1);

const strip = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\{\{[^}]*\}\}/g, ' ');
const wordsOf = (html) => {
  const set = new Map();
  for (const raw of strip(html).split(/\s+/)) {
    const w = raw.replace(/^[^\p{L}\p{N}$€£¥#]+/u, '').replace(/[^\p{L}\p{N}%]+$/u, '');
    if (!w || !/[\p{L}\p{N}]/u.test(w)) continue;
    set.set(w, (set.get(w) || 0) + 1);
  }
  return set;
};

const baseline = JSON.parse(fs.readFileSync('.reskin/baseline/pages.json', 'utf8')).pages['/'].desktop.words;
const base = new Map(baseline.map((x) => [x.word, x.count]));
const consoleWords = wordsOf(consolePart);

for (let i = 0; i < scenes.length; i += 1) {
  const scene = scenes[i];
  const sceneName = (scene.match(/data-scene="([^"]+)"/) || [])[1];
  const sceneWords = wordsOf(scene);
  const onlyScene = [...sceneWords.keys()].filter((w) => !consoleWords.has(w));
  const inBaseline = onlyScene.filter((w) => base.has(w));
  const notInBaseline = onlyScene.filter((w) => !base.has(w));
  console.log(`\nSCENE ${i} ${sceneName}: only-in-scene=${onlyScene.length} inBaseline=${inBaseline.length} notInBaseline=${notInBaseline.length}`);
  console.log('  inBaseline:', inBaseline.join(' ').slice(0, 400));
  console.log('  notInBaseline:', notInBaseline.join(' ').slice(0, 300));
}
