import React, { useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DevosoensTab from "../../components/DevosoensTab";

type PrayerItem = {
  id?: string;
  title?: string;
  section?: string;
  label?: string;
  rubric?: string;
  content?: string;
  pages?: string[];
  has_image?: boolean;
  image_description?: string;
};

const prayers: Record<string, PrayerItem> = {
  "Tamba Sinal": {
    id: "tamba_sinal",
    label: "Tamba Sinal",
    content:
      "† Tamba sinal santa Kruz Na’i Maromak hasai ami hosi buat aat hotu.\n† Hodi Padre, hodi Filho, hodi Espiritu Santu nia naran. <b>Amen.</b>",
    has_image: true,
    image_description: "Cruz",
  },
  "Graças e Louvores": {
    id: "gracas_e_louvores",
    label: "Grasa no Lovór sira",
    content: `Grasa no lovór sira hasa'e iha momentu hotu-hotu, ba Santíssimo Sakramentu.`,
  },
  "Ami Aman": {
    id: "ami_aman",
    label: "Ami Aman",
    content:
      "Ami Aman, be iha lalehan,\nhalo ami hahí-hana’i Ita naran\nhalo Ita nia reinu to’o mai ami;\nIta nia hakarak halo tuir ba\niha rai nu’udar iha lalehan.\n<i>Ohin ne’e haraik ai-han lor-loron nian mai ami;\nharaik perdaun mai ami salan,\nnu’udar ami perdua ema halo a'at ami;\nlabele husik ami monu ba tentasaun;\nmaibé hasai ami hosi a'at.</i>\n<b>Amen.</b>",
  },
  "Ave-Maria": {
    id: "ave_maria",
    label: "Ave-Maria",
    content:
      "AVE MARIA grasa barak liu iha ita boot,\n Maromak ho ita boot,\n ita boot diak liu feto hotu-hotu \nita boot nia Oan Jesus diak liu.\n<i>SANTA MARIA Maromak Nia inan\n harohan ba Nain Maromk\n tamba ami ata nia sala\n oras ne no oras ne’ebe ami ata besik atu mate.</i>\n<b>AMEN.</b>",
  },
  Glória: {
    id: "gloria",
    label: "Glória",
    content:
      "Glória ba Padre, ba Filho no ba Espíritu Santo,\n<i>Nudar hori uluk, oras ne'e,\ntinan ba tinan  tinan nafatin,\n</i><b>Amen.</b>",
  },
  Credo: {
    id: "credo",
    label: "Ha'u Fiar (Kredo)",
    content:
      "Ha’u fiar Na\’i Maromak\nPadre bele halo hotu-hotu,\nhalo ona lalehan ho rai.\nHa’u fiar Jesus Cristo Padre Eterno nia oan mesak Ita Nain,\nNia moris hahu-An husi Maria Virgem tamba Espirito Santo.\nNia terus iha Ponciu Pilatus nia ukun, ema hedi Nia ba Crúz,\nNia mate tiha, ema hakoi Nia\ntun ba limbu liu loron tolu Nia moris fali,\nsa’e ba lalehan tur iha Padre Eterno Nia sorin kuana,\nloron ida sei tun mai fali\natu halo justisa ba ema di’ak ho ema a’at.\nHa’u fiar Espirito Santo, Santa Igreja Katolika\nho Santo sira tulun malu.\nHa\’u fiar Jesus Cristo atu haraik perdaun ba ema sala.\nEma hotu-hotu sei moris fali,\nema di’ak sei ba lalehan ema a\’at sei ba inferno nafatin.\n<b>Amen</b>",
  },
  "Salve-Rainha": {
    id: "salve_rainha",
    section: "Orasoens",
    label: "Salve Liurai Feto",
    content:
      "Salve Liurai Feto, Inan hanoin ami, ami nia rahun diak, ami nia esperansa, salve. Ami ata Eva nia oan des- terradu, hasa'e ami nia lia ba Ita Boot; hodi tanis ami husu deit Ita Boot tulun ami ata iha tanis fatin ne'e. Ne'e duni, ami nia Advogada, fila mai ami ata Ita Boot nia matan diak. Desterro ne'e hotu, hatudu mai ami ata Itaboot nia Oan benti Jesus. Ou clemente, ou piedoza, ou doce virjen nafatin Maria.\n<b>Maromak nia Inan Santa harohan mai ami</b>\n<i>Ami atu bele hetan Jesus Kristu nia rahun diak.</i>\n<b>𝐀𝐦𝐞𝐧</b>",
  },
  "Ba Anju Hein Ita": {
    id: "ba_anju_hein_ita",
    label: "Orasaun ba Anju hein Ita",
    content:
      "Na’i Maromak nia Anju Santu, hein didiak ha’u.\nUkun ha’u nafatin,\nhalo ha’u tuir diak deit\ntanba Na’i Maromak rasik mak entrega ha’u\niha ita boot nia liman.\n<b>Amen.</b>",
    has_image: true,
    image_description: "Anju",
  },
  "Ba Amo Papa": {
    id: "orasaun_ba_amo_papa",
    label: "Orasaun ba Amo Papa",
    content:
      "Ita harohan ba ita nia Amo Papa, Leão XIV.\nNa’i haraik isin diak ba nia, hametin no tahan nia.\n<b>Orasaun:</b>\nMaromak sarani hotu nia Bibi atan no mata dalan; hateke ho laran diak ba ita atan, Amo Papa Leão XIV, nebe Ita Boot mak fihir nudar Ita Kreda nia Bibi atan. Haraik atu povu nebe nia ukun simu didiak nia liafuan no esemplu sira, atu nune’e, nia bele to’o moris rohan laek hamutuk ho bibi luhan tomak nebe Ita Boot hameno ba nia. Ami harohan ne’e hodi ami Na’i Jesus Kristu hamutuk ho Espiritu Santu.\n<b>Amen.</b>",
  },
  "Pelas Almas do Purgatório": {
    id: "pelas_almas_purgatorio",
    section: "Orasoens",
    label: "Ba klamar sira iha Purgatóriu",
    content:
      "Na’i Maromak, fo sira hetan rahun diak nafatin.\nHalo Ita Boot nia naroman leno sira nafatin.\nHalo sira descansa ho paz.\n<b>Amen.</b>\n<i>Na’i, haraik deskansa rohan-laek ba sira;</i>\n<b>naroman nabilan ba sira nafatin,</b>\n<i>deskansa iha Dame laran.</i>\n<b>Amen.</b>",
  },
  "Orasaun Dader": {
    id: "orasaun_dader",
    section: "Orasaun Dader Nian",
    content:
      "Ha’u nia Maromak, ha’u adora Ita boot, ha’u hadomi Ita Boot, ho ha’u nia laran tomak. Ha’u agradese Ita Boot tanba Ita Boot mak halo ha’u moris, halo ha’u sarani, halo ha’u deskansa iha kalan ida ne’e. Buat hot-hotu ha’u halo iha loron ne’e ha’u hasa’e ba Ita Boot. Na’i Maromak halo ha’u moris ohin ne’e hodi tuir deit Ita Boot nia hakarak, hodi buka deit Ita Boot nia gloria. Dada ha’u sai hosi sala no hosi buat aat hotu. Haraik Ita Boot nia grasa ho Ita Boot nia bensa mai ha’u, ba ha’u nia parente sira no ba ema hot-hotu.\n<b>Amen.</b>",
  },
  "Na’i, ha’u nia Maromak": {
    id: "nai_hau_nia_maromak",
    section: "Nai Hau nia Maromak",
    content:
      "Na’i, ha’u nia Maromak, ha’u fiar, ha’u adora, ha’u hein, ha’u hadomi Ita Boot. Ha’u husu perdua ba ema sira nebe la fiar, la adora, la hein, la hadomi Ita Boot.",
  },
  "Aktu de Kontrisaun": {
    title: "Aktu de Kontrisaun",
    section: "Orasoens",
    label: "Aktu de Kontrisaun",
    content:
      "Ha’u nia Maromak, ha’u hanoin ho laran moras sala hot-hotu ha’u halo ona kontra Ita Boot diak liu, nebe halo diak deit mai ha’u. Ha’u hasa’e lialos ba Ita Boot, hodi Ita Boot nia grasa, lakohi sala tan. Ha’u husu barak Ita Boot perdua ha’u, tanba Ita Boot laran diak ho tanba ha’u nia Na’i Jesus Kristu terus to’o mate tanba ha’u.",
  },
  "Aktu de Fé, Esperansa no Karidade": {
    title: "Aktu de Fé, Esperansa no Karidade",
    section: "Orasoens",
    label: "Aktu de Fé, Esperansa no Karidade",
    content:
      "Ha’u nia Maromak, ha’u fiar no hein metin Ita Boot, ha’u hadomi Ita Boot liu sasan hot-hotu no hadomi maun alin sira nudar ha’u an rasik tanba Ita Boot.",
  },
  "Orasaun Atu husu Vokasaun": {
    title: "Orasaun Atu husu Vokasaun",
    section: "Orasoens",
    label: "Orasaun Atu husu Vokasaun",
    content:
      "Jesus futar Fuan iha Eukaristia, Nailulik boot rohan laek: tanba Ita Boot nia domin laran luak, ami husu atu tulun familia sai santu; nune’e, hanesan viveiro diak ida, bele naburas vokasaun barak ba Ita nia Kreda. Haraik mos nailulik barak mai ami, nailulik sira nakonu ho Ita Boot nia Espiritu, manas ho Ita Boot nia Karidade atu buka deit Ita Boot nia reinu iha rai ne’e no Ita Boot nia gloria iha Lalehan.\n<b>Oh Jesus, Maksoin mundu nian.</b>\n<i>Haraik santidade ba ita nia nailulik sira.</i>\n<b>Oh Maria, Klero nia Liurai Feto.</b>\n<i>Haraik nailulik barak no santu ba Ita nia Kreda.</i>",
  },
  "Oferecimento das Obras do Dia": {
    id: "meu_deus_creio",
    section: "Orasoens Dader Nian",
    label: "Hasa'e Loron nian Buat Hotu",
    content:
      "Ha’u hasa’e ba Ita Boot, ha’u nia Maromak, hamutuk ho Jesus nia Fuan Santu no hosi Maria nia Fuan Sala-laek, orasaun, servisu, ksolok no terus loron ne’e nian, hodi selu fali ofensa hotu-hotu no ba intensaun hotu-hotu ne’ebé Jesus nia Fuan Santu husu nafatin iha ita-nia altár sira.\n\nBuat hotu ba Ita, Jesus nia Fuan Santu.",
  },
  "Vinde Santo Espírito": {
    id: "vinde_santo_espirito",
    title: "Ba Espíritu Santu",
    section: "Durante o Dia",
    label: "Ba Espíritu Santu",
    content:
      "Mai Espíritu Santu, mai domin manas, lakan iha rai Ita nia naroman.\nMai, Aman ki'ak sira nian: iha terus no susar,\nmai enxe ami fuan ho ksolok.\nTulun-na'in boot liu iha momentu hotu-hotu, hela iha ami laran, Ita mak ami-nia kbiit.\nDeskansa iha funu laran no iha dame furak, iha manas Ita mak anin malirin, kofortu iha tanis.\nNaroman santidade nian, ne'ebé lakan iha lalehan: lakan iha klamar sira Ita-nia fiar-na'in sira.\nSe la'os hosi Ita-nia kbiit no grasa laran-luak, la iha buat ida iha ema ne'ebé moos.\nHamos ami-nia fo'er sira, rega rai-maran,\nhai-di'ak moras sira no salva ema hotu.\nIta-nia prezente hitu haraik ba klamar\nsira ne'ebé fiar iha Ita:\nVirtude iha moris, tulun iha mate, iha lalehan ksolok. Amen.",
  },
  "Consagração a N.ª Senhora": {
    id: "consagracao_nossa_senhora",
    section: "Orasoens Dader Nian",
    label: "Dedika-An ba Ita nia Nain Feto",
    content:
      "Ó ha’u-nia Na'in Feto, ó ha’u-nia Inan, ha’u entrega-an tomak ba Ita Boot; no hodi hatudu ha’u-nia devosaun ba Ita Boot, ha’u dedika iha loron ne’e, ha’u-nia matan, ha’u-nia tilun, ha’u-nia ibun, ha’u-nia fuan no ha’u-nia isin-lolon tomak; no tanba ha’u Ita Boot nian ona, ó Inan kmanek liu, hein no defende ha’u nudar Ita-Boot nia kerek no sasán rasik. Hanoin-hetan katak ha’u Ita-Boot nian, Inan doben, ami-nia Na'in Feto. Ah! Hein no defende ha’u nudar Ita-Boot nia sasán rasik.",
  },
  "Três Ave-Marias (Manhã)": {
    id: "tres_ave_marias_manha",
    section: "Orasoens Dader Nian",
    label: "Ave Maria Tolu",
    content:
      "Ó Maria, ha’u-nia Inan di’ak, hasai ha’u hosi sala mortál iha loron ne’e, hodi Kbiit ne’ebé Aman Eternu haraik ba Ita Boot. Ave-Maria...\n\nÓ Maria, ha’u-nia Inan di’ak, hasai ha’u hosi sala mortál, hodi Matenek ne’ebé Oan haraik ba Ita Boot. Ave-Maria...\n\nÓ Maria, ha’u-nia Inan di’ak, hasai ha’u hosi sala mortál, hodi Domin ne’ebé Espíritu Santu haraik ba Ita Boot. Ave-Maria...",
  },
  "Lembrai-Vos": {
    id: "lembrai_vos",
    section: "Orasoens Dader Nian",
    label: "Hanoin-An ba",
    content:
      "Hanoin-An ba, ó Virjem Maria laran-sadi'a liu, katak nunka rona ema ida dehan katak sira ne’ebé buka Ita-Boot nia tulun, husu Ita-Boot nia ajuda no harohan ba Ita-Boot, Ita-Boot husik de'it. Ho fiar ne’e, ha’u mós buka Ita-Boot, Virjem sira-nia Virjem, nudar Inan ha’u hakbesik ba Ita-Boot, ha’u husu tulun ba Ita-Boot, no ho tanis tanba ha’u-nia sala sira, ha’u hakneak iha Ita-Boot nia ain. Labele fihir-aat ha’u-nia harohan sira, ó Maromak nia Oan nia Inan, maibé rona laran-luak no haraik buat ne’ebé ha’u husu. Amen.\n\nBa Ita-Boot nia protesaun ami hakbesik-an, Maromak nia Inan Santa, labele fihir-aat ami-nia harohan iha ami-nia presiza sira, maibé hasai ami hosi perigu hotu-hotu, ó Virjem glorioza no benti!",
  },
  "A S. José": {
    id: "a_sao_jose",
    label: "Ba S. Józé",
    content:
      "Ó São José gloriozu, Inan-Aman no hein-na'in ba klamar virjem sira; hein-na'in fiar-na'in ne'ebé Maromak entrega Jesus, inosénsia rasik, no Maria, Virjem sira-nia Virjem; tanba buat folin-boot rua ne'e, ha'u husu no harohan ba Ita-Boot, halo ha'u, livre hosi fo'er hotu, ho espíritu, fuan no isin moos, serví nafatin Jesus no Maria iha kastidade perfeita. Amen.",
  },
  Angelus: {
    id: "angelus",
    title: "Angelus",
    content:
      "V/<i>Nai Maromak nia Anju hodi Na’i Maromak nia lian ba Maria</i>\nR/<b>Nia kous dadaun tamba Espiritu Santu nia grasa</b>/n<b>Ave Maria...</b>\nV/<i>Hau nee Nai Maromak nia atan deit</i>\nR/<b>atu halo tuir duni ita boot nia lia</b>\n<b>Ave Maria...</b>\nV/<i>Maromak Filho halo an ba mane</i>\nR/<b>Nia mai moris duni hamutuk ho ita</b>\n<b>Ave Maria...</b>\nV/<i>Maromak nia Inan Santa, harohan mai ami ata</i>\nR/<b>ami atu bele hetan Jesus Kristu nia rahun diak</b>\n\n<b>Orasaun:</b>\nNai Maromak, ami ata husu ba ita boot atu haraik ita boot nia grasa mai ami nia klamar. Tuir anjo nia lian ami hatene lolos katak ita boot nia Oan halo an ba Mane. Tan nia terus too mate iha kruz, ami harohan ba ita boot, halo ami ata moris fali atu ba iha lalehan. Ami husu nee tamba ami nia Nai Jesus Kristu.\n<b>Amen</b>",
  },
  "Iha Tempu Paskoa — Regina Caeli": {
    id: "regina_caeli",
    label: "Regina Caeli",
    content:
      "V/<i>Liurai Feto lalehan, Ita Boot neon kontente, aleluia!</i>\nR/<b>Tanba Oan Ita Boot kous, aleluia.</b>\nV/<i>Moris fali nudar Nia uluk hateten, aleluia!</i>\nR/<b>Harohan Na’i Maromak mai ami, aleluia.</b>\nV/<b>Oh Virjem Maria, Ita Boot bele ona kontente teb-tebes, aleluia!</b>\nR/<i>Tanba ami na'i Na'i moris fali lolos, aleluia!</i>\n\n<b>Orasaun:</b>\nNa'i Maromak, Ita boot halo ema hot-hotu kontente tanba Ita Boot nia Oan, ami Na'i Jesus Kristu, moris fali duni; tan nia Inan Virjem Maria, halo ami hetan rahun diak nafatin iha lalehan. Ami husu ne’e tamba ami Na'i Jesus Kristu.\n<b>Amen.</b>",
  },
  "ORAÇÃO DE QUARTO DE HORA": {
    id: "oracao_quarto_de_hora",
    label: "ORAÇÃO DE QUARTO DE HORA",
    content:
      "<i>(Atu reza cada 15 minutos atu consciente nafatin ba Maromak nia presença. Husi: St. Arnaldo Janssen, Fundador SVD, SSPS, SSPS-AP)</i>\n\nD: Nai, Ita Boot mak Lialos rohan laek nian,\nR: Ami fiar iha Ita Boot.\n\nD: Nai, Ita Boot, mak ami nia kbi'it no ami nia salvação,\nR: Ami laran metin iha Ita Boot.\n\nD: Nai, Ita Boot mak diak rohan laek.\nR: Ami hadomi Ita Boot ho neon no laran tomak.\n\nD: Ita Boot haraik Lia Fuan Salvação nian mai mundo,\nR: Halo ami sai ida deit ho Ita Boot.\n\nD: Haraik Espírito Nai Jesus nian mai ami.\nR: Atu Ita Boot Nia naran ami hahi ba nafatin. Amém.\n\n<b>Ami Aman</b>\n\nAmi Aman be iha lalehan, halo ami hahi hanai Ita naran. Halo Ita nia Reino to'o mai ami. Ita nia hakaran halo tuir ba iha rai nu'udar iha lalehan.",
  },
  "Às Refeições": {
    id: "as_refeicoes",
    section: "Durante o Dia",
    label: "Iha Hahan nian",
    content:
      "<i>Antes:</i>\nNa'i, fó bensaun ba hahan ne'ebé ami atu foti, atu ami bele serví no hadomi Ita-Boot di'ak liu tan. † Amen.\n\n<i>Depois:</i>\nHa'u fó agradese ba Ita-Boot, ha'u-nia Maromak, ba hahan ne'ebé Ita-Boot haraik mai ha'u, maski ha'u la merese. † Amen.",
  },
  "No Trabalho": {
    id: "no_trabalho",
    section: "Durante o Dia",
    label: "Iha Servisu nian",
    content:
      "<i>Halo tuir buat ne'ebé Ita-nia Nain Feto Fátima husu:</i>\n\n«Dehan beibeik, liuliu bainhira ita halo sakrifísiu ruma:</i>\n\n— <b>Ó Jesus, ne'e tanba Ita-Boot nia domin, tanba ema maksalak sira-nia konversaun no hodi selu fali sala sira ne'ebé halo kontra Maria nia Fuan Sala-laek</b>».\n<i>Ou:</i>«<b>Buat hotu ba Ita, Jesus nia Fuan Santu</b>».",
  },
  "Nas Tentações": {
    id: "nas_tentacoes",
    section: "Durante o Dia",
    label: "Iha Tentasaun sira",
    content:
      "«Hadeer no harohan atu la bele monu ba tentasaun» – Jesus dehan (Mt 26, 41).\nHadeer, katak, sees hosi buat ne'ebé bele lori ita ba sala: programa televizaun balu, diskoteka sira, espetákulu sira, lee-na'in sira, kous-na'in sira, halimar ne'ebé demais, han no hemu demais, belun sira ne'ebé la di'ak...\nHarohan, katak, reza. Dehan bá: «Jesus, Maria, José!» ou: «Na'i, keta husik ami monu ba tentasaun!»",
  },
  Leitura: {
    id: "leitura",
    title: "Lee nian",
    section: "Durante o Dia",
    label: "Lee nian",
    content:
      "Lee neineik livru espirituál ruma, liuliu Bíblia: «Eskritura hotu-hotu ne'ebé Maromak leno, util ba hanorin, ba korigi, ba edukadu iha santidade» (2 Tm 3, 16-17). «Ba Nia ita ko'alia bainhira ita harohan; ba Nia ita rona bainhira ita lee Nia liafuan».",
  },
  "A Jesus Misericordioso": {
    id: "jesus_misericordioso",
    title: "Ba Jesus Mizerikordiozu",
    section: "Durante o Dia",
    label: "Ba Jesus Mizerikordiozu",
    content:
      "<b>Aktu Dedikasaun nian:</b>\nÓ Jesus, Ita-Boot nia laran-di'ak rohan-laek no Ita-Boot nia grasa nia riku-soin nunka hotu. Ha'u fiar tomak iha Ita-Boot nia Mizerikórdia.\n\n<b>Tersu Mizerikórdia nian:</b>\n<i>[Ami Aman – Ave Maria – Kredo]</i>\n\n<b>Iha kontas boot sira:</b>«Aman Eternu, ha'u hasa'e ba Ita-Boot Isin, Ran, Klamar no Divindade hosi Ita-Boot nia Oan Doben, ami Na'i Jesus Kristu, hodi selu ami-nia sala sira no mundu tomak nia sala sira».\n\n<b>Iha kontas ki'ik sira:</b>Tanba Nia Terus ne'ebé todan liu, hadomi ami no mundu tomak.\n\n<b>Iha rohan:</b> «Maromak Santu, Maromak Kbiit-wa'in, Maromak Moris nafatin, sadi'a ami no mundu tomak».",
  },
  "Orasaun Kalan Nian": {
    id: "orasaun_kalaun_nian",
    section: "Orasaun Kalan Nian",
    content:
      "Ha’u nia Maromak, ha’u ata adora Ita Boot ho ha’u nia laran tomak. Ha’u agradese Ita Boot tanba Ita Boot halo ha’u, halo mos ha’u sai sarani, halo ha’u moris loron ida ne’e tan. Perdua sala hot-hotu ha’u ata halo ohin ne’e; ha’u halo diak ruma karik, ha’u hasa’e ba Ita Boot, hodi husu deit Ita Boot nia grasa. Ha’u ata ba toba, Ita Boot hare didiak ha’u. Keta husik ha’u monu ba tentasaun ruma. Na’i Maromak, haraik Ita Boot nia tulun no Ita Boot nia bensa mai ha’u, ba ha’u nia parente sira no ba ema hot-hotu. \n<b>Amen.</b>",
  },
  "Sagrada Comunhão — Preparação": {
    id: "sagrada_comunhao_preparacao",
    section: "Komuñaun Santíssima",
    label: "Komuñaun Santíssima",
    content:
      "Na'i, ha'u fiar iha Ita-Boot, maibé hametin ha'u-nia fiar!\nNa'i, ha'u hein iha Ita-Boot, maibé hametin ha'u-nia esperansa.\nNa'i, ha'u hadomi Ita-Boot, maibé hametin ha'u-nia domin!\n\nMai, ó Jesus, mai hamos ha'u. Mai, ó ha'u-nia Tulun-na'in, no ajuda ha'u. Mai, ó Doutór divinu, no hai-di'ak ha'u. Mai, ó ha'u-nia Liurai, no ukun iha ha'u. Mai, ó ha'u-nia Na'i, no fó bensaun mai ha'u. Virjem Santíssima, mai tulun ha'u atu simu Jesus. Anju Santu ha'u-nia hein-na'in, mai prepara ha'u.",
  },
  "Acção de Graças": {
    id: "accao_de_gracas",
    section: "Komuñaun Santíssima",
    label: "Grasa nian (Komuñuan)",
    content:
      "<b>Jesus hela iha ha'u laran</b>\nJesus, ha'u-nia Na'i no ha'u-nia Maromak! Ó Jesus, Ita-Boot mai iha ha'u-nia hirus-matan: ha'u fó agradese rohan-laek ba grasa ne'e – Ó Jesus, Ita-Boot hela iha ha'u laran no ha'u hela iha Ita-Boot laran – Ó Jesus, rai ha'u nafatin iha Ita-Boot nia grasa – Ó Jesus, fó kbiit mai ha'u kontra tentasaun sira – Ó Jesus, halo ha'u hakribi sala – Ó Jesus, labele husik ha'u haketak an hosi Ita-Boot nunka tan – Ó Jesus, di'ak liu mate duké lakon Ita-Boot – Ó Jesus, halo ha'u-nia mate nudar ema santu ida nian.",
  },
  "Alma de Cristo": {
    id: "alma_de_cristo",
    section: "Komuñaun Santíssima",
    label: "Kristu nia Klamar",
    content:
      "Kristu nia Klamar, santifika ha'u.\nKristu nia Isin, salva ha'u.\nKristu nia Ran, enxe ha'u-nia fuan.\nUé hosi Kristu nia sorin, fase ha'u.\nKristu nia Terus, koforta ha'u.\nÓ Jesus di'ak, rona ha'u.\niha Ita-Boot nia kanek sira subar ha'u.\nLabele husik ha'u haketak an hosi Ita-Boot.\nHosi inimigu aat, defende ha'u.\nIha ha'u-nia mate nia oras, bolu ha'u.\nNo haruka ha'u ba Ita-Boot, atu nune'e ha'u bele hahí Ita-Boot hamutuk ho Ita-Boot nia santu sira, ba sékulu hotu-hotu. Amen.",
  },
  Reparação: {
    id: "reparacao",
    section: "Komuñaun Santíssima",
    label: "Reparasaun",
    content:
      "Ha'u-nia Maromak, ha'u fiar, ha'u adora, ha'u hein no ha'u hadomi Ita-Boot. Ha'u husu perdaun ba sira ne'ebé la fiar, la adora, la hein no la hadomi Ita-Boot.\n\nSantíssima Trindade, Aman, Oan, Espíritu Santu, ha'u adora Ita-Boot ho laran tomak no ha'u hasa'e Isin, Ran, Klamar no Divindade folin-boot liu hosi Jesus Kristu ne'ebé prezente iha sakráriu hotu-hotu iha rai, hodi selu ofensa sira, sakriléju no indiferensa sira ne'ebé Nia rasik simu. No tanba Nia Fuan Santíssimu no Maria nia Fuan Sala-laek nia merese rohan-laek, ha'u husu ema maksalak sira-nia konversaun.",
  },
  "Fica, Senhor!": {
    id: "fica_senhor",
    section: "Komuñaun Santíssima",
    label: "Hela bá, Na'i!",
    content:
      "Hela bá, Na'i, hamutuk ho ha'u, tanba Ita-Boot nia prezensa presiza duni atu la bele ofende Ita-Boot. Ita-Boot hatene duni oinsá ha'u husik Ita-Boot ho fasil. Hela bá, Na'i, hamutuk ho ha'u, tanba Ita-Boot mak ha'u-nia moris no se la iha Ita-Boot ha'u sai kbiit-laek. Hela bá, Na'i, hamutuk ho ha'u, tanba Ita-Boot mak ha'u-nia Naroman no se la iha Ita-Boot ha'u hela iha nakukun laran. Hela bá, Na'i, hamutuk ho ha'u, atu fó hatene mai ha'u Ita-Boot nia hakarak. Hela bá, Na'i, hamutuk ho ha'u, atu nune'e ha'u bele rona Ita-Boot nia lian no tuir Ita-Boot. Hela bá, Na'i, hamutuk ho ha'u, tanba ha'u hakara hadomi Ita-Boot barak no hela nafatin hamutuk ho Ita-Boot.",
  },
  "Novena da Confiança": {
    id: "novena_confianca",
    section: "Novena Fiar nian",
    label: "Novena Fiar nian",
    content:
      "<center><b>Ó Jesus, ha'u entrega ba Ita-Boot nia Fuan, ha'u-nia intensaun sira.\nFila oin ba sira no ba Ita-Boot nia Fuan Santíssimu no depois halo buat ne'ebé Nia dehan ba Ita-Boot.\nÓ Jesus, ha'u kura iha Ita-Boot, ha'u fiar iha Ita-Boot, ha'u entrega-an ba Ita-Boot, ha'u fiar metin katak Ita-Boot simu ha'u. Jesus nia Fuan Santu, ha'u fiar metin iha Ita-Boot!</b></center>",
  },
  "Confiança nas Promessas de Cristo": {
    id: "confianca_promessas_cristo",
    section: "Novena Fiar nian",
    label: "Fiar iha Jesus nia Promesa sira",
    content:
      "Ó Jesus, ne'ebé dehan «husu bá no imi sei simu, buka bá no imi sei hetan, tuku bá no sei loke ba imi!» ha'u tuku, ha'u buka no ha'u husu grasa...\nJesus nia Fuan Santu, ha'u hein no fiar iha Ita-Boot.\n\n* Ó Jesus, ne'ebé dehan «buat hotu ne'ebé imi husu ba Aman iha ha'u naran, Nia sei haraik ba imi!», ba Ita-Boot nia Aman no iha Ita-Boot nia naran mak ha'u husu grasa sira...\n<i>Jesus nia Fuan Santu, ha'u hein no fiar iha Ita-Boot.</i>\n\n* Ó Jesus, ne'ebé dehan «lalehan no rai sei liu, maibé ha'u-nia liafuan sira la'ós sei liu!», fiar iha Ita-Boot nia lian ne'ebé nunka sala, ha'u husu grasa sira...\n<i>Jesus nia Fuan Santu, ha'u hein no fiar iha Ita-Boot.</i>",
  },
  "Visita ao Santíssimo Sacramento": {
    id: "visita_santissimo",
    section: "Santíssimo Sakramentu",
    label: "Vizita ba Santíssimo Sakramentu",
    content:
      "Grasa no lovór sira hasa'e iha momentu hotu-hotu, ba Santíssimo no diviníssimo Sakramentu. Ó Jesus iha Santíssimo Sakramentu, sadi'a ami.\n\nHa'u-nia Maromak, ha'u fiar, ha'u adora, ha'u hein no ha'u hadomi Ita-Boot. Ha'u husu perdaun ba sira ne'ebé la fiar, la adora, la hein no la hadomi Ita-Boot.",
  },
  "Comunhão Espiritual": {
    id: "comunhao_espiritual",
    section: "Santíssimo Sakramentu",
    label: "Komuñaun Espirituál",
    pages: [
      "<b>S. Francisco:</b> Nudar veadu hakarak ué matan sira, nune'e mós ha'u-nia klamar hakarak Ita-Boot, Na'i (Sl 41, 3). Ó Jesus, mai no moris iha ha'u.",
      "<b>Santo Afonso Maria de Ligório:</b> Ha'u-nia Jesus, Ha'u fiar katak Ita-Boot prezente iha Santíssimo Sakramentu Altár nian. Ha'u hadomi Ita-Boot liu sasan hotu-hotu, no ha'u-nia klamar hakarak Ita-Boot. Maibé tanba ha'u la bele simu Ita-Boot agora iha Santíssimo Sakramentu, mai, maski espiritualmente de'it, iha ha'u-nia fuan.",
      "<b>Card. Rafael Merry del Val:</b> Iha Ita-Boot nia ain, ó ha'u-nia Jesus, ha'u hakneak no ha'u hasa'e ha'u-nia fuan ne'ebé arrepende ona ne'ebé mout iha nia la-buat-ida iha Ita-Boot nia prezensa santa. Ha'u adora Ita-Boot iha Sakramentu Ita-Boot nia domin nian, Eukaristia kmanek liu.",
    ],
  },
  "Oração de S. Francisco": {
    id: "oracao_sao_francisco",
    section: "Santíssimo Sakramentu",
    label: "S. Francisco nia Orasaun",
    content:
      "Na'i, halo ha'u nudar instrumentu Ita-Boot nia Dame nian:\nIha ne'ebé iha odi, ha'u lori Domin.\nIha ne'ebé iha ofensa, ha'u lori Perdaun.\nIha ne'ebé iha diskórdia, ha'u lori Uniaun.\nIha ne'ebé iha dúvida, ha'u lori Fiar.\nIha ne'ebé iha erro, ha'u lori Lia-loos.\nIha ne'ebé iha desespero, ha'u lori Esperansa.\nIha ne'ebé iha triste, ha'u lori Ksolok.\nIha ne'ebé iha nakukun, ha'u lori Naroman.",
  },
  "Bênção do Santíssimo — Tantum Ergo": {
    id: "tantum_ergo",
    section: "Santíssimo Sakramentu",
    label: "Tantum Ergo",
    content:
      "Ba Sakramentu divinu\nIta adora hakneak,\nTanba hosi Testamentu Tuan\nPromesa ita simu ona,\nNo iha kumprimentu perfeitu\nAgora iha ne'e ita hetan.",
  },
  Benditos: {
    id: "benditos",
    section: "Bensaun sira",
    label: "Bensaun sira",
    content:
      "Bensaun ba Maromak;\nBensaun ba Nia Naran Santu;\nBensaun ba Jesus Kristu, Maromak loloos no mane loloos;\nBensaun ba Jesus nia naran;\nBensaun ba Nia Fuan Santíssimu;\nBensaun ba Nia Ran folin-boot liu;\nBensaun ba Jesus iha Santíssimo Sakramentu Altár nian.",
  },
  "Oração Preparação atu Confessa didiak": {
    id: "oracao_preparacao_confessa_didiak",
    section: "Konfisaun",
    label: "Oração Preparação atu Confessa didiak",
    content:
      "Maromak, Aman laran luak, tamba Ita nia domin Ita rasik promete perdão ba ema hotu nebe sala hasoru Ita Boot. No liu husi Ita nia laran sadia, Ita haraik graça ba ami ema sala nain no haraik salvação mai ami. Cristo rasik mai iha mundo, lalos ba ema nebe los, maibe atu salva ema maksalak. Husi cruz leten nia fo perdua ba ema hotu nebe halo terus Nia, basa, sira la hatene saida mak sira halo. Nia mos promete fatin rohan laek ba naok ten nebe hedi hamutuk ho Nia, dehan: \"Iha loron ida ne'e, o tama hamutuk ho Hau iha paraíso.\" Nai, tulun hau atu reconhece didiak hau nia sala, hodi bele hetan graça husi Ita Boot. Haraik kbi'it mai hau atu keta monu ba sala maibe buka hakaas-an atu moris nafatin iha Ita Boot nia presencia. Amém.",
  },
  "Confissão — Exame de Consciência": {
    id: "confissao_exame",
    section: "Konfisaun",
    label: "Ezame Konsiénsia nian",
    content:
      "Mandamentu 1.º – Ha'u harohan loroloron? Ha'u kontribui ba kultu? Ha'u ko'alia kontra Maromak ou relijiaun? Ha'u dúvida fiar? Ha'u fiar iha superstisaun? Ha'u simu komuñaun iha sala laran? Ha'u konfesa-an dala ida iha tinan ida laran?",
  },
  "Oração atu comunga didiak": {
    id: "oracao_atu_comunga_didiak",
    section: "Konfisaun",
    label: "Oração atu comunga didiak",
    content:
      "Nai Jesus, hau fiar, hau adora, hau hein no hau hadomi teb-tebes Ita Boot. Agradece ba Ita Boot nia presença real iha Hostia consagrada ne'e. Haboot hau nia fiar, atu bele brani saran hau nia domin, nudar ai-han nebe fo moris ba maluk sira. Halo hau nia fuan sai horik fatin nebe santo, atu nune'e bele hasanto mundo tomak ho hau nia presença. Halo hau brani luta nafatin ba ai-han moris rohan laek nian. Amém.",
  },
  "Oração husu benção ba hela fatin": {
    id: "oracao_husu_bencao_ba_hela_fatin",
    section: "Orasoens",
    label: "Oração husu benção ba hela fatin",
    content: `<b>Oração husu benção ba hela fatin</b>

Aman Santo kbi'it wain. Ami agradece, tan iha mundo ne'e, Ita Boot hatudu mai ami domin nebe rohan laek. Ho domin ida ne'e mak ami mos hakarak fahe ba maun alin sira, liu husi ami nia kna'ar lor-loron. Ami husu ba Ita Boot, atu hasanto ami nia moris, nomos fatin nebe ami uza atu realiza Ita Boot nia missão. Haraik benção no proteje familia ne'e, no ema hotu iha fatin ida ne'e. Hado'ok ami husi buat a'at hotu, nebe hakarak sobu no estraga ami nia vida. Hari'i iha fatin ne'e paz, unidade no domin, atu ami hotu bele hamutuk hahi Ita Boot nia naran iha ami nia moris tomak. Halo ami sai família ida deit iha Cristo, no buka nafatin horik fatin rohan laek iha Lalehan. Ami harohan ne'e hodi Nai Jesus Cristo nia naran, hamutuk ho Espírito Santo. Amém.

---

<b>Oração ba Família Nazaré</b>

Nai Jesus, Ita Boot ha-santo moris familia ho Ita nia exemplo rasik iha Família Nazare nia le'et. Nu'udar familia ida, ami halibur hamutuk iha Ita futar oin, hasae agradece ba graça wain nebe ami simu ona. Ami agradece liu-liu ba virtude diak hotu nebe Ita Boot hatudu no hamoris, nudar Oan diak iha familia Nazare nia le'et. Maske Ita Boot Maromak Oan, Ita obedece ba Jose ho Maria, haraik-an hodi rona no entrega-an atu bele hetan educação nudar Oan diak. Ami entrega ba Ita, ami ida-idak nia família, família cristã hotu iha mundo, liu-liu familia hotu iha rai Timor Leste. Haraik paz no domin ba sira, no hamahan sira ho Ita Nia Espirito Santo. Haraik kbi'it ba sira nebe hetan dificuldades iha moris hamutuk no halibur fila fali sira nebe fahe malu hodi hametin sira nia domin iha Ita Boot nia domin rasik. Atu família Nazare sai nudar exemplo domin lolos entre inan, aman no oan sira. Tulun família ida-idak atu bele sai nudar fatin kmo'ok hodi haburas fini vocação ba Santa Creda.

Maria, Inan domin nain, harohan ba Jesus Ita Oan, atu tulun ami nia família, hodi moris tuir ida-idak nia vocação. São Jose, aman nebe hakiak no tau matan ba Jesus no Maria, harohan ba aman sira hotu, atu sai aman diak, responsavel no fiel ba sira nia familia. Salva família hotu husi inimigo nebe hakarak sobu unidade familia nian no hamahan ami hotu ho graça lalehan nian. Proteje no guarda ami ida-idak nia familia, liu-liu sira nebe hetan dificuldades, moras no besik atu mate. Atu ami hotu hamutuk bele fo glória ba Maromak Trindade nebe ukun tinan ba tinan. Amém.

---

<b>Reza ba uma no família</b>

Nai Jesus Cristo, Ita Boot visita Zakeu nia uma, no halo nia consciente ba moris nebe los. Ami husu atu tama no hela iha fatin ida ne'e, hamutuk ho ami. Haraik Ita Boot nia benção ba ami hotu, atu bele koko Ita Boot nia paz, domin no hakmatek iha fatin ida ne'e. Nune'e, ami bele hawelok no hahi nafatin Ita naran iha ami nia moris tomak. Ami harohan atu domin, paz no unidade, sai nafatin ami nia ideal moris lor-loron nian iha uma ne'e. Atu nune'e, Ita Boot nia Reino bele moris duni iha ami fuan no iha ema hotu nia fuan. Ita Boot be Maromak ho Aman hamutuk ho Espírito Santo. Amém.

---

<b>Oração ba Trabalhadores sira</b>

Aman lalehan, ami hahi Ita Boot tamba hatudu-an mai ami nudar Serviço nain nebe cria no conserva criação hotu. Ita Boot bolu ami, atu colabora iha obra criação ne'e. Jesus rasik serviço maka'as hodi bele ajuda ema barak nebe precisa nia tulun. Ami agradece ba ami nia serviço nebe ami halo iha foho no cidade, nudar ema bai-bain, no nudar funcionário. Basa, liu husi serviço mak ami bele hetan ai-han lor-loron ba ami, no ba ami nia família. Hatudu mos Ita nia laran luak ba ami nia maluk sira, nebe hakarak serviço maibe laiha condição, desempregado, sira nebe moras, ferik, katuas no marginalizado sira. Ami harohan mos ba sira nebe mak iha possibilidade atu serviço, atu keta husik sira monu ba tentação injustiça no exploração. Reforça iha ami, espírito solidário ho ema hotu, atu bele hamutuk hari mundo ida ne'e. Tulun ami atu compreende katak, ami nia maun alin sira nebe mak terus tan serviço, forma ona Cristo crucificado nia isin lolon, nebe mak hakilar ba moris hias iha fraternidade no liberdade. Halo ami bele consciente katak, liu husi serviço mak ami bele ajuda hari'i Ita Boot nia Reino, nebe começa ona iha mundo ne'e, no sei completa ho Ita nia hi'it-an mai iha loron ikus. Basa, Ita deit mak Maromak nebe ukun hamutuk ho Oan no Espírito Santo. Amém.

---

<b>Oração labarik sira nian</b>

Nai Jesus, hau nia belun diak! Hau haksolok tebes ho Ita Boot nebe hadomi tebes hau. Obrigado ba moris nebe Ita Boot haraik mai hau. Obrigado ba hau nia inan, aman, maun alin, colega sira no ema hotu nebe Ita Boot tau besik ho hau. Jesus, hau agora boot dau-daun, maibe hau husu ba Ita, atu haboot mos hau nia fiar. Haraik mai hau fuan nebe nakonu ho domin no laran diak. Tulun hau atu badinas escola, ajuda hau nia inan aman, respeito ema seluk. Ajuda hau atu bele haksolok nafatin, basa, hau sei bele moris iha mundo ida ne'e. Nai Jesus, hau sei hakas-an atu bele hadomi ema hot-hotu nebe hau hasoru, hanesan Ita Boot rasik hadomi hau. Amém.

---

<b>Oração ba labarik sira (Cruzada Eucarística)</b>

Nai Jesus! Ami mak labarik nebe Ita Boot hadomi, hakarak tebes atu sai Ita Boot nia belun diak no Apóstolo. Laiha murak mean nebe ami bele oferece ba Ita Boot, maibe ami nia fuan nebe ki'ik no riku ho domin, mak sai nudar oferta nebe folin liu. Ami consagra ami nia-an tomak, hodi sai Ita Boot nia belun no missionário ki'ik, iha ami nia familia, colega no povo nia le'et. Halo ami nia-an nebe ki'ik oan, bele sai nudar instrumento paz no ksolok ba mundo, nebe lakon esperança. Ami hakarak sai nudar benção ba ami nia família, colega, Igreja no nação. Tamba ne'e, tulun ami atu badinas estuda, badinas serviço, respeita ema seluk no haksolok nafatin, hodi bele haklaken Ita Boot nia diak ba ema hotu. Ami nia oração nebe folin laek, sei sai nudar karan kmo'ok ba Ita Boot. Amém.

---

<b>Oração ba adolescente</b>

Nai Jesus, ami nudar foin sae nebe mak dala wain lakon ami nia referensia moris nian. Dala barak mosu dúvidas iha ami nia fuan, no la hetan solução. Mosu perguntas oi-oin, maibe susar atu hetan resposta ba ami nia moris. Tamba ne'e, dala barak mosu sentimento nakukun no tauk, nebe teri netik ami nia criatividade nudar foin sae nebe nakonu ho entusiasmo. Haraik graça mai ami, atu banati tuir Ita atan São Domingos Savio no Santa Maria Gorrete nia exemplo, hodi luta nafatin ba ideal adolescente nian katak: "Mate bele mate, monu ba sala mak labele". Fo aten brani mai ami, atu bele halo diálogo ho ami nia inan-aman, no ema hotu nebe mak Ita tau besik ami, hodi tulun ami, hakat ba etapa juventude ho ain kaman, preparação diak, no maturidade iha moris isin no klamar nian. Hado'ok ami husi tentação hotu, nebe mak lori ami ba mate, basa, Ita deit mak Maromak nebe hakarak ema hotu nia diak no ksolok. Amém.

---

<b>Oração ba jovem sira</b>

Maromak domin nain! Ami husu Ita Boot nia tulun ba ami jovem sira. Atu força nebe juventude iha, bele orienta ba buat nebe diak hodi hari'i ami nia Igreja, Nação no mundo. Atu ami nia mehi hodi hari'i mundo nebe furak, bele realiza duni ho esforço lor-loron nian. Tulun ami atu bele fo-an nafatin ba ideal nebe mak ami iha, maske dala wain hasoru dificuldades barak. Tulun atu jovem ida-idak bele ho fuan nakloke, hatan ba Ita Boot nia bolu, tuir ida-idak nia dalan, atu Ita Boot nia plano bele realiza duni iha ami nia moris. Ajuda ami atu hari'i moris ne'e iha Ita Boot nia graça, nebe mak laiha rohan. Tulun, atu liu husi entusiasmo nu'udar jovem, bele hafoun mundo nebe mak moris iha terus laran. Conserva nafatin ami nia coragem atu fo-an tomak hodi servi Ita Boot liu husi maluk sira nebe moras, terus no laiha esperança. Halo ami sai ema nebe aten brani, buka hadomi no reconhece nafatin Ita Boot nia presença iha fatin hot-hotu. Amém.

---

<b>Oração ba ferik-katuas sira</b>

Nai Jesus, ami husu benção especial ba ami nia maluk sira nebe mak to'o ona iha idade ferik katuas. Wainhira sira hanoin hikas ba kotuk, iha experiencia barak teb-tebes. Tan ne'e, ajuda sira atu hanoin nafatin Ita Boot nia presença iha momento hot-hotu. Haraik saúde isin no klamar nian ba sira. Tane nafatin sira iha momento terus ne'e nia laran, liu-liu wainhira sira sente fraco no terus. Sai nafatin sira nia mahein wainhira sira sente tauk no mesak. Tulun sira atu hatene fo perdua ba maluk sira nebe mak halo kanek sira nia fuan, ho hahalok no lian kroat. Agradece wain tebes ba Ita Boot nia presença, nebe mak nunca husik sira lao mesak. Ita Boot nia Espírito sempre renova sira nia fraqueza, haforça sira nia kbi'it laek no halo sira cumpre duni sira nia missão nebe mak Ita Boot rasik fo fiar ba sira. Halo ami hotu bele sente duni Ita Boot nia domin rohan laek nebe mak sei la husik ami hanesan oan kiak. Amém.

---

<b>Oração kaben nain sira nian</b>

Obrigado Nai, ba domin nebe halibur ami. Haraik benção ba domin nebe ami iha ba malu, atu lor-loron bele sai foun no criativo liu tan. Renova ami nia entusiasmo, atu bele metin nafatin iha momento ksolok no terus nia laran. Haboot ami nia fiar no esperança iha Ita Boot. Loke ami nia fuan, atu bele hadomi no compreende ema hotu nebe ami hasoru iha ami nia moris, no criativo atu lolo liman hodi ajuda maluk sira nebe terus. Renova ami nia moris, atu bele transforma sociedade ida ne'e, no buka atu sai nafatin promotora ba paz no harmonia, nudar Ita Boot nia oan nebe livre no consciente. Haraik benção mos ba kaben nain hot-hotu, nebe mak tau fiar no confiança iha Ita Boot, atu união nebe iha bele metin to'o rohan, basa, "ema nebe Ita Boot tau hamutuk tan domin, laiha ema ida nebe iha direito atu hafahe." Amém.

---

<b>Oração ba funcionário</b>

Nai Jesus, hau agradece tan hau bele moris iha mundo ne'e. Obrigado ba kna'ar nebe hau hetan, atu bele contribui ba desenvolvimento hau nia nação no Igreja. Agradece ba hau nia serviço, nudar dalan atu bele sustenta hau nia moris no hau nia família. Hau agradece ba hau nia belun sira, nebe luta hamutuk ho hau, basa, liu husi sira mak hau bele aprende, oin sa fahe Ita Boot nia domin no laran luak. Haraik graça mai hau, atu hetan saúde diak, salário nebe justo, capacidade intelectual no espíritual, atu bele moris ho ksolok iha mundo ne'e. Tau matan ba hau nia família ida-idak, atu inimigo keta sobu ami nia unidade, no Ita Boot bele sai nudar centro husi ami nia moris. Atu nune'e, serviço hotu nebe ami halo, bele buka hahi Ita Boot no fo ksolok ba ema hotu. Amém.

---

<b>Oração ba Apostolado de Oração</b>

Aman Maromak, Ita hakiak iha ami nia fuan fini fiar nian nebe mak sai nudar fundamento ba ami nia moris. Ami agradece tamba ami bele hola parte iha Ita nia Missão salvação nudar Apostolado de Oração. Tulun ami, atu bele sai Apóstolo nebe mak brani haklaken Ita Boot liu husi ami nia oração lor-loron, reza terço, adoração ba Santíssimo Sacramento no devoção ba Jesus nia Futar Fuan Santo, nebe sai nudar sinal domin rohan laek ba ami ema maksalak. Halo ami reconhece nafatin Cristo nia presença real iha Santissimo Sacramento, iha ami nia fuan no iha maun alin sira nia moris. Ami hakarak tebes atu sai Apóstolo nebe diak, reza badinas no nakloke hodi tulun ema hotu. Ami hahi no hawelok Ita Boot, ohin no ba nafatin. Amém.

---

<b>Oração ba moras sira</b>

Nai Jesus, Ita Boot mak médico no especialista nebe ami reconhece. Wainhira sei iha mundo, Ita lao ba fatin-fatin hodi fo isin diak ba moras sira, matan delek sira hare, tilun diuk sira rona, ain kudek sira lao fila fali, no ema nebe terus, bele hetan fali ksolok. Haraik mai ami saúde isin no klamar nian <i>(liu-liu ba... temi intenção)</i>. Tulun ami, atu pronto nafatin hodi simu Ita Boot nia hakarak ba ami ida-idak, nune'e ami nia fuan bele livre hodi entrega-an tomak ba Ita Boot. Ami hakarak consagra ami nia terus ne'e hamutuk ho Ita Boot nia terus iha cruz. Basa, Ita rasik hatudu katak, terus lalos castigo maibe, sai nudar dalan atu hetan glória rohan laek. Amém.

---

<b>Reza ba matebian</b>

Aman Maromak rohan laek, ami entrega ba Ita liman, ami nia maluk matebian sira nebe mate ona iha Cristo <i>(liu-liu ba...)</i>, atu hamutuk ho Nia bele moris hias ba moris rohan laek. Hamos sira nia sala no simu sira iha ksolok lalehan, hodi nune'e bele reza tulun nafatin mai ami iha mundo ne'e. Nai Maromak fo sira hetan rahun diak nafatin. Halo Ita Boot nia naroman leno nafatin ba sira. Halo sira descança ho Paz. Amém.

---

<b>Nai Jesus Futar Fuan Santo</b>

Nai Jesus Futar Fuan Santo! Iha Ita Boot ami tau ami nia confiança. Basá, Ita rasik hatudu mai ami, domin nebe rohan laek, maske ami ema sala nain. Ami hakarak renova iha ami nia-an, Ita Boot nia convite: "Hakbesik mai Hau, imi hotu nebe kolen no terus, basá, Hau sei fo kman ba imi. Simu Hau nia ukun ba hodi banati tuir Hau, tan Hau laran kmaus no haraik-an, no imi nia klamar sei hetan hakmatek" <i>(Mt 11, 28-29)</i>.

Nai Jesus, Ita Boot nia Fuan nebe nudar ema lolos no Maromak lolos, hatudu Mistério Aman lalehan nian mai ami, no convida ami atu fila ba dalan los. Haraik mai ami paz no esperança. Liu husi Ita nia Fuan nebe sona borus iha cruz mak moris Igreja no Sacramento sira. Ami hakarak hetan força husi be matan salvação ne'e. Haraik mai ami, fuan nebe amigo atu halo belun ho ema hotu. Fuan nebe fiel maske hasoru desafios barak. Haraik mai ami fuan nebe foun, fuan nebe haraik-an, hodi buka diak ba ema hotu. Fuan nebe nakonu ho dame, atu bele haklaken ba mundo nebe terus tan funu no injustiça. Fo mai ami fuan nebe hatene perdua, wainhira ema halo kanek. Ami hakarak tebes atu aprende husi Ita Boot nia Futar Fuan Santo nebe ki'ik, maibe riku ho domin ba ami ema maksalak. Amém.

---

<b>Oração ba Santíssima Trindade</b>

Glória ba Aman, nebe mak ho nia força rasik, halo hau nudar nia imagem. Glória ba Jesus Cristo nebe mak ho domin, liberta hau husi sala nakukun no loke odamatan lalehan nian mai hau. Glória ba Espírito Santo nebe mak ho nia laran luak, halo Santo hau nia moris, no continua nafatin obra santificação ne'e iha mundo, ho nia kmanek santo sira nebe mak hau bele koko lor-loron. Hahi no hanai ba Trindade Santa nebe mak halo hau, salva hau, santifica hau no ukun hau, ohin no ba nafatin. Amém.

---

<b>Oração ba Sagrada Família</b>

Sagrada Família de Nazaré, Jesus, Maria no José. Família perfeita nebe Aman Maromak hadomi, hili no acompanha hodi sai modelo ba família hot-hotu iha mundo ne'e. Família nebe mak iha nia le'et, Maromak rasik mak ukun, tahan no orienta. No familia nebe mak lori iha nia-an Maksoin nebe soi ema hotu. Hanorin ami nia família, atu sai horik fatin ba domin, paz, unidade no responsabilidade. Tulun ami atu sai sinal salvação, ba família hotu liu husi ami nia sasin moris, maske ami hatene katak ami sei la moris perfeito hanesan Sagrada Família Nazaré. Hanorin ami lor-loron atu reconhece Aman Maromak nia liman fatin iha ami nia kna'ar nudar inan, aman no oan. Atu nune'e ami hotu bele lao hamutuk, fo liman ba malu, tulun malu no perdua malu, maske hasoru dificuldades oi-oin. Halo ami nia família sai nudar família nebe reza, agradece no hadomi nafatin Maromak nu'udar centro husi ami nia moris lor-loron. Amém.

---

<b>Oração ba Nain Feto</b>

Ami nia Inan domin nain! Halo ami hatene hadomi no hamoris domin iha ami fuan, atu bele hadomi Maromak liu sasan hotu no hadomi ami nia maun alin sira nudar ami nia-an rasik.

Ita mak Inan Esperança! Halo ami nia moris nakonu ho esperança no sai esperança ba mundo nebe terus. Ita deit mak Inan Justiça nain! Tulun ami atu la halo julgamento ba ema seluk, maibe buka atu hari'i justiça iha mundo. Ita mak Inan nebe hadomi silêncio, no iha hakmatek nia laran buka atu rai didiak Maromak nia Lia Fuan. Hanorin ami atu hatene hadomi ami nia momento silencio. Katak silêncio mak rai bokur nebe fo possibilidade atu Maromak nia Lia Fuan bele renova no transforma ami.

Ita mak Inan nebe hadomi lialos! Hanorin ami sai ema nebe hadomi lialos, transparente no hadook ami hosi hipocrisia no bosok. Inan moris nain, hado'ok ami husi mate, sala no egoismo nia ukun atu nune'e ami bele moris deit ba buat nebe essencial, brani hatan "SIM" ba Maromak nia bolu. Inan doben, tulun ami atu nakloke ba mundo nia precisa, sai ema nebe livre hodi hamutuk hari'i Reino Maromak nian. Amém.

---

<b>Oração ba Arcanjo sira (Miguel, Gabriel no Rafael)</b>

Arcanjo Miguel, Gabriel no Rafael, ami hahi Ama lalehan nia presença, liu husi imi nia tulun iha ami nia moris tomak. Ami agradece ba São Miguel, nebe luta nafatin hodi halakon espírito a'at nia babeur husi ami. Hadook husi ami nia hanoin, ódio, vingança, laran moras no hanoin a'at hotu nebe hado'ok ami husi Aman Maromak nia presença.

Ami agradece ba São Gabriel nebe lori notice kmanek ba Nain Feto hodi dehan: "Ave Graça barak liu, Nai Maromak ho Ita Boot." Liu husi diálogo nebe furak, Maria pronto atu sai Inan nebe hahoris Maksoin ba mundo. Harohan mai ami hamutuk ho Inan Doben Maria Santíssima atu ami nia fiar bele sai nabilan ba mundo.

Ami agradece ba São Rafael, nebe sempre pronto iha Nai Nia presença, hodi haraik tulun no fo orientação ba ema hotu hanesan ba Tobias. Orienta mos ami nia família atu moris iha domin, paz, no unidade. Atu liu husi kna'ar nebe Aman Maromak haraik ba imi, bele orienta ami iha dalan los, hodi ba hetan salvação rohan laek hamutuk ho Cristo ami Nai. Amém.

---

<b>Oração ba São Pedro no São Paulo</b>

Aman lalehan! Ami hahi Ita Boot, tamba hili São Pedro no São Paulo atu sai nudar ai-rin boot ba Igreja Jesus Cristo nian. São Pedro nebe mak hetan confiança atu kaer chave lalehan nian, no Jesus confia Igreja ba nia liman hodi sai nudar Amu Papa primeiro iha Roma. Nia nebe brani fo-an ba mate tan haklaken fiar nebe los, maske la soi atu ema hedi nia hanesan ho nia Mestre. São Paulo nebe mak sai nudar missionário itinerante, serviço la kolen, brani hasoru desafio hot-hotu, lao husi fatin ba fatin atu hari'i no anima Comunidade Cristã nebe mak fiar iha Jesus Cristo. Ema dadur nia maibe brani nafatin tamba Espírito Santo nebe anima nia moris.

Ami harohan ba Ita Boot, atu ami bele moris tuir espírito husi São Pedro no São Paulo nian. Tulun ami atu sai Cristão Católico nebe aten brani, hodi haklaken ami nia fiar iha família, iha Igreja no iha society nia le'et. Haburas no conserva fiar nebe existe ona iha comunidade ida-idak, atu ami hotu hamutuk bele luta ba objetivo nebe hanesan, katak Jesus Cristo mak sai nudar centro ba atividade hotu nebe ami halao. Halo ami consciente katak, ami mak forma Cristo nia isin lolon iha Igreja, tamba ne'e ami hotu iha responsabilidade ba Ita Boot nia Missão nebe confia ami nia fuan nakloke nafatin ba Ita Boot nia graça, no ba maluk sira nebe precisa ami nia ajuda, atu nune'e, Ita Boot Nia Reino bele hari'i iha mundo ohin loron, no iha ema ida-idak nia fuan. Amém.

---

<b>Oração ba São Miguel</b>

São Miguel, tulun no tahan ami iha ami nia luta hasoru inimigo no espírito a'at nia babeur. Ho haraik-an ami harohan, atu Maromak hado'ok tentação hotu husi ami, no ita nudar ulun boot husi soldado lalehan nian, atu ho Maromak nia tulun, bele hado'ok husi mundo ne'e, espírito a'at hotu nebe hakarak halakon klamar sira be luta nafatin hodi moris diak no santo iha isin no klamar. Amém.

---

<b>Oração São José</b>

Glorioso São José! Ami hahi Ita nebe hetan premio lalehan, tamba sai aman nebe simples, obediente no paciencia hodi hakiak Jesus. Ita boot hadomi kna'ar lor-loron nudar dalan atu hetan santidade. Maske la compreende Plano Maromak nian maibe, Ita Boot nakloke nafatin hodi tulun Nain Feto ho Jesus wainhira hasoru dificuldades.

São José, Ita Boot mak aman nebe badinas tebes no buka sustenta família Nazaré liu husi serviço simples nudar badaen. Ami hili Ita Boot nudar ami nia protetor, hodi reza tulun ba ami nia família, atu bele lao tuir Ita Boot nia exemplo. Tulun ami atu hatene agradece no hadomi ami nia serviço lor-loron, hodi hili justiça nudar ami nia ideal moris, basa, Ita mak Aman nebe justo. Ami fiar katak ita sei sai nafatin aman nebe fiel hodi lori ami nia harohan ba to'o Cristo nebe ukun tinan ba tinan. Amém.

---

<b>Sant'Ana, harohan mai ami</b>

Santa Ana, Virgem Maria nia inan. Harohan ba serviço nain sira, atu rona no halo tuir Maromak Nia hakarak, iha moris lor-loron. Tulun familia cristã sira, atu bele sai fatin diak ba fini fiar nian. Bolu mos husi sira nia le'et, foin sae sira nebe ho laran luak, saran-an hodi servi Maromak Nia Reino. Haraik ba família ida-idak, consciência foun katak Missão Jesus nian, sai mos nudar missão ema sarani hot-hotu nian. Santa Ana, familia cristã nia tulun no mahan, harohan mai ami. Amém.

---

<b>Reza ba nação</b>

Nai Jesus Cristo, kbi'it hotu nia hun, no Liurai nação hot-hotu nian, nebe mai moris ona iha mundo ho condição nebe kiak no simples. Ita simu isin lolon saúde, educação, pastoral social, catequese no iha nebe deit. Nai, dala barak ami sente tauk, tamba Ita Boot fo fiar mai ami, Ita Boot rasik nia Missão, nu'udar riku soin nebe halot hela iha ami nia-an nebe fraco. Ami sente-an la soi, maibe ami fiar ba Ita nia Lia Fuan rasik nebe dehan: "Keta tauk, Hau sei horik nafatin ho imi to'o mundo nia rohan." Iha Ita futar oin, ami entrega ami nia capacidade no limitação hotu ba Ita Boot, atu Ita nia graça bele transforma ami nia-an tomak sai diak liu tan. Amém.

---

<b>Oração Motorista nian</b>

Nai, haraik mai hau firmeza, matan moris no neon nain wainhira hau dirige, atu hau bele to'o iha fatin ho isin diak. Hado'ok acidente hotu husi hau nia dalan. Protege ema hotu nebe mak halao viagem hamutuk ho hau. Ajuda hau atu bele centraliza hau nia concentração, respeito trânsito no nia lei sira. Halo hau bele descobre Ita nia presença liu husi ema hotu nebe hau hasoru nomos natureza nebe haleu hau. Amém.

<b>Oração ba São João Bosco</b> <i>(tradução husi lian portuguesa)</i>

Dom Bosco, Jovem sira nia Aman. Ita nia domin boot tebes ba Jesus Sacramentado no hili Maria Auxiliadora sai nudar Mestra. Ita hadomi Santa Creda no fo-an hodi servi nia to'o rohan. Ho domin ida ne'e, Ita hakarak halekar Nai nia beran ba mundo tomak hodi hari'i Sociedade Salesiana no Instituto das Filhas de Maria Auxiliadora. Ema barak nebe mak pronto nafatin atu sai nudar cooperadores iha Missão nebe Nai confia ba Ita Boot. Ami hatene katak, Ita sei harohan nafatin ba Aman Maromak mai ami, liu-liu ami husu tulun ba ami nia intenção ida ne'e... <i>(Temi Intenção)</i>.

Dom Bosco, aman laran diak. Hakiak iha ami nia fuan, espírito haraik-an, atu bele pronto nafatin hodi simu Maromak nia hakarak hanesan Nain Feto, no brani fo-an hodi servi Maromak hanesan Ita Boot. Ami hahi Maromak Trindade nebe halo kmanek oi-oin iha Ita nia moris, ohin no ba nafatin. Amém.

<i>(Ami Aman 1X, Ave Maria 3X no Glória 1X)</i>

São João Bosco, harohan mai ami. Amém.

---

<b>Oração ba São Carlos Borromeu</b> <i>(tradução husi lian portuguesa)</i>

Aman Lalehan! Conserva iha ami nia moris, espírito nebe anima ona ita atan São Carlos Borromeu. Tulun atu Santa Creda bele hafoun-an nafatin iha nia missão haklaken Cristo nia Evangelho ba mundo tomak. Ami harohan ba Ita Boot liu husi Ita atan São Carlos Boromeu nebe Ita hili, hodi servi Ita Boot nudar Bispo nebe fiel nafatin to'o rohan. Ita Boot hafutar ona nia ho virtudes no graça oi-oin. Tamba ne'e ami husu atu liu husi São Carlos Borromeu nia harohan daet, ami bele hetan tulun ba ami nia intenção ida ne'e... <i>(Temi Intenção)</i>. Haraik mai ami graça, atu bele fiel nafatin iha ami nia kna'ar lor-loron no buras nafatin iha hahalok caridade nian tuir São Carlos nia exemplo moris. Ba Ita Boot ami hasae glória no hahi, ohin no ba nafatin. Amém.

---

<b>Oração ba São João Maria Vianey</b> <i>(Tradução husi lian Portuguesa)</i>

São João Maria Vianey, Ita moris husi inan ida nebe mak iha fiar klean tebes. Wainhira sei labarik, ita iha ona devoção ba Nain Feto no Ita nia klamar inclina ona ba riku soin lalehan nian. Maibe ita mos hasoru dificuldades oi-oin husi ema barak, wainhira hakarak responde ba Vocação Maromak nian. Maske nune'e, ho Maromak nia graça Ita luta nafatin no ikus bele sai nudar Sacerdote nebe diak no perfeito. Santo Cura d'Ars, hau agradece ba exemplo moris nebe Ita hatudu, no fiar katak, ita mos conhece didiak atan hau nia mehi no luta. Tamba ne'e, hau mai ho haraik-an husu Ita nia harohan ba hau nia intenção ida ne'e <i>(temi intenção nebe hakarak reza)</i>.

<i>(Ami Aman 1X, Ave Maria 3X no Glória 1X)</i>

São João Maria Vianey, harohan mai ami.

---

<b>Oração ba Santo António de Lisboa</b> <i>(tradução husi lian Indonesio)</i>

Santo António! Ami fo honra ba Ita boot nu'udar Nai Maromak nia atan, nebe fiel no badinas. Liu husi Ita boot nia harohan, Nai Maromak halo ona milagre oi-oin iha povo nia le'et. Iha moris tomak, ita laran metin ba Maromak nia providência, hodi tulun ema ki'ik no kiak sira ho domin. Ami hakbesik ba Ita futar oin ho esperança nebe boot tebes, basa, ami reconhece graça wain lalehan nian nebe mak existe iha ita boot. Ami fiar katak, ita sei harohan mai ami, husu tulun lalehan nian ba ami nia intenção ida ne'e <i>(temi intenção)</i>. Santo António, Aman diak! Liu husi ami nia oração nebe folin laek no ami nia sacrificio lor-loron, ami hakarak oferece ba Aman Maromak hodi husu tulun ba ami nia intenção ida ne'e. "Nai, rona hau nia harohan, wainhira hau hakilar ba Ita Boot husu tulun, no tane liman ba Ita Boot nia horik fatin Santo" <i>(Salmo 28,2)</i>.

<i>(Ami Aman, Ave Maria no Glória)</i>

Santo António, harohan mai ami.

---

<b>Oração ba Santa Clara de Assis</b> <i>(Tradução husi lian Indonesio)</i>

Santa Clara de Assis! Tan deit ita nia domin ba Menino Jesus, ita brani husik buat hotu hodi entrega-an tomak ba Maromak. Harohan mai hau no ba hau nia família, graça lalehan nian. Ba Ita nia domin nebe boot ba Jesus terus nain, haraik mai hau coragem no kbi'it wainhira hasoru dificuldades oi-oin. Tan domin nebe boot ba Santa Creda, haraik mai hau fiar, esperança no caridade. Tan domin nebe boot tebes ba maun alin sira, haraik mai hau graça nebe hau precisa... <i>(Temi intenção)</i>.

Haraik tulun mai hau atu buka nafatin Maromak nia hakarak iha hau nia moris liu husi hau nia oração no sacrificio lor-loron nian. Atu Nain Feto inan sala laek, bele protege hau no hau nia família husi perigo isin no klamar nian. Amém.

<i>(Ami Aman, Ave Maria no Glória)</i>

Santa Clara de Assis, harohan mai ami.

---

<b>Oração husi São Francisco de Assis</b>

Nai, halo hau sai nudar instrumento paz nian. Wainhira existe ódio, hau lori domin. Wainhira existe hirus, hau lori perdão. Wainhira existe fahe malu, hau lori união. Wainhira existe dúvidas, hau lori fiar. Wainhira existe sala, hau lori lialos. Wainhira iha desespero, hau lori esperança. Wainhira existe triste, hau lori ksolok. Wainhira existe nakukun, hau lori naroman.

Mestri diak, tulun hau atu buka nafatin atu consola ema seluk do que consola hau-an rasik. Compreende ema seluk do que compreende hau-an rasik. Hadomi ema seluk do que hadomi-an rasik. Basa, wainhira fo mak sei hetan wain liu tan. Se mak hatene perdua mak bele hetan mos perdua. No liu husi mate deit mak bele hetan moris rohan laek.

Nai Aman lalehan nebe conhece ami nia fuan no hanoin. Laiha buat ida nebe mak hasubar-an iha Ita nia oin. Tamba Ita Boot nia laran luak no laran diak, hau husu Ita nia tulun liu husi São Francisco de Assis, ba hau nia intenção ida ne'e <i>(temi intenção...)</i>. Aman Doben, Ita nia domin ba atan hau, nunca falta maske hau ema sala nain. Tamba ne'e hau laran metin katak Ita sei atende hau nia intenção ida ne'e, tamba ita atan São Francisco nebe hakarak sai kiak hodi entrega-an tomak ba Ita nia hakarak. Amém.

<i>(Ami Aman 1X, Ave Maria 3X no Glória 1X)</i>

São Francisco de Assis, harohan mai ami.

---

<b>Oração ba Santo Maria Claret</b> <i>(Tradução husi lian portuguesa)</i>

Santo António Maria Claret! Ita be terus barak ho perseguição, atentados, ameaça oi-oin maibe tamba ita nia fiar no confiança iha Inan doben Imaculada Coração de Maria, dala barak Aman Maromak hado'ok buat a'at hotu husi ita. Harohan mai hau no hado'ok buat a'at hotu husi hau nia moris. Hado'ok mos husi hau no hau nia família, violência hotu nebe mak contra físico no moral, atu ami nia moris bele hetan ksolok. Hau hakarak reza husu Ita nia harohan daet ba intenção ida ne'e <i>(temi intenção nebe atu reza)</i>, no confia katak Aman Maromak laran luak sei haraik graça hotu nebe hau precisa tuir Nia hakarak. Amém.

<i>(Ami Aman 1X, Ave Maria 3X no Glória 1X)</i>`,
  },
  "Orasaun ba S. Sebastião": {
    id: "orasaun_sao_sebastiao",
    section: "Orasaun ba Santu sira",
    label: "Orasaun ba S. Sebastião",
    content:
      "Oh Sebastião Santo boot,\nmartir Cristo nian,\nAsu-wain defensor Santa Creda nian,\nfiar nain kumpri nain Evangelho tomak.\nO nia naran hakerek iha livro moris rohan laek\nno O nia memoria sei la lakon tinan ba tinan.\n\nHarohan mai ami ben-aventurado São Sebastião\natu ami bele hetan rahun diak\nhousi promesa Cristo nian.\n\n<b>Amen.</b>",
  },
};

function parseInlineText(input: any): React.ReactNode[] {
  if (typeof input !== "string") return [String(input || "")];
  const tokens: React.ReactNode[] = [];
  const regex = /(<\/?b>|<\/?i>|<\/?center>)/g;
  let last = 0;
  let bold = false,
    italic = false,
    center = false;
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
      </Text>,
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


export default function OracoesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const filteredPrayers = Object.values(prayers).filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (item.label || "").toLowerCase().includes(query) ||
      (item.title || "").toLowerCase().includes(query) ||
      (item.content || "").toLowerCase().includes(query)
    );
  });

  const grouped = filteredPrayers.reduce<Record<string, PrayerItem[]>>(
    (acc, item) => {
      const sec = item.section || "Orasoens";
      if (!acc[sec]) acc[sec] = [];
      acc[sec].push(item);
      return acc;
    },
    {},
  );
  const [sectionLayouts, setSectionLayouts] = useState<Record<string, number>>(
    {},
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"Orasoens" | "Devosoens">(
    "Orasoens",
  );

  const devosoensSections = [
    "Ita nia Nain Feto nia Rozáriu",
    "Tersu Mizerikórdia Divina",
    "Dalan Kruz",
    "ORAÇÃO BA VIZITA IHA FAMÍLIA",
  ];

  const handleSectionLayout = (
    sectionName: string,
    event: LayoutChangeEvent,
  ) => {
    const { y } = event.nativeEvent.layout;
    setSectionLayouts((prev) => ({ ...prev, [sectionName]: y }));
  };

  const scrollToSection = (sectionName: string) => {
    setMenuVisible(false);
    const y = sectionLayouts[sectionName];
    if (y !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y, animated: true });
    }
  };

  const currentSections =
    activeTab === "Orasoens" ? Object.keys(grouped) : devosoensSections;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>{activeTab}</Text>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.hamburgerButton}
        >
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "Orasoens" && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6b4f3a" />
            <TextInput
              placeholder="Search by title or content..."
              placeholderTextColor="#a18d7c"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#a18d7c" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Orasoens" && styles.activeTabButton,
          ]}
          onPress={() => {
            setActiveTab("Orasoens");
            setSectionLayouts({});
          }}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Orasoens" && styles.activeTabButtonText,
            ]}
          >
            Orasoens
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Devosoens" && styles.activeTabButton,
          ]}
          onPress={() => {
            setActiveTab("Devosoens");
            setSectionLayouts({});
          }}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Devosoens" && styles.activeTabButtonText,
            ]}
          >
            Devosoens
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {activeTab === "Orasoens" ? (
          Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([sectionName, items]) => (
              <View
                key={sectionName}
                style={styles.section}
                onLayout={(e) => handleSectionLayout(sectionName, e)}
              >
                <Text style={styles.sectionTitle}>{sectionName}</Text>
                {items.map((item, index) => (
                  <View key={item.id || index} style={styles.item}>
                    {(item.title || item.label) && (
                      <Text style={styles.itemTitle}>
                        {item.title || item.label}
                      </Text>
                    )}
                    {item.rubric ? (
                      <Text style={styles.rubric}>
                        {parseInlineText(item.rubric)}
                      </Text>
                    ) : null}
                    {item.content ? renderParagraph(item.content) : null}
                    {item.pages ? renderPages(item.pages) : null}
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No prayers found matching your search.</Text>
            </View>
          )
        ) : (
          <DevosoensTab
            scrollViewRef={scrollViewRef as any}
            onSectionLayout={handleSectionLayout}
          />
        )}
      </ScrollView>

      <Modal visible={menuVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Índice</Text>
            <ScrollView>
              {currentSections.map((sectionName) => (
                <TouchableOpacity
                  key={sectionName}
                  onPress={() => scrollToSection(sectionName)}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemText}>{sectionName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setMenuVisible(false)}
              style={styles.closeButton}
            >
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f7f2e8",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#ead9cf",
    shadowColor: "#4b2e1f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#4b2e1f",
    fontWeight: "500",
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#ead9cf",
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: "#f7f2e8",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6b4f3a",
  },
  activeTabButtonText: {
    color: "#9b111e",
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
    color: "#4b2e1f",
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#9b111e",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    color: "#a18d7c",
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
  },
});
