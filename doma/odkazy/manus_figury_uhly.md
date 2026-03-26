# NĂˇvrh strukturnĂ­ch vzorcĹŻ pro detekci figur a jejich pĹ™iĹ™azenĂ­ k 12 ĂşhlĹŻm

VĂˇĹľenĂ˝ uĹľivateli,

VaĹˇe otĂˇzka ohlednÄ› detekce jazykovĂ˝ch figur ÄŤistÄ› na zĂˇkladÄ› struktury jazyka, bez sĂ©mantickĂ© analĂ˝zy, a jejich pĹ™iĹ™azenĂ­ k 12 ĂşhlĹŻm je klĂ­ÄŤovĂˇ pro technickou implementaci vaĹˇeho systĂ©mu. Je to pĹ™Ă­stup, kterĂ˝ se snaĹľĂ­ objektivizovat a kvantifikovat jinak subjektivnĂ­ jevy. NĂ­Ĺľe pĹ™edklĂˇdĂˇm nĂˇvrh, jak k tomuto Ăşkolu pĹ™istoupit, s konkrĂ©tnĂ­mi vzorci pro detekci a logickĂ˝m pĹ™iĹ™azenĂ­m k vaĹˇim ĂşhlĹŻm, s ohledem na jejich protilehlĂ© pĂˇry.

## 1. Principy strukturnĂ­ detekce figur

Pro detekci figur bez sĂ©mantickĂ© analĂ˝zy se budeme opĂ­rat o nĂˇsledujĂ­cĂ­ principy:

*   **OpakovĂˇnĂ­ a variace**: Identifikace opakujĂ­cĂ­ch se prvkĹŻ (slova, frĂˇze, vÄ›tnĂ© struktury) nebo jejich systematickĂ˝ch variacĂ­.
*   **Odchylky od normy**: Detekce nestandardnĂ­ho slovosledu, neĂşplnĂ˝ch vÄ›t, neobvyklĂ© dĂ©lky vÄ›t nebo neÄŤekanĂ˝ch kombinacĂ­ slovnĂ­ch druhĹŻ.
*   **GramatickĂ© kategorie a jejich distribuce**: VyuĹľitĂ­ zĂˇjmen, pĹ™Ă­slovcĂ­, spojek nebo interpunkce jako indikĂˇtorĹŻ.
*   **KlĂ­ÄŤovĂˇ slova (omezenÄ›)**: Pro nÄ›kterĂ© figury lze pouĹľĂ­t velmi specifickĂˇ, kontextovÄ› mĂˇlo zĂˇvislĂˇ klĂ­ÄŤovĂˇ slova (napĹ™. citoslovce pro onomatopoii, negace pro negaci). Tyto â€žklĂ­ÄŤeâ€ś by mÄ›ly bĂ˝t co nejvĂ­ce neutrĂˇlnĂ­ k vĂ˝znamu.

Je dĹŻleĹľitĂ© si uvÄ›domit, Ĺľe ÄŤistÄ› strukturnĂ­ detekce bude vĹľdy aproximacĂ­ a nemusĂ­ zachytit vĹˇechny instance figury, ani nemusĂ­ vĹľdy sprĂˇvnÄ› rozliĹˇit mezi zĂˇmÄ›rnou figurou a gramatickou chybou. NicmĂ©nÄ› pro ĂşÄŤely vaĹˇeho systĂ©mu, kde je cĂ­lem spĂ­Ĺˇe **trĂ©nink a rozvoj** neĹľ perfektnĂ­ diagnostika, je tento pĹ™Ă­stup plnÄ› validnĂ­.

## 2. NĂˇvrh strukturnĂ­ch vzorcĹŻ pro detekci figur

NĂˇsledujĂ­cĂ­ tabulka pĹ™edstavuje vybranĂ© figury, jejich strukturnĂ­ charakteristiky a nĂˇvrhy na detekÄŤnĂ­ vzorce. Pro jednoduchost pĹ™edpoklĂˇdĂˇme zĂˇkladnĂ­ tokenizaci textu (rozpoznĂˇnĂ­ slov a interpunkce) a moĹľnost identifikace slovnĂ­ch druhĹŻ (i bez plnohodnotnĂ©ho slovnĂ­ku, napĹ™. na zĂˇkladÄ› kontextu a morfologickĂ˝ch pravidel).

