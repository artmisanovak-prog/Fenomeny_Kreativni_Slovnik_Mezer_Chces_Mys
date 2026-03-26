# Algoritmus Myš: Technický manuál pro detekci figur a analýzu úhlů

Vážený uživateli,

Tento dokument slouží jako technický manuál pro implementaci „Algoritmu Myš“, který má za cíl detekovat jazykové figury na základě struktury textu (bez sémantické analýzy) a následně je přiřazovat k 12 úhlům myšlení ve vašem systému „Chceš myš?“. Manuál zohledňuje metodologii „Repo dům“ a poskytuje konkrétní kroky a úvahy pro klientskou implementaci v JavaScriptu.

## 1. Úvod a architektonický kontext

„Algoritmus Myš“ představuje jádro „Analyzátoru 2: Kreativního/Rozvojového“, který je součástí vašeho širšího systému „Chceš myš?“. Jeho primárním úkolem je kvantifikovat přítomnost a „sílu“ specifických jazykových figur v uživatelských textech a na základě toho vyhodnocovat procentuální zastoupení a rozvoj 12 úhlů myšlení. Vzhledem k principu „Repo dům“ bude veškerá logika implementována na straně klienta (v prohlížeči) pomocí JavaScriptu.

### 1.1. Místo v systému „Chceš myš?“

Algoritmus Myš bude integrován do „Zápisníku mezer“ nebo do specifické části „Kreativních miniatur“, kde uživatelé plní kreativní úkoly. Po zadání textu (např. odpovědi na kreativní úkol) algoritmus provede analýzu a zobrazí výsledky v podobě kognitivní mapy nebo procentuálního vyjádření rozvoje jednotlivých úhlů. Data o analýzách budou ukládána lokálně (např. v `localStorage` nebo `IndexedDB`) pro sledování pokroku v čase.

## 2. Základní komponenty algoritmu

Algoritmus Myš se skládá z několika klíčových fází:

1.  **Předzpracování textu (Text Preprocessing)**
2.  **Detekce jazykových figur (Figure Detection)**
3.  **Přiřazení figur k úhlům a skórování (Angle Assignment & Scoring)**
4.  **Vizualizace výsledků (Result Visualization)**

### 2.1. Předzpracování textu

Než bude možné detekovat figury, je nutné text připravit. Tato fáze by měla zahrnovat:

*   **Tokenizace**: Rozdělení textu na jednotlivá slova a interpunkční znaménka. Lze použít jednoduché regulární výrazy (např. `text.match(/\b\w+\b|[^\w\s]/g)` pro slova a interpunkci).
*   **Segmentace vět**: Rozdělení textu na jednotlivé věty. Lze použít detekci interpunkce na konci vět (tečka, otazník, vykřičník) s ohledem na zkratky (např. `Dr.`, `atd.`).
*   **Normalizace**: Převod textu na malá písmena pro zjednodušení detekce (pokud není case-sensitivity relevantní pro danou figuru).
*   **Základní identifikace slovních druhů (aproximace)**: Bez plnohodnotného slovníku a morfologické analýzy je to obtížné, ale lze provést aproximaci:
    *   **Slovesa**: Slova, která se často vyskytují po zájmenech nebo subjektech. Lze vytvořit malý seznam nejčastějších sloves.
    *   **Zájmena**: Malý, fixní seznam zájmen (`já`, `ty`, `on`, `ona`, `ono`, `my`, `vy`, `oni`, `ony`, `ona`, `mně`, `tebe`, `jeho`, `jí`, `nás`, `vás`, `jim`, `jich`, `svůj`, `můj`, `tvůj`, `její`, `náš`, `váš`).
    *   **Přídavná jména/Příslovce**: Slova, která se často vyskytují před podstatnými jmény nebo slovesy. Lze hledat typické koncovky, ale je to nespolehlivé.
    *   **Citoslovce**: Malý, fixní seznam citoslovcí pro onomatopoeii.

### 2.2. Detekce jazykových figur (stavební kameny)

Pro každou detekovatelnou figuru je nutné implementovat specifický detekční modul. Níže jsou rozpracovány vzorce pro figury, které lze detekovat strukturně:

| Figura | Strukturní vzorec a implementace (JavaScript) | Příklad | Poznámky |
| :----- | :------------------------------------------- | :------ | :------- |
| **Negace** | Hledání záporných částic (`ne-` prefix) nebo slov (`nikoli`, `žádný`, `nic`). <br> `text.match(/ne\w+|\b(nikoli|žádný|nic)\b/gi)` | „**Ne**chci **nic**.“ | Jednoduchá detekce. |
| **Repetice** | Identifikace opakujících se tokenů (slov/frází) v definovaném okně (např. 5 tokenů). <br> `function detectRepetition(tokens, windowSize) { ... }` | „Běžel, **běžel**, a **běžel**.“ | Lze rozšířit na anaforu/epiforu. |
| **Anafora** | Opakování stejného tokenu/fráze na začátku po sobě jdoucích vět. <br> `function detectAnaphora(sentences) { ... }` | „**Viděl** jsem to. **Viděl** jsem to znovu.“ | Vyžaduje segmentaci vět. |
| **Epifora** | Opakování stejného tokenu/fráze na konci po sobě jdoucích vět. <br> `function detectEpiphora(sentences) { ... }` | „To je pravda, **pravda**. To je jen **pravda**.“ | Vyžaduje segmentaci vět. |
| **Paralelismus** | Detekce podobné syntaktické struktury ve 2+ větách. <br> `function detectParallelism(sentences) { ... }` (komplexní, vyžaduje základní syntaktický parser) | „Přišel, viděl, zvítězil.“ | Obtížnější bez NLP knihovny. |
| **Elipsa** | Věta s méně než X tokeny, která neobsahuje sloveso (nebo obsahuje jen pomocné sloveso). <br> `function detectEllipsis(sentenceTokens) { ... }` | „Krásný den.“ | Vyžaduje aproximaci slovních druhů. |
| **Fragment** | Věta s méně než X tokeny, která obsahuje sloveso, ale chybí jí subjekt/objekt. <br> `function detectFragment(sentenceTokens) { ... }` | „Běžel.“ | Vyžaduje aproximaci slovních druhů. |
| **Změna slovosledu** | Porovnání aktuálního slovosledu s typickým (např. SVO pro češtinu). <br> `function detectWordOrderChange(sentenceTokens) { ... }` | „Krásný je den.“ (místo „Den je krásný.“) | Vyžaduje referenční model a základní syntaktickou analýzu. |
| **Gradace** | Sekvence 3+ slov/frází s rostoucí/klesající intenzitou. Lze hledat spojky (`a dokonce`, `nejen ale i`) nebo řadové číslovky. <br> `text.match(/\b(\w+), (\w+), a (\w+)\b/gi)` | „Přišel, viděl, a dokonce zvítězil.“ | Částečně sémantické, ale lze hledat strukturní indikátory. |
| **Hyperbola** | Použití extrémních přídavných jmen/příslovcí. Lze vytvořit seznam „zesilujících“ slov (`úplně`, `strašně`, `nej-`). <br> `text.match(/\b(úplně|strašně|nej\w+)\b/gi)` | „**Úplně** nejlepší.“ | Omezená detekce bez sémantiky. |
| **Změna role/subjektu** | Přechod mezi zájmeny 1. a 3. osoby v rámci odstavce. <br> `function detectRoleChange(paragraphTokens) { ... }` | „**Já** jsem to viděl. **On** pak odešel.“ | Vyžaduje sledování zájmen. |
| **Introspekce (indikátor)** | Převaha zájmen 1. osoby (`já`, `mně`, `můj`) a sloves v 1. osobě v textu. <br> `function countFirstPerson(text) { ... }` | „**Já** si **myslím**, že...“ | Kvantitativní indikátor. |
| **Onomatopoeia** | Detekce citoslovcí z předdefinovaného seznamu. <br> `text.match(/\b(bú|mlask|chňap|vrč|mňau)\b/gi)` | „Kocour **mňaukl**.“ | Vyžaduje seznam citoslovcí. |
| **Synestezie (aproximace)** | Koexistence klíčových slov spojených s různými smysly (zrak, sluch, hmat, čich, chuť) v jedné větě. <br> `function detectSynesthesia(sentenceTokens) { ... }` | „**Hlasitá** **barva**.“ | Vyžaduje seznam smyslových adjektiv/sloves. |
| **Přímá řeč** | Detekce uvozovek (`„...“`, `„...“`) nebo pomlček (`– ... –`). <br> `text.match(/„[^“]+“|– [^–]+ –/g)` | „Řekl: **„Ahoj.“**“ | Jednoduchá detekce interpunkce. |
| **Otázka** | Detekce otazníku na konci věty. <br> `sentence.endsWith('?')` | „Co to je**?**“ | Jednoduchá detekce. |
| **Vykřičník** | Detekce vykřičníku na konci věty. <br> `sentence.endsWith('!')` | „To je skvělé**!**“ | Jednoduchá detekce. |

