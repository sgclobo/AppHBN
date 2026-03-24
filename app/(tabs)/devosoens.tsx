import React, { useRef, useState } from 'react';
import { Image, LayoutChangeEvent, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const oTercoData = [
    {
        "id": "terco_pt",
        "section": "Orações Especiais e Devoções",
        "label": "O Terço (PT)",
        "content": "«<b>Sou a Senhora do Rosário; quero que rezem sempre o terço todos os dias</b>» <i>(Nossa Senhora de Fátima 13-10-1917)</i>.\n\n«<b>Ó rosário bendito de Maria, doce cadeia que nos liga a Deus, vínculo de amor qu enos une aos anjos, torre da salvação nos ataques do inferno, jamais te deixaresmos!</b>» <i>(Papa Pio XI)</i>.\n\nHá dois modos de rezar o terço.\n<b>1.º Modo:</b> Rezar só os Pai-Nossos, Ave-Marias e Glórias.\n<b>2.º Modo, mais perfeito:</b> Meditar nos mistérios, isto é, pensar em cada um deles, enquanto se estão a rezar as orações.\n\n<i>No princípio:</i>\n† Em nome do Pai, do Filho e do Espírito Santo. Amen.\n<i>Nos intervalos das dezenas:</i>\nGlória...\n\nV/ — Ó Maria concebida sem pecado,\nR/ — <i>Rogai por nós que recorremos a Vós.</i>\n\nV/ — Ó meu Jesus, perdoai-nos e livrai-nos do fogo do inferno,\nR/ — <i>Levai as almas todas para o céu, principalmente as que mais precisarem. </i>(Oração de Fátima, 13-07-1917)\n\n<i>No fim:</i> 3 Ave-Marias em honra da pureza de Nossa Senhora, Salve-Rainha e Ladainha.\n\nMistérios Gozosos (2.ªs e Sáb.):\n1.º A Anunciação do Anjo a Nossa Senhora.\n2.º A Visitação de Nossa Senhora à sua prima Santa Isabel.\n3.º O Nascimento do Menino Jesus no presépio de Belém.\n4.º A Apresentação do Menino Jesus no templo.\n5.º A Perda e o Encontro do Menino Jesus no templo.\n\nMistérios Luminosos (5.ªs):\n1.º O batismo do Senhor no Jordão.\n2.º A autorrevelação de Cristo nas bodas de Caná.\n3.º O anúncio do Reino de Deus e o convite à conversão.\n4.º A Transfiguração do Senhor.\n5.º A instituição da Santíssima Eucaristia.\n\nMistérios Dolorosos (3.ªs e 6.ªs):\n1.º A Agonia de Jesus no horto.\n2.º A Flagelação de Jesus atado à coluna.\n3.º A Coroação de espinhos.\n4.º Jesus leva a cruz para o Calvário.\n5.º A Crucifixão e a Morte na cruz.\n\nMistérios Gloriosos (4.ªs, e Dom.):\n1.º A Ressurreição de Nosso Senhor Jesus Cristo.\n2.º A Ascensão de Nosso Senhor ao céu.\n3.º A Descida do Espírito Santo sobre Nossa Senhora e os Apóstolos.\n4.º A Assunção de Nossa Senhora ao céu.\n5.º A Coroação de Maria Santíssima como Rainha dos anjos e dos homens."
    },
    {
        "id": "terco_tet",
        "section": "Orações Especiais e Devoções",
        "label": "O Terço (TET)",
        "content": "«<b>Ha’u mak Senhora do Rosário; hakarak atu imi reza rosário loron-loron</b>» <i>(Nossa Senhora de Fátima 13-10-1917)</i>.\n\n«<b>Ó rosário Maria nian nebee bentu, kadeia midar nebee liga ita ba Maromak, ligasaun domin nebee hamutuk ita ho anju sira, torre salvasaun iha inimigu infernu nia atake, ami sei la husik Ita!</b>» <i>(Papa Pio XI)</i>.\n\nIha dalan rua atu reza rosário.\n<b>1.º Dalan:</b> Reza deit Ami Aman, Ave Maria no Glória.\n<b>2.º Dalan (diak liu):</b> Hanoin misteriu sira, katak medita ihaa kada ida-idak bainhira reza.\n\n<i>Iha hahú:</i>\n† Iha Aman, no Oan, no Espiritu Santo naran. Amen.\n<i>Iha intervalos dezena sira:</i>\nGloria...\n\nV/ — Ó Maria, Inan sala laek,\nR/ — <i>Haraik tulun mai ami nebee husu Ita Boot nia tulun.</i>\n\nV/ — Ó ha’u nia Jesus, perdua ami salan no salva ami hosi ahi infernu nian,\nR/ — <i>Lori klamar hotu-hotu ba lalehan, liu-liu sira nebee presiza liu.</i> (Oração de Fátima, 13-07-1917)\n\n<i>Iha rohan:</i> Ave Maria 3 ba honra Nossa Senhora nia pureza, Salve Rainha no Ladainha.\n\n<b>Mistérios Gozosos (Segunda no Sabado):</b>\n1.º Anju São Gabriel fo hatene ba Maria Santissima katak nia sei sai Maromak nia Inan.\n2.º Maria Santissima ba visita Santa Isabel.\n3.º Jesus moris iha Belém.\n4.º Jesus apresente iha templo.\n5.º Jesus lakon no hetan fali iha templo.\n\n<b>Mistérios Luminosos (Quinta-feira):</b>\n1.º Jesus sarani iha mota Jordão.\n2.º Jesus revela An iha boda Cana.\n3.º Jesus hateten Maromak nia Reino no bolu ema ba konversaun.\n4.º Jesus nakfilak An iha foho Tabor.\n5.º Jesus estabelese Eukaristia.\n\n<b>Mistérios Dolorosos (Terça no Sexta-feira):</b>\n1.º Jesus halo orasaun iha toos Oliveira.\n2.º Jesus baku no flagela.\n3.º Jesus tau aitarak.\n4.º Jesus lori krus ba Kalvario.\n5.º Jesus krusifikadu no mate.\n\n<b>Mistérios Gloriosos (Quarta, Sabado no Domingo):</b>\n1.º Jesus moris hias.\n2.º Jesus sae ba lalehan.\n3.º Espiritu Santo tun mai.\n4.º Maria sae ba lalehan.\n5.º Maria simu koroa hanesan Rainha."
    },
    {
        "id": "ladainha_nossa_senhora",
        "number": 37,
        "title": "Ladainha de Nossa Senhora",
        "section": "O Terço",
        "label": "Ladainha de N.ª Senhora",
        "content": "Senhor, tende piedade de nós,\nJesus Cristo, tende piedade de nós,\nSenhor, tende piedade de nós,\nJesus Cristo, ouvi-nos,\nJesus Cristo, atendei-nos,\nPai do Céu, que sois Deus, tende piedade de nós,\nFilho Redentor do Mundo, que sois Deus, tende piedade de nós,\nEspírito Santo, que sois Deus, tende piedade de nós,\nSS. Trindade, que sois um só Deus, tende piedade de nós.\n\n<i>A cada invocação responder:</i> <b>Rogai por nós</b>\n\nSanta Maria,\nSanta Mãe de Deus,\nSanta Virgem das Virgens,\nMãe de Cristo,\nMãe da Divina Graça,\nMãe puríssima,\nMãe Castíssima,\nMãe Inviolada,\nMãe Imaculada,\nMãe Amável,\nMãe Admirável,\nMãe do bom conselho,\nMãe do Criador,\nMãe da Igreja,\nVirgem prudentíssima,\nVirgem veneranda,\nVirgem digna de louvor,\nVirgem poderosa,\nVirgem clemente,\nVirgem fiel,\nEspelho de justiça,\nTrono de sabedoria,\nCausa da nossa alegria,\nVaso espiritual,\nVaso honorífico,\nVaso insigne de devoção,\nRosa mística,\nTorre de David,\nTorre de marfim,\nCasa de ouro,\nArca da Aliança,\nPorta do céu,\nEstrela da manhã,\nSaúde dos enfermos,\nRefúgio dos pecadores,\nConsoladora dos aflitos,\nAuxílio dos cristãos,\nRainha dos Anjos,\nRainha dos Patriarcas,\nRainha dos Profetas,\nRainha dos Apóstolos,\nRainha dos Mártires,\nRainha dos Confessores,\nRainha das Virgens,\nRainha de todos os Santos,\nRainha concebida sem pecado original,\nRainha elevada ao céu em corpo e alma,\nRainha do Santíssimo Rosário,\nRainha da família,\nRainha da perseverança,\nRainha da Paz.\n\nCordeiro de Deus, que tirais o pecado do mundo, perdoai-nos, Senhor.\nCordeiro de Deus, que tirais o pecado do mundo, ouvi-nos, Senhor.\nCordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós.\n\nRogai por nós, Santa Mãe de Deus.\n<i>Para que sejamos dignos das promessas de Cristo.</i>"
    }
];

const tercoMisericordiaData = {
    "id": "o_terco_da_misericordia",
    "title": "O Terço da Misericórdia (PT)",
    "section": "Orações Especiais e Devoções",
    "label": "O Terço da Misericórdia (PT)",
    "image": require("../../assets/images/prayers/terco_misericordia.webp"),
    "content": "<i>Comece a rezar o terço da misericórdia com:</i>\n\nPai-Nosso…\nAve-Maria… e\nCredo…\n\n<i>Nas contas do Pai-Nosso, reza-se:</i>\nEterno Pai, eu Vos ofereço o Corpo e Sangue, Alma e Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro.\n\n<i>Nas contas das Ave-Marias, reza-se:</i>\nPela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.\n(10 X)\n\n<i>Ao final do terço, reza-se:</i>\nDeus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro."
};
const tercoMisericordiaTetumData = {
    title: "Terço da Misericórdia (TET)",
    image: require("../../assets/images/prayers/terco_misericordia.webp"), // Using same image as PT version for consistency
    sections: [
        {
            id: "koronka",
            title: "Koronka Jesus Laran Luak",
            content: [
                {
                    type: "subtitle",
                    text: "Oração Hahu Nian: Oração Horas Laran Luak Nian (15.00)",
                },
                {
                    type: "paragraph",
                    text: `O Jesus, Ita be mate tiha, maibe ué matan moris nian
suli nafatin baklamar sira, no ita laran luak nakloke ba mundu tomak.

Ó ué matan moris nian, Ita nia laran luak nebé rohan laek,
suli nafatin ba mundo tomak no namamuk-An mai ami.`,
                },
                {
                    type: "paragraph",
                    text: `Ran no ué nebé naroman hosi Jesus Futar Fuan Santo,
nu’udar ué matan rohan laek mai ami,
ha’u fiar iha Ita Boot. (3x)`,
                    italic: true,
                },
                {
                    type: "paragraph",
                    text: `Ami Aman, be iha lalehan, halo ami hahí hana'i Ita naran,
halo Ita nia reino to’o mai ami,
Ita nia hakarak halo tuir ba,
iha rai nu'udar iha lalehan;

Ohin ne'e haraik ai-han lor-loron nian mai ami,
haraik perdaun mai ami sala,
nu'udar ami perdua ema halo aat ami,
labele husik ami monu ba tentação,
maibe hasai ami hosi aat.
Amen.`,
                },
                {
                    type: "paragraph",
                    text: `Ave Maria, grasa barak liu iha Ita boot,
Maromak ho Ita Boot,
Ita boot di’ak liu feto hotu-hotu,
Ita Boot nia Oan Jesus di’ak liu.

Santa Maria, Maromak nia Inan,
harohan mai ami ema maksalak sira,
horas ne’e no horas ne’bé ami ata mate.
Amen.`,
                },
            ],
        },
        {
            id: "credo",
            title: "Credo",
            content: [
                {
                    type: "paragraph",
                    text: `HA’U FIAR NA’I MAROMAK,
Aman kbiit tomak na’in mahalo lalehan no rai;
no Jesus Cristo, nia Oan Mane Mesak ita Na’in;
be ko’us ona hodi Espírito Santo nia kbiit;
moris hosi Virgem Maria;
terus iha Poncio Pilatus nia ukun, hedi iha Cruz,
mate no hakoi tiha; tuan ba mate sira hela fatin;
liu loron tolu moris hias; hi’it-An ba lalehan;
he’in-An iha Aman Maromak kbiit-tomak Na’in nia sorin kuana,
hosi nebe sei hi’it-An mai,
atu tesilia ba ema moris no ba ema mate.

Ha’u Fiar Espírito Santo,
Santa Kreda Católica;
Santo sira tulun malu; salan sira kasu ona,
moris hi’as isin nian no moris rohan laek.
Amen.`,
                },
                {
                    type: "label",
                    text: "Nas contas grandes:",
                },
                {
                    type: "paragraph",
                    text: `Aman hun no rohan laek,
ha'u hasa'e ba Ita Boot,
Ita Oan Doben ami Na'i Jesus Kristu Nia Isin,
Ran, Klamar no Divindade
hodi kasu ami salan
no mundo tomak nia salan hotu.`,
                },
                {
                    type: "label",
                    text: "Nas contas pequenas, em vez das Ave Marias, dizemos:",
                },
                {
                    type: "paragraph",
                    text: `Tanba Jesus nia Terus, todan liu
sadi'a ami no mundo tomak Na'i. (10x)`,
                },
                {
                    type: "label",
                    text: "No fim dizemos três vezes:",
                },
                {
                    type: "paragraph",
                    text: `Maromak Santo, Maromak Kbiit ua'in,
Maromak moris tinan ba tinan nafatin,
sadi'a ami no mundo tomak.`,
                },
            ],
        },
        {
            id: "finais",
            title: "Orações Finais",
            content: [
                {
                    type: "subtitle",
                    text: "Oração atu Taka Nian:",
                },
                {
                    type: "paragraph",
                    text: `Aman hun no rohan laek,
Ita Boot nia laran luak rohan laek,
no riko soin domin Ita nian nebe la iha kotu,
hateke mai ami ho laran luak
no hakbiit liu tan Ita laran luak iha ami laran,
atu iha tempo susar
ami labele lakon esperanca ou laran dodok,
maibe ho fiar metin ami entrega ami-an tomak
tuir Ita Boot nia hakarak nebe Santo,
Na'in ba domin no laran luak nian.`,
                },
                {
                    type: "subtitle",
                    text: "Oração ba Saúde:",
                },
                {
                    type: "paragraph",
                    text: `Jesus, Ita Boot nia ran nebe mos no kmo'ok,
naksulin mai ha'u isin nebe moras;
Ita Boot nia isin nebe mos no kmanek,
bele fo hikas ksolok mai ha'u isin nebe kbiit laek;
Ita Boot nia moris nebe furak no kbiit maka'as
bele suli nafatin mai, tuir los Ita nia hakarak mai ha'u ata.`,
                },
            ],
        },
        {
            id: "santa-faustina",
            title: "Oração Husu Tulun Maromak Nian Hosi Santa Faustina",
            content: [
                {
                    type: "paragraph",
                    text: `O Jesus,
Ita be halo Santa Faustina
hadomi momos Ita Laran Luak nebe rohan laek,
no hosi nia, hodi tuir los Ita nia hakarak nebe santo,
bele haraik mai ha'u ata, ...hato'o ita nia intensaun...
Na'i, ha'u ema maksalak,
nebe la soi atu simu Ita Boot nia laran luak,
maibe haré ba sacrificio no laran sadi'a hosi Santa Faustina,
simu ba ami nia harohan da'et hosi nia,
no ho laran tomak ami hato'o ba Ita Boot.`,
                },
                {
                    type: "paragraph",
                    text: `Ami Aman, be iha lalehan, halo ami hahí hana'i Ita naran,
halo Ita nia reino to’o mai ami,
Ita nia hakarak halo tuir ba,
iha rai nu'udar iha lalehan;

Ohin ne'e haraik ai-han lor-loron nian mai ami,
haraik perdaun mai ami sala,
nu'udar ami perdua ema halo aat ami,
labele husik ami monu ba tentação,
maibe hasai ami hosi aat.
Amen.`,
                },
                {
                    type: "paragraph",
                    text: `Ave Maria, grasa barak liu iha Ita boot,
Maromak ho Ita Boot,
Ita boot di’ak liu feto hotu,
Ita Boot nia Oan Jesus di’ak liu.

Santa Maria, Maromak nia Inan,
harohan mai ami ema maksalak sira,
horas ne’e no horas ne’bé ami ata mate.
Amen.`,
                },
                {
                    type: "paragraph",
                    text: `Gloria ba Padre, ba Fillu no ba Espítu Santu,
nudar hori uluk, oras ne'e, tinan ba tinan nafatin.
Amen.`,
                },
                {
                    type: "paragraph",
                    text: `Sagrado Coração de Jesus, nos temos confiança em Vós.
Sagrada Coração de Maria, sede minha salvação.`,
                },
                {
                    type: "paragraph",
                    text: `São João Paulo II, Harohan mai ami.
Santa Faustina, Harohan mai ami.
Santo no Santa sira hotu iha lalehan, Harohan mai ami.`,
                },
                {
                    type: "paragraph",
                    text: `Jesus Divina Misericordia, eu confio em vós.

Dai-lhes Senhor o eterno Descanso.
Entre os resplendores da luz perpétua.

Descansem em Paz.
Amen.`,
                },
            ],
        },
    ],
};
const bvsData = {
    "Breve Via-Sacra": {
        "id": "breve_via_sacra",
        "title": "Breve Via-Sacra",
        "section": "Via-Sacra",
        "label": "Breve Via-Sacra",
        "pages": [
            "<b>Estação 1:</b> Jesus condenado à morte. Ó bom Jesus, condenado à morte por meu amor, dai-me a graça de aceitar por vosso amor a morte que fordes servido reservar-me.",
            "<b>Estação 2:</b> Jesus levando a cruz. Ó bom Jesus, que com tanto amor tomastes a Cruz, dai-me força para levar, como Vós, a minha cruz.",
            "<b>Estação 3:</b> Jesus cai pela 1.ª vez. Ó bom Jesus, nós Vos fizemos cair por causa do peso dos nossos pecados. Perdoai-nos quando tivermos a desgraça de Vos ofender.",
            "<b>Estação 4:</b> Jesus encontra sua Mãe. Ó bom Jesus, pelas dores da vossa Mãe Santíssima, fazei que nunca me separe d'Ela, que a honre e ame e que Ela esteja a meu lado na hora da minha morte.",
            "<b>Estação 5:</b> Simão Cireneu ajuda Jesus a levar a cruz. Ó bom Jesus, fazei que eu saiba ajudar os outros a levar a cruz.",
            "<b>Estação 6:</b> A Verónica limpa o rosto de Jesus. Ó bom Jesus, que no véu da Verónica deixastes impresso o vosso rosto adorável, imprimi-o profundamente em meu coração.",
            "<b>Estação 7:</b> Jesus cai pela 2.ª vez. Ó bom Jesus, dai-me a vossa graça para nunca mais tornar a pecar.",
            "<b>Estação 8:</b> Jesus consola as mulheres de Jerusalém. Ó bom Jesus, que tão carinhosamente consolastes as mulheres de Jerusalém, consolai e ensinai todos os aflitos a sofrer cristãmente.",
            "<b>Estação 9:</b> Jesus cai pela 3.ª vez. Ó bom Jesus, pelas dores da vossa terceira queda, tende piedade de tantos pecadores que não cessam de Vos ofender.",
            "<b>Estação 10:</b> Jesus é despojado dos seus vestidos. Ó bom Jesus, tende piedade de tantos que Vos ofendem com as suas imodéstias.",
            "<b>Estação 11:</b> Jesus é pregado na cruz. Ó bom Jesus, perdão e misericórdia pelo mérito das vossas santas chagas. Pai eterno, eu Vos ofereço as chagas de Nosso Senhor Jesus Cristo para curar as chagas das nossas almas.",
            "<b>Estação 12:</b> Jesus morre na cruz. Ó bom Jesus, que morrestes para salvar o mundo, concedei-me a graça de morrer com a vossa cruz nas mãos e o vosso amor no coração.",
            "<b>Estação 13:</b> Jesus nos braços de sua Mãe. Ó bom Jesus, concedei-me a graça de viver e morrer por Vós, como filho da nossa Mãe, a Santa Igreja.",
            "<b>Estação 14:</b> Jesus é encerrado no sepulcro. Ó bom Jesus, que repousastes no túmulo para de lá sair gloriosamente, fazei que a graça da vossa cruz me ressuscite para a vida eterna. Assim seja."
        ]
    }
};

const novenaSantaRitaData = {
    "title": "Novena a Santa Rita de Cassia",
    "section": "Novena a Santa Rita de Cassia",
    "label": "Novena a Santa Rita de Cassia",
    "image": require("../../assets/images/prayers/rita_de_cassia.webp"),
    "pages": [
        "<i>Apresente seus pedidos a Deus por intercessão da padroeira das causas impossíveis. Reze conosco a novena a Santa Rita de Cássia. Ela pode ser rezada a qualquer tempo, de modo especial, nos dias que antecedem a memória litúrgica de Santa Rita, 22 de maio. “Para Deus, com efeito, nada é impossível.” </i><br><br><b>1º dia da novena: Santa Rita, alegria dos pais na velhice</b><br><br>Ó admirável Santa Rita de Cássia, tu que nasceste quando teus pais já estavam avançados em idade, nutriste por eles um carinho todo especial. Ensina-nos a sempre mais amar e proteger todos os idosos que vivem em nossos lares e comunidades. Que tenhamos paciência para com eles e as condições para amá-los como imagem de Jesus a quem tanto amaste.<br><br><i>Reza-se 1 Pai Nosso; 10 Ave-Marias e 1 Glória ao Pai.</i><br><br><b>Oração final</b><br>Deus Pai de bondade, vós nos dais o exemplo dos santos para que imitando-os na terra, possamos chegar um dia às alegrias do céu. Dai-me, vos peço, por intercessão de Santa Rita de Cássia, padroeira dos casos desesperados e impossíveis, que tanto vos amou nesta vida, as graças que tão ardentemente vos suplico.",
        "<b>2º dia da novena: Santa Rita de Cássia, amante da oração</b><br><br>Ó admirável Santa Rita de Cássia, nutriste desde cedo um profundo amor à oração e à solidão com Deus, ajuda-nos a descobrir nossa vocação de orantes em um mundo que esquece de orar. Que possamos rezar pelos que não sabem rezar, pelos que não podem rezar e pelos que não querem rezar.<br><br><i>Reza-se 1 Pai Nosso; 10 Ave-Marias e 1 Glória ao Pai.</i><br><br><b>Oração final</b><br>Deus Pai de bondade, vós nos dais o exemplo dos santos para que imitando-os na terra, possamos chegar um dia às alegrias do céu. Dai-me, vos peço, por intercessão de Santa Rita de Cássia, padroeira dos casos desesperados e impossíveis, que tanto vos amou nesta vida, as graças que tão ardentemente vos suplico.",
        "<b>3º dia da novena: Santa Rita de Cássia, fiel ao esposo</b><br><br>Ó admirável Santa Rita de Cássia, mesmo em meio aos mais duros sofrimentos que passaste em teu matrimônio, não desanimaste e oraste incessantemente pela conversão do teu esposo. Ensina aos casais de hoje teu jeito singelo de ser fiel na alegria ou na tristeza, na saúde ou na doença, no amor, no respeito e na fidelidade.<br><br><i>Reza-se 1 Pai Nosso; 10 Ave-Marias e 1 Glória ao Pai.</i><br><br><b>Oração final</b><br>Deus Pai de bondade, vós nos dais o exemplo dos santos para que imitando-os na terra, possamos chegar um dia às alegrias do céu. Dai-me, vos peço, por intercessão de Santa Rita de Cássia, padroeira dos casos desesperados e impossíveis, que tanto vos amou nesta vida, as graças que tão ardentemente vos suplico.",
        "<b>4º dia da novena: Santa Rita, um coração de mãe para seus filhos</b><br><br>Ó admirável Santa Rita de Cássia, foste paciente e carinhosa para com teus dois filhos que queriam vingar a morte do pai. Ensina aos pais de hoje a ter um coração sempre aberto, preocupado e carinhoso para com seus filhos, a exemplo do pai do filho pródigo, a quem imitaste em tua vida.<br><br><i>Reza-se 1 Pai Nosso; 10 Ave-Marias e 1 Glória ao Pai.</i><br><br><b>Oração final</b><br>Deus Pai de bondade, vós nos dais o exemplo dos santos para que imitando-os na terra, possamos chegar um dia às alegrias do céu. Dai-me, vos peço, por intercessão de Santa Rita de Cássia, padroeira dos casos desesperados e impossíveis, que tanto vos amou nesta vida, as graças que tão ardentemente vos suplico.",
        "<b>5º dia da novena: Santa Rita, amante da vida religiosa</b><br><br>Ó admirável Santa Rita de Cássia, nutriste como ninguém um amor total à vida consagrada e religiosa. Mostra a muitos jovens de hoje o caminho para descobrir o verdadeiro amor desinteressado e total a Deus e aos irmãos. Intercede para que surjam muitas e santas vocações sacerdotais e religiosas.<br><br><i>Reza-se 1 Pai Nosso; 10 Ave-Marias e 1 Glória ao Pai.</i><br><br><b>Oração final</b><br>Deus Pai de bondade, vós nos dais o exemplo dos santos para que imitando-os na terra, possamos chegar um dia às alegrias do céu. Dai-me, vos peço, por intercessão de Santa Rita de Cássia, padroeira dos casos desesperados e impossíveis, que tanto vos amou nesta vida, as graças que tão ardentemente vos suplico.",
        "<b>6º dia da novena: Santa Rita, profunda penitente</b><br><br>Ó admirável Santa Rita de Cássia, descobriste na fé e na penitência uma forma misteriosa de amar secretamente a Deus, a quem escolheste seguir. Ajuda-nos também a descobrir a penitência como um valor evangélico de conversão pessoal e desprendimento de todas as formas de egoísmo.<br><br><i>Reza-se 1 Pai Nosso; 10 Ave-Marias e 1 Glória ao Pai.</i><br><br><b>Oração final</b><br>Deus Pai de bondade, vós nos dais o exemplo dos santos para que imitando-os na terra, possamos chegar um dia às alegrias do céu. Dai-me, vos peço, por intercessão de Santa Rita de Cássia, padroeira dos casos desesperados e impossíveis, que tanto vos amou nesta vida, as graças que tão ardentemente vos suplico.",
        "<b>7º dia da novena: Santa Rita, obediente aos superiores</b><br><br>Ó admirável Santa Rita de Cássia, como ninguém obedeceste aos teus superiores religiosos por ver nessa obediência um valor evangélico, um amor de quem tudo entrega por um amor sempre maior. Ensina aos cristãos de nossos dias a verdadeira caridade mútua, que faz com que toda forma de obediência não seja mais que um modo de servir aos irmãos.<br><br><i>Reza-se 1 Pai Nosso; 10 Ave-Marias e 1 Glória ao Pai.</i><br><br><b>Oração final</b><br>Deus Pai de bondade, vós nos dais o exemplo dos santos para que imitando-os na terra, possamos chegar um dia às alegrias do céu. Dai-me, vos peço, por intercessão de Santa Rita de Cássia, padroeira dos casos desesperados e impossíveis, que tanto vos amou nesta vida, as graças que tão ardentemente vos suplico.",
        "<b>8º dia da novena: Santa Rita, amante do Crucificado</b><br><br>Ó admirável Santa Rita de Cássia, descobriste no amor de Jesus crucificado um caminho para amar também o sofrimento. Ensina-nos a carregar nossas cruzes quando elas surgirem, sem desanimar ou desesperar. Mostra-nos também o valor redentor de todo sofrimento aceito por amor a Jesus que, nada mais tendo a oferecer, deu-nos sua própria vida.<br><br><i>Reza-se 1 Pai Nosso; 10 Ave-Marias e 1 Glória ao Pai.</i><br><br><b>Oração final</b><br>Deus Pai de bondade, vós nos dais o exemplo dos santos para que imitando-os na terra, possamos chegar um dia às alegrias do céu. Dai-me, vos peço, por intercessão de Santa Rita de Cássia, padroeira dos casos desesperados e impossíveis, que tanto vos amou nesta vida, as graças que tão ardentemente vos suplico.",
        "<b>9º dia da novena: Santa Rita, padroeira das causas impossíveis</b><br><br>Ó admirável Santa Rita de Cássia, em virtude dos prodígios que conseguiste de Deus, foste escolhida como padroeira de todas as causas impossíveis. Ajuda-nos a sempre mais confiar no milagre maravilhoso do amor que faz o maior de todos os prodígios sobre a terra: a conversão de todos os corações para Deus.<br><br><i>Reza-se 1 Pai Nosso; 10 Ave-Marias e 1 Glória ao Pai.</i><br><br><b>Oração final</b><br>Deus Pai de bondade, vós nos dais o exemplo dos santos para que imitando-os na terra, possamos chegar um dia às alegrias do céu. Dai-me, vos peço, por intercessão de Santa Rita de Cássia, padroeira dos casos desesperados e impossíveis, que tanto vos amou nesta vida, as graças que tão ardentemente vos suplico."
    ]
};

const oracaoSantaRitaData = {
    "title": "Novena a Oração a Santa Rita de Cássia por causas impossíveis",
    "section": "Oração a Santa Rita de Cássia",
    "label": "Novena a Oração a Santa Rita de Cássia por causas impossíveis",
    "image": require("../../assets/images/prayers/pray_to_rita_de_cassia.png"),
    "pages": [
        "<i>Reze esta oração e peça a poderosa intercessão de Santa Rita de Cássia, conhecida por ser a padroeira das causas impossíveis.</i><br><br>Ó Poderosa e gloriosa Santa Rita, eis a vossos pés uma alma desamparada que, necessitando de auxílio, a vós recorre com a doce esperança de ser atendida por vós, que tem o título de santa dos casos impossíveis e desesperados.<br><br>Ó cara santa, interessai-vos pela minha causa, intercedei junto a Deus para que me conceda a graça de que tanto necessito <i>(faça o pedido)</i>.<br><br>Não permitais que eu tenha de me afastar de vossos pés sem ser atendido.<br><br>Se houver em mim algum obstáculo que me impeça de alcançar a graça que imploro, auxiliai-me para que o afaste.<br><br>Envolvei o meu pedido em vossos preciosos méritos e apresentai-o a vosso celeste Esposo, Jesus, em união com a vossa prece. Ó Santa Rita, eu ponho em vós toda a minha confiança. Por vosso intermédio, espero tranquilamente a graça que vos peço.<br><br>Santa Rita, Advogada dos Impossíveis, rogai por nós!"
    ]
};

const estacoesImages = [
    require('../../assets/images/prayers/esta1.webp'),
    require('../../assets/images/prayers/esta2.webp'),
    require('../../assets/images/prayers/esta3.webp'),
    require('../../assets/images/prayers/esta4.webp'),
    require('../../assets/images/prayers/esta5.webp'),
    require('../../assets/images/prayers/esta6.webp'),
    require('../../assets/images/prayers/esta7.webp'),
    require('../../assets/images/prayers/esta8.webp'),
    require('../../assets/images/prayers/esta9.webp'),
    require('../../assets/images/prayers/esta10.webp'),
    require('../../assets/images/prayers/esta11.webp'),
    require('../../assets/images/prayers/esta12.webp'),
    require('../../assets/images/prayers/esta13.webp'),
    require('../../assets/images/prayers/esta14.webp'),
];


const novenaNspsData = {
    "title": "Novena a Nossa Senhora do Perpétuo Socorro",
    "section": "Novena a Nossa Senhora do Perpétuo Socorro",
    "label": "Novena a Nossa Senhora do Perpétuo Socorro",
    "image": require("../../assets/images/prayers/our-lady-of-perpetual-help-novena.webp"),
    "pages": [
        "<b>Dia 1</b><br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b><br><br>Ó Mãe do Perpétuo Socorro, eu vos ofereço esta novena, por intenção dos doentes, dos aflitos e atribulados, dos pobres pecadores, pelas necessidades da Igreja, por suas vocações sacerdotais, religiosas e leigas, por minha família, pelos membros da Família Excelsior e por minhas intenções particulares. Dignai-vos atender-me bondosamente. Amém!<br><br><i>(mencione o pedido aqui…)</i><br><br>Eis, aqui, ó Mãe do Perpétuo Socorro, aos vossos pés um miserável pecador, que a Vós recorre e em Vós confia. Ó Mãe de misericórdia, tende piedade de mim! Ouço que todos Vos chamam o Refúgio e a Esperança dos pecadores; logo então, sede Vós o meu refúgio e a minha esperança.<br><br>Por amor de Jesus Cristo, socorrei-me,<br>Dai a mão a um mísero(a) caído(a), que a Vós se entrega e recomenda.<br><br>Eu bendigo e rendo graças a Deus, por se ter dignado conceder-me esta confiança em Vós, que eu considero um penhor de minha salvação eterna. Ah! É mais do que certo que no passado, quando tive a desventura de cair, a Vós não recorri. Contudo, ó minha benigníssima Mãe, não me recuseis o Vosso socorro; pois sei que com ele serei vencedor. Sim, sei que vireis em meu socorro, se a Vós me recomendar; mas temo as ocasiões de pecar, receio deixar então de invocar o Vosso Auxílio, e deste modo perder-me. É esta a graça que peço, e Vos conjuro que me concedais; fazei, ó Maria, que eu a Vós recorra, em todos os assaltos que possam me conduzir ao inferno, e que eu possa dizer-Vos continuamente: Maria, ajudai-me! Mãe do Perpétuo Socorro. Não permitais que eu perca o meu Deus!<br><br><b>Pai Nosso 1x</b><br><b>Ave Maria 3x</b><br><br>Bendito seja Deus e louvada seja a Virgem Maria! Ó Mãe do Perpétuo Socorro, suplico-vos que intercedais por mim em minhas necessidades e por aqueles que amo. Dai-nos força nas fraquezas, coragem nas tentações e consolo nas aflições. Amém.<br><br><b>PEQUENA LADAINHA À N. SRA. DO PERPÉTUO SOCORRO:</b><br>• Saúde dos enfermos.<br><b>Rogai por nós.</b><br>• Auxílio dos Necessitados.<br><b>Rogai por nós.</b><br>• Consoladora dos aflitos.<br><b>Rogai por nós.</b><br>• Refúgio dos pecadores.<br><b>Rogai por nós.</b><br>• Padroeira da Família Excelsior.<br><b>Rogai por nós.</b><br>• Rainha dos apóstolos.<br><b>Enviai-nos muitas e santas vocações.</b><br><i>Rogai por nós, ó Mãe do Perpétuo Socorro.</i><br><b>Para que sejamos dignos das promessas de Cristo…</b><br><br><b>ORAÇÃO</b><br>Ó Deus fiel e misericordioso, que nos destes a graça de venerar a vossa bem aventurada Mãe, sob o título de Nossa Senhora do Perpétuo Socorro, concedei-nos que em todas as nossas necessidades, sejamos acompanhados pela proteção da Virgem Maria, e que, depois de nossa peregrinação nesta vida, alcancemos o prêmio da Redenção Eterna. Vós que viveis e reinais, por todos os séculos dos séculos. Amém!<br><br><b>CONSAGRAÇÃO À NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Santíssima Virgem Maria, Mãe de Deus, a quem tanto me apraz honrar sob o belo titulo de Mãe do Perpétuo Socorro, eu (dizer seu nome) ainda que indigno/a de ser o vosso servo, animado contudo pela vossa admirável bondade e entusiasmado pelo desejo de vos servir, vos escolho hoje em presença do meu anjo da guarda e de toda a côrte celeste, para minha Mãe, e tomo a firme resolução de vos amar e servir sempre daqui em diante, e fazer tudo o que me for possível para que sejais amada e servida também pelos outros.<br><br>Ó Mãe de Deus, minha boa e muito amável Mãe, pelo sangue do vosso Divino Filho, derramado por nosso amor, suplico-vos me recebais para sempre em o número dos vossas filhos e servos dedicados. Assisti-me em todos os meus pensamentos, palavras e ações, até ao fim da vida, de sorte que todos os meus passos e suspiros tenham por único fim dar maior glória a Deus; fazei, pela vossa poderosa intercessão, que eu não ofenda jamais o meu amadíssimo Jesus, mas O glorifique e ame. Fazei que vos ame também, ó minha Mãe queridíssima, a fim de que eu tenha um dia a felicidade de vos ter e amar no santo paraíso, por séculos dos séculos. Assim seja. Ó Maria, minha Mãe, recomendo-vos a minha alma, principalmente na hora da minha morte. Nossa Senhora do Perpétuo Socorro, rogai por nós!<br><br><b>ORAÇÃO PELA FAMÍLIA EXCELSIOR</b><br>Ó Mãe do Perpétuo Socorro, nós vos suplicamos, com toda a força do nosso coração, para que ampare cada membro da Família Excelsior. Que o Vosso olhar esteja sempre atento para cada ouvinte da Rede Excelsior de Comunicação. Pedimos de modo particular por aqueles que nos escutam enquanto se deslocam para o trabalho, nas suas atividades domésticas, nas atividades educativas, nos momentos de lazer, nos eventos culturais e esportivos. Permita-lhes receberem o Vosso cuidado materno, tal como o Menino Jesus em seus braços. Continua nos dando condições para levar a Voz do Senhor do Bonfim, vosso Filho amado, sobretudo, para todos aqueles que se encontram nos abrigos de idosos, leitos dos hospitais, nas madrugadas solitárias, nos contextos prisionais, e em toda e qualquer dificuldade. Sede para eles refúgio e esperança. Dai-lhes paz e proteção. Sabemos, ó Mãe do Perpétuo Socorro, o quão difícil é a manutenção desta obra da ação evangelizadora, por isto pedimos a sua poderosa intercessão junto a Deus, para que envie novos sócios-missionários para a Família Excelsior. Ajudai-nos nos caminhos da vida e sobretudo, Mãe, conduza-nos para o verdadeiro caminho que é teu Filho Jesus. Amém!<br><br><b>BÊNÇÃO COM O ÍCONE DE NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Ó Maria, Mãe do Perpétuo Socorro, abençoai o povo deste bairro, desta cidade e todos os vossos devotos. Protegei os pais, as mães, os jovens, os adolescentes, as crianças e os idosos. Restituí a saúde aos enfermos. Confortai os aflitos. Ajudai-nos a resolver os nossos problemas pessoais e familiares. Sede nossa Mãe do Perpétuo Socorro e dai-nos a vossa bênção.<br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b>",
        "<b>Dia 2</b><br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b><br><br>Ó Mãe do Perpétuo Socorro, eu vos ofereço esta novena, por intenção dos doentes, dos aflitos e atribulados, dos pobres pecadores, pelas necessidades da Igreja, por suas vocações sacerdotais, religiosas e leigas, por minha família, pelos membros da Família Excelsior e por minhas intenções particulares. Dignai-vos atender-me bondosamente. Amém!<br><br><i>(mencione o pedido aqui…)</i><br><br>Eis, aqui, ó Mãe do Perpétuo Socorro, aos vossos pés um miserável pecador, que a Vós recorre e em Vós confia. Ó Mãe de misericórdia, tende piedade de mim! Ouço que todos Vos chamam o Refúgio e a Esperança dos pecadores; logo então, sede Vós o meu refúgio e a minha esperança.<br><br>Por amor de Jesus Cristo, socorrei-me,<br>Dai a mão a um mísero(a) caído(a), que a Vós se entrega e recomenda.<br><br>Eu bendigo e rendo graças a Deus, por se ter dignado conceder-me esta confiança em Vós, que eu considero um penhor de minha salvação eterna. Ah! É mais do que certo que no passado, quando tive a desventura de cair, a Vós não recorri. Contudo, ó minha benigníssima Mãe, não me recuseis o Vosso socorro; pois sei que com ele serei vencedor. Sim, sei que vireis em meu socorro, se a Vós me recomendar; mas temo as ocasiões de pecar, receio deixar então de invocar o Vosso Auxílio, e deste modo perder-me. É esta a graça que peço, e Vos conjuro que me concedais; fazei, ó Maria, que eu a Vós recorra, em todos os assaltos que possam me conduzir ao inferno, e que eu possa dizer-Vos continuamente: Maria, ajudai-me! Mãe do Perpétuo Socorro. Não permitais que eu perca o meu Deus!<br><br><b>Pai Nosso 1x</b><br><b>Ave Maria 3x</b><br><br>Ó Mãe misericordiosa, olhai para os enfermos e os aflitos. Confortai os que sofrem e estendei a mão da cura aos que dela necessitam. Que a vossa proteção nos rodeie sempre. Amém.<br><br><b>PEQUENA LADAINHA À N. SRA. DO PERPÉTUO SOCORRO:</b><br>• Saúde dos enfermos.<br><b>Rogai por nós.</b><br>• Auxílio dos Necessitados.<br><b>Rogai por nós.</b><br>• Consoladora dos aflitos.<br><b>Rogai por nós.</b><br>• Refúgio dos pecadores.<br><b>Rogai por nós.</b><br>• Padroeira da Família Excelsior.<br><b>Rogai por nós.</b><br>• Rainha dos apóstolos.<br><b>Enviai-nos muitas e santas vocações.</b><br><i>Rogai por nós, ó Mãe do Perpétuo Socorro.</i><br><b>Para que sejamos dignos das promessas de Cristo…</b><br><br><b>ORAÇÃO</b><br>Ó Deus fiel e misericordioso, que nos destes a graça de venerar a vossa bem aventurada Mãe, sob o título de Nossa Senhora do Perpétuo Socorro, concedei-nos que em todas as nossas necessidades, sejamos acompanhados pela proteção da Virgem Maria, e que, depois de nossa peregrinação nesta vida, alcancemos o prêmio da Redenção Eterna. Vós que viveis e reinais, por todos os séculos dos séculos. Amém!<br><br><b>CONSAGRAÇÃO À NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Santíssima Virgem Maria, Mãe de Deus, a quem tanto me apraz honrar sob o belo titulo de Mãe do Perpétuo Socorro, eu (dizer seu nome) ainda que indigno/a de ser o vosso servo, animado contudo pela vossa admirável bondade e entusiasmado pelo desejo de vos servir, vos escolho hoje em presença do meu anjo da guarda e de toda a côrte celeste, para minha Mãe, e tomo a firme resolução de vos amar e servir sempre daqui em diante, e fazer tudo o que me for possível para que sejais amada e servida também pelos outros.<br><br>Ó Mãe de Deus, minha boa e muito amável Mãe, pelo sangue do vosso Divino Filho, derramado por nosso amor, suplico-vos me recebais para sempre em o número dos vossas filhos e servos dedicados. Assisti-me em todos os meus pensamentos, palavras e ações, até ao fim da vida, de sorte que todos os meus passos e suspiros tenham por único fim dar maior glória a Deus; fazei, pela vossa poderosa intercessão, que eu não ofenda jamais o meu amadíssimo Jesus, mas O glorifique e ame. Fazei que vos ame também, ó minha Mãe queridíssima, a fim de que eu tenha um dia a felicidade de vos ter e amar no santo paraíso, por séculos dos séculos. Assim seja. Ó Maria, minha Mãe, recomendo-vos a minha alma, principalmente na hora da minha morte. Nossa Senhora do Perpétuo Socorro, rogai por nós!<br><br><b>ORAÇÃO PELA FAMÍLIA EXCELSIOR</b><br>Ó Mãe do Perpétuo Socorro, nós vos suplicamos, com toda a força do nosso coração, para que ampare cada membro da Família Excelsior. Que o Vosso olhar esteja sempre atento para cada ouvinte da Rede Excelsior de Comunicação. Pedimos de modo particular por aqueles que nos escutam enquanto se deslocam para o trabalho, nas suas atividades domésticas, nas atividades educativas, nos momentos de lazer, nos eventos culturais e esportivos. Permita-lhes receberem o Vosso cuidado materno, tal como o Menino Jesus em seus braços. Continua nos dando condições para levar a Voz do Senhor do Bonfim, vosso Filho amado, sobretudo, para todos aqueles que se encontram nos abrigos de idosos, leitos dos hospitais, nas madrugadas solitárias, nos contextos prisionais, e em toda e qualquer dificuldade. Sede para eles refúgio e esperança. Dai-lhes paz e proteção. Sabemos, ó Mãe do Perpétuo Socorro, o quão difícil é a manutenção desta obra da ação evangelizadora, por isto pedimos a sua poderosa intercessão junto a Deus, para que envie novos sócios-missionários para a Família Excelsior. Ajudai-nos nos caminhos da vida e sobretudo, Mãe, conduza-nos para o verdadeiro caminho que é teu Filho Jesus. Amém!<br><br><b>BÊNÇÃO COM O ÍCONE DE NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Ó Maria, Mãe do Perpétuo Socorro, abençoai o povo deste bairro, desta cidade e todos os vossos devotos. Protegei os pais, as mães, os jovens, os adolescentes, as crianças e os idosos. Restituí a saúde aos enfermos. Confortai os aflitos. Ajudai-nos a resolver os nossos problemas pessoais e familiares. Sede nossa Mãe do Perpétuo Socorro e dai-nos a vossa bênção.<br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b>",
        "<b>Dia 3</b><br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b><br><br>Ó Mãe do Perpétuo Socorro, eu vos ofereço esta novena, por intenção dos doentes, dos aflitos e atribulados, dos pobres pecadores, pelas necessidades da Igreja, por suas vocações sacerdotais, religiosas e leigas, por minha família, pelos membros da Família Excelsior e por minhas intenções particulares. Dignai-vos atender-me bondosamente. Amém!<br><br><i>(mencione o pedido aqui…)</i><br><br>Eis, aqui, ó Mãe do Perpétuo Socorro, aos vossos pés um miserável pecador, que a Vós recorre e em Vós confia. Ó Mãe de misericórdia, tende piedade de mim! Ouço que todos Vos chamam o Refúgio e a Esperança dos pecadores; logo então, sede Vós o meu refúgio e a minha esperança.<br><br>Por amor de Jesus Cristo, socorrei-me,<br>Dai a mão a um mísero(a) caído(a), que a Vós se entrega e recomenda.<br><br>Eu bendigo e rendo graças a Deus, por se ter dignado conceder-me esta confiança em Vós, que eu considero um penhor de minha salvação eterna. Ah! É mais do que certo que no passado, quando tive a desventura de cair, a Vós não recorri. Contudo, ó minha benigníssima Mãe, não me recuseis o Vosso socorro; pois sei que com ele serei vencedor. Sim, sei que vireis em meu socorro, se a Vós me recomendar; mas temo as ocasiões de pecar, receio deixar então de invocar o Vosso Auxílio, e deste modo perder-me. É esta a graça que peço, e Vos conjuro que me concedais; fazei, ó Maria, que eu a Vós recorra, em todos os assaltos que possam me conduzir ao inferno, e que eu possa dizer-Vos continuamente: Maria, ajudai-me! Mãe do Perpétuo Socorro. Não permitais que eu perca o meu Deus!<br><br><b>Pai Nosso 1x</b><br><b>Ave Maria 3x</b><br><br>Mãe do Perpétuo Socorro, ajudai-nos a confiar plenamente em Deus e a abandonar-nos com esperança no Vosso Coração Imaculado. Livrai-nos do desespero e enchei-nos de paz. Amém.<br><br><b>PEQUENA LADAINHA À N. SRA. DO PERPÉTUO SOCORRO:</b><br>• Saúde dos enfermos.<br><b>Rogai por nós.</b><br>• Auxílio dos Necessitados.<br><b>Rogai por nós.</b><br>• Consoladora dos aflitos.<br><b>Rogai por nós.</b><br>• Refúgio dos pecadores.<br><b>Rogai por nós.</b><br>• Padroeira da Família Excelsior.<br><b>Rogai por nós.</b><br>• Rainha dos apóstolos.<br><b>Enviai-nos muitas e santas vocações.</b><br><i>Rogai por nós, ó Mãe do Perpétuo Socorro.</i><br><b>Para que sejamos dignos das promessas de Cristo…</b><br><br><b>ORAÇÃO</b><br>Ó Deus fiel e misericordioso, que nos destes a graça de venerar a vossa bem aventurada Mãe, sob o título de Nossa Senhora do Perpétuo Socorro, concedei-nos que em todas as nossas necessidades, sejamos acompanhados pela proteção da Virgem Maria, e que, depois de nossa peregrinação nesta vida, alcancemos o prêmio da Redenção Eterna. Vós que viveis e reinais, por todos os séculos dos séculos. Amém!<br><br><b>CONSAGRAÇÃO À NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Santíssima Virgem Maria, Mãe de Deus, a quem tanto me apraz honrar sob o belo titulo de Mãe do Perpétuo Socorro, eu (dizer seu nome) ainda que indigno/a de ser o vosso servo, animado contudo pela vossa admirável bondade e entusiasmado pelo desejo de vos servir, vos escolho hoje em presença do meu anjo da guarda e de toda a côrte celeste, para minha Mãe, e tomo a firme resolução de vos amar e servir sempre daqui em diante, e fazer tudo o que me for possível para que sejais amada e servida também pelos outros.<br><br>Ó Mãe de Deus, minha boa e muito amável Mãe, pelo sangue do vosso Divino Filho, derramado por nosso amor, suplico-vos me recebais para sempre em o número dos vossas filhos e servos dedicados. Assisti-me em todos os meus pensamentos, palavras e ações, até ao fim da vida, de sorte que todos os meus passos e suspiros tenham por único fim dar maior glória a Deus; fazei, pela vossa poderosa intercessão, que eu não ofenda jamais o meu amadíssimo Jesus, mas O glorifique e ame. Fazei que vos ame também, ó minha Mãe queridíssima, a fim de que eu tenha um dia a felicidade de vos ter e amar no santo paraíso, por séculos dos séculos. Assim seja. Ó Maria, minha Mãe, recomendo-vos a minha alma, principalmente na hora da minha morte. Nossa Senhora do Perpétuo Socorro, rogai por nós!<br><br><b>ORAÇÃO PELA FAMÍLIA EXCELSIOR</b><br>Ó Mãe do Perpétuo Socorro, nós vos suplicamos, com toda a força do nosso coração, para que ampare cada membro da Família Excelsior. Que o Vosso olhar esteja sempre atento para cada ouvinte da Rede Excelsior de Comunicação. Pedimos de modo particular por aqueles que nos escutam enquanto se deslocam para o trabalho, nas suas atividades domésticas, nas atividades educativas, nos momentos de lazer, nos eventos culturais e esportivos. Permita-lhes receberem o Vosso cuidado materno, tal como o Menino Jesus em seus braços. Continua nos dando condições para levar a Voz do Senhor do Bonfim, vosso Filho amado, sobretudo, para todos aqueles que se encontram nos abrigos de idosos, leitos dos hospitais, nas madrugadas solitárias, nos contextos prisionais, e em toda e qualquer dificuldade. Sede para eles refúgio e esperança. Dai-lhes paz e proteção. Sabemos, ó Mãe do Perpétuo Socorro, o quão difícil é a manutenção desta obra da ação evangelizadora, por isto pedimos a sua poderosa intercessão junto a Deus, para que envie novos sócios-missionários para a Família Excelsior. Ajudai-nos nos caminhos da vida e sobretudo, Mãe, conduza-nos para o verdadeiro caminho que é teu Filho Jesus. Amém!<br><br><b>BÊNÇÃO COM O ÍCONE DE NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Ó Maria, Mãe do Perpétuo Socorro, abençoai o povo deste bairro, desta cidade e todos os vossos devotos. Protegei os pais, as mães, os jovens, os adolescentes, as crianças e os idosos. Restituí a saúde aos enfermos. Confortai os aflitos. Ajudai-nos a resolver os nossos problemas pessoais e familiares. Sede nossa Mãe do Perpétuo Socorro e dai-nos a vossa bênção.<br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b>",
        "<b>Dia 4</b><br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b><br><br>Ó Mãe do Perpétuo Socorro, eu vos ofereço esta novena, por intenção dos doentes, dos aflitos e atribulados, dos pobres pecadores, pelas necessidades da Igreja, por suas vocações sacerdotais, religiosas e leigas, por minha família, pelos membros da Família Excelsior e por minhas intenções particulares. Dignai-vos atender-me bondosamente. Amém!<br><br><i>(mencione o pedido aqui…)</i><br><br>Eis, aqui, ó Mãe do Perpétuo Socorro, aos vossos pés um miserável pecador, que a Vós recorre e em Vós confia. Ó Mãe de misericórdia, tende piedade de mim! Ouço que todos Vos chamam o Refúgio e a Esperança dos pecadores; logo então, sede Vós o meu refúgio e a minha esperança.<br><br>Por amor de Jesus Cristo, socorrei-me,<br>Dai a mão a um mísero(a) caído(a), que a Vós se entrega e recomenda.<br><br>Eu bendigo e rendo graças a Deus, por se ter dignado conceder-me esta confiança em Vós, que eu considero um penhor de minha salvação eterna. Ah! É mais do que certo que no passado, quando tive a desventura de cair, a Vós não recorri. Contudo, ó minha benigníssima Mãe, não me recuseis o Vosso socorro; pois sei que com ele serei vencedor. Sim, sei que vireis em meu socorro, se a Vós me recomendar; mas temo as ocasiões de pecar, receio deixar então de invocar o Vosso Auxílio, e deste modo perder-me. É esta a graça que peço, e Vos conjuro que me concedais; fazei, ó Maria, que eu a Vós recorra, em todos os assaltos que possam me conduzir ao inferno, e que eu possa dizer-Vos continuamente: Maria, ajudai-me! Mãe do Perpétuo Socorro. Não permitais que eu perca o meu Deus!<br><br><b>Pai Nosso 1x</b><br><b>Ave Maria 3x</b><br><br>Nossa Senhora do Perpétuo Socorro, protegei as famílias, dai-lhes unidade, amor e fidelidade. Intercedei para que em cada lar reine a paz e a caridade cristã. Amém.<br><br><b>PEQUENA LADAINHA À N. SRA. DO PERPÉTUO SOCORRO:</b><br>• Saúde dos enfermos.<br><b>Rogai por nós.</b><br>• Auxílio dos Necessitados.<br><b>Rogai por nós.</b><br>• Consoladora dos aflitos.<br><b>Rogai por nós.</b><br>• Refúgio dos pecadores.<br><b>Rogai por nós.</b><br>• Padroeira da Família Excelsior.<br><b>Rogai por nós.</b><br>• Rainha dos apóstolos.<br><b>Enviai-nos muitas e santas vocações.</b><br><i>Rogai por nós, ó Mãe do Perpétuo Socorro.</i><br><b>Para que sejamos dignos das promessas de Cristo…</b><br><br><b>ORAÇÃO</b><br>Ó Deus fiel e misericordioso, que nos destes a graça de venerar a vossa bem aventurada Mãe, sob o título de Nossa Senhora do Perpétuo Socorro, concedei-nos que em todas as nossas necessidades, sejamos acompanhados pela proteção da Virgem Maria, e que, depois de nossa peregrinação nesta vida, alcancemos o prêmio da Redenção Eterna. Vós que viveis e reinais, por todos os séculos dos séculos. Amém!<br><br><b>CONSAGRAÇÃO À NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Santíssima Virgem Maria, Mãe de Deus, a quem tanto me apraz honrar sob o belo titulo de Mãe do Perpétuo Socorro, eu (dizer seu nome) ainda que indigno/a de ser o vosso servo, animado contudo pela vossa admirável bondade e entusiasmado pelo desejo de vos servir, vos escolho hoje em presença do meu anjo da guarda e de toda a côrte celeste, para minha Mãe, e tomo a firme resolução de vos amar e servir sempre daqui em diante, e fazer tudo o que me for possível para que sejais amada e servida também pelos outros.<br><br>Ó Mãe de Deus, minha boa e muito amável Mãe, pelo sangue do vosso Divino Filho, derramado por nosso amor, suplico-vos me recebais para sempre em o número dos vossas filhos e servos dedicados. Assisti-me em todos os meus pensamentos, palavras e ações, até ao fim da vida, de sorte que todos os meus passos e suspiros tenham por único fim dar maior glória a Deus; fazei, pela vossa poderosa intercessão, que eu não ofenda jamais o meu amadíssimo Jesus, mas O glorifique e ame. Fazei que vos ame também, ó minha Mãe queridíssima, a fim de que eu tenha um dia a felicidade de vos ter e amar no santo paraíso, por séculos dos séculos. Assim seja. Ó Maria, minha Mãe, recomendo-vos a minha alma, principalmente na hora da minha morte. Nossa Senhora do Perpétuo Socorro, rogai por nós!<br><br><b>ORAÇÃO PELA FAMÍLIA EXCELSIOR</b><br>Ó Mãe do Perpétuo Socorro, nós vos suplicamos, com toda a força do nosso coração, para que ampare cada membro da Família Excelsior. Que o Vosso olhar esteja sempre atento para cada ouvinte da Rede Excelsior de Comunicação. Pedimos de modo particular por aqueles que nos escutam enquanto se deslocam para o trabalho, nas suas atividades domésticas, nas atividades educativas, nos momentos de lazer, nos eventos culturais e esportivos. Permita-lhes receberem o Vosso cuidado materno, tal como o Menino Jesus em seus braços. Continua nos dando condições para levar a Voz do Senhor do Bonfim, vosso Filho amado, sobretudo, para todos aqueles que se encontram nos abrigos de idosos, leitos dos hospitais, nas madrugadas solitárias, nos contextos prisionais, e em toda e qualquer dificuldade. Sede para eles refúgio e esperança. Dai-lhes paz e proteção. Sabemos, ó Mãe do Perpétuo Socorro, o quão difícil é a manutenção desta obra da ação evangelizadora, por isto pedimos a sua poderosa intercessão junto a Deus, para que envie novos sócios-missionários para a Família Excelsior. Ajudai-nos nos caminhos da vida e sobretudo, Mãe, conduza-nos para o verdadeiro caminho que é teu Filho Jesus. Amém!<br><br><b>BÊNÇÃO COM O ÍCONE DE NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Ó Maria, Mãe do Perpétuo Socorro, abençoai o povo deste bairro, desta cidade e todos os vossos devotos. Protegei os pais, as mães, os jovens, os adolescentes, as crianças e os idosos. Restituí a saúde aos enfermos. Confortai os aflitos. Ajudai-nos a resolver os nossos problemas pessoais e familiares. Sede nossa Mãe do Perpétuo Socorro e dai-nos a vossa bênção.<br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b>",
        "<b>Dia 5</b><br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b><br><br>Ó Mãe do Perpétuo Socorro, eu vos ofereço esta novena, por intenção dos doentes, dos aflitos e atribulados, dos pobres pecadores, pelas necessidades da Igreja, por suas vocações sacerdotais, religiosas e leigas, por minha família, pelos membros da Família Excelsior e por minhas intenções particulares. Dignai-vos atender-me bondosamente. Amém!<br><br><i>(mencione o pedido aqui…)</i><br><br>Eis, aqui, ó Mãe do Perpétuo Socorro, aos vossos pés um miserável pecador, que a Vós recorre e em Vós confia. Ó Mãe de misericórdia, tende piedade de mim! Ouço que todos Vos chamam o Refúgio e a Esperança dos pecadores; logo então, sede Vós o meu refúgio e a minha esperança.<br><br>Por amor de Jesus Cristo, socorrei-me,<br>Dai a mão a um mísero(a) caído(a), que a Vós se entrega e recomenda.<br><br>Eu bendigo e rendo graças a Deus, por se ter dignado conceder-me esta confiança em Vós, que eu considero um penhor de minha salvação eterna. Ah! É mais do que certo que no passado, quando tive a desventura de cair, a Vós não recorri. Contudo, ó minha benigníssima Mãe, não me recuseis o Vosso socorro; pois sei que com ele serei vencedor. Sim, sei que vireis em meu socorro, se a Vós me recomendar; mas temo as ocasiões de pecar, receio deixar então de invocar o Vosso Auxílio, e deste modo perder-me. É esta a graça que peço, e Vos conjuro que me concedais; fazei, ó Maria, que eu a Vós recorra, em todos os assaltos que possam me conduzir ao inferno, e que eu possa dizer-Vos continuamente: Maria, ajudai-me! Mãe do Perpétuo Socorro. Não permitais que eu perca o meu Deus!<br><br><b>Pai Nosso 1x</b><br><b>Ave Maria 3x</b><br><br>Rainha dos apóstolos, enviai muitas e santas vocações à Igreja. Que muitos corações se abram ao chamado de servir a Cristo e Sua Igreja com generosidade. Amém.<br><br><b>PEQUENA LADAINHA À N. SRA. DO PERPÉTUO SOCORRO:</b><br>• Saúde dos enfermos.<br><b>Rogai por nós.</b><br>• Auxílio dos Necessitados.<br><b>Rogai por nós.</b><br>• Consoladora dos aflitos.<br><b>Rogai por nós.</b><br>• Refúgio dos pecadores.<br><b>Rogai por nós.</b><br>• Padroeira da Família Excelsior.<br><b>Rogai por nós.</b><br>• Rainha dos apóstolos.<br><b>Enviai-nos muitas e santas vocações.</b><br><i>Rogai por nós, ó Mãe do Perpétuo Socorro.</i><br><b>Para que sejamos dignos das promessas de Cristo…</b><br><br><b>ORAÇÃO</b><br>Ó Deus fiel e misericordioso, que nos destes a graça de venerar a vossa bem aventurada Mãe, sob o título de Nossa Senhora do Perpétuo Socorro, concedei-nos que em todas as nossas necessidades, sejamos acompanhados pela proteção da Virgem Maria, e que, depois de nossa peregrinação nesta vida, alcancemos o prêmio da Redenção Eterna. Vós que viveis e reinais, por todos os séculos dos séculos. Amém!<br><br><b>CONSAGRAÇÃO À NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Santíssima Virgem Maria, Mãe de Deus, a quem tanto me apraz honrar sob o belo titulo de Mãe do Perpétuo Socorro, eu (dizer seu nome) ainda que indigno/a de ser o vosso servo, animado contudo pela vossa admirável bondade e entusiasmado pelo desejo de vos servir, vos escolho hoje em presença do meu anjo da guarda e de toda a côrte celeste, para minha Mãe, e tomo a firme resolução de vos amar e servir sempre daqui em diante, e fazer tudo o que me for possível para que sejais amada e servida também pelos outros.<br><br>Ó Mãe de Deus, minha boa e muito amável Mãe, pelo sangue do vosso Divino Filho, derramado por nosso amor, suplico-vos me recebais para sempre em o número dos vossas filhos e servos dedicados. Assisti-me em todos os meus pensamentos, palavras e ações, até ao fim da vida, de sorte que todos os meus passos e suspiros tenham por único fim dar maior glória a Deus; fazei, pela vossa poderosa intercessão, que eu não ofenda jamais o meu amadíssimo Jesus, mas O glorifique e ame. Fazei que vos ame também, ó minha Mãe queridíssima, a fim de que eu tenha um dia a felicidade de vos ter e amar no santo paraíso, por séculos dos séculos. Assim seja. Ó Maria, minha Mãe, recomendo-vos a minha alma, principalmente na hora da minha morte. Nossa Senhora do Perpétuo Socorro, rogai por nós!<br><br><b>ORAÇÃO PELA FAMÍLIA EXCELSIOR</b><br>Ó Mãe do Perpétuo Socorro, nós vos suplicamos, com toda a força do nosso coração, para que ampare cada membro da Família Excelsior. Que o Vosso olhar esteja sempre atento para cada ouvinte da Rede Excelsior de Comunicação. Pedimos de modo particular por aqueles que nos escutam enquanto se deslocam para o trabalho, nas suas atividades domésticas, nas atividades educativas, nos momentos de lazer, nos eventos culturais e esportivos. Permita-lhes receberem o Vosso cuidado materno, tal como o Menino Jesus em seus braços. Continua nos dando condições para levar a Voz do Senhor do Bonfim, vosso Filho amado, sobretudo, para todos aqueles que se encontram nos abrigos de idosos, leitos dos hospitais, nas madrugadas solitárias, nos contextos prisionais, e em toda e qualquer dificuldade. Sede para eles refúgio e esperança. Dai-lhes paz e proteção. Sabemos, ó Mãe do Perpétuo Socorro, o quão difícil é a manutenção desta obra da ação evangelizadora, por isto pedimos a sua poderosa intercessão junto a Deus, para que envie novos sócios-missionários para a Família Excelsior. Ajudai-nos nos caminhos da vida e sobretudo, Mãe, conduza-nos para o verdadeiro caminho que é teu Filho Jesus. Amém!<br><br><b>BÊNÇÃO COM O ÍCONE DE NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Ó Maria, Mãe do Perpétuo Socorro, abençoai o povo deste bairro, desta cidade e todos os vossos devotos. Protegei os pais, as mães, os jovens, os adolescentes, as crianças e os idosos. Restituí a saúde aos enfermos. Confortai os aflitos. Ajudai-nos a resolver os nossos problemas pessoais e familiares. Sede nossa Mãe do Perpétuo Socorro e dai-nos a vossa bênção.<br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b>",
        "<b>Dia 6</b><br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b><br><br>Ó Mãe do Perpétuo Socorro, eu vos ofereço esta novena, por intenção dos doentes, dos aflitos e atribulados, dos pobres pecadores, pelas necessidades da Igreja, por suas vocações sacerdotais, religiosas e leigas, por minha família, pelos membros da Família Excelsior e por minhas intenções particulares. Dignai-vos atender-me bondosamente. Amém!<br><br><i>(mencione o pedido aqui…)</i><br><br>Eis, aqui, ó Mãe do Perpétuo Socorro, aos vossos pés um miserável pecador, que a Vós recorre e em Vós confia. Ó Mãe de misericórdia, tende piedade de mim! Ouço que todos Vos chamam o Refúgio e a Esperança dos pecadores; logo então, sede Vós o meu refúgio e a minha esperança.<br><br>Por amor de Jesus Cristo, socorrei-me,<br>Dai a mão a um mísero(a) caído(a), que a Vós se entrega e recomenda.<br><br>Eu bendigo e rendo graças a Deus, por se ter dignado conceder-me esta confiança em Vós, que eu considero um penhor de minha salvação eterna. Ah! É mais do que certo que no passado, quando tive a desventura de cair, a Vós não recorri. Contudo, ó minha benigníssima Mãe, não me recuseis o Vosso socorro; pois sei que com ele serei vencedor. Sim, sei que vireis em meu socorro, se a Vós me recomendar; mas temo as ocasiões de pecar, receio deixar então de invocar o Vosso Auxílio, e deste modo perder-me. É esta a graça que peço, e Vos conjuro que me concedais; fazei, ó Maria, que eu a Vós recorra, em todos os assaltos que possam me conduzir ao inferno, e que eu possa dizer-Vos continuamente: Maria, ajudai-me! Mãe do Perpétuo Socorro. Não permitais que eu perca o meu Deus!<br><br><b>Pai Nosso 1x</b><br><b>Ave Maria 3x</b><br><br>Mãe querida, ajudai-nos a vencer o pecado, especialmente aquelas tentações que nos afastam de Deus. Dai-nos força para resistir e graça para perseverar na virtude. Amém.<br><br><b>PEQUENA LADAINHA À N. SRA. DO PERPÉTUO SOCORRO:</b><br>• Saúde dos enfermos.<br><b>Rogai por nós.</b><br>• Auxílio dos Necessitados.<br><b>Rogai por nós.</b><br>• Consoladora dos aflitos.<br><b>Rogai por nós.</b><br>• Refúgio dos pecadores.<br><b>Rogai por nós.</b><br>• Padroeira da Família Excelsior.<br><b>Rogai por nós.</b><br>• Rainha dos apóstolos.<br><b>Enviai-nos muitas e santas vocações.</b><br><i>Rogai por nós, ó Mãe do Perpétuo Socorro.</i><br><b>Para que sejamos dignos das promessas de Cristo…</b><br><br><b>ORAÇÃO</b><br>Ó Deus fiel e misericordioso, que nos destes a graça de venerar a vossa bem aventurada Mãe, sob o título de Nossa Senhora do Perpétuo Socorro, concedei-nos que em todas as nossas necessidades, sejamos acompanhados pela proteção da Virgem Maria, e que, depois de nossa peregrinação nesta vida, alcancemos o prêmio da Redenção Eterna. Vós que viveis e reinais, por todos os séculos dos séculos. Amém!<br><br><b>CONSAGRAÇÃO À NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Santíssima Virgem Maria, Mãe de Deus, a quem tanto me apraz honrar sob o belo titulo de Mãe do Perpétuo Socorro, eu (dizer seu nome) ainda que indigno/a de ser o vosso servo, animado contudo pela vossa admirável bondade e entusiasmado pelo desejo de vos servir, vos escolho hoje em presença do meu anjo da guarda e de toda a côrte celeste, para minha Mãe, e tomo a firme resolução de vos amar e servir sempre daqui em diante, e fazer tudo o que me for possível para que sejais amada e servida também pelos outros.<br><br>Ó Mãe de Deus, minha boa e muito amável Mãe, pelo sangue do vosso Divino Filho, derramado por nosso amor, suplico-vos me recebais para sempre em o número dos vossas filhos e servos dedicados. Assisti-me em todos os meus pensamentos, palavras e ações, até ao fim da vida, de sorte que todos os meus passos e suspiros tenham por único fim dar maior glória a Deus; fazei, pela vossa poderosa intercessão, que eu não ofenda jamais o meu amadíssimo Jesus, mas O glorifique e ame. Fazei que vos ame também, ó minha Mãe queridíssima, a fim de que eu tenha um dia a felicidade de vos ter e amar no santo paraíso, por séculos dos séculos. Assim seja. Ó Maria, minha Mãe, recomendo-vos a minha alma, principalmente na hora da minha morte. Nossa Senhora do Perpétuo Socorro, rogai por nós!<br><br><b>ORAÇÃO PELA FAMÍLIA EXCELSIOR</b><br>Ó Mãe do Perpétuo Socorro, nós vos suplicamos, com toda a força do nosso coração, para que ampare cada membro da Família Excelsior. Que o Vosso olhar esteja sempre atento para cada ouvinte da Rede Excelsior de Comunicação. Pedimos de modo particular por aqueles que nos escutam enquanto se deslocam para o trabalho, nas suas atividades domésticas, nas atividades educativas, nos momentos de lazer, nos eventos culturais e esportivos. Permita-lhes receberem o Vosso cuidado materno, tal como o Menino Jesus em seus braços. Continua nos dando condições para levar a Voz do Senhor do Bonfim, vosso Filho amado, sobretudo, para todos aqueles que se encontram nos abrigos de idosos, leitos dos hospitais, nas madrugadas solitárias, nos contextos prisionais, e em toda e qualquer dificuldade. Sede para eles refúgio e esperança. Dai-lhes paz e proteção. Sabemos, ó Mãe do Perpétuo Socorro, o quão difícil é a manutenção desta obra da ação evangelizadora, por isto pedimos a sua poderosa intercessão junto a Deus, para que envie novos sócios-missionários para a Família Excelsior. Ajudai-nos nos caminhos da vida e sobretudo, Mãe, conduza-nos para o verdadeiro caminho que é teu Filho Jesus. Amém!<br><br><b>BÊNÇÃO COM O ÍCONE DE NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Ó Maria, Mãe do Perpétuo Socorro, abençoai o povo deste bairro, desta cidade e todos os vossos devotos. Protegei os pais, as mães, os jovens, os adolescentes, as crianças e os idosos. Restituí a saúde aos enfermos. Confortai os aflitos. Ajudai-nos a resolver os nossos problemas pessoais e familiares. Sede nossa Mãe do Perpétuo Socorro e dai-nos a vossa bênção.<br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b>",
        "<b>Dia 7</b><br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b><br><br>Ó Mãe do Perpétuo Socorro, eu vos ofereço esta novena, por intenção dos doentes, dos aflitos e atribulados, dos pobres pecadores, pelas necessidades da Igreja, por suas vocações sacerdotais, religiosas e leigas, por minha família, pelos membros da Família Excelsior e por minhas intenções particulares. Dignai-vos atender-me bondosamente. Amém!<br><br><i>(mencione o pedido aqui…)</i><br><br>Eis, aqui, ó Mãe do Perpétuo Socorro, aos vossos pés um miserável pecador, que a Vós recorre e em Vós confia. Ó Mãe de misericórdia, tende piedade de mim! Ouço que todos Vos chamam o Refúgio e a Esperança dos pecadores; logo então, sede Vós o meu refúgio e a minha esperança.<br><br>Por amor de Jesus Cristo, socorrei-me,<br>Dai a mão a um mísero(a) caído(a), que a Vós se entrega e recomenda.<br><br>Eu bendigo e rendo graças a Deus, por se ter dignado conceder-me esta confiança em Vós, que eu considero um penhor de minha salvação eterna. Ah! É mais do que certo que no passado, quando tive a desventura de cair, a Vós não recorri. Contudo, ó minha benigníssima Mãe, não me recuseis o Vosso socorro; pois sei que com ele serei vencedor. Sim, sei que vireis em meu socorro, se a Vós me recomendar; mas temo as ocasiões de pecar, receio deixar então de invocar o Vosso Auxílio, e deste modo perder-me. É esta a graça que peço, e Vos conjuro que me concedais; fazei, ó Maria, que a Vós recorra, em todos os assaltos que possam me conduzir ao inferno, e que eu possa dizer-Vos continuamente: Maria, ajudai-me! Mãe do Perpétuo Socorro. Não permitais que eu perca o meu Deus!<br><br><b>Pai Nosso 1x</b><br><b>Ave Maria 3x</b><br><br>Nossa Senhora, consoladora dos aflitos, ensinai-nos a consolar os que choram e a ser instrumentos da Vossa ternura para com os sofredores. Que possamos aliviar o peso dos outros com amor. Amém.<br><br><b>PEQUENA LADAINHA À N. SRA. DO PERPÉTUO SOCORRO:</b><br>• Saúde dos enfermos.<br><b>Rogai por nós.</b><br>• Auxílio dos Necessitados.<br><b>Rogai por nós.</b><br>• Consoladora dos aflitos.<br><b>Rogai por nós.</b><br>• Refúgio dos pecadores.<br><b>Rogai por nós.</b><br>• Padroeira da Família Excelsior.<br><b>Rogai por nós.</b><br>• Rainha dos apóstolos.<br><b>Enviai-nos muitas e santas vocações.</b><br><i>Rogai por nós, ó Mãe do Perpétuo Socorro.</i><br><b>Para que sejamos dignos das promessas de Cristo…</b><br><br><b>ORAÇÃO</b><br>Ó Deus fiel e misericordioso, que nos destes a graça de venerar a vossa bem aventurada Mãe, sob o título de Nossa Senhora do Perpétuo Socorro, concedei-nos que em todas as nossas necessidades, sejamos acompanhados pela proteção da Virgem Maria, e que, depois de nossa peregrinação nesta vida, alcancemos o prêmio da Redenção Eterna. Vós que viveis e reinais, por todos os séculos dos séculos. Amém!<br><br><b>CONSAGRAÇÃO À NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Santíssima Virgem Maria, Mãe de Deus, a quem tanto me apraz honrar sob o belo titulo de Mãe do Perpétuo Socorro, eu (dizer seu nome) ainda que indigno/a de ser o vosso servo, animado contudo pela vossa admirável bondade e entusiasmado pelo desejo de vos servir, vos escolho hoje em presença do meu anjo da guarda e de toda a côrte celeste, para minha Mãe, e tomo a firme resolução de vos amar e servir sempre daqui em diante, e fazer tudo o que me for possível para que sejais amada e servida também pelos outros.<br><br>Ó Mãe de Deus, minha boa e muito amável Mãe, pelo sangue do vosso Divino Filho, derramado por nosso amor, suplico-vos me recebais para sempre em o número dos vossas filhos e servos dedicados. Assisti-me em todos os meus pensamentos, palavras e ações, até ao fim da vida, de sorte que todos os meus passos e suspiros tenham por único fim dar maior glória a Deus; fazei, pela vossa poderosa intercessão, que eu não ofenda jamais o meu amadíssimo Jesus, mas O glorifique e ame. Fazei que vos ame também, ó minha Mãe queridíssima, a fim de que eu tenha um dia a felicidade de vos ter e amar no santo paraíso, por séculos dos séculos. Assim seja. Ó Maria, minha Mãe, recomendo-vos a minha alma, principalmente na hora da minha morte. Nossa Senhora do Perpétuo Socorro, rogai por nós!<br><br><b>ORAÇÃO PELA FAMÍLIA EXCELSIOR</b><br>Ó Mãe do Perpétuo Socorro, nós vos suplicamos, com toda a força do nosso coração, para que ampare cada membro da Família Excelsior. Que o Vosso olhar esteja sempre atento para cada ouvinte da Rede Excelsior de Comunicação. Pedimos de modo particular por aqueles que nos escutam enquanto se deslocam para o trabalho, nas suas atividades domésticas, nas atividades educativas, nos momentos de lazer, nos eventos culturais e esportivos. Permita-lhes receberem o Vosso cuidado materno, tal como o Menino Jesus em seus braços. Continua nos dando condições para levar a Voz do Senhor do Bonfim, vosso Filho amado, sobretudo, para todos aqueles que se encontram nos abrigos de idosos, leitos dos hospitais, nas madrugadas solitárias, nos contextos prisionais, e em toda e qualquer dificuldade. Sede para eles refúgio e esperança. Dai-lhes paz e proteção. Sabemos, ó Mãe do Perpétuo Socorro, o quão difícil é a manutenção desta obra da ação evangelizadora, por isto pedimos a sua poderosa intercessão junto a Deus, para que envie novos sócios-missionários para a Família Excelsior. Ajudai-nos nos caminhos da vida e sobretudo, Mãe, conduza-nos para o verdadeiro caminho que é teu Filho Jesus. Amém!<br><br><b>BÊNÇÃO COM O ÍCONE DE NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Ó Maria, Mãe do Perpétuo Socorro, abençoai o povo deste bairro, desta cidade e todos os vossos devotos. Protegei os pais, as mães, os jovens, os adolescentes, as crianças e os idosos. Restituí a saúde aos enfermos. Confortai os aflitos. Ajudai-nos a resolver os nossos problemas pessoais e familiares. Sede nossa Mãe do Perpétuo Socorro e dai-nos a vossa bênção.<br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b>",
        "<b>Dia 8</b><br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b><br><br>Ó Mãe do Perpétuo Socorro, eu vos ofereço esta novena, por intenção dos doentes, dos aflitos e atribulados, dos pobres pecadores, pelas necessidades da Igreja, por suas vocações sacerdotais, religiosas e leigas, por minha família, pelos membros da Família Excelsior e por minhas intenções particulares. Dignai-vos atender-me bondosamente. Amém!<br><br><i>(mencione o pedido aqui…)</i><br><br>Eis, aqui, ó Mãe do Perpétuo Socorro, aos vossos pés um miserável pecador, que a Vós recorre e em Vós confia. Ó Mãe de misericórdia, tende piedade de mim! Ouço que todos Vos chamam o Refúgio e a Esperança dos pecadores; logo então, sede Vós o meu refúgio e a minha esperança.<br><br>Por amor de Jesus Cristo, socorrei-me,<br>Dai a mão a um mísero(a) caído(a), que a Vós se entrega e recomenda.<br><br>Eu bendigo e rendo graças a Deus, por se ter dignado conceder-me esta confiança em Vós, que eu considero um penhor de minha salvação eterna. Ah! É mais do que certo que no passado, quando tive a desventura de cair, a Vós não recorri. Contudo, ó minha benigníssima Mãe, não me recuseis o Vosso socorro; pois sei que com ele serei vencedor. Sim, sei que vireis em meu socorro, se a Vós me recomendar; mas temo as ocasiões de pecar, receio deixar então de invocar o Vosso Auxílio, e deste modo perder-me. É esta a graça que peço, e Vos conjuro que me concedais; fazei, ó Maria, que a Vós recorra, em todos os assaltos que possam me conduzir ao inferno, e que eu possa dizer-Vos continuamente: Maria, ajudai-me! Mãe do Perpétuo Socorro. Não permitais que eu perca o meu Deus!<br><br><b>Pai Nosso 1x</b><br><b>Ave Maria 3x</b><br><br>Refúgio dos pecadores, intercedei por aqueles que estão afastados da graça de Deus. Que encontrem misericórdia, arrependimento sincero e novo começo. Amém.<br><br><b>PEQUENA LADAINHA À N. SRA. DO PERPÉTUO SOCORRO:</b><br>• Saúde dos enfermos.<br><b>Rogai por nós.</b><br>• Auxílio dos Necessitados.<br><b>Rogai por nós.</b><br>• Consoladora dos aflitos.<br><b>Rogai por nós.</b><br>• Refúgio dos pecadores.<br><b>Rogai por nós.</b><br>• Padroeira da Família Excelsior.<br><b>Rogai por nós.</b><br>• Rainha dos apóstolos.<br><b>Enviai-nos muitas e santas vocações.</b><br><i>Rogai por nós, ó Mãe do Perpétuo Socorro.</i><br><b>Para que sejamos dignos das promessas de Cristo…</b><br><br><b>ORAÇÃO</b><br>Ó Deus fiel e misericordioso, que nos destes a graça de venerar a vossa bem aventurada Mãe, sob o título de Nossa Senhora do Perpétuo Socorro, concedei-nos que em todas as nossas necessidades, sejamos acompanhados pela proteção da Virgem Maria, e que, depois de nossa peregrinação nesta vida, alcancemos o prêmio da Redenção Eterna. Vós que viveis e reinais, por todos os séculos dos séculos. Amém!<br><br><b>CONSAGRAÇÃO À NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Santíssima Virgem Maria, Mãe de Deus, a quem tanto me apraz honrar sob o belo titulo de Mãe do Perpétuo Socorro, eu (dizer seu nome) ainda que indigno/a de ser o vosso servo, animado contudo pela vossa admirável bondade e entusiasmado pelo desejo de vos servir, vos escolho hoje em presença do meu anjo da guarda e de toda a côrte celeste, para minha Mãe, e tomo a firme resolução de vos amar e servir sempre daqui em diante, e fazer tudo o que me for possível para que sejais amada e servida também pelos outros.<br><br>Ó Mãe de Deus, minha boa e muito amável Mãe, pelo sangue do vosso Divino Filho, derramado por nosso amor, suplico-vos me recebais para sempre em o número dos vossas filhos e servos dedicados. Assisti-me em todos os meus pensamentos, palavras e ações, até ao fim da vida, de sorte que todos os meus passos e suspiros tenham por único fim dar maior glória a Deus; fazei, pela vossa poderosa intercessão, que eu não ofenda jamais o meu amadíssimo Jesus, mas O glorifique e ame. Fazei que vos ame também, ó minha Mãe queridíssima, a fim de que eu tenha um dia a felicidade de vos ter e amar no santo paraíso, por séculos dos séculos. Assim seja. Ó Maria, minha Mãe, recomendo-vos a minha alma, principalmente na hora da minha morte. Nossa Senhora do Perpétuo Socorro, rogai por nós!<br><br><b>ORAÇÃO PELA FAMÍLIA EXCELSIOR</b><br>Ó Mãe do Perpétuo Socorro, nós vos suplicamos, com toda a força do nosso coração, para que ampare cada membro da Família Excelsior. Que o Vosso olhar esteja sempre atento para cada ouvinte da Rede Excelsior de Comunicação. Pedimos de modo particular por aqueles que nos escutam enquanto se deslocam para o trabalho, nas suas atividades domésticas, nas atividades educativas, nos momentos de lazer, nos eventos culturais e esportivos. Permita-lhes receberem o Vosso cuidado materno, tal como o Menino Jesus em seus braços. Continua nos dando condições para levar a Voz do Senhor do Bonfim, vosso Filho amado, sobretudo, para todos aqueles que se encontram nos abrigos de idosos, leitos dos hospitais, nas madrugadas solitárias, nos contextos prisionais, e em toda e qualquer dificuldade. Sede para eles refúgio e esperança. Dai-lhes paz e proteção. Sabemos, ó Mãe do Perpétuo Socorro, o quão difícil é a manutenção desta obra da ação evangelizadora, por isto pedimos a sua poderosa intercessão junto a Deus, para que envie novos sócios-missionários para a Família Excelsior. Ajudai-nos nos caminhos da vida e sobretudo, Mãe, conduza-nos para o verdadeiro caminho que é teu Filho Jesus. Amém!<br><br><b>BÊNÇÃO COM O ÍCONE DE NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Ó Maria, Mãe do Perpétuo Socorro, abençoai o povo deste bairro, desta cidade e todos os vossos devotos. Protegei os pais, as mães, os jovens, os adolescentes, as crianças e os idosos. Restituí a saúde aos enfermos. Confortai os aflitos. Ajudai-nos a resolver os nossos problemas pessoais e familiares. Sede nossa Mãe do Perpétuo Socorro e dai-nos a vossa bênção.<br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b>",
        "<b>Dia 9</b><br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b><br><br>Ó Mãe do Perpétuo Socorro, eu vos ofereço esta novena, por intenção dos doentes, dos aflitos e atribulados, dos pobres pecadores, pelas necessidades da Igreja, por suas vocações sacerdotais, religiosas e leigas, por minha família, pelos membros da Família Excelsior e por minhas intenções particulares. Dignai-vos atender-me bondosamente. Amém!<br><br><i>(mencione o pedido aqui…)</i><br><br>Eis, aqui, ó Mãe do Perpétuo Socorro, aos vossos pés um miserável pecador, que a Vós recorre e em Vós confia. Ó Mãe de misericórdia, tende piedade de mim! Ouço que todos Vos chamam o Refúgio e a Esperança dos pecadores; logo então, sede Vós o meu refúgio e a minha esperança.<br><br>Por amor de Jesus Cristo, socorrei-me,<br>Dai a mão a um mísero(a) caído(a), que a Vós se entrega e recomenda.<br><br>Eu bendigo e rendo graças a Deus, por se ter dignado conceder-me esta confiança em Vós, que eu considero um penhor de minha salvação eterna. Ah! É mais do que certo que no passado, quando tive a desventura de cair, a Vós não recorri. Contudo, ó minha benigníssima Mãe, não me recuseis o Vosso socorro; pois sei que com ele serei vencedor. Sim, sei que vireis em meu socorro, se a Vós me recomendar; mas temo as ocasiões de pecar, receio deixar então de invocar o Vosso Auxílio, e deste modo perder-me. É esta a graça que peço, e Vos conjuro que me concedais; fazei, ó Maria, que a Vós recorra, em todos os assaltos que possam me conduzir ao inferno, e que eu possa dizer-Vos continuamente: Maria, ajudai-me! Mãe do Perpétuo Socorro. Não permitais que eu perca o meu Deus!<br><br><b>Pai Nosso 1x</b><br><b>Ave Maria 3x</b><br><br>Ó Mãe do Perpétuo Socorro, ao terminar esta novena, confio-me inteiramente a vós. Alcançai para mim e para os meus pedidos a misericórdia e a graça que tanto precisamos, se for para a glória de Deus. Amém.<br><br><b>PEQUENA LADAINHA À N. SRA. DO PERPÉTUO SOCORRO:</b><br>• Saúde dos enfermos.<br><b>Rogai por nós.</b><br>• Auxílio dos Necessitados.<br><b>Rogai por nós.</b><br>• Consoladora dos aflitos.<br><b>Rogai por nós.</b><br>• Refúgio dos pecadores.<br><b>Rogai por nós.</b><br>• Padroeira da Família Excelsior.<br><b>Rogai por nós.</b><br>• Rainha dos apóstolos.<br><b>Enviai-nos muitas e santas vocações.</b><br><i>Rogai por nós, ó Mãe do Perpétuo Socorro.</i><br><b>Para que sejamos dignos das promessas de Cristo…</b><br><br><b>ORAÇÃO</b><br>Ó Deus fiel e misericordioso, que nos destes a graça de venerar a vossa bem aventurada Mãe, sob o título de Nossa Senhora do Perpétuo Socorro, concedei-nos que em todas as nossas necessidades, sejamos acompanhados pela proteção da Virgem Maria, e que, depois de nossa peregrinação nesta vida, alcancemos o prêmio da Redenção Eterna. Vós que viveis e reinais, por todos os séculos dos séculos. Amém!<br><br><b>CONSAGRAÇÃO À NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Santíssima Virgem Maria, Mãe de Deus, a quem tanto me apraz honrar sob o belo titulo de Mãe do Perpétuo Socorro, eu (dizer seu nome) ainda que indigno/a de ser o vosso servo, animado contudo pela vossa admirável bondade e entusiasmado pelo desejo de vos servir, vos escolho hoje em presença do meu anjo da guarda e de toda a côrte celeste, para minha Mãe, e tomo a firme resolução de vos amar e servir sempre daqui em diante, e fazer tudo o que me for possível para que sejais amada e servida também pelos outros.<br><br>Ó Mãe de Deus, minha boa e muito amável Mãe, pelo sangue do vosso Divino Filho, derramado por nosso amor, suplico-vos me recebais para sempre em o número dos vossas filhos e servos dedicados. Assisti-me em todos os meus pensamentos, palavras e ações, até ao fim da vida, de sorte que todos os meus passos e suspiros tenham por único fim dar maior glória a Deus; fazei, pela vossa poderosa intercessão, que eu não ofenda jamais o meu amadíssimo Jesus, mas O glorifique e ame. Fazei que vos ame também, ó minha Mãe queridíssima, a fim de que eu tenha um dia a felicidade de vos ter e amar no santo paraíso, por séculos dos séculos. Assim seja. Ó Maria, minha Mãe, recomendo-vos a minha alma, principalmente na hora da minha morte. Nossa Senhora do Perpétuo Socorro, rogai por nós!<br><br><b>ORAÇÃO PELA FAMÍLIA EXCELSIOR</b><br>Ó Mãe do Perpétuo Socorro, nós vos suplicamos, com toda a força do nosso coração, para que ampare cada membro da Família Excelsior. Que o Vosso olhar esteja sempre atento para cada ouvinte da Rede Excelsior de Comunicação. Pedimos de modo particular por aqueles que nos escutam enquanto se deslocam para o trabalho, nas suas atividades domésticas, nas atividades educativas, nos momentos de lazer, nos eventos culturais e esportivos. Permita-lhes receberem o Vosso cuidado materno, tal como o Menino Jesus em seus braços. Continua nos dando condições para levar a Voz do Senhor do Bonfim, vosso Filho amado, sobretudo, para todos aqueles que se encontram nos abrigos de idosos, leitos dos hospitais, nas madrugadas solitárias, nos contextos prisionais, e em toda e qualquer dificuldade. Sede para eles refúgio e esperança. Dai-lhes paz e proteção. Sabemos, ó Mãe do Perpétuo Socorro, o quão difícil é a manutenção desta obra da ação evangelizadora, por isto pedimos a sua poderosa intercessão junto a Deus, para que envie novos sócios-missionários para a Família Excelsior. Ajudai-nos nos caminhos da vida e sobretudo, Mãe, conduza-nos para o verdadeiro caminho que é teu Filho Jesus. Amém!<br><br><b>BÊNÇÃO COM O ÍCONE DE NOSSA SENHORA DO PERPÉTUO SOCORRO</b><br>Ó Maria, Mãe do Perpétuo Socorro, abençoai o povo deste bairro, desta cidade e todos os vossos devotos. Protegei os pais, as mães, os jovens, os adolescentes, as crianças e os idosos. Restituí a saúde aos enfermos. Confortai os aflitos. Ajudai-nos a resolver os nossos problemas pessoais e familiares. Sede nossa Mãe do Perpétuo Socorro e dai-nos a vossa bênção.<br><br><i>Em nome do Pai, do Filho e do Espírito Santo.</i><br><b>Amém.</b>"
    ]
};

export default function DevocoensScreen() {
    const scrollViewRef = useRef<ScrollView>(null);
    const [sectionLayouts, setSectionLayouts] = useState<Record<string, number>>({});
    const [menuVisible, setMenuVisible] = useState(false);

    const handleSectionLayout = (sectionName: string, event: LayoutChangeEvent) => {
        const { y } = event.nativeEvent.layout;
        setSectionLayouts(prev => ({ ...prev, [sectionName]: y }));
    };

    const scrollToSection = (sectionName: string) => {
        setMenuVisible(false);
        const y = sectionLayouts[sectionName];
        if (y !== undefined && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y, animated: true });
        }
    };

    const sectionsList = [
        'O Terço (PT)',
        'O Terço (TET)',
        'O Terço da Misericórdia (PT)',
        'Terço da Misericórdia (TET)',
        'Via-Sacra',
        'Oração a Santa Rita de Cássia',
        'Novena a Santa Rita de Cássia',
        'Novena a Nossa Senhora do Perpétuo Socorro'
    ];
    const renderFormattedText = (text: string) => {
        const regex = /(<b>.*?<\/b>|<i>.*?<\/i>|\n|Mistérios Gozosos \(2\.ªs e Sáb\.\):|Mistérios Luminosos \(5\.ªs\):|Mistérios Dolorosos \(3\.ªs e 6\.ªs\):|Mistérios Gloriosos \(4\.ªs, e Dom\.\):)/g;
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (!part) return null;
            if (part === '\n') {
                return <Text key={index}>{'\n'}</Text>;
            }
            if (part.startsWith('<b>') && part.endsWith('</b>')) {
                return <Text key={index} style={{ fontWeight: 'bold' }}>{part.replace(/<\/?b>/g, '')}</Text>;
            }
            if (part.startsWith('<i>') && part.endsWith('</i>')) {
                return <Text key={index} style={{ fontStyle: 'italic' }}>{part.replace(/<\/?i>/g, '')}</Text>;
            }
            if (['Mistérios Gozosos (2.ªs e Sáb.):', 'Mistérios Luminosos (5.ªs):', 'Mistérios Dolorosos (3.ªs e 6.ªs):', 'Mistérios Gloriosos (4.ªs, e Dom.):'].includes(part)) {
                return <Text key={index} style={{ fontWeight: 'bold', color: '#9b111e', fontSize: 16 }}>{part}</Text>;
            }
            return <Text key={index}>{part}</Text>;
        });
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.hamburgerButton}>
                    <Text style={styles.hamburgerText}>☰</Text>
                </TouchableOpacity>
            </View>
            <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.pageTitle}>Devoções</Text>

                <View style={styles.section} onLayout={(e) => handleSectionLayout('O Terço (PT)', e)}>
                    <Text style={styles.sectionTitle}>O Terço (PT)</Text>
                    <Image
                        source={require('../../assets/images/prayers/tersu.png')}
                        style={styles.tercoImage}
                    />
                    <View style={styles.article}>
                        <Text style={styles.itemTitle}>{oTercoData[0].title || oTercoData[0].label}</Text>
                        <Text style={styles.text}>{renderFormattedText(oTercoData[0].content)}</Text>
                    </View>
                </View>

                <View style={styles.section} onLayout={(e) => handleSectionLayout('O Terço (TET)', e)}>
                    <Text style={styles.sectionTitle}>O Terço (TET)</Text>
                    <Image
                        source={require('../../assets/images/prayers/tersu.png')}
                        style={styles.tercoImage}
                    />
                    <View style={styles.article}>
                        <Text style={styles.itemTitle}>{oTercoData[1].title || oTercoData[1].label}</Text>
                        <Text style={styles.text}>{renderFormattedText(oTercoData[1].content)}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.article}>
                        <Text style={styles.itemTitle}>{oTercoData[2].title || oTercoData[2].label}</Text>
                        <Text style={styles.text}>{renderFormattedText(oTercoData[2].content)}</Text>
                    </View>
                </View>

                <View style={styles.section} onLayout={(e) => handleSectionLayout('O Terço da Misericórdia (PT)', e)}>
                    <Text style={styles.sectionTitle}>{tercoMisericordiaData.title}</Text>
                    <Image
                        source={tercoMisericordiaData.image}
                        style={styles.tercoImage}
                    />
                    <View style={styles.article}>
                        <Text style={styles.text}>{renderFormattedText(tercoMisericordiaData.content)}</Text>
                    </View>
                </View>

                <View style={styles.section} onLayout={(e) => handleSectionLayout('Terço da Misericórdia (TET)', e)}>
                    <Text style={styles.sectionTitle}>{tercoMisericordiaTetumData.title}</Text>
                    <Image
                        source={tercoMisericordiaTetumData.image as any}
                        style={styles.tercoImage}
                    />
                    {tercoMisericordiaTetumData.sections.map((section, sIdx) => (
                        <View key={section.id || sIdx} style={styles.article}>
                            <Text style={styles.itemTitle}>{section.title}</Text>
                            {section.content.map((item: any, cIdx) => {
                                if (item.type === 'subtitle') {
                                    return <Text key={cIdx} style={[styles.itemTitle, { marginTop: 8, color: '#4b2e1f' }]}>{item.text}</Text>;
                                }
                                if (item.type === 'paragraph') {
                                    return (
                                        <Text key={cIdx} style={[styles.text, item.italic && { fontStyle: 'italic' }, { marginBottom: 8 }]}>
                                            {item.text}
                                        </Text>
                                    );
                                }
                                if (item.type === 'label') {
                                    return <Text key={cIdx} style={[styles.rubric, { marginTop: 4 }]}>{item.text}</Text>;
                                }
                                return null;
                            })}
                        </View>
                    ))}
                </View>

                <View style={styles.section} onLayout={(e) => handleSectionLayout('Via-Sacra', e)}>
                    <Text style={styles.sectionTitle}>{bvsData['Breve Via-Sacra'].section}</Text>
                    <Text style={styles.itemTitle}>{bvsData['Breve Via-Sacra'].title}</Text>

                    {bvsData['Breve Via-Sacra'].pages.map((page, index) => (
                        <View key={index} style={styles.estacaoContainer}>
                            <Image
                                source={estacoesImages[index]}
                                style={styles.estacaoImage}
                            />
                            <View style={styles.estacaoTextContainer}>
                                <Text style={styles.text}>{renderFormattedText(page)}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section} onLayout={(e) => handleSectionLayout('Oração a Santa Rita de Cássia', e)}>
                    <Text style={styles.sectionTitle}>{oracaoSantaRitaData.section}</Text>
                    <Image
                        source={oracaoSantaRitaData.image}
                        style={styles.tercoImage}
                    />
                    {oracaoSantaRitaData.pages.map((page, index) => (
                        <View key={`oracao-${index}`} style={styles.article}>
                            <Text style={styles.text}>{renderFormattedText(page.replace(/<br>/g, '\n'))}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section} onLayout={(e) => handleSectionLayout('Novena a Santa Rita de Cássia', e)}>
                    <Text style={styles.sectionTitle}>{novenaSantaRitaData.section}</Text>
                    <Image
                        source={novenaSantaRitaData.image}
                        style={styles.tercoImage}
                    />
                    {novenaSantaRitaData.pages.map((page, index) => (
                        <View key={`novena-${index}`} style={styles.article}>
                            <Text style={styles.text}>{renderFormattedText(page.replace(/<br>/g, '\n'))}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section} onLayout={(e) => handleSectionLayout('Novena a Nossa Senhora do Perpétuo Socorro', e)}>
                    <Text style={styles.sectionTitle}>{novenaNspsData.section}</Text>
                    <Image
                        source={novenaNspsData.image}
                        style={styles.tercoImage}
                    />
                    {novenaNspsData.pages.map((page, index) => (
                        <View key={`nsps-${index}`} style={styles.article}>
                            <Text style={styles.text}>{renderFormattedText(page.replace(/<br>/g, '\n'))}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <Modal visible={menuVisible} animationType="fade" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Índice</Text>
                        <ScrollView>
                            {sectionsList.map(sectionName => (
                                <TouchableOpacity key={sectionName} onPress={() => scrollToSection(sectionName)} style={styles.modalItem}>
                                    <Text style={styles.modalItemText}>{sectionName}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#f7f2e8",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: "#f7f2e8",
        borderBottomWidth: 1,
        borderBottomColor: "#ead9cf",
    },
    hamburgerButton: {
        padding: 8,
    },
    hamburgerText: {
        fontSize: 28,
        color: "#4b2e1f",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        maxHeight: "80%",
        backgroundColor: "#f7f2e8",
        borderRadius: 12,
        padding: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#4b2e1f",
        marginBottom: 16,
        textAlign: "center",
    },
    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ead9cf",
    },
    modalItemText: {
        fontSize: 18,
        color: "#c1121f",
        fontWeight: "600",
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 12,
        backgroundColor: "#9b111e",
        borderRadius: 8,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    container: {
        flex: 1,
        backgroundColor: "#f7f2e8",
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#4b2e1f",
        textAlign: "center",
        marginBottom: 18,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#c1121f",
        marginBottom: 10,
    },
    article: {
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ead9cf",
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#9b111e",
        marginBottom: 4,
    },
    rubric: {
        fontSize: 15,
        fontStyle: 'italic',
        color: '#6b4f3a',
        marginBottom: 6,
    },
    text: {
        fontSize: 16,
        color: "#2b2b2b",
        lineHeight: 25,
        textAlign: "justify",
    },
    tercoImage: {
        width: '100%',
        height: 220,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 16,
        borderRadius: 8,
    },
    estacaoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
        backgroundColor: 'transparent',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ead9cf",
    },
    estacaoImage: {
        width: 60,
        height: 60,
        marginRight: 12,
        borderRadius: 4,
    },
    estacaoTextContainer: {
        flex: 1,
    }
});
