const fs = require('fs');
const path = require('path');

// Vyhledá všechny HTML soubory, které obsahují "KROKODÝL" nebo jiná zvířata (uprav si)
const seznamSouboru = [
  './krokodyl.html',
  './cap.html',
  './mys.html',
  // ... přidej všechny soubory, které potřebuješ
];

function vlozOdkazNaGenerator(obsah, zvir) {
  // Hledá místo, kde je zobrazen aktuální úhel (např. div s id="angleText")
  // Do toho divu přidáme odkaz. Tohle je zjednodušené – záleží na struktuře.
  // Uprav podle tvé skutečné struktury.
  const generatorLink = `<div style="margin-top:1em;"><a href="generator.html?zvir=${encodeURIComponent(zvir)}&uhel=" target="_blank">🔗 Otevřít v generátoru (přednastavený úhel)</a></div>`;
  // Vložíme těsně před zavírací tag </div> uvnitř output divu (přizpůsob)
  return obsah.replace('</div>', generatorLink + '</div>');
}

for (let soubor of seznamSouboru) {
  let obsah = fs.readFileSync(soubor, 'utf-8');
  let nazev = path.basename(soubor, '.html');
  // převeď název na formát, který se shoduje s parametrem generátoru
  let zvir = nazev.charAt(0).toUpperCase() + nazev.slice(1);
  obsah = vlozOdkazNaGenerator(obsah, zvir);
  fs.writeFileSync(soubor, obsah, 'utf-8');
  console.log(`✅ Upraveno: ${soubor}`);
}
