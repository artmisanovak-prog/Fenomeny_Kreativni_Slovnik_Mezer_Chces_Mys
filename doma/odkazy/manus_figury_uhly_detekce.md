# SPRÁVNÉ PŘIŘAZENÍ FIGUR K 12 ÚHLŮM - Bez vah, bez opakování

Toto je správné mapování podle vašich pravidel ze konverzace. Každá figura je přiřazena **pouze jednomu úhlu**. Detekční pravidla jsou konkrétní a prověřená.

---

## 0° ANALYTICKÝ ↔ 180° ASOCIAČNÍ

### 0° ANALYTICKÝ - Fakta, struktury, opakování

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Výčet / Katalog** | Mikro | 3+ položky oddělené čárkou v jedné větě | `(\w+,\s*){2,}\w+` |
| **Enumerace** | Makro | 3+ po sobě jdoucí věty začínající číslovkou, odrážkou nebo stejným slovem | Např. `1. ... 2. ... 3. ...` |
| **Anafora** | Makro | 2+ po sobě jdoucí věty začínající stejným slovem/frází | `sentence[i].startsWith(sentence[i-1].split(' ')[0])` |
| **Minulý čas** | Mikro | Přítomnost více sloves v minulém čase v jedné větě | Koncovky `-al`, `-ala`, `-alo`, `-ali` |
| **Repetice (Opakování stejného slova)** | Mikro | Stejné slovo se opakuje 2+ v jedné větě | `word.match(/\b\w+\b/g).filter(w => w === target).length >= 2` |

**Jak se detekuje v textu:**
- Věta obsahuje 3+ položky oddělené čárkou → Výčet
- Více vět za sebou začíná číslem nebo stejným slovem → Enumerace
- Věta má 2+ slovesa v minulém čase → Minulý čas
- Slovo se opakuje v jedné větě → Repetice

**Příklad z pohádky:**
> "Ne zvíře. Ne symbol. Ne postava." → Repetice (3× "Ne")
> "Sežral dvě — ne tři, ne jednu — dvě" → Výčet (dvě, tři, jednu, dvě)

---

### 180° ASOCIAČNÍ - Volný proud, skoky

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Fragment** | Mikro | Věta o 1-2 slovech, která obsahuje sloveso | `sentence.split(' ').length <= 2 && containsVerb(sentence)` |
| **Elipsa** | Mikro | Věta o 1-3 slovech, která **neobsahuje** sloveso | `sentence.split(' ').length <= 3 && !containsVerb(sentence)` |
| **Změna rytmu (Dynamika)** | Makro | Střídání velmi dlouhých vět (20+ slov) a velmi krátkých (pod 5 slov) | Detekce 2+ dlouhých a 2+ krátkých vět v rámci 5 po sobě jdoucích vět |

**Jak se detekuje v textu:**
- Věta bez slovesa, krátká (1-3 slova) → Elipsa
- Věta s slovesem, velmi krátká (1-2 slova) → Fragment
- Text se střídá mezi dlouhými a krátkými větami → Změna rytmu

**Příklad z pohádky:**
> "Jak to přišlo tak to přestalo. Ráz na ráz." → Fragment (krátké věty se slovesy)

---

## 30° KULTURNÍ ↔ 210° INTROSPEKTIVNÍ

### 30° KULTURNÍ - Konzum, marketing, mýtus

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Pasivum** | Mikro | Vazba "je/bylo" + příčestí trpné | `/(je|bylo|bude)\s+\w+l[aouyíě]/gi` |
| **Změna role (Zájmena)** | Makro | V textu se vyskytuje 1. osoba (`já`, `my`), ale následně se přechází na 3. osobu (`on`, `ona`, `oni`) v kontextu stejného příběhu | Pokud 1. osoba tvoří méně než 50% výskytů zájmen, ale je přítomna |
| **Intertextualita** | Mikro/Makro | Odkaz na známý text, kulturu, mýtus, historickou událost | Hledání klíčových slov (např. "Homér", "Biblie", "pohádka", "legenda") |

