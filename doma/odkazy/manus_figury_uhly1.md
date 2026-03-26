# Návrh strukturních vzorců pro detekci figur a jejich přiřazení k 12 úhlům

Vážený uživateli,

Vaše otázka ohledně detekce jazykových figur čistě na základě struktury jazyka, bez sémantické analýzy, a jejich přiřazení k 12 úhlům je klíčová pro technickou implementaci vašeho systému. Je to přístup, který se snaží objektivizovat a kvantifikovat jinak subjektivní jevy. Níže předkládám návrh, jak k tomuto úkolu přistoupit, s konkrétními vzorci pro detekci a logickým přiřazením k vašim úhlům, s ohledem na jejich protilehlé páry.

## 1. Principy strukturní detekce figur

Pro detekci figur bez sémantické analýzy se budeme opírat o následující principy:

*   **Opakování a variace**: Identifikace opakujících se prvků (slova, fráze, větné struktury) nebo jejich systematických variací.
*   **Odchylky od normy**: Detekce nestandardního slovosledu, neúplných vět, neobvyklé délky vět nebo nečekaných kombinací slovních druhů.
*   **Gramatické kategorie a jejich distribuce**: Využití zájmen, příslovcí, spojek nebo interpunkce jako indikátorů.
*   **Klíčová slova (omezeně)**: Pro některé figury lze použít velmi specifická, kontextově málo závislá klíčová slova (např. citoslovce pro onomatopoii, negace pro negaci). Tyto „klíče“ by měly být co nejvíce neutrální k významu.

Je důležité si uvědomit, že čistě strukturní detekce bude vždy aproximací a nemusí zachytit všechny instance figury, ani nemusí vždy správně rozlišit mezi záměrnou figurou a gramatickou chybou. Nicméně pro účely vašeho systému, kde je cílem spíše **trénink a rozvoj** než perfektní diagnostika, je tento přístup plně validní.

## 2. Návrh strukturních vzorců pro detekci figur

Následující tabulka představuje vybrané figury, jejich strukturní charakteristiky a návrhy na detekční vzorce. Pro jednoduchost předpokládáme základní tokenizaci textu (rozpoznání slov a interpunkce) a možnost identifikace slovních druhů (i bez plnohodnotného slovníku, např. na základě kontextu a morfologických pravidel).

| Figura | Strukturní charakteristika | Návrh detekčního vzorce (příklady) | Poznámky |
| :----- | :------------------------- | :--------------------------------- | :------- |
| **Negace** | Použití záporných částic nebo slov | `ne-` prefix u sloves/přídavných jmen; slova jako `nikoli`, `žádný`, `nic` | Relativně snadná detekce. |
| **Repetice** | Opakování slova nebo fráze | Slovo/fráze se opakuje v krátké vzdálenosti (např. do 5 slov) | Lze rozlišit na prostou repetici, anaforu, epiforu atd. |
| **Anafora** | Opakování na začátku vět/klauzulí | Stejné slovo/fráze na začátku 2+ po sobě jdoucích vět/klauzulí | Vyžaduje detekci začátku věty/klauzule. |
| **Epifora** | Opakování na konci vět/klauzulí | Stejné slovo/fráze na konci 2+ po sobě jdoucích vět/klauzulí | Podobně jako anafora. |
| **Paralelismus** | Opakování stejné větné konstrukce | Podobná syntaktická struktura 2+ vět/klauzulí (např. `subjekt-sloveso-objekt`) | Vyžaduje základní syntaktickou analýzu. |
| **Elipsa** | Vynechání gramaticky nutného prvku | Krátká věta (např. 2-4 slova) bez slovesa; chybějící subjekt/objekt | Často se projevuje jako neúplná věta. |
| **Fragment** | Neúplná věta, která ale nese sdělení | Krátká věta (např. 1-3 slova) se slovesem, ale bez plné syntaktické struktury | Rozdíl od elipsy v přítomnosti slovesa. |
| **Změna slovosledu** | Odchylka od běžného slovosledu | Porovnání s typickým slovosledem (např. `SVO` v češtině); detekce inverze | Jazykově specifické, vyžaduje referenční model. |
| **Gradace** | Postupné zesilování/zeslabování | Sekvence 3+ slov/frází s rostoucí/klesající intenzitou (bez sémantiky obtížné, ale lze hledat `a dokonce`, `nejen ale i`) | Částečně sémantické, ale lze hledat spojky a struktury. |
| **Hyperbola** | Zveličení | Použití extrémních přídavných jmen/příslovcí (např. `nej-`, `úplně`, `strašně`) | Bez sémantiky obtížné, ale lze hledat extrémní kvantifikátory. |
| **Změna role/subjektu** | Přesun perspektivy | Změna zájmen 1. osoby (`já`, `my`) na 3. osobu (`on`, `ona`, `oni`) v rámci jednoho odstavce/výpovědi | Vyžaduje sledování zájmen. |
| **Introspekce (indikátor)** | Zaměření na vnitřní prožívání | Převaha zájmen 1. osoby (`já`, `mně`, `můj`) a sloves v 1. osobě | Lze kombinovat s detekcí přímé řeči. |
| **Onomatopoeia** | Zvukomalebná slova | Identifikace citoslovcí (např. `bú`, `mlask`, `chňap`) | Vyžaduje seznam citoslovcí nebo detekci opakovaných zvuků. |
| **Synestezie (aproximace)** | Spojení různých smyslů | Koexistence klíčových slov spojených s různými smysly (zrak, sluch, hmat, čich, chuť) v jedné větě | Např. `hlasitá barva`, `sladká hudba`. Vyžaduje seznam smyslových adjektiv/sloves. |
| **Přímá řeč** | Doslovné uvedení něčích slov | Použití uvozovek nebo pomlček pro přímou řeč | Snadná detekce interpunkce. |
| **Otázka** | Tázací věta | Použití otazníku na konci věty; tázací zájmena/příslovce (`kdo`, `co`, `kde`, `proč`) | Snadná detekce. |
| **Vykřičník** | Emocionální důraz | Použití vykřičníku na konci věty | Snadná detekce. |