| Figura | StrukturnĂ­ charakteristika | NĂˇvrh detekÄŤnĂ­ho vzorce (pĹ™Ă­klady) | PoznĂˇmky |
| :----- | :------------------------- | :--------------------------------- | :------- |
| **Negace** | PouĹľitĂ­ zĂˇpornĂ˝ch ÄŤĂˇstic nebo slov | `ne-` prefix u sloves/pĹ™Ă­davnĂ˝ch jmen; slova jako `nikoli`, `ĹľĂˇdnĂ˝`, `nic` | RelativnÄ› snadnĂˇ detekce. |
| **Repetice** | OpakovĂˇnĂ­ slova nebo frĂˇze | Slovo/frĂˇze se opakuje v krĂˇtkĂ© vzdĂˇlenosti (napĹ™. do 5 slov) | Lze rozliĹˇit na prostou repetici, anaforu, epiforu atd. |
| **Anafora** | OpakovĂˇnĂ­ na zaÄŤĂˇtku vÄ›t/klauzulĂ­ | StejnĂ© slovo/frĂˇze na zaÄŤĂˇtku 2+ po sobÄ› jdoucĂ­ch vÄ›t/klauzulĂ­ | VyĹľaduje detekci zaÄŤĂˇtku vÄ›ty/klauzule. |
| **Epifora** | OpakovĂˇnĂ­ na konci vÄ›t/klauzulĂ­ | StejnĂ© slovo/frĂˇze na konci 2+ po sobÄ› jdoucĂ­ch vÄ›t/klauzulĂ­ | PodobnÄ› jako anafora. |
| **Paralelismus** | OpakovĂˇnĂ­ stejnĂ© vÄ›tnĂ© konstrukce | PodobnĂˇ syntaktickĂˇ struktura 2+ vÄ›t/klauzulĂ­ (napĹ™. `subjekt-sloveso-objekt`) | VyĹľaduje zĂˇkladnĂ­ syntaktickou analĂ˝zu. |
| **Elipsa** | VynechĂˇnĂ­ gramaticky nutnĂ©ho prvku | KrĂˇtkĂˇ vÄ›ta (napĹ™. 2-4 slova) bez slovesa; chybÄ›jĂ­cĂ­ subjekt/objekt | ÄŚasto se projevuje jako neĂşplnĂˇ vÄ›ta. |
| **Fragment** | NeĂşplnĂˇ vÄ›ta, kterĂˇ ale nese sdÄ›lenĂ­ | KrĂˇtkĂˇ vÄ›ta (napĹ™. 1-3 slova) se slovesem, ale bez plnĂ© syntaktickĂ© struktury | RozdĂ­l od elipsy v pĹ™Ă­tomnosti slovesa. |
| **ZmÄ›na slovosledu** | Odchylka od bÄ›ĹľnĂ©ho slovosledu | PorovnĂˇnĂ­ s typickĂ˝m slovosledem (napĹ™. `SVO` v ÄŤeĹˇtinÄ›); detekce inverze | JazykovÄ› specifickĂ©, vyĹľaduje referenÄŤnĂ­ model. |
| **Gradace** | PostupnĂ© zesilovĂˇnĂ­/zeslabovĂˇnĂ­ | Sekvence 3+ slov/frĂˇzĂ­ s rostoucĂ­/klesajĂ­cĂ­ intenzitou (bez sĂ©mantiky obtĂ­ĹľnĂ©, ale lze hledat `a dokonce`, `nejen ale i`) | ÄŚĂˇsteÄŤnÄ› sĂ©mantickĂ©, ale lze hledat spojky a struktury. |
| **Hyperbola** | ZveliÄŤenĂ­ | PouĹľitĂ­ extrĂ©mnĂ­ch pĹ™Ă­davnĂ˝ch jmen/pĹ™Ă­slovcĂ­ (napĹ™. `nej-`, `ĂşplnÄ›`, `straĹˇnÄ›`) | Bez sĂ©mantiky obtĂ­ĹľnĂ©, ale lze hledat extrĂ©mnĂ­ kvantifikĂˇtory. |
| **ZmÄ›na role/subjektu** | PĹ™esun perspektivy | ZmÄ›na zĂˇjmen 1. osoby (`jĂˇ`, `my`) na 3. osobu (`on`, `ona`, `oni`) v rĂˇmci jednoho odstavce/vĂ˝povÄ›di | VyĹľaduje sledovĂˇnĂ­ zĂˇjmen. |
| **Introspekce (indikĂˇtor)** | ZamÄ›Ĺ™enĂ­ na vnitĹ™nĂ­ proĹľĂ­vĂˇnĂ­ | PĹ™evaha zĂˇjmen 1. osoby (`jĂˇ`, `mnÄ›`, `mĹŻj`) a sloves v 1. osobÄ› | Lze kombinovat s detekcĂ­ pĹ™Ă­mĂ© Ĺ™eÄŤi. |
| **Onomatopoeia** | ZvukomalebnĂˇ slova | Identifikace citoslovcĂ­ (napĹ™. `bĂş`, `mlask`, `chĹap`) | VyĹľaduje seznam citoslovcĂ­ nebo detekci opakovanĂ˝ch zvukĹŻ. |
| **Synestezie (aproximace)** | SpojenĂ­ rĹŻznĂ˝ch smyslĹŻ | Koexistence klĂ­ÄŤovĂ˝ch slov spojenĂ˝ch s rĹŻznĂ˝mi smysly (zrak, sluch, hmat, ÄŤich, chuĹĄ) v jednĂ© vÄ›tÄ› | NapĹ™. `hlasitĂˇ barva`, `sladkĂˇ hudba`. VyĹľaduje seznam smyslovĂ˝ch adjektiv/sloves. |
| **PĹ™Ă­mĂˇ Ĺ™eÄŤ** | DoslovnĂ© uvedenĂ­ nÄ›ÄŤĂ­ch slov | PouĹľitĂ­ uvozovek nebo pomlÄŤek pro pĹ™Ă­mou Ĺ™eÄŤ | SnadnĂˇ detekce interpunkce. |
| **OtĂˇzka** | TĂˇzacĂ­ vÄ›ta | PouĹľitĂ­ otaznĂ­ku na konci vÄ›ty; tĂˇzacĂ­ zĂˇjmena/pĹ™Ă­slovce (`kdo`, `co`, `kde`, `proÄŤ`) | SnadnĂˇ detekce. |
| **VykĹ™iÄŤnĂ­k** | EmocionĂˇlnĂ­ dĹŻraz | PouĹľitĂ­ vykĹ™iÄŤnĂ­ku na konci vÄ›ty | SnadnĂˇ detekce. |