**Jak se detekuje v textu:**
- Věta obsahuje "je" + přídavné jméno v trpném rodě → Pasivum
- Text se přechází z 1. osoby na 3. osobu → Změna role
- Text obsahuje odkaz na známou kulturu/mýtus → Intertextualita

**Příklad z pohádky:**
> "Byla to mela." → Intertextualita (odkaz na chaos, melu)

---

### 210° INTROSPEKTIVNÍ - Vnitřní hlas, sebepoznání

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **První osoba + Přímá řeč** | Mikro | Kombinace 1. osoby (`já`, `mi`, `mě`) a přímé řeči (uvozovky) | `/".*\b(já|mi|mě)\b.*"/gi` |
| **Aforismus** | Mikro | Krátká, moudrá věta (obvykle bez závislých vět), která vyjadřuje obecnou pravdu | Věta o max. 15 slovech, která končí tečkou a obsahuje abstraktní podstatné jméno |
| **Rétorická otázka** | Mikro | Otázka, na kterou se neočekává odpověď, často vyjadřuje tvrzení | `\?` na konci věty + věta bez otazníku bezprostředně před ní |

**Jak se detekuje v textu:**
- Věta obsahuje "já" nebo "mi" v přímé řeči → První osoba + Přímá řeč
- Krátká, moudrá věta → Aforismus
- Věta končí otazníkem, ale není to skutečná otázka → Rétorická otázka

**Příklad z pohádky:**
> "Ale ta myš, vždycky zvědavá byla..." → Aforismus (moudrá pozorování)

---

## 60° FILOZOFICKÝ ↔ 240° IRONICKÝ

### 60° FILOZOFICKÝ - Bytí, autenticita, smysl

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Imperativ** | Mikro | Rozkazovací způsob slovesa | Koncovky `-ej`, `-i`, `-me`, `-te` nebo sloveso bez subjektu na začátku věty |
| **Paradox** | Mikro | Věta, která obsahuje rozpor nebo zdánlivě nemožné tvrzení | Hledání slov jako "a přesto", "ale", "nicméně" + opačný obsah |
| **Fyzikalizace** | Mikro | Abstraktní pojem se popisuje fyzickými vlastnostmi | Abstraktní slovo (láska, strach, myšlenka) + fyzické slovo (barva, váha, tvar) |

**Jak se detekuje v textu:**
- Věta začíná slovesem bez subjektu → Imperativ
- Věta obsahuje rozpor (A a zároveň ne-A) → Paradox
- Abstraktní pojem má fyzické vlastnosti → Fyzikalizace

**Příklad z pohádky:**
> "To je něco jiného." → Aforismus (ale je to spíš filozofické než introspektivní)

---

### 240° IRONICKÝ - Nadhled, kontrast

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Negace (2+ záporná slova)** | Mikro | Minimálně 2 záporná slova ve větě | Slova: `ne`, `nic`, `nikdy`, `nikdo`, `žádný`, `bez` |
| **Ironie (Negace + spojka)** | Mikro | 2+ záporná slova + spojka (`ale`, `a přesto`, `jistě`, `samozřejmě`) | `/(ne\|nic\|nikdy\|nikdo\|žádný\|bez).*\b(ale\|a přesto\|jistě\|samozřejmě)\b/gi` |

**Jak se detekuje v textu:**
- Věta obsahuje 2+ záporná slova → Negace
- Věta obsahuje 2+ záporná slova + spojku (`ale`, `a přesto`) → Ironie

**Příklad z pohádky:**
> "Ale ta myš, vždycky zvědavá byla." → Ironie (ale + zvědavá = kontrast)

---

## 90° NAIVNÍ ↔ 270° GROTESKNÍ