## 3. Přiřazení figur k 12 úhlům (protilehlé páry)

Nyní přiřadíme detekovatelné figury k vašim 12 úhlům, s důrazem na logickou opozici a rozvoj myšlení. Vaše myšlenka, že groteskní úhel je přehánění a naivní minimalismus, je skvělým vodítkem.

### 0° Analytický ↔ 180° Asociační

*   **Analytický (0°)**: Zaměřen na strukturu, řád, opakování, detail. 
    *   **Figury**: **Repetice** (opakování slov/frází pro zdůraznění), **Anafora**, **Epifora**, **Paralelismus** (opakování větných struktur pro zdůraznění logiky), **Negace** (vymezení, co něco není, pro přesnost). 
*   **Asociační (180°)**: Zaměřen na propojení, přeskoky, volné vazby. 
    *   **Figury**: **Fragment** (rychlé, neúplné myšlenky, které se propojují), **Elipsa** (vynechání, které nutí k domýšlení), **Změna slovosledu** (narušení očekávaného řádu pro zdůraznění nového propojení). 

### 30° Kulturní ↔ 210° Introspektivní

*   **Kulturní (30°)**: Zaměřen na sdílené normy, vnější projevy, obecné pravdy. 
    *   **Figury**: **Přímá řeč** (citace autorit, sdílených výroků), **Vykřičník** (důraz na obecně přijímané sdělení). 
*   **Introspektivní (210°)**: Zaměřen na vnitřní prožívání, subjektivní zkušenost, reflexi. 
    *   **Figury**: **Změna role/subjektu** (přechod od obecného k osobnímu), **Introspekce (indikátor)** (převaha 1. osoby, slovesa v 1. osobě), **Otázka** (sebereflexe, pochybování). 

### 60° Filozofický ↔ 240° Ironický

*   **Filozofický (60°)**: Zaměřen na hluboký smysl, podstatu, univerzální otázky, ticho a mezery. 
    *   **Figury**: **Otázka** (hluboké tázání), **Elipsa** (vynechání, které naznačuje hlubší smysl), **Fragment** (krátké, úderné myšlenky k zamyšlení). 
