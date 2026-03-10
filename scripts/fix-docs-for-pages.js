/**
 * GitHub Pages 用: _expo を Jekyll に無視されない名前にコピーし、index.html のパスを書き換える
 * （_ で始まるフォルダは Jekyll が配信しないため 404 になる）
 */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const srcDir = path.join(docsDir, '_expo');
const destDir = path.join(docsDir, 'expo-assets');
const indexPath = path.join(docsDir, 'index.html');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(srcDir)) {
  console.error('docs/_expo が見つかりません。先に npm run export:web を実行してください。');
  process.exit(1);
}

// 既存の expo-assets を削除してからコピー
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true });
}
copyRecursive(srcDir, destDir);
console.log('docs/_expo → docs/expo-assets をコピーしました。');

// index.html の script src を _expo → expo-assets に変更
let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace(/_expo\//g, 'expo-assets/');
fs.writeFileSync(indexPath, html);
console.log('docs/index.html のパスを更新しました。');

// .nojekyll を再作成（export:web で削除されるため）
const nojekyllPath = path.join(docsDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('docs/.nojekyll を再作成しました。');