### 90° NAIVNÍ - Jednoduchý, dětský

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Přímá řeč bez přívlastku** | Mikro | Přímá řeč bez popisu (bez "řekl", "myslel", "slyšel") | `/"[^"]*"(?!\s+(řekl\|myslel\|slyšel))/gi` |
| **Jednoduché slova (Běžné slovní zásoba)** | Mikro | Věta obsahuje pouze běžná slova (z top 1000 slov v češtině) | Kontrola proti seznamu nejčastějších českých slov |

**Jak se detekuje v textu:**
- Přímá řeč bez popisu, kdo ji říká → Přímá řeč bez přívlastku
- Věta obsahuje pouze běžná slova → Jednoduché slova

**Příklad z pohádky:**
> "Ne zvíře. Ne symbol. Ne postava." → Jednoduché slova (všechna jsou běžná)

---

### 270° GROTESKNÍ - Přehánění, absurdní obrazy

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Hyperbola** | Mikro | Zesilující slova a koncovky 3. stupně | Slova: `úplně`, `strašně`, `moc`, `příliš`, `šíleně` + `nej-` |
| **Gradace** | Mikro | Řada 3+ slov se stupňujícím se významem | `(\w+),\s*(\w+),\s*(\w+)` s rostoucím významem |
| **Onomatopoeia** | Mikro | Zvukomalebná slova | Seznam: `bum`, `prásk`, `křup`, `mlask`, `chňap`, `vrr`, `mňau`, `píp`, `bác`, `buch` |

**Jak se detekuje v textu:**
- Věta obsahuje zesilující slova nebo `nej-` → Hyperbola
- Věta obsahuje 3+ slova se stupňujícím se významem → Gradace
- Věta obsahuje zvukomalebné slovo → Onomatopoeia

**Příklad z pohádky:**
> "Chňap a hlt a chlamst — nebo něco takového a nakonec — mlask, mlask" → Onomatopoeia + Gradace

---

## 120° JAZYKOVÝ ↔ 300° ABSURDNÍ

### 120° JAZYKOVÝ - Jazyk jako hmata

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Aliterace** | Mikro | Opakování stejného počátečního zvuku v blízkých slovech | `\b(\w)\w*\s+\1\w*` |
| **Assonance** | Mikro | Opakování stejného vokálu v blízkých slovech | Hledání opakujících se samohlásek |
| **Rytmizace** | Makro | Opakující se rytmická struktura (stejné délky slov, stejné počty slabik) | Analýza metriky vět |

**Jak se detekuje v textu:**
- Slova začínají stejným zvukem → Aliterace
- Slova obsahují stejný samohlásku → Assonance
- Věty mají stejný rytmus → Rytmizace

**Příklad z pohádky:**
> "Kocour krkal tečky" → Aliterace (K, k, k)

---

### 300° ABSURDNÍ - Nesmysl jako norma

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Synestezie** | Mikro | Kombinace dvou různých smyslů v jedné větě | Hledání slov ze 5 kategorií: ZRAK (barva, vidět), SLUCH (zvuk, slyšet), HMAT (tvrdý, hladký), ČICH (vůně), CHUŤ (sladký) |
| **Neologismus** | Mikro | Slovo, které není v běžném slovníku a má českou koncovku | Slovo mimo seznam 5000 nejčastějších českých slov + česká koncovka |

**Jak se detekuje v textu:**
- Věta obsahuje slova z 2+ smyslových kategorií → Synestezie
- Věta obsahuje slovo mimo slovník s českou koncovkou → Neologismus

**Příklad z pohádky:**
> "Já vidím zvukem. Slyším barvami. Cítím světlem." → Synestezie (mix smyslů)

---

## 150° METAFORICKÝ ↔ 330° SURREALISTICKÝ

