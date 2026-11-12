import fs from 'node:fs';

const file = process.argv[2] || 'src/views/pages/AppView.vue';
const text = fs.readFileSync(file, 'utf8');
const template = text.slice(text.indexOf('<template>'), text.lastIndexOf('</template>'));
const re = /:style="\{[\s\S]*?\}"/g;
let match;
let index = 0;
while ((match = re.exec(template))) {
  index += 1;
  console.log(`--- ${index} ---`);
  console.log(match[0].slice(0, 700));
}
console.log('total', index);
