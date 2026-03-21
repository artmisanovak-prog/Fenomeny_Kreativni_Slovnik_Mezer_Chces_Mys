const fs = require('fs');
const path = require('path');
const archiver = require('archiver'); // musíš nainstalovat: npm install archiver

const vystupniSlozka = './offline-package';
const zipNazev = 'chces-mys-offline.zip';

// 1. Smazat starý výstup, pokud existuje
if (fs.existsSync(vystupniSlozka)) fs.rmSync(vystupniSlozka, { recursive: true, force: true });
fs.mkdirSync(vystupniSlozka);

// 2. Kopírovat všechny potřebné soubory (uprav si seznam podle potřeby)
// Např. všechny .html, .css, .js, obrázky ze složek, které chceš
const slozkyKeKopirovani = ['.', 'doma']; // přidej podle potřeby
const ignorovane = ['node_modules', 'offline-package', 'generate-package.js', 'pridat-kontrolu.js']; // co přeskočit

function kopirujSoubor(source, dest) {
  fs.copyFileSync(source, dest);
  console.log(`📄 Kopíruji: ${source}`);
}

function projdiACopy(sourceDir, targetDir) {
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  const items = fs.readdirSync(sourceDir);
  for (let item of items) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);
    if (ignorovane.includes(item)) continue;
    if (fs.statSync(sourcePath).isDirectory()) {
      projdiACopy(sourcePath, targetPath);
    } else {
      // Pokud je to HTML, upravíme obsah (odstraníme kontrolu)
      if (item.endsWith('.html')) {
        let obsah = fs.readFileSync(sourcePath, 'utf-8');
        // Odstraní náš kontrolní script (mezi <script> a </script> s daným obsahem)
        // Tohle je jednoduché – odstraní script, který obsahuje "window.location.hostname !=="
        const regex = /<script>[\s\S]*?window\.location\.hostname\s*!==\s*'[^']*'[\s\S]*?<\/script>/g;
        obsah = obsah.replace(regex, '');
        // Případně přidáme poznámku, že je to offline verze
        if (!obsah.includes('<!-- offline verze -->')) {
          obsah = obsah.replace('<body>', '<body><!-- offline verze -->');
        }
        fs.writeFileSync(targetPath, obsah, 'utf-8');
        console.log(`✂️ Upraveno: ${targetPath}`);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`📄 Kopíruji: ${targetPath}`);
      }
    }
  }
}

for (let slozka of slozkyKeKopirovani) {
  const target = path.join(vystupniSlozka, slozka);
  if (fs.existsSync(slozka)) {
    projdiACopy(slozka, target);
  }
}

// 3. Vytvoření ZIP
const output = fs.createWriteStream(zipNazev);
const archive = archiver('zip', { zlib: { level: 9 } });
output.on('close', () => console.log(`✅ ZIP vytvořen: ${zipNazev} (${archive.pointer()} bajtů)`));
archive.on('error', err => { throw err; });
archive.pipe(output);
archive.directory(vystupniSlozka, false);
archive.finalize();