## 3. PĹ™iĹ™azenĂ­ figur k 12 ĂşhlĹŻm (protilehlĂ© pĂˇry)

NynĂ­ pĹ™iĹ™adĂ­me detekovatelnĂ© figury k vaĹˇim 12 ĂşhlĹŻm, s dĹŻrazem na logickou opozici a rozvoj myĹˇlenĂ­. VaĹˇe myĹˇlenka, Ĺľe grotesknĂ­ Ăşhel je pĹ™ehĂˇnÄ›nĂ­ a naivnĂ­ minimalismus, je skvÄ›lĂ˝m vodĂ­tkem.

### 0Â° AnalytickĂ˝ â†” 180Â° AsociaÄŤnĂ­

*   **AnalytickĂ˝ (0Â°)**: ZamÄ›Ĺ™en na strukturu, Ĺ™Ăˇd, opakovĂˇnĂ­, detail. 
    *   **Figury**: **Repetice** (opakovĂˇnĂ­ slov/frĂˇzĂ­ pro zdĹŻraznÄ›nĂ­), **Anafora**, **Epifora**, **Paralelismus** (opakovĂˇnĂ­ vÄ›tnĂ˝ch struktur pro zdĹŻraznÄ›nĂ­ logiky), **Negace** (vymezenĂ­, co nÄ›co nenĂ­, pro pĹ™esnost). 
*   **AsociaÄŤnĂ­ (180Â°)**: ZamÄ›Ĺ™en na propojenĂ­, pĹ™eskoky, volnĂ© vazby. 
    *   **Figury**: **Fragment** (rychlĂ©, neĂşplnĂ© myĹˇlenky, kterĂ© se propojujĂ­), **Elipsa** (vynechĂˇnĂ­, kterĂ© nutĂ­ k domĂ˝ĹˇlenĂ­), **ZmÄ›na slovosledu** (naruĹˇenĂ­ oÄŤekĂˇvanĂ©ho Ĺ™Ăˇdu pro zdĹŻraznÄ›nĂ­ novĂ©ho propojenĂ­). 