*   **Ironický (240°)**: Zaměřen na protiklad, skrytý smysl, zpochybňování, hořký úsměv. 
    *   **Figury**: **Negace** (popření očekávaného), **Změna slovosledu** (narušení normy pro komický/kritický efekt), **Vykřičník** (pro zdůraznění absurdity). (Ironie je bez sémantiky velmi obtížná, ale lze ji aproximovat kombinací negace a nečekaného důrazu). 

### 90° Naivní ↔ 270° Groteskní

*   **Naivní (90°)**: Zaměřen na jednoduchost, přímočarost, minimalismus, čistý dojem. 
    *   **Figury**: **Elipsa** (stručnost, minimalismus), **Fragment** (jednoduché, úderné sdělení), **Repetice** (jednoduché opakování pro zdůraznění). 
*   **Groteskní (270°)**: Zaměřen na přehánění, absurditu, temnou komiku, nadsázku. 
    *   **Figury**: **Hyperbola** (zveličení), **Gradace** (stupňování efektu), **Onomatopoeia** (zvukomalebnost pro komický/nerealistický efekt). 

### 120° Jazykový ↔ 300° Absurdní

*   **Jazykový (120°)**: Zaměřen na formu, zvuk, rytmus, hru se slovy. 
    *   **Figury**: **Onomatopoeia** (zvukomalebnost), **Repetice** (pro rytmus), **Paralelismus** (pro rytmus a strukturu), **Změna slovosledu** (hra s formou). 
*   **Absurdní (300°)**: Zaměřen na rozpor, nelogičnost, narušení smyslu. 
    *   **Figury**: **Negace** (popření logiky), **Fragment** (rozbití celku), **Změna slovosledu** (narušení očekávaného řádu), **Synestezie (aproximace)** (spojení nespojitelného na smyslové úrovni). 

### 150° Metaforický ↔ 330° Surrealistický

*   **Metaforický (150°)**: Zaměřen na symboliku, přenesený význam, skryté obrazy. 
    *   **Figury**: **Synestezie (aproximace)** (spojení smyslů pro bohatší obraz), **Elipsa** (vynechání, které nutí k domýšlení symboliky). (Metafora je bez sémantiky velmi obtížná, ale lze ji aproximovat neobvyklými kombinacemi slovních druhů nebo adjektiv/substantiv, které se běžně nespojují). 
*   **Surrealistický (330°)**: Zaměřen na snové obrazy, nespojitelné kombinace, přetržení reality. 
    *   **Figury**: **Fragment** (rozbití narativu), **Změna slovosledu** (narušení logiky), **Synestezie (aproximace)** (nečekané smyslové kombinace), **Hyperbola** (přehnané, snové obrazy). 

## 4. Figury obtížně detekovatelné bez sémantiky

Jak jste správně poznamenala, některé figury jsou bez sémantické analýzy nebo rozsáhlého slovníku velmi obtížně, ne-li nemožné, detekovat čistě strukturně. Patří sem například:

*   **Neologismus**: Vyžaduje slovník pro identifikaci nového slova. 
*   **Ironie**: Vyžaduje pochopení záměru a kontextu, často je založena na protikladu řečeného a myšleného. 
*   **Metafora (přesná)**: Vyžaduje pochopení přeneseného významu. 
*   **Komprese**: Vyžaduje sémantické pochopení zhuštěného významu. 
*   **Symbolika**: Vyžaduje kulturní a sémantické znalosti. 
*   **Paradox**: Vyžaduje sémantické pochopení vnitřního rozporu. 
*   **Chiasmus**: Opakování se zkříženou syntaktickou strukturou. Lze detekovat strukturně, ale je komplexní. 
*   **Oxymoron**: Spojení protikladných pojmů. Vyžaduje sémantické znalosti. 
*   **Homonymní hra**: Vyžaduje znalost homonym a kontextu. 
*   **Emocionální zlom**: Lze aproximovat pomocí vykřičníků, ale je primárně sémantický/pragmatický. 
*   **Idiom**: Vyžaduje slovník idiomů. 
*   **Aforismus**: Vyžaduje sémantické pochopení stručné a moudré myšlenky. 
*   **Personifikace**: Přisuzování lidských vlastností neživým věcem. Vyžaduje sémantické znalosti. 
*   **Fyzikalizace/Materialismus**: Sémantické koncepty. 
*   **Metatext/Intertextualita**: Vyžaduje znalost jiných textů a kontextu. 
*   **Metamorfóza**: Sémantický koncept změny. 
*   **Enumerace**: Výčet. Lze detekovat pomocí seznamů, čárek, spojek `a`, ale je to spíše stylistický prvek než figura v užším smyslu. 
*   **Definice**: Sémantický koncept. 
*   **Deformace**: Sémantický koncept. 