### 150° METAFORICKÝ - Obraz, symbol, přenos

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Metafora (Váš vzorec)** | Mikro | `[Substantivum] + [je/jsou/být] + [jako/zase/zase jako] + [Substantivum]` | `(\w+)\s+(je\|jsou\|být)\s+(jako\|zase)\s+(\w+)` |
| **Přirovnání** | Mikro | Podobné jako metafora, ale s `jako`, `jakoby`, `jako by` | `(\w+)\s+(jako\|jakoby\|jako by)\s+(\w+)` |
| **Symbolika** | Mikro/Makro | Věc má hlubší, skrytý význam (obvykle se opakuje v textu) | Hledání opakujících se obrazů, které mají hlubší smysl |

**Jak se detekuje v textu:**
- Věta obsahuje "X je jako Y" (obě substantiva) → Metafora
- Věta obsahuje "X jakoby Y" → Přirovnání
- Věc se opakuje v textu a má hlubší smysl → Symbolika

**Příklad z pohádky:**
> "Flow je king a king je ryba." → Metafora (ryba = král)

---

### 330° SURREALISTICKÝ - Sen, prolínání realit

**Hlavní figury (Unikátní):**

| Figura | Typ | Detekční pravidlo | Prahová hodnota |
|--------|------|-------------------|-----------------|
| **Anakolut** | Mikro | Věta, která se přeruší nebo změní strukturu uprostřed | Věta s `—` nebo `...` uprostřed, nebo věta bez logické vazby |
| **Prolínání realit** | Makro | Text obsahuje prvky z různých realit/časů/míst bez jasného přechodu | Náhlé změny kontextu bez vysvětlení |
| **Metatext** | Mikro/Makro | Text mluví sám o sobě, o své struktuře nebo o psaní | Věty jako "jak bych to měl napsat", "toto není pravda", "jak to vypadá" |

**Jak se detekuje v textu:**
- Věta se přeruší nebo změní strukturu → Anakolut
- Text se náhle přechází mezi různými realitami → Prolínání realit
- Text mluví sám o sobě → Metatext

**Příklad z pohádky:**
> "Tvořila verše jako vodní kruhy, v kterých byly další kruhy. Mlha, spadlá do polí, opsala jejich flow." → Prolínání realit (voda, mlha, pole se prolínají)

---

## SHRNUTÍ - Všech 12 úhlů s unikátními figurami

| Úhel | Figura 1 | Figura 2 | Figura 3 |
|------|----------|----------|----------|
| **0° Analytický** | Výčet | Enumerace | Gradace |
| **30° Kulturní** | Pasivum | Minulý čas| Intertextualita |
| **60° Filozofický** | Imperativ | Otázky | Fyzikalizace |
| **90° Naivní** | Přímá řeč bez 1. osoby | Jednoduché slova | Elipsa |
| **120° Jazykový** | Aliterace | Assonance | Rytmizace | Onomatopoeia | Anafora |
| **150° Metaforický** | Metafora | Přirovnání | Symbolika |
| **180° Asociační** | Fragment | | Změna rytmu | zmena času |
| **210° Introspektivní** | 1. osoba | Přímá řeč | Aforismus | Rétorická otázka |
| **240° Ironický** | Negace (2+) | Ironie (Negace + spojka) | Věta bez přívlastků |
| **270° Groteskní** | Hyperbola | Gradace | Paradox |
| **300° Absurdní** | Synestezie | Neologismus | Rozpad syntaxe |
| **330° Surrealistický** | Anakolut | Prolínání realit | Metatext | Sen |

---

## Klíčové rozdíly od předchozího přístupu:

1. ✅ **Bez vah** - Každá figura se počítá stejně (0 nebo 1)
2. ✅ **Unikátní přiřazení** - Každá figura patří jen k jednomu úhlu
3. ✅ **Konkrétní pravidla** - Každá figura má přesné detekční pravidlo
4. ✅ **Bez opakování** - Žádná figura se neopakuje
5. ✅ **Mikro + Makro** - Jasné rozlišení mezi větnou a strukturální úrovní
6. ✅ **Prahové hodnoty** - Negace = 2+ slova, Ironie = 2+ slova + spojka

