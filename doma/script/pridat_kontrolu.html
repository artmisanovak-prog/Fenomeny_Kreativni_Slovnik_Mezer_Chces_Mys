const fs = require('fs');
const path = require('path');

const domain = 'artmisanovak-prog.github.io'; // tvoje doména
const kontrolaScript = `
<script>
(function() {
  if (window.location.hostname !== '${domain}' && window.location.protocol !== 'file:') {
    alert('Tento nástroj je optimalizován pro použití na GitHub Pages. Některé funkce nemusí fungovat.');
  }
  if (window.location.protocol === 'file:') {
    alert('Stažená verze nemusí správně ukládat data. Pro plnou funkčnost použij online verzi.');
  }
})();
</script>
`;

function projdiSlozku(slozka) {
  const polozky = fs.readdirSync(slozka);
  for (let polozka of polozky) {
    const cesta = path.join(slozka, polozka);
    if (fs.statSync(cesta).isDirectory()) {
      projdiSlozku(cesta); // rekurzivně do podsložek
    } else if (polozka.endsWith('.html')) {
      let obsah = fs.readFileSync(cesta, 'utf-8');
      // Vložíme těsně před </body>
      if (!obsah.includes(kontrolaScript.trim())) { // vyhneme se duplicitě
        obsah = obsah.replace('</body>', kontrolaScript + '\n</body>');
        fs.writeFileSync(cesta, obsah, 'utf-8');
        console.log(`✅ Přidáno do: ${cesta}`);
      }
    }
  }
}

projdiSlozku('.');
console.log('Hotovo!');
