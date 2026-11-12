import fs from 'node:fs';

const file = process.argv[2];
const text = fs.readFileSync(file, 'utf8');
const tpl = text.slice(text.indexOf('<template>') + 10, text.lastIndexOf('</template>'));
for (const m of tpl.matchAll(/<([a-zA-Z][\w-]*)([^>]*)>/g)) {
  const tag = m[1];
  const attrs = m[2];
  const cls = /class="([^"]*)"/.exec(attrs)?.[1] || '';
  const id = /id="([^"]*)"/.exec(attrs)?.[1] || '';
  const data = [...attrs.matchAll(/(:?data-[\w-]+)(?:="([^"]*)")?/g)].map((x) => x[1]).join(' ');
  console.log(`${tag}${id ? '#' + id : ''}${cls ? '.' + cls.split(/\s+/).join('.') : ''}${data ? ' [' + data + ']' : ''}`);
}
