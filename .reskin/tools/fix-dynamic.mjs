import fs from 'node:fs';

function edit(file, pairs) {
  let text = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!text.includes(from)) console.log('MISS', file, JSON.stringify(from));
    text = text.split(from).join(to);
  }
  fs.writeFileSync(file, text, 'utf8');
}

edit('src/composables/useChangelog.js', [
  ['.cl-wrap', '.leaf-sheet'],
  ['.cl-list', '.leaf-list'],
  ['.cl-entry', '.leaf-entry'],
  ['.cl-filter button', '.leaf-filter button'],
  ['.cl-pager', '.leaf-pager'],
  ['.cl-pg-nums button', '.leaf-page-nums button'],
  ['.cl-pg-step', '.leaf-page-step'],
  ['.cl-empty', '.leaf-empty'],
  ["classList.toggle('on'", "classList.toggle('leaf-on'"],
]);

edit('src/components/app/TopUpModal.vue', [["'bp-disabled'", "'pop-disabled'"]]);
edit('src/views/pages/AppView.vue', [
  [':class="{ on: slippage === option.value }"', `:class="{ 'leaf-on': slippage === option.value }"`],
  [':class="{ on: destination.key === bridgeTarget.key }"', `:class="{ 'leaf-on': destination.key === bridgeTarget.key }"`],
  [":class=\"{ error: item.type === 'error' }\"", `:class="{ 'pod-error': item.type === 'error' }"`],
]);
edit('src/components/app/AccountMenu.vue', [
  [":class=\"{ live: bridge.status === 'delivered' }\"", `:class="{ 'acct-live': bridge.status === 'delivered' }"`],
]);
console.log('done');