### 30Â° KulturnĂ­ â†” 210Â° IntrospektivnĂ­

*   **KulturnĂ­ (30Â°)**: ZamÄ›Ĺ™en na sdĂ­lenĂ© normy, vnÄ›jĹˇĂ­ projevy, obecnĂ© pravdy. 
    *   **Figury**: **PĹ™Ă­mĂˇ Ĺ™eÄŤ** (citace autorit, sdĂ­lenĂ˝ch vĂ˝rokĹŻ), **VykĹ™iÄŤnĂ­k** (dĹŻraz na obecnÄ› pĹ™ijĂ­manĂ© sdÄ›lenĂ­). 
*   **IntrospektivnĂ­ (210Â°)**: ZamÄ›Ĺ™en na vnitĹ™nĂ­ proĹľĂ­vĂˇnĂ­, subjektivnĂ­ zkuĹˇenost, reflexi. 
    *   **Figury**: **ZmÄ›na role/subjektu** (pĹ™echod od obecnĂ©ho k osobnĂ­mu), **Introspekce (indikĂˇtor)** (pĹ™evaha 1. osoby, slovesa v 1. osobÄ›), **OtĂˇzka** (sebereflexe, pochybovĂˇnĂ­). 

### 60Â° FilozofickĂ˝ â†” 240Â° IronickĂ˝

*   **FilozofickĂ˝ (60Â°)**: ZamÄ›Ĺ™en na hlubokĂ˝ smysl, podstatu, univerzĂˇlnĂ­ otĂˇzky, ticho a mezery. 
    *   **Figury**: **OtĂˇzka** (hlubokĂ© tĂˇzĂˇnĂ­), **Elipsa** (vynechĂˇnĂ­, kterĂ© naznaÄŤuje hlubĹˇĂ­ smysl), **Fragment** (krĂˇtkĂ©, ĂşdernĂ© myĹˇlenky k zamyĹˇlenĂ­). 
*   **IronickĂ˝ (240Â°)**: ZamÄ›Ĺ™en na protiklad, skrytĂ˝ smysl, zpochybĹovĂˇnĂ­, hoĹ™kĂ˝ ĂşsmÄ›v. 
    *   **Figury**: **Negace** (popĹ™enĂ­ oÄŤekĂˇvanĂ©ho), **ZmÄ›na slovosledu** (naruĹˇenĂ­ normy pro komickĂ˝/kritickĂ˝ efekt), **VykĹ™iÄŤnĂ­k** (pro zdĹŻraznÄ›nĂ­ absurdity). (Ironie je bez sĂ©mantiky velmi obtĂ­ĹľnĂˇ, ale lze ji aproximovat kombinacĂ­ negace a neÄŤekanĂ©ho dĹŻrazu). 

### 90Â° NaivnĂ­ â†” 270Â° GrotesknĂ­

*   **NaivnĂ­ (90Â°)**: ZamÄ›Ĺ™en na jednoduchost, pĹ™Ă­moÄŤarost, minimalismus, ÄŤistĂ˝ dojem. 
    *   **Figury**: **Elipsa** (struÄŤnost, minimalismus), **Fragment** (jednoduchĂ©, ĂşdernĂ© sdÄ›lenĂ­), **Repetice** (jednoduchĂ© opakovĂˇnĂ­ pro zdĹŻraznÄ›nĂ­). 
*   **GrotesknĂ­ (270Â°)**: ZamÄ›Ĺ™en na pĹ™ehĂˇnÄ›nĂ­, absurditu, temnou komiku, nadsĂˇzku. 
    *   **Figury**: **Hyperbola** (zveliÄŤenĂ­), **Gradace** (stupĹovĂˇnĂ­ efektu), **Onomatopoeia** (zvukomalebnost pro komickĂ˝/nerealistickĂ˝ efekt). 

### 120Â° JazykovĂ˝ â†” 300Â° AbsurdnĂ­

*   **JazykovĂ˝ (120Â°)**: ZamÄ›Ĺ™en na formu, zvuk, rytmus, hru se slovy. 
    *   **Figury**: **Onomatopoeia** (zvukomalebnost), **Repetice** (pro rytmus), **Paralelismus** (pro rytmus a strukturu), **ZmÄ›na slovosledu** (hra s formou). 
