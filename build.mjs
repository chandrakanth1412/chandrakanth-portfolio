import { mkdir, copyFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const html = await readFile(join(root, 'index.html'), 'utf8');
const files = new Set(['index.html']);
for (const match of html.matchAll(/(?:src|href|content)="([^"]+)"/g)) {
  let path = match[1];
  if (path.startsWith('https://chandrakanth-developer-portfolio.creamybass516.chatgpt.site/images/')) {
    path = 'images/' + path.split('/images/')[1];
  }
  if (/^(css|js|images|videos)\/[a-zA-Z0-9_.\/-]+$/.test(path) && !path.includes('..')) files.add(path);
}
for (const file of files) {
  const destination = join(root, 'dist', file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(root, file), destination);
}
console.log(`Built ${files.size} portfolio files into dist/.`);