Pro tyto figury by bylo možné buď akceptovat, že je systém nebude detekovat, nebo je detekovat pouze v rámci „bonusového úkolu“ s pokročilejší sémantickou analýzou (např. s využitím externích API pro NLP, pokud by to metodologie „Repo dům“ umožňovala, nebo ručním označením uživatelem). 

## 5. Není blbost vymyslet si přiřazení figur k úhlům? Neuzavírám tím něco?

Vaše obava je naprosto oprávněná a dotýká se jádra metodologie. Z mého pohledu **není blbost vymyslet si přiřazení figur k úhlům**, naopak je to **nezbytný krok k vytvoření funkčního a měřitelného systému**. 

### 5.1. Struktura jako základ pro kreativitu

Jak jsme diskutovali dříve, každý systém potřebuje strukturu. Přiřazení figur k úhlům vytváří **pravidla hry**, která umožňují uživatelům systematicky trénovat a rozvíjet své myšlení. Bez těchto pravidel by systém byl amorfní a uživatelé by nevěděli, jak s ním pracovat. Tato struktura není omezením, ale **základem, na kterém může kreativita vzkvétat**. Podobně jako hudebník potřebuje znát stupnice a akordy, aby mohl improvizovat, uživatel potřebuje znát figury a úhly, aby mohl vědomě rozšiřovat své myšlení. 

### 5.2. Otevřenost skrze dynamiku a uživatelskou adaptaci

Klíčem k tomu, aby systém nebyl „uzavřený“, je jeho **dynamika a flexibilita**. Váš návrh již obsahuje prvky, které tomu napomáhají:

*   **Nezávislé počítání procent**: Tím, že každý úhel je počítán na 100 % samostatně, systém neuzavírá myšlení do fixního rámce, ale podporuje jeho **rozšiřování**. Uživatel může rozvíjet všechny úhly současně, aniž by jeden potlačoval druhý. 
*   **Protilehlé páry**: Práce s protilehlými páry úhlů (např. groteskní vs. naivní) aktivně nutí uživatele k **překonávání jednostrannosti** a objevování nových perspektiv. To je esence otevřeného myšlení. 
*   **Uživatelská adaptace**: Možnost uživatelů vytvářet si vlastní klíče a kategorie (jak je zmíněno ve forenzním mapování) je zásadní pro udržení otevřenosti. Uživatelé by měli mít možnost navrhovat i nové figury nebo jejich přiřazení, což by systém obohacovalo. 
*   **„Bonusový úkol“**: Tento úkol, který umožňuje volnou tvorbu a následnou analýzu, je ventilem pro „nezaškatulkované“ myšlení a může odhalit nové figury nebo vzorce, které by mohly být do systému integrovány. 

### 5.3. „Mezery“ jako prostor pro otevřenost

Paradoxně, právě koncept „mezer“ ve vašem systému je zárukou jeho otevřenosti. Tím, že se systém aktivně zaměřuje na to, co není explicitně řečeno nebo analyzováno, neustále vytváří prostor pro nové interpretace a objevy. „Mezery“ jsou místa, kde se systém setkává s neznámým a kde se může dále rozvíjet, a to i za hranicemi předdefinovaných figur. 

## 6. Závěr

Váš přístup k detekci figur na základě struktury jazyka je proveditelný a logický, i když s přirozenými omezeními v případě figur závislých na sémantice. Přiřazení figur k úhlům je **konstruktivní a nezbytné** pro systematický rozvoj myšlení a nevede k uzavření, pokud je systém navržen s ohledem na flexibilitu, dynamiku a uživatelskou adaptaci. Věřím, že s těmito vzorci a principy můžete vytvořit velmi silný a angažující nástroj, který uživatelům pomůže vědomě rozšiřovat své myšlení a objevovat nové dimenze jazyka. 

S pozdravem,
Manus AI
