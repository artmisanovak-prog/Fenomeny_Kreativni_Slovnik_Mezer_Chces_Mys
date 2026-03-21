const fs = require('fs');
const path = require('path');

function nahraditVTextu(slozka, hledat, nahradit) {
  const polozky = fs.readdirSync(slozka);
  for (let polozka of polozky) {
    const cesta = path.join(slozka, polozka);
    if (fs.statSync(cesta).isDirectory()) {
      nahraditVTextu(cesta, hledat, nahradit);
    } else if (polozka.endsWith('.html') || polozka.endsWith('.js')) {
      let obsah = fs.readFileSync(cesta, 'utf-8');
      if (obsah.includes(hledat)) {
        obsah = obsah.replaceAll(hledat, nahradit);
        fs.writeFileSync(cesta, obsah, 'utf-8');
        console.log(`✏️ Upraveno: ${cesta}`);
      }
    }
  }
}

nahraditVTextu('.', 'starý_text', 'nový_text');
