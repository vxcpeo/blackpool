import fs from 'node:fs';

const file = 'src/views/pages/AppView.vue';
let text = fs.readFileSync(file, 'utf8');
const from = '      </nav>\n    </nav>';
if (!text.includes(from)) throw new Error('dock close pattern not found');
text = text.replace(from, '      </div>\n    </nav>');
fs.writeFileSync(file, text, 'utf8');
console.log('dock fixed');