## 3. Přiřazení figur k 12 úhlům (protilehlé páry) a skórování

Procentuální vyjádření rozvoje každého úhlu bude založeno na četnosti detekovaných figur a jejich váze. Každý úhel bude mít své „cílové“ figury, které jej posilují, a „protilehlé“ figury, které mohou signalizovat dominanci opačného úhlu. Skórování by mělo být navrženo tak, aby podporovalo nezávislé počítání 100 % pro každý úhel.

### 3.1. Matice přiřazení figur k úhlům

Následující tabulka rozšiřuje vaše úhly o navržené figury, s důrazem na protilehlé páry a logickou opozici. Každá figura může mít váhu (např. 1-3 body), která odráží její význam pro daný úhel.

| Úhel | Figury posilující úhel | Figury oslabující úhel (posilující protilehlý) | Příklad váhy figur |
| :--- | :--------------------- | :--------------------------------------------- | :----------------- |
| **0° Analytický** | Repetice, Anafora, Epifora, Paralelismus, Negace | Fragment, Elipsa, Změna slovosledu | Repetice (2), Negace (1) |
| **180° Asociační** | Fragment, Elipsa, Změna slovosledu | Repetice, Anafora, Epifora, Paralelismus, Negace | Fragment (2), Elipsa (1) |
| **30° Kulturní** | Přímá řeč (citace autorit), Vykřičník | Změna role/subjektu, Introspekce (indikátor), Otázka | Přímá řeč (2), Vykřičník (1) |
| **210° Introspektivní** | Změna role/subjektu, Introspekce (indikátor), Otázka | Přímá řeč (citace autorit), Vykřičník | Introspekce (3), Otázka (2) |
| **60° Filozofický** | Otázka, Elipsa, Fragment | Negace, Změna slovosledu, Vykřičník | Otázka (3), Elipsa (2) |
| **240° Ironický** | Negace, Změna slovosledu, Vykřičník (pro zdůraznění absurdity) | Otázka, Elipsa, Fragment | Negace (2), Změna slovosledu (1) |
| **90° Naivní** | Elipsa, Fragment, Repetice (jednoduché) | Hyperbola, Gradace, Onomatopoeia | Elipsa (2), Fragment (1) |
| **270° Groteskní** | Hyperbola, Gradace, Onomatopoeia | Elipsa, Fragment, Repetice (jednoduché) | Hyperbola (3), Gradace (2) |
| **120° Jazykový** | Onomatopoeia, Repetice (pro rytmus), Paralelismus, Změna slovosledu | Negace, Fragment, Synestezie (aproximace) | Onomatopoeia (2), Repetice (1) |
| **300° Absurdní** | Negace, Fragment, Změna slovosledu, Synestezie (aproximace) | Onomatopoeia, Repetice (pro rytmus), Paralelismus | Negace (2), Synestezie (2) |
| **150° Metaforický** | Synestezie (aproximace), Elipsa | Fragment, Změna slovosledu, Hyperbola | Synestezie (3), Elipsa (1) |
| **330° Surrealistický** | Fragment, Změna slovosledu, Synestezie (aproximace), Hyperbola | Synestezie (aproximace), Elipsa | Fragment (2), Hyperbola (2) |

### 3.2. Výpočet procent pro každý úhel

Pro každý úhel se bude počítat skóre nezávisle. Skóre úhlu bude součtem vah detekovaných figur, které tento úhel posilují. Procentuální vyjádření pak bude normalizováno na maximální možné skóre pro daný úhel, aby se dosáhlo „100 % pro každý úhel“.