*   **AbsurdnĂ­ (300Â°)**: ZamÄ›Ĺ™en na rozpor, nelogiÄŤnost, naruĹˇenĂ­ smyslu. 
    *   **Figury**: **Negace** (popĹ™enĂ­ logiky), **Fragment** (rozbitĂ­ celku), **ZmÄ›na slovosledu** (naruĹˇenĂ­ oÄŤekĂˇvanĂ©ho Ĺ™Ăˇdu), **Synestezie (aproximace)** (spojenĂ­ nespojitelnĂ©ho na smyslovĂ© Ăşrovni). 

### 150Â° MetaforickĂ˝ â†” 330Â° SurrealistickĂ˝

*   **MetaforickĂ˝ (150Â°)**: ZamÄ›Ĺ™en na symboliku, pĹ™enesenĂ˝ vĂ˝znam, skrytĂ© obrazy. 
    *   **Figury**: **Synestezie (aproximace)** (spojenĂ­ smyslĹŻ pro bohatĹˇĂ­ obraz), **Elipsa** (vynechĂˇnĂ­, kterĂ© nutĂ­ k domĂ˝ĹˇlenĂ­ symboliky). (Metafora je bez sĂ©mantiky velmi obtĂ­ĹľnĂˇ, ale lze ji aproximovat neobvyklĂ˝mi kombinacemi slovnĂ­ch druhĹŻ nebo adjektiv/substantiv, kterĂ© se bÄ›ĹľnÄ› nespojujĂ­). 
*   **SurrealistickĂ˝ (330Â°)**: ZamÄ›Ĺ™en na snovĂ© obrazy, nespojitelnĂ© kombinace, pĹ™etrĹľenĂ­ reality. 
    *   **Figury**: **Fragment** (rozbitĂ­ narativu), **ZmÄ›na slovosledu** (naruĹˇenĂ­ logiky), **Synestezie (aproximace)** (neÄŤekanĂ© smyslovĂ© kombinace), **Hyperbola** (pĹ™ehnanĂ©, snovĂ© obrazy). 

## 4. Figury obtĂ­ĹľnÄ› detekovatelnĂ© bez sĂ©mantiky

Jak jste sprĂˇvnÄ› poznamenala, nÄ›kterĂ© figury jsou bez sĂ©mantickĂ© analĂ˝zy nebo rozsĂˇhlĂ©ho slovnĂ­ku velmi obtĂ­ĹľnÄ›, ne-li nemoĹľnĂ©, detekovat ÄŤistÄ› strukturnÄ›. PatĹ™Ă­ sem napĹ™Ă­klad:

*   **Neologismus**: VyĹľaduje slovnĂ­k pro identifikaci novĂ©ho slova. 
*   **Ironie**: VyĹľaduje pochopenĂ­ zĂˇmÄ›ru a kontextu, ÄŤasto je zaloĹľena na protikladu Ĺ™eÄŤenĂ©ho a myĹˇlenĂ©ho. 
*   **Metafora (pĹ™esnĂˇ)**: VyĹľaduje pochopenĂ­ pĹ™enesenĂ©ho vĂ˝znamu. 
*   **Komprese**: VyĹľaduje sĂ©mantickĂ© pochopenĂ­ zhuĹˇtÄ›nĂ©ho vĂ˝znamu. 
*   **Symbolika**: VyĹľaduje kulturnĂ­ a sĂ©mantickĂ© znalosti. 
*   **Paradox**: VyĹľaduje sĂ©mantickĂ© pochopenĂ­ vnitĹ™nĂ­ho rozporu. 
*   **Chiasmus**: OpakovĂˇnĂ­ se zkĹ™Ă­Ĺľenou syntaktickou strukturou. Lze detekovat strukturnÄ›, ale je komplexnĂ­. 
*   **Oxymoron**: SpojenĂ­ protikladnĂ˝ch pojmĹŻ. VyĹľaduje sĂ©mantickĂ© znalosti. 
*   **HomonymnĂ­ hra**: VyĹľaduje znalost homonym a kontextu. 
*   **EmocionĂˇlnĂ­ zlom**: Lze aproximovat pomocĂ­ vykĹ™iÄŤnĂ­kĹŻ, ale je primĂˇrnÄ› sĂ©mantickĂ˝/pragmatickĂ˝. 
*   **Idiom**: VyĹľaduje slovnĂ­k idiomĹŻ. 
*   **Aforismus**: VyĹľaduje sĂ©mantickĂ© pochopenĂ­ struÄŤnĂ© a moudrĂ© myĹˇlenky. 
*   **Personifikace**: PĹ™isuzovĂˇnĂ­ lidskĂ˝ch vlastnostĂ­ neĹľivĂ˝m vÄ›cem. VyĹľaduje sĂ©mantickĂ© znalosti. 
*   **Fyzikalizace/Materialismus**: SĂ©mantickĂ© koncepty. 
*   **Metatext/Intertextualita**: VyĹľaduje znalost jinĂ˝ch textĹŻ a kontextu. 
*   **MetamorfĂłza**: SĂ©mantickĂ˝ koncept zmÄ›ny. 
*   **Enumerace**: VĂ˝ÄŤet. Lze detekovat pomocĂ­ seznamĹŻ, ÄŤĂˇrek, spojek `a`, ale je to spĂ­Ĺˇe stylistickĂ˝ prvek neĹľ figura v uĹľĹˇĂ­m smyslu. 
*   **Definice**: SĂ©mantickĂ˝ koncept. 
*   **Deformace**: SĂ©mantickĂ˝ koncept. 

