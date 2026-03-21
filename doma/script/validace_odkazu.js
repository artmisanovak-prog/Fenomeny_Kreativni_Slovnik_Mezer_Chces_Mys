const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // npm install cheerio

function zkontrolujOdkazy(soubor) {
  const obsah = fs.readFileSync(soubor, 'utf-8');
  const $ = cheerio.load(obsah);
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto')) {
      const cil = path.resolve(path.dirname(soubor), href);
      if (!fs.existsSync(cil)) {
        console.log(`⚠️ Neplatný odkaz v ${soubor}: ${href}`);
      }
    }
  });
}

function projdiSlozku(slozka) {
  const polozky = fs.readdirSync(slozka);
  for (let polozka of polozky) {
    const cesta = path.join(slozka, polozka);
    if (fs.statSync(cesta).isDirectory()) {
      projdiSlozku(cesta);
    } else if (polozka.endsWith('.html')) {
      zkontrolujOdkazy(cesta);
    }
  }
}
projdiSlozku('.');
