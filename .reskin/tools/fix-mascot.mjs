import fs from 'node:fs';

const file = 'src/components/HeroSection.vue';
let text = fs.readFileSync(file, 'utf8');
const before = text;
text = text.replace('</div></section><svg class="toy-mascot"', '</div><svg class="toy-mascot"');
text = text.replace(/<\/svg>\n<div class="toy-chains"/, '</svg></section>\n<div class="toy-chains"');
if (text === before) throw new Error('mascot move failed');
fs.writeFileSync(file, text, 'utf8');
console.log('mascot moved inside intro');