`Skóre_úhlu = Σ (váha_figury * počet_výskytů_figury)`

`Procento_úhlu = (Skóre_úhlu / Maximální_možné_skóre_úhlu) * 100`

*   **Maximální možné skóre úhlu**: Bude nutné definovat maximální možné skóre pro každý úhel, což může být buď fixní hodnota, nebo dynamicky vypočítaná na základě délky textu a průměrné četnosti figur. Pro začátek doporučuji fixní maximální skóre, které lze kalibrovat. 
*   **Normalizace**: Je důležité, aby normalizace zohledňovala délku textu, aby delší texty automaticky nezískávaly vyšší procenta jen kvůli většímu počtu slov. Lze normalizovat na počet vět, odstavců nebo celkový počet tokenů. 

### 3.3. Detekce „protilehlých“ figur

Detekce figur, které posilují protilehlý úhel, je klíčová pro diagnostiku a doporučení intervencí. Tyto figury se započítávají do skóre protilehlého úhlu, ale mohou být také vizuálně zvýrazněny jako „výzvy“ pro daný úhel. 

## 4. Vizualizace výsledků

Výsledky analýzy by měly být prezentovány uživateli intuitivním a angažujícím způsobem. 

*   **Kognitivní mapa (Radarový graf)**: Ideální pro zobrazení aktuálního stavu všech 12 úhlů. Každý paprsek grafu reprezentuje jeden úhel a jeho délka odpovídá procentuálnímu skóre. 
*   **Vývoj v čase (Liniový graf)**: Pro sledování pokroku v jednotlivých úhlech v průběhu času. 
*   **Zvýraznění figur v textu**: Po analýze by měl systém zvýraznit detekované figury přímo v uživatelském textu, aby uživatel viděl, jak algoritmus pracuje a které části textu přispěly k výslednému skóre. 
*   **„Přihrádky“ a „barvičky“**: Jak jste navrhla, vizuální kategorizace v zápisníku pomůže uživatelům orientovat se v datech a rychle identifikovat dominantní nebo deficitní úhly. 

## 5. Implementační úvahy (JavaScript)

*   **Modulární design**: Doporučuji implementovat každý detekční modul pro figuru jako samostatnou JavaScriptovou funkci. To usnadní údržbu, testování a budoucí rozšíření. 
*   **Konfigurovatelnost**: Váhy figur, seznamy klíčových slov (pro onomatopoeii, synestezii, hyperbolu) a maximální skóre úhlů by měly být konfigurovatelné (např. v JSON souboru), aby bylo možné systém snadno ladit a přizpůsobovat. 
*   **Výkon**: Pro delší texty je důležité optimalizovat výkon algoritmů. Použití regulárních výrazů je efektivní, ale komplexní syntaktická analýza může být náročná. Zvažte omezení délky textu pro okamžitou analýzu nebo asynchronní zpracování. 
*   **Ukládání dat**: Pro ukládání výsledků analýz a sledování historie doporučuji `IndexedDB` pro její robustnost a schopnost ukládat strukturovaná data. `localStorage` je vhodná pro menší, jednodušší data. 

## 6. Další rozvoj a výzvy

*   **Slovník figur**: Vytvoření detailního a rozšiřitelného „Slovníku figur“ s definicemi, příklady a pravidly detekce je klíčové. Tento slovník by mohl být externí JSON soubor, který systém načítá. 
*   **Uživatelská kalibrace**: Uživatelé by mohli mít možnost kalibrovat váhy figur nebo přidávat vlastní figury, což by zvýšilo flexibilitu a personalizaci systému. 
*   **Zpětná vazba a iterace**: Systém by měl umožňovat uživatelům poskytovat zpětnou vazbu k detekci figur, což by pomohlo vylepšovat algoritmy. 

## 7. Závěr

Tento technický manuál poskytuje rámec pro implementaci „Algoritmu Myš“ pro strukturní detekci jazykových figur a jejich přiřazení k 12 úhlům myšlení. I přes inherentní omezení detekce bez sémantiky věřím, že tento přístup umožní vytvořit robustní a angažující nástroj pro rozvoj myšlení. Klíčem k úspěchu bude pečlivá implementace, modulární design a iterativní ladění na základě uživatelských zkušeností. 

S pozdravem,
Manus AI
