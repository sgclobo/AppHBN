import React, { useRef, useState } from "react";
import { LayoutChangeEvent, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PrayerItem = {
    id?: string;
    title?: string;
    section?: string;
    label?: string;
    rubric?: string;
    source?: string;
    content?: string;
    pages?: string[];
    has_image?: boolean;
    image_description?: string;
    type?: string;
    number?: number;
};

const prayers: Record<string, PrayerItem> = {
    "Tamba Sinal": {
        "id": "tamba_sinal",
        "label": "Tamba Sinal",
        "content": "† Tamba sinal santa Kruz Na’i Maromak hasai ami hosi buat aat hotu.\n† Hodi Padre, hodi Filho, hodi Espiritu Santu nia naran. <b>Amen.</b>",
        "has_image": true,
        "image_description": "Cruz"
    },
    "Graças e Louvores": {
        "id": "gracas_e_louvores",
        "label": "Graças e Louvores",
        "content": `Graças e louvores sejam dados a todo o momento, ao Santíssimo e Santíssimo Sacramento.`
    },
    "Ami Aman": {
        "id": "ami_aman",
        "label": "Ami Aman",
        "content": "Ami Aman, be iha lalehan,\nhalo ami hahí-hana’i Ita naran\nhalo Ita nia reinu to’o mai ami;\nIta nia hakarak halo tuir ba\niha rai nu’udar iha lalehan.\n<i>Ohin ne’e haraik ai-han lor-loron nian mai ami;\nharaik perdaun mai ami salan,\nnu’udar ami perdua ema halo a'at ami;\nlabele husik ami monu ba tentasaun;\nmaibé hasai ami hosi a'at.</i>\n<b>Amen.</b>"
    },
    "Ave-Maria": {
        "id": "ave_maria",
        "label": "Ave-Maria",
        "content": "AVE MARIA grasa barak liu iha ita boot,\n Maromak ho ita boot,\n ita boot diak liu feto hotu-hotu \nita boot nia Oan Jesus diak liu.\n<i>SANTA MARIA Maromak Nia inan\n harohan ba Nain Maromk\n tamba ami ata nia sala\n oras ne no oras ne’ebe ami ata besik atu mate.</i>\n<b>AMEN.</b>"
    },
    "Glória": {
        "id": "gloria",
        "label": "Glória",
        "content": "Glória ba Padre, ba Filho no ba Espíritu Santo,\n<i>Nudar hori uluk, oras ne'e,\ntinan ba tinan  tinan nafatin,\n</i><b>Amen.</b>"
    },
    "Credo": {
        "id": "credo",
        "label": "Kredo",
        "content": "Ha’u fiar Na\’i Maromak\nPadre bele halo hotu-hotu,\nhalo ona lalehan ho rai.\nHa’u fiar Jesus Cristo Padre Eterno nia oan mesak Ita Nain,\nNia moris hahu-An husi Maria Virgem tamba Espirito Santo.\nNia terus iha Ponciu Pilatus nia ukun, ema hedi Nia ba Crúz,\nNia mate tiha, ema hakoi Nia\ntun ba limbu liu loron tolu Nia moris fali,\nsa’e ba lalehan tur iha Padre Eterno Nia sorin kuana,\nloron ida sei tun mai fali\natu halo justisa ba ema di’ak ho ema a’at.\nHa’u fiar Espirito Santo, Santa Igreja Katolika\nho Santo sira tulun malu.\nHa\’u fiar Jesus Cristo atu haraik perdaun ba ema sala.\nEma hotu-hotu sei moris fali,\nema di’ak sei ba lalehan ema a\’at sei ba inferno nafatin.\n<b>Amen</b>"
    },
    "Salve-Rainha": {
        "id": "salve_rainha",
        "section": "Orasoens",
        "label": "Salve Liurai Feto",
        "content": "Salve Liurai Feto, Inan hanoin ami, ami nia rahun diak, ami nia esperansa, salve. Ami ata Eva nia oan des- terradu, hasa'e ami nia lia ba Ita Boot; hodi tanis ami husu deit Ita Boot tulun ami ata iha tanis fatin ne'e. Ne'e duni, ami nia Advogada, fila mai ami ata Ita Boot nia matan diak. Desterro ne'e hotu, hatudu mai ami ata Itaboot nia Oan benti Jesus. Ou clemente, ou piedoza, ou doce virjen nafatin Maria.\n<b>Maromak nia Inan Santa harohan mai ami</b>\n<i>Ami atu bele hetan Jesus Kristu nia rahun diak.</i>\n<b>𝐀𝐦𝐞𝐧</b>"
    },
    "Ba Anju Hein Ita": {
        "id": "ba_anju_hein_ita",
        "label": "Orasaun ba Anju hein Ita",
        "content": "Na’i Maromak nia Anju Santu, hein didiak ha’u.\nUkun ha’u nafatin,\nhalo ha’u tuir diak deit\ntanba Na’i Maromak rasik mak entrega ha’u\niha ita boot nia liman.\n<b>Amen.</b>",
        "has_image": true,
        "image_description": "Anju"
    },
    "Ba Amo Papa": {
        "id": "orasaun_ba_amo_papa",
        "label": "Orasaun ba Amo Papa",
        "content": "Ita harohan ba ita nia Amo Papa, Leão XIV.\nNa’i haraik isin diak ba nia, hametin no tahan nia.\n<b>Orasaun:</b>\nMaromak sarani hotu nia Bibi atan no mata dalan; hateke ho laran diak ba ita atan, Amo Papa Leão XIV, nebe Ita Boot mak fihir nudar Ita Kreda nia Bibi atan. Haraik atu povu nebe nia ukun simu didiak nia liafuan no esemplu sira, atu nune’e, nia bele to’o moris rohan laek hamutuk ho bibi luhan tomak nebe Ita Boot hameno ba nia. Ami harohan ne’e hodi ami Na’i Jesus Kristu hamutuk ho Espiritu Santu.\n<b>Amen.</b>",
    },

    "Pelas Almas do Purgatório": {
        "id": "pelas_almas_purgatorio",
        "section": "Orasoens",
        "label": "Ba klamar sira iha Purgatório",
        "content": "Na’i Maromak, fo sira hetan rahun diak nafatin.\nHalo Ita Boot nia naroman leno sira nafatin.\nHalo sira descansa ho paz.\n<b>Amen.</b>\n<i>Dai-lhes, Senhor, o eterno descanso;</i>\n<b>entre os resplendores da luz perpétua,</b>\n<i>descansem em Paz.</i>\n<b>Amen.</b>"
    },
    "Orasaun Dader": {
        "id": "orasaun_dader",
        "section": "Orasaun Dader Nian",
        "content": "Ha’u nia Maromak, ha’u adora Ita boot, ha’u hadomi Ita Boot, ho ha’u nia laran tomak. Ha’u agradese Ita Boot tanba Ita Boot mak halo ha’u moris, halo ha’u sarani, halo ha’u deskansa iha kalan ida ne’e. Buat hot-hotu ha’u halo iha loron ne’e ha’u hasa’e ba Ita Boot. Na’i Maromak halo ha’u moris ohin ne’e hodi tuir deit Ita Boot nia hakarak, hodi buka deit Ita Boot nia gloria. Dada ha’u sai hosi sala no hosi buat aat hotu. Haraik Ita Boot nia grasa ho Ita Boot nia bensa mai ha’u, ba ha’u nia parente sira no ba ema hot-hotu.\n<b>Amen.</b>"
    },
    "Na’i, ha’u nia Maromak": {
        "id": "nai_hau_nia_maromak",
        "section": "Nai Hau nia Maromak",
        "content": "Na’i, ha’u nia Maromak, ha’u fiar, ha’u adora, ha’u hein, ha’u hadomi Ita Boot. Ha’u husu perdua ba ema sira nebe la fiar, la adora, la hein, la hadomi Ita Boot."
    },
    "Aktu de Kontrisaun": {
        "title": "Aktu de Kontrisaun",
        "section": "Orasoens",
        "label": "Aktu de Kontrisaun",
        "content":
            "Ha’u nia Maromak, ha’u hanoin ho laran moras sala hot-hotu ha’u halo ona kontra Ita Boot diak liu, nebe halo diak deit mai ha’u. Ha’u hasa’e lialos ba Ita Boot, hodi Ita Boot nia grasa, lakohi sala tan. Ha’u husu barak Ita Boot perdua ha’u, tanba Ita Boot laran diak ho tanba ha’u nia Na’i Jesus Kristu terus to’o mate tanba ha’u."
    },
    "Aktu de Fé, Esperansa no Karidade": {
        "title": "Aktu de Fé, Esperansa no Karidade",
        "section": "Orasoens",
        "label": "Aktu de Fé, Esperansa no Karidade",
        "content":
            "Ha’u nia Maromak, ha’u fiar no hein metin Ita Boot, ha’u hadomi Ita Boot liu sasan hot-hotu no hadomi maun alin sira nudar ha’u an rasik tanba Ita Boot."
    },
    "Orasaun Atu husu Vokasaun": {
        "title": "Orasaun Atu husu Vokasaun",
        "section": "Orasoens",
        "label": "Orasaun Atu husu Vokasaun",
        "content":
            "Jesus futar Fuan iha Eukaristia, Nailulik boot rohan laek: tanba Ita Boot nia domin laran luak, ami husu atu tulun familia sai santu; nune’e, hanesan viveiro diak ida, bele naburas vokasaun barak ba Ita nia Kreda. Haraik mos nailulik barak mai ami, nailulik sira nakonu ho Ita Boot nia Espiritu, manas ho Ita Boot nia Karidade atu buka deit Ita Boot nia reinu iha rai ne’e no Ita Boot nia gloria iha Lalehan.\n<b>Oh Jesus, Maksoin mundu nian.</b>\n<i>Haraik santidade ba ita nia nailulik sira.</i>\n<b>Oh Maria, Klero nia Liurai Feto.</b>\n<i>Haraik nailulik barak no santu ba Ita nia Kreda.</i>"
    },
    "Oferecimento das Obras do Dia": {
        "id": "meu_deus_creio",
        "section": "Orasoens da Manhã",
        "label": "Oferecimento das Obras do Dia",
        "content": "Ofereço-Vos, ó meu Deus, em união com o Santíssimo Coração de Jesus e por meio do Coração Imaculado de Maria, as orações, os trabalhos, as alegrias e os sofrimentos deste dia, em reparação de todas as ofensas e por todas as intenções, pelas quais o mesmo divino Coração está continuamente intercedendo e sacrificando-se nos nossos altares.\n\nTudo por Vós, Sagrado Coração de Jesus."
    },
    "Vinde Santo Espírito": {
        "id": "vinde_santo_espirito",
        "title": "Ao Espírito Santo",
        "section": "Durante o Dia",
        "label": "Ao Espírito Santo",
        "type": "hymn",
        "content": "Vinde Santo Espírito, vinde amor ardente, acendei na terra vossa luz fulgente.\nVinde, Pai dos pobres: na dor e aflições,\nvinde encher de gozo nossos corações.\nBenfeitor supremo em todo o momento, habitando em nós, sois o nosso alento.\nDescanso na luta e na paz encanto, no calor sois brisa, conforto no pranto.\nLuz de santidade, que no céu ardeis: abrasai as almas dos vossos fiéis.\nSem a vossa força e favor clemente, ada há no homem que seja inocente.\nLavai nossas manchas, a aridez regai, sarai os enfermos e a todos salvai.\nVossos sete dons concedei à alma do que em Vós confia:\nVirtude na vida, amparo na morte,no céu alegria. Amen."
    },
    "Consagração a N.ª Senhora": {
        "id": "consagracao_nossa_senhora",
        "section": "Orasoens da Manhã",
        "label": "Consagração a N.ª Senhora",
        "content": "Ó Senhora minha, ó minha Mãe, eu me ofereço todo a Vós e em prova da minha devoção para convosco, Vos consagro neste dia, os meus olhos, os meus ouvidos, a minha boca, o meu coração e inteiramente todo o meu ser; e porque assim sou vosso, ó incomparável Mãe, guardai-me e defendei-me como coisa e propriedade vossa. Lembrai-Vos que Vos pertenço, terna Mãe, Senhora nossa. Ah! Guardai-me e defendei-me como coisa própria vossa."
    },
    "Três Ave-Marias (Manhã)": {
        "id": "tres_ave_marias_manha",
        "section": "Orasoens da Manhã",
        "label": "Três Ave-Marias",
        "content": "Ó Maria, minha boa Mãe, livrai-me do pecado mortal durante este dia, pelo Poder que Vos concedeu o Eterno Pai. Ave-Maria...\n\nÓ Maria, minha boa Mãe, livrai-me do pecado mortal, pela Sabedoria que Vos concedeu o Filho. Ave-Maria...\n\nÓ Maria, minha boa Mãe, livrai-me do pecado mortal, pelo Amor que Vos concedeu o Espírito Santo. Ave-Maria..."
    },
    "Lembrai-Vos": {
        "id": "lembrai_vos",
        "section": "Orasoens da Manhã",
        "label": "Lembrai-Vos",
        "content": "Lembrai-Vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que, tendo recorrido à vossa protecção, implorado a vossa assistência e reclamado o vosso socorro, fosse por Vós desamparado. Animado eu, pois, com igual confiança, a Vós, Virgem entre todas singular, como a Mãe recorro, de Vós me valho, e, gemendo sob o peso dos meus pecados, me prostro a vossos pés. Não desprezeis as minhas súplicas, ó Mãe do Filho de Deus humanado, mas dignai-Vos de as ouvir propícia e de me alcançar o que Vos rogo. Amen.\n\nÀ vossa protecção recorremos, Santa Mãe de Deus, não desprezeis as nossas súplicas em nossas necessidades, mas livrai-nos de todos os perigos, ó Virgem gloriosa e bendita!"
    },
    "A S. José": {
        "id": "a_sao_jose",
        "label": "A S. José",
        "content": "Ó glorioso S. José, Pai e protector das almas virgens; guarda fiel a quem Deus confiou Jesus, a mesma inocência, e Maria, a Virgem das Virgens; por estes dois caríssimos penhores instantemente Vos peço e suplico, façais que eu, livre de toda a mancha, com espírito, coração e corpo ilibados, sirva sempre a Jesus e Maria em perfeita castidade. Amen."
    },
    "Angelus": {
        "id": "angelus",
        "title": "Angelus",
        "content": "V/<i>Nai Maromak nia Anju hodi Na’i Maromak nia lian ba Maria</i>\nR/<b>Nia kous dadaun tamba Espiritu Santu nia grasa</b>/n<b>Ave Maria...</b>\nV/<i>Hau nee Nai Maromak nia atan deit</i>\nR/<b>atu halo tuir duni ita boot nia lia</b>\n<b>Ave Maria...</b>\nV/<i>Maromak Filho halo an ba mane</i>\nR/<b>Nia mai moris duni hamutuk ho ita</b>\n<b>Ave Maria...</b>\nV/<i>Maromak nia Inan Santa, harohan mai ami ata</i>\nR/<b>ami atu bele hetan Jesus Kristu nia rahun diak</b>\n\n<b>Orasaun:</b>\nNai Maromak, ami ata husu ba ita boot atu haraik ita boot nia grasa mai ami nia klamar. Tuir anjo nia lian ami hatene lolos katak ita boot nia Oan halo an ba Mane. Tan nia terus too mate iha kruz, ami harohan ba ita boot, halo ami ata moris fali atu ba iha lalehan. Ami husu nee tamba ami nia Nai Jesus Kristu.\n<b>Amen</b>"
    },
    "Iha Tempu Paskoa — Regina Caeli": {
        "id": "regina_caeli",
        "label": "Regina Caeli",
        "rubric": "<i>Hahu tempu Paskoa too festa Espiritu Santu:</i>",
        "content": "V/<i>Liurai Feto lalehan, Ita Boot neon kontente, aleluia!</i>\nR/<b>Tanba Oan Ita Boot kous, aleluia.</b>\nV/<i>Moris fali nudar Nia uluk hateten, aleluia!</i>\nR/<b>Harohan Na’i Maromak mai ami, aleluia.</b>\nV/<b>Oh Virjem Maria, Ita Boot bele ona kontente teb-tebes, aleluia!</b>\nR/<i>Tanba ami na'i Na'i moris fali lolos, aleluia!</i>\n\n<b>Orasaun:</b>\nNa'i Maromak, Ita boot halo ema hot-hotu kontente tanba Ita Boot nia Oan, ami Na'i Jesus Kristu, moris fali duni; tan nia Inan Virjem Maria, halo ami hetan rahun diak nafatin iha lalehan. Ami husu ne’e tamba ami Na'i Jesus Kristu.\n<b>Amen.</b>"
    },
    "Às Refeições": {
        "id": "as_refeicoes",
        "section": "Durante o Dia",
        "label": "Refeições",
        "content": "<i>Antes:</i>\nAbençoai, Senhor, o alimento que vamos tomar para melhor Vos servir e amar. † Amen.\n\n<i>Depois:</i>\nDou-Vos graças, meu Deus, pelo alimento que me destes, sem eu merecer. † Amen."
    },
    "No Trabalho": {
        "id": "no_trabalho",
        "section": "Durante o Dia",
        "label": "Trabalho",
        "content": "<i>Cumpre a recomendação de Nossa Senhora de Fátima:</i>\n\n«Dizei muitas vezes, em especial sempre que fizerdes algum sacrifício:</i>\n\n— <b>Ó Jesus, é por vosso amor, pela conversão dos pecadores e em reparação pelos pecados cometidos contra o Imaculado Coração de Maria</b>».\n<i>Ou:</i>«<b>Tudo por Vós, Sagrado Coração de Jesus</b>»."
    },
    "Nas Tentações": {
        "id": "nas_tentacoes",
        "section": "Durante o Dia",
        "label": "Nas Tentações",
        "content": "«Vigiai e orai para não cairdes em tentação» – disse Jesus (Mt 26, 41).\nVigiai, isto é, fugi das ocasiões que podem levar ao pecado: certos programas de televisão, discotecas, espectáculos, leituras, conversas, divertimentos, más companhias, excessos no comer e beber...\nOrai, isto é, rezai. Diz então: «Jesus, Maria, José!» ou: «Senhor, não nos deixeis cair em tentação!»"
    },
    "Leitura": {
        "id": "leitura",
        "title": "Leitura",
        "section": "Durante o Dia",
        "label": "Leitura",
        "content": "Lê pausadamente algum livro espiritual, sobretudo a Bíblia: «Toda a Escritura inspirada por Deus é útil para instruir, para corrigir, para educar na santidade» (2 Tm 3, 16-17). «A Ele falamos quando rezamos; a Ele escutamos quando lemos a sua palavra» (Vaticano II. D. V. 21)."
    },
    "A Jesus Misericordioso": {
        "id": "jesus_misericordioso",
        "title": "A Jesus Misericordioso",
        "section": "Durante o Dia",
        "label": "A Jesus Misericordioso",
        "content": "<b>Acto de Consagração:</b>\nÓ Jesus, infinita é a Vossa Bondade e inesgotáveis os tesouros da vossa graça. Confio inteiramente na vossa Misericórdia. Desejo viver no esplendor de graça e amor que brotaram do vosso Sagrado Coração na cruz.\n\n<b>Orasoens</b>\nEterno Deus, cuja Misericórdia é infinita e cujo tesouro de compaixão não tem limites, olhai propício para nós e aumentai a vossa misericórdia para connosco. «Ó Sangue e Água que brotastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em vós!».\n\n<b>Terço da Misericórdia:</b>\n<i>[Pai Nosso – Ave Maria – Credo]</i>\n\n<b>Nas contas grandes:</b>«Eterno Pai, eu Vos ofereço o Corpo, Sangue, Alma e Divindade do vosso muito Amado Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos pecados de todo o mundo».\n\n<b>Nas contas pequenas:</b>Pela sua dolorosa Paixão, tende misericórdia de nós e de todo o mundo.\n\n<b>No fim:</b> «Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e de todo o mundo»."
    },
    "Terço da Misericórdia": {
        "id": "terco_misericordia",
        "title": "Terço da Misericórdia",
        "section": "Durante o Dia",
        "label": "Terço da Misericórdia",
        "content": "<i>[Pai Nosso – Ave Maria – Credo]</i>\n\n<b>Nas contas grandes:</b>«Eterno Pai, eu Vos ofereço o Corpo, Sangue, Alma e Divindade do vosso muito Amado Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos pecados de todo o mundo».\n\n<b>Nas contas pequenas:</b>Pela sua dolorosa Paixão, tende misericórdia de nós e de todo o mundo.\n\n<b>No fim:</b> «Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e de todo o mundo»."
    },
    "Orasaun Kalan Nian": {
        "id": "orasaun_kalaun_nian",
        "section": "Orasaun Kalan Nian",
        "content": "Ha’u nia Maromak, ha’u ata adora Ita Boot ho ha’u nia laran tomak. Ha’u agradese Ita Boot tanba Ita Boot halo ha’u, halo mos ha’u sai sarani, halo ha’u moris loron ida ne’e tan. Perdua sala hot-hotu ha’u ata halo ohin ne’e; ha’u halo diak ruma karik, ha’u hasa’e ba Ita Boot, hodi husu deit Ita Boot nia grasa. Ha’u ata ba toba, Ita Boot hare didiak ha’u. Keta husik ha’u monu ba tentasaun ruma. Na’i Maromak, haraik Ita Boot nia tulun no Ita Boot nia bensa mai ha’u, ba ha’u nia parente sira no ba ema hot-hotu. \n<b>Amen.</b>\n<i>Maromak hit aan mai tulun ami.</i>\n<b>Nain mai lalais sadia ami no salva ami.</b>"
    },
    "Sagrada Comunhão — Preparação": {
        "id": "sagrada_comunhao_preparacao",
        "title": "Sagrada Comunhão — Preparação",
        "section": "Sagrada Comunhão",
        "label": "Sagrada Comunhão",
        "content": "Senhor, eu creio em Vós, mas aumentai a minha fé!\nSenhor, eu espero em Vós, mas aumentai a minha esperança.\nSenhor, eu vos amo, mas aumentai o meu amor!\n\nVinde, ó Jesus, vinde purificar-me. Vinde, ó meu Benfeitor, e socorrei-me. Vinde, ó Médico divino, e curai-me. Vinde, ó meu Rei, e reinai em mim. Vinde, ó meu Senhor, e abençoai-me. Virgem Santíssima, vinde ajudar-me a receber Jesus. Santo Anjo da minha guarda, vinde preparar-me."
    },
    "Acção de Graças": {
        "id": "accao_de_gracas",
        "title": "Acção de Graças",
        "section": "Sagrada Comunhão",
        "label": "Acção de Graças",
        "content": "<b>Jesus está em mim</b>\nJesus, meu Senhor e meu Deus! Ó Jesus, viestes ao meu peito: dou-Vos infinitas graças por esta mercê – Ó Jesus, estais em mim e eu em Vós – Ó Jesus, conservai-me na vossa graça – Ó Jesus, fortalecei-me contra as tentações – Ó Jesus, dai-me horror ao pecado – Ó Jesus, não permitais que de Vós me separe jamais – Ó Jesus, antes morrer que perder-Vos – Ó Jesus, fazei que a minha morte seja a de um santo – Abençoai meus pais e toda a minha família, meus benfeitores, amigos e inimigos; todos Vos reconheçam, amem e se salvem."
    },
    "Alma de Cristo": {
        "id": "accao_de_gracas",
        "title": "Alma de Cristo",
        "section": "Sagrada Comunhão",
        "label": "Alma de Cristo",
        "content": "Alma de Cristo, santificai-me.\nCorpo de Cristo, salvai-me.\nSangue de Cristo, inebriai-me.\nÁgua do lado de Cristo, lavai-me.\nPaixão de Cristo, confortai-me.\nÓ bom Jesus, ouvi-me.\nDentro das vossas chagas escondei-me.\nNão permitais que me separe de Vós.\nDo inimigo maligno, defendei-me.\nNa hora da minha morte, chamai-me.\nE mandai-me ir para Vós, para que Vos louve com os vossos santos, por todos os séculos dos séculos. Amen."
    },
    "Reparação": {
        "id": "accao_de_gracas",
        "title": "Reparação",
        "section": "Sagrada Comunhão",
        "label": "Reparação",
        "content": "Meu Deus, eu creio, adoro, espero e amo-Vos. Peço-Vos perdão para os que não crêem, não adoram, não esperam e não Vos amam.\n\nSantíssima Trindade, Pai, Filho, Espírito Santo, adoro-Vos profundamente e ofereço-Vos o preciosíssimo Corpo, Sangue, Alma e Divindade de Jesus Cristo presente em todos os sacrários da terra, em reparação dos ultrajes, sacrilégios e indiferenças com que Ele mesmo é ofendido. E pelos mérito infinitos do seu Santíssimo Coração e do Coração Imaculado de Maria, peço-vos a conversão dos pobres pecadores.\n\nÓ Jesus, é por vosso amor, pela conversão dos pecadores e em repaação dos pecados cometidos contra o Imaculado Coração de Maria."
    },
    "Fica, Senhor!": {
        "id": "fica_senhor",
        "title": "Fica, Senhor!",
        "section": "Sagrada Comunhão",
        "label": "Fica, Senhor!",
        "source": "Beato P. Pio",
        "content": "Fica, Senhor, comigo, porque é necessária a tua presença para não Te ofender. Tu sabes como facilmente Te abandono. Fica, Senhor, comigo, porque Tu és a minha vida e sem Ti esmoreço no fervor. Fica, Senhor, comigo, porque Tu és a minha Luz e sem Ti permaneço nas trevas. Fica, Senhor, comigo, para me dares a conhecer a tua vontade. Fica, Senhor, comigo, para que ouça a tua voz e Te siga. Fica, Senhor, comigo, pois desejo amar-Te muito e estar sempre na tua companhia.\n\nFica, Senhor, comigo, se queres que Te seja fiel. Fica, Senhor, comigo, pois embora a minha alma seja muito pobrezinha, deseja ser para Ti um lugar de consolação, um recanto de amor; Fica, Senhor, comigo, pois é tarde e o dia está a declinar, passa a vida, aproximam-se a morte, o juízo e a eternidade.\n\nFica, Jesus, comigo. Não Te peço a tua divina consolação pois não a mereço, mas o dom da tua presença santíssima. Só Te procuro a Ti, o teu amor, a tua vontade, o teu coração. <i>(Beato P. Pio)</i>"
    },
    "Novena da Confiança": {
        "id": "novena_confianca",
        "title": "Novena da Confiança",
        "section": "Novena da Confiança",
        "label": "Novena da Confiança",
        "source": "Beato Padre Pio",
        "content": "<center><b>Ó Jesus, confio ao vosso Coração, as minhas intenções <i>(tal alma... tentação... aflição...)</i>.\nOlhai para elas e para o vosso Santíssimo Coração e depois fazei o que Ele vos disser.\nÓ Jesus, conto convosco, confio em Vós, abandono-me a Vós, fico certo do vosso acolhimento. Sagrado Coração de Jesus, eu tenho confiança em Vós!</b></center>"
    },
    "Confiança nas Promessas de Cristo": {
        "id": "confianca_promessas_cristo",
        "title": "Confiança nas Promessas de Cristo",
        "section": "Novena da Confiança",
        "label": "Confiança nas Promessas de Cristo",
        "content": "Ó Jesus, que dissestes «pedi e recebereis, procurai e achareis, batei e abrir-se-vos-á!» eu bato, procuro e peço a graça...\nSagrado Coração de Jesus, eu espero e confio em Vós.\n\n* Ó Jesus, que dissestes «tudo quanto pedirdes ao Pai em meu nome, Ele vo-lo concederá!», é ao vosso Pai e em vosso nome que peço a graça...\n<i>Sagrado Coração de Jesus, eu espero e confio em Vós.</i>\n\n* Ó Jesus, que dissestes «passarão o Céu e a terra, mas as minhas palavras não hão-de passar!», confiado na infalibilidade das vossas palavras, eu peço a graça...\n<i>Sagrado Coração de Jesus, eu espero e confio em Vós.</i>\n\nS. José, rogai por nós.\n<b>Salve-Rainha.</b>"
    },
    "Visita ao Santíssimo Sacramento": {
        "id": "visita_santissimo",
        "title": "Visita ao Santíssimo Sacramento",
        "section": "Santíssimo Sacramento",
        "label": "Visita ao Santíssimo Sacramento",
        "content": "Graças e louvores se dêem a todo o momento, ao Santíssimo e diviníssimo Sacramento. Ó Jesus no SS. Sacramento, tende compaixão de nós.\n\nMeu Deus, eu creio, adoro, espero e amo-Vos. Peço-Vos perdão para os que não crêem, não adoram, não esperam e não Vos amam.\n\nÓ Santíssima Trindade, eu Vos adoro. Meu Deus, meu Deus, eu Vos amo no Santíssimo Sacramento <i>(Dos Pastorinhos de Fátima).</i>\n\nSagrado Coração de Jesus, eu tenho confiança em Vós.\nJesus, manso e humilde de coração, fazei o meu coração semelhante ao vosso.\n\nEterno Pai, eu Vos ofereço o Sangue preciosíssimo de Jesus Cristo em desconto dos meus pecados, em sufrágio das almas santas do Purgatório e pelas necessidades da santa Igreja.\n\nVirgem Maria, Nossa Senhora do Santíssimo Sacramento, rogai por nós e despertai em todos os fiéis a devoção à Santíssima Eucaristia."
    },
    "Comunhão Espiritual": {
        "id": "comunhao_espiritual",
        "title": "Comunhão Espiritual",
        "section": "Santíssimo Sacramento",
        "label": "Comunhão Espiritual",
        "pages": [
            "<b>S. Francisco:</b> Como suspira o veado pelas correntes das águas, assim minha alma suspira por Vós, Senhor (Sl 41, 3). Ó Jesus, vinde e vivei em mim.",
            "<b>Santo Afonso Maria de Ligório:</b> Meu Jesus, Eu creio que estais presente no Santíssimo Sacramento do Altar. Amo-vos sobre todas as coisas, e minha alma suspira por Vós. Mas como não posso receber-Vos agora no Santíssimo Sacramento, vinde, ao menos espiritualmente, ao meu coração. Abraço-me convosco como se já estivésseis comigo: uno-me Convosco inteiramente. Ah! Não permitais que torne a separar-me de Vós!",
            "<b>Card. Rafael Merry del Val:</b> Aos vossos pés, ó meu Jesus, me prostro e vos ofereço o arrependimento do meu coração que mergulha no seu nada na Vossa santa presença. Eu vos adoro no Sacramento do vosso amor, a inefável Eucaristia. Desejo receber-vos na pobre morada que meu coração vos oferece. À espera da felicidade da comunhão sacramental, quero possuir-vos em Espírito. Vinde a mim, ó meu Jesus, que eu venha a vós. Que o vosso amor possa inflamar todo o meu ser, para a vida e para a morte. Creio em vós, espero em vós. Amo-vos. Assim seja."
        ]
    },
    "Oração de S. Francisco": {
        "id": "oracao_sao_francisco",
        "title": "Oração de S. Francisco",
        "section": "Santíssimo Sacramento",
        "label": "Oração de S. Francisco",
        "content": "Senhor, fazei de mim um instrumento da vossa Paz:\nOnde há ódio que eu leve o Amor.\nOnde há ofensa, que eu leve o Perdão.\nOnde há discórdia, que eu leve a União.\nOnde há dúvida, que eu leve a Fé.\nOnde há erro, que eu leve a Verdade.\nOnde há desespero, que eu leve a Esperança.\nOnde há tristeza, que eu leve a Alegria.\nOnde há trevas, que eu leve a Luz.\nOh Mestre, fazei que eu procure menos\nSer consolado do que consolar;\nSer compreendido do que compreender;\nSer amado, do que amar;\nPorque é dando que se recebe;\nÉ esquecendo-nos que nos encontramos;\nÉ perdoando que se é perdoado;\nÉ morrendo que se ressuscita para a Vida Eterna."
    },
    "Bênção do Santíssimo — Tantum Ergo": {
        "id": "tantum_ergo",
        "title": "Bênção do Santíssimo — Tantum Ergo",
        "section": "Santíssimo Sacramento",
        "label": "Tantum Ergo",
        "content": "A.\nVeneremos, adoremos\nA presença do Senhor,\nNossa Luz e pão da Vida,\nCante a alma o seu louvor.\nAdoremos no sacrário\nDeus oculto por amor.\n\nDêmos glória ao Pai do Céu,\nInfinita Majestade,\nGlória ao Filho e ao St.º Espírito,\nEm espírito e verdade.\nVeneremos adoremos\nA Santíssima Trindade! Amen.\n\nB.\nAo divino Sacramento\nInclinados adoremos,\nPois do Antigo Testamento\nA promessa recebemos,\nE em perfeito cumprimento\nJá presente aqui a temos.\n\nPor tão nobre realidade\nda divina Eucaristia\nà Santíssima Trindade\ndêmos graças cada dia,\nArda a fé e a caridade\nEm pleníssima harmonia. Amen."
    },
    "Benditos": {
        "id": "benditos",
        "title": "Benditos",
        "section": "Benditos",
        "label": "Benditos (35)",
        "content": "Bendito seja Deus;\nBendito o seu Santo Nome;\nBendito Jesus Cristo, verdadeiro Deus e verdadeiro homem;\nBendito o nome de Jesus;\nBendito o seu Sacratíssimo Coração;\nBendito o seu Preciosíssimo Sangue;\nBendito Jesus no SS. Sacramento do Altar;\nBendito o Espírito Santo Paráclito;\nBendita a excelsa Mãe de Deus, Maria SS.;\nBendita a sua Santa e Imaculada Conceição;\nBendita a sua gloriosa Assunção;\nBendito o nome de Maria Virgem e Mãe;\nBendito S. José, seu castíssimo Esposo;\nBendito Deus nos seus Anjos e nos seus Santos."
    },
    "Confissão — Exame de Consciência": {
        "id": "confissao_exame",
        "title": "Confissão — Exame de Consciência",
        "section": "Confissão",
        "label": "Exame de Consciência (38)",
        "content": "1.º Mandamento – Rezei todos os dias? Contribuo para o culto? Falei contra Deus ou a religião? Duvidei da fé? Acreditei em superstições? Recebi a comunhão em pecado? Confessei-me ao menos uma vez por ano?\n\n2.º Mandamento – Fiz juramentos falsos? Fiz alguma promessa? Já a cumpri?\n\n3.º Mandamento – Faltei à Missa aos domingos? Trabalhei desnecessariamente? Guardei o jejum e abstinência?\n\n4.º Mandamento – Respeito, obedeço e amo os meus pais? Dei boa educação aos filhos? Dou-lhes bom exemplo? Rezo com eles e por eles?\n\n5.º Mandamento – Desejei a morte a alguém? Ando a mal com alguém? Bati ou feri alguém? Excedi-me na alimentação ou bebida? Dou esmolas?\n\n6.º e 9.º Mandamentos – Demorei com malícia em pensamentos ou desejos desonestos? Vi figuras ou coisas indecentes? Assisti ao cinema ou televisão quando eram imorais? Li livros, jornais ou revistas más? Tive conversas de malícia? Dei escândalo? Cometi acções desonestas? Frequentei bailes ou discotecas pouco recomendáveis?\n\n7.º e 10.º Mandamentos – Tirei alguma coisa? Tenho restituições a fazer? Enganei nas vendas? Fui invejoso?\n\n8.º Mandamento – Disse mentiras? Causei prejuízo a alguém? Julguei mal do próximo? Disse mal dos outros? Levantei calúnias? Revelei segredos?\n\nCONFISSÃO\n<b>Acusação dos pecados.</b>Abençoai-me, Padre, porque pequei. Há.... (dias, meses...) que me confessi.Cumpri a penintência? Deixei de confessar algum pecado mortal?Foi por esquecimento? Ou por  querer, clando-me por vergonha?\n\nACTO DE CONTRIÇÃO:\nMeu Deus, porque sois tão bom, tenho muita pena de Vos ter ofendido. Ajudai-me a não tornar a pecar.\n\nACTO DE CONTRIÇÃO MAIOR:\nMeu Deus, porque sois infinitamente bom e Vos amo de todo o meu coração, pesa-me de Vos ter ofendido, e, com o auxílio da vossa divina graça, proponho firmemente emendar-me e nunca mais Vos tornar a ofender. Peço e espero o perdão das minhas culpas pela vossa infinita misericórdia. Amen."
    },
    "Outras Súplicas": {
        "id": "outras_suplicas",
        "title": "Outras Súplicas",
        "section": "Outras Súplicas",
        "label": "Outras Súplicas",
        "content": "Ó Jesus, entrego o meu passado à vossa Misericórdia, confio o meu futuro à vossa Providência, consagro o meu presente ao vosso Amor.\n\nMeu Senhor e meu Deus! Tirai de mim o que me afasta de Vós. Meu Senhor e meu Deus! Dai-me tudo o que me pode unir a Vós. Meu Senhor e meu Deus! Desprendei-me de mim e fazei-me todo vosso. (S. Nicolau de Flue)"
    },
    "Acto de Esperança": {
        "id": "acto_de_esperanca",
        "title": "Acto de Esperança",
        "section": "Outras Súplicas",
        "label": "Acto de Esperança",
        "content": "Meu Deus, espero em Vós, porque sois todo-poderoso, infinitamente misericordioso e fidelíssimo às vossas promessas."
    },
    "Acto de Caridade": {
        "id": "acto_de_caridade",
        "title": "Acto de Caridade",
        "section": "Outras Súplicas",
        "label": "Acto de Caridade",
        "content": "Meu Deus, amo-Vos de todo o meu coração, porque sois infinitamente bom, e, por amor de Vós, amo o próximo como a mim mesmo.\nOu: – Meu Deus, eu creio, adoro, espero e amo-Vos. Peço-Vos perdão para os que não crêem, não adoram, não esperam e não Vos amam."
    },
    "Acto de Contrição": {
        "id": "acto_de_contricao",
        "title": "Acto de Contrição",
        "section": "Outras Súplicas",
        "label": "Acto de Contrição",
        "content": "Meu Deus, porque sois infinitamente bom e Vos amo de todo o meu coração, pesa-me de Vos ter ofendido, e, com o auxílio da vossa divina graça, proponho firmemente emendar-me e nunca mais Vos tornar a ofender. Peço e espero o perdão das minhas culpas pela vossa infinita misericórdia. Amen."
    },
    "Confissão": {
        "id": "confissao",
        "title": "Confissão",
        "section": "Confissão",
        "label": "Confissão",
        "content": "Confesso a Deus todo poderoso e a vós, irmãos, que pequei muitas vezes por pensamentos e palavras, actos e omissões, por minha culpa, minha tão grande culpa, e peço à Virgem Maria, aos Anjos e Santos, e a vós, irmãos, que rogueis por mim a Deus, Nosso Senhor."
    },
    "Assistência aos Moribundos": {
        "id": "assistencia_moribundos",
        "title": "Assistência aos Moribundos",
        "section": "Assistência aos Moribundos",
        "label": "Assistência aos Moribundos",
        "content": "1 – Para o doente, sobretudo se está em perigo de vida, deve chamar-se o sacerdote para que lhe administre os Sacramentos: Confissão, Comunhão (Sagrado Viático) e Santa Unção.\n\n2 – Dê-se-lhe a beijar o crucifixo e a medalha ou imagem de Nossa Senhora.\n\n3 – Procure-se que repita, ao menos com o coração, o Acto de Contrição, Pai-Nosso e Ave-Maria e algumas das seguintes Súplicas:\n\nSenhor, nas vossas mãos entrego o meu espírito.\nMeu Deus, eu Vos amo.\nMeu Jesus, misericórdia.\nSagrado Coração de Jesus, eu tenho confiança em Vós.\nDoce Coração de Maria, sede a minha salvação.\nS. José, rogai por nós.\nAmado Jesus, José e Maria...\n\nParte, ó alma cristã, deste mundo em nome de Deus Pai, que te criou; em nome de Jesus Cristo, Filho de Deus vivo, que por ti morreu; em nome do Espírito Santo, que sobre ti desceu."
    }
};

function parseInlineText(input: any): React.ReactNode[] {
    if (typeof input !== "string") {
        return [String(input || "")];
    }
    const tokens: React.ReactNode[] = [];
    const regex = /(<\/?b>|<\/?i>|<\/?center>)/g;
    let last = 0;
    let bold = false;
    let italic = false;
    let center = false;
    let key = 0;

    const pushText = (text: string) => {
        if (!text) return;
        tokens.push(
            <Text
                key={key++}
                style={[
                    bold && styles.bold,
                    italic && styles.italic,
                    center && styles.centerText,
                ]}
            >
                {text}
            </Text>
        );
    };

    input.replace(regex, (match, _group, offset) => {
        pushText(input.slice(last, offset));
        if (match === "<b>") bold = true;
        else if (match === "</b>") bold = false;
        else if (match === "<i>") italic = true;
        else if (match === "</i>") italic = false;
        else if (match === "<center>") center = true;
        else if (match === "</center>") center = false;
        last = offset + match.length;
        return match;
    });

    pushText(input.slice(last));
    return tokens;
}

function renderParagraph(text?: string) {
    if (!text) return null;
    return <Text style={styles.contentText}>{parseInlineText(text)}</Text>;
}

function renderPages(pages: string[] | undefined) {
    if (!pages || !pages.length) return null;

    return pages.map((page, index) => (
        <View key={index} style={styles.pageBlock}>
            {renderParagraph(page)}
        </View>
    ));
}

const grouped = Object.values(prayers).reduce<
    Record<string, PrayerItem[]>
>((acc, item) => {
    const sec = item.section || "Orasoens";
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(item);
    return acc;
}, {});

export default function OracoesScreen() {
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

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.pageTitle}>Orasoens</Text>
                <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.hamburgerButton}>
                    <Text style={styles.hamburgerText}>☰</Text>
                </TouchableOpacity>
            </View>

            <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.content}>
                {Object.entries(grouped).map(([sectionName, items]) => (
                    <View
                        key={sectionName}
                        style={styles.section}
                        onLayout={(e) => handleSectionLayout(sectionName, e)}
                    >
                        <Text style={styles.sectionTitle}>{sectionName}</Text>

                        {items.map((item, index) => (
                            <View key={item.id || index} style={styles.item}>
                                {(item.title || item.label) && (
                                    <Text style={styles.itemTitle}>{item.title || item.label}</Text>
                                )}

                                {item.rubric ? (
                                    <Text style={styles.rubric}>{parseInlineText(item.rubric)}</Text>
                                ) : null}

                                {item.content ? renderParagraph(item.content) : null}
                                {item.pages ? renderPages(item.pages) : null}
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>

            <Modal visible={menuVisible} animationType="fade" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Índice</Text>
                        <ScrollView>
                            {Object.keys(grouped).map(sectionName => (
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
    container: {
        flex: 1,
        backgroundColor: "#f7f2e8",
    },
    content: {
        padding: 16,
        paddingBottom: 30,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#4b2e1f",
        textAlign: "center",
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
    item: {
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
        fontStyle: "italic",
        color: "#6b4f3a",
        marginBottom: 6,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 25,
        color: "#2b2b2b",
        textAlign: "justify",
    },
    pageBlock: {
        marginBottom: 10,
    },
    bold: {
        fontWeight: "bold",
    },
    italic: {
        fontStyle: "italic",
    },
    centerText: {
        textAlign: "center",
        width: "100%",
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
});