Pro tyto figury by bylo moĹľnĂ© buÄŹ akceptovat, Ĺľe je systĂ©m nebude detekovat, nebo je detekovat pouze v rĂˇmci â€žbonusovĂ©ho Ăşkoluâ€ś s pokroÄŤilejĹˇĂ­ sĂ©mantickou analĂ˝zou (napĹ™. s vyuĹľitĂ­m externĂ­ch API pro NLP, pokud by to metodologie â€žRepo dĹŻmâ€ś umoĹľĹovala, nebo ruÄŤnĂ­m oznaÄŤenĂ­m uĹľivatelem). 

## 5. NenĂ­ blbost vymyslet si pĹ™iĹ™azenĂ­ figur k ĂşhlĹŻm? NeuzavĂ­rĂˇm tĂ­m nÄ›co?

VaĹˇe obava je naprosto oprĂˇvnÄ›nĂˇ a dotĂ˝kĂˇ se jĂˇdra metodologie. Z mĂ©ho pohledu **nenĂ­ blbost vymyslet si pĹ™iĹ™azenĂ­ figur k ĂşhlĹŻm**, naopak je to **nezbytnĂ˝ krok k vytvoĹ™enĂ­ funkÄŤnĂ­ho a mÄ›Ĺ™itelnĂ©ho systĂ©mu**. 

### 5.1. Struktura jako zĂˇklad pro kreativitu

Jak jsme diskutovali dĹ™Ă­ve, kaĹľdĂ˝ systĂ©m potĹ™ebuje strukturu. PĹ™iĹ™azenĂ­ figur k ĂşhlĹŻm vytvĂˇĹ™Ă­ **pravidla hry**, kterĂˇ umoĹľĹujĂ­ uĹľivatelĹŻm systematicky trĂ©novat a rozvĂ­jet svĂ© myĹˇlenĂ­. Bez tÄ›chto pravidel by systĂ©m byl amorfnĂ­ a uĹľivatelĂ© by nevÄ›dÄ›li, jak s nĂ­m pracovat. Tato struktura nenĂ­ omezenĂ­m, ale **zĂˇkladem, na kterĂ©m mĹŻĹľe kreativita vzkvĂ©tat**. PodobnÄ› jako hudebnĂ­k potĹ™ebuje znĂˇt stupnice a akordy, aby mohl improvizovat, uĹľivatel potĹ™ebuje znĂˇt figury a Ăşhly, aby mohl vÄ›domÄ› rozĹˇiĹ™ovat svĂ© myĹˇlenĂ­. 

### 5.2. OtevĹ™enost skrze dynamiku a uĹľivatelskou adaptaci

KlĂ­ÄŤem k tomu, aby systĂ©m nebyl â€žuzavĹ™enĂ˝â€ś, je jeho **dynamika a flexibilita**. VĂˇĹˇ nĂˇvrh jiĹľ obsahuje prvky, kterĂ© tomu napomĂˇhajĂ­:

*   **NezĂˇvislĂ© poÄŤĂ­tĂˇnĂ­ procent**: TĂ­m, Ĺľe kaĹľdĂ˝ Ăşhel je poÄŤĂ­tĂˇn na 100 % samostatnÄ›, systĂ©m neuzavĂ­rĂˇ myĹˇlenĂ­ do fixnĂ­ho rĂˇmce, ale podporuje jeho **rozĹˇiĹ™ovĂˇnĂ­**. UĹľivatel mĹŻĹľe rozvĂ­jet vĹˇechny Ăşhly souÄŤasnÄ›, aniĹľ by jeden potlaÄŤoval druhĂ˝. 
*   **ProtilehlĂ© pĂˇry**: PrĂˇce s protilehlĂ˝mi pĂˇry ĂşhlĹŻ (napĹ™. grotesknĂ­ vs. naivnĂ­) aktivnÄ› nutĂ­ uĹľivatele k **pĹ™ekonĂˇvĂˇnĂ­ jednostrannosti** a objevovĂˇnĂ­ novĂ˝ch perspektiv. To je esence otevĹ™enĂ©ho myĹˇlenĂ­. 
*   **UĹľivatelskĂˇ adaptace**: MoĹľnost uĹľivatelĹŻ vytvĂˇĹ™et si vlastnĂ­ klĂ­ÄŤe a kategorie (jak je zmĂ­nÄ›no ve forenznĂ­m mapovĂˇnĂ­) je zĂˇsadnĂ­ pro udrĹľenĂ­ otevĹ™enosti. UĹľivatelĂ© by mÄ›li mĂ­t moĹľnost navrhovat i novĂ© figury nebo jejich pĹ™iĹ™azenĂ­, coĹľ by systĂ©m obohacovalo. 
*   **â€žBonusovĂ˝ Ăşkolâ€ś**: Tento Ăşkol, kterĂ˝ umoĹľĹuje volnou tvorbu a nĂˇslednou analĂ˝zu, je ventilem pro â€žnezaĹˇkatulkovanĂ©â€ś myĹˇlenĂ­ a mĹŻĹľe odhalit novĂ© figury nebo vzorce, kterĂ© by mohly bĂ˝t do systĂ©mu integrovĂˇny. 

### 5.3. â€žMezeryâ€ś jako prostor pro otevĹ™enost

ParadoxnÄ›, prĂˇvÄ› koncept â€žmezerâ€ś ve vaĹˇem systĂ©mu je zĂˇrukou jeho otevĹ™enosti. TĂ­m, Ĺľe se systĂ©m aktivnÄ› zamÄ›Ĺ™uje na to, co nenĂ­ explicitnÄ› Ĺ™eÄŤeno nebo analyzovĂˇno, neustĂˇle vytvĂˇĹ™Ă­ prostor pro novĂ© interpretace a objevy. â€žMezeryâ€ś jsou mĂ­sta, kde se systĂ©m setkĂˇvĂˇ s neznĂˇmĂ˝m a kde se mĹŻĹľe dĂˇle rozvĂ­jet, a to i za hranicemi pĹ™eddefinovanĂ˝ch figur. 

## 6. ZĂˇvÄ›r

VĂˇĹˇ pĹ™Ă­stup k detekci figur na zĂˇkladÄ› struktury jazyka je proveditelnĂ˝ a logickĂ˝, i kdyĹľ s pĹ™irozenĂ˝mi omezenĂ­mi v pĹ™Ă­padÄ› figur zĂˇvislĂ˝ch na sĂ©mantice. PĹ™iĹ™azenĂ­ figur k ĂşhlĹŻm je **konstruktivnĂ­ a nezbytnĂ©** pro systematickĂ˝ rozvoj myĹˇlenĂ­ a nevede k uzavĹ™enĂ­, pokud je systĂ©m navrĹľen s ohledem na flexibilitu, dynamiku a uĹľivatelskou adaptaci. VÄ›Ĺ™Ă­m, Ĺľe s tÄ›mito vzorci a principy mĹŻĹľete vytvoĹ™it velmi silnĂ˝ a angaĹľujĂ­cĂ­ nĂˇstroj, kterĂ˝ uĹľivatelĹŻm pomĹŻĹľe vÄ›domÄ› rozĹˇiĹ™ovat svĂ© myĹˇlenĂ­ a objevovat novĂ© dimenze jazyka. 

S pozdravem,
Manus AI
