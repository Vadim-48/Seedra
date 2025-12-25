import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

const iconsDir = path.resolve('src/icons');
const outDir = path.resolve('public');

function generateSpriteForFolder(folderPath, spriteName) {
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.svg'));
  if (!files.length) return;

  let spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">`;

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const name = path.basename(file, '.svg');
    const content = fs.readFileSync(filePath, 'utf-8');

    const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    let innerContent = content
      .replace(/<\?xml.*\?>/, '')
      .replace(/<!DOCTYPE.*>/, '')
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>/, '')
      .trim();

    const svgFillMatch = content.match(/<svg[^>]*\sfill="([^"]+)"/);
    const symbolFill = svgFillMatch ? ` fill="${svgFillMatch[1]}"` : '';

    spriteContent += `<symbol id="icon-${name}" viewBox="${viewBox}"${symbolFill}>${innerContent}</symbol>`;
  }

  spriteContent += '</svg>';

  fs.writeFileSync(path.join(outDir, spriteName), spriteContent);
  console.log(`Generated: ${spriteName}`);
}

function generateAllSprites() {
  const rootSvgs = [];
  const folders = [];

  for (const item of fs.readdirSync(iconsDir)) {
    const fullPath = path.join(iconsDir, item);

    if (item.endsWith('.svg')) {
      rootSvgs.push(item);
    } else if (fs.statSync(fullPath).isDirectory()) {
      folders.push(item);
    }
  }

  // 1. Генеруємо кореневий спрайт
  if (rootSvgs.length) {
    generateSpriteForFolder(iconsDir, 'sprite.svg');
  }

  // 2. Генеруємо спрайти для папок
  for (const folder of folders) {
    const folderPath = path.join(iconsDir, folder);
    generateSpriteForFolder(folderPath, `sprite-${folder}.svg`);
  }
}

generateAllSprites();

// Відстеження змін
chokidar.watch(iconsDir).on('all', () => generateAllSprites());



// import fs from 'fs';
// import path from 'path';
// import chokidar from 'chokidar';
//
// const iconsDir = path.resolve('src/icons');
// const outFile = path.resolve('public/sprite.svg');
//
// function generateSprite() {
//   const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));
//   let spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">`;
//
//   for (const file of files) {
//     const name = path.basename(file, '.svg');
//     const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');
//
//     // Витягуємо viewBox з оригінального SVG
//     const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
//     const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
//
//     // Видаляємо зовнішній тег <svg>, залишаємо всі внутрішні елементи з атрибутами
//     let innerContent = content
//       .replace(/<\?xml.*\?>/, '')
//       .replace(/<!DOCTYPE.*>/, '')
//       .replace(/<svg[^>]*>/, '')
//       .replace(/<\/svg>/, '')
//       .trim();
//
//     // Витягуємо fill із зовнішнього <svg> якщо він є
//     const svgFillMatch = content.match(/<svg[^>]*\sfill="([^"]+)"/);
//     const symbolFill = svgFillMatch ? ` fill="${svgFillMatch[1]}"` : '';
//
//     spriteContent += `<symbol id="icon-${name}" viewBox="${viewBox}"${symbolFill}>${innerContent}</symbol>`;
//   }
//
//   spriteContent += '</svg>';
//   fs.writeFileSync(outFile, spriteContent);
//   console.log('SVG sprite generated:', outFile);
// }
//
// generateSprite();
//
// chokidar.watch(iconsDir)
//   .on('add', generateSprite)
//   .on('change', generateSprite)
//   .on('unlink', generateSprite);

