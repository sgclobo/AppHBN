import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const sections = [
    {
        "title": "RITOS INICIAIS",
        "content": "Canto de entrada.\n\n<red><b>Sinal da cruz.</b></red>\n<b>S:</b> <i>Hodi Padre,...</i>\n<b>P:</b> Amen.\n<b>S:</b> <i>Na’i Jesus Cristo nia graça, Aman Maromak nia domin, hamutuk iha Espírito Santo, horik ho imi.</i>\n<b>P:</b> Rahun-di’ak ba Maromak be halibur ita, iha Cristo nia domin.\n\n<red><b>ATO PENITENCIAL</b></red>\n<b>S:</b> <i>Maun-alin no feton sira: atu hala’o loloos mistério santo sira, hanoin lai katak ita ema maksalak.</i>\n<b>S:</b> <i>Confessa ita salan.</i>\n<b>P:</b> Ha’u confessa ba Maromak, Kbiit-tomak Na’in,\nNo ba imi, maun-alin no feton sira, katak ha’u sala fil-fila, hodi hanoin no hateten, hodi hahalok no la hala’o ha’u knaar, ha’u sala, ha’u sala tebes duni.\nTan ne’e, ha’u husu ba Santa Maria, Virgem nafatin, ba Anjo no Santo sira hotu, no mos ba imi, maun-alin no feton sira, atu harohan ba Maromak, ita Na’in, mai ha’u.\n<b>S:</b> Maromak kbiit-tomak Na’in sadi’a ita ba, perdua ita salan, lori ita ba moris rohan-laek.\n<b>P:</b> Amen\n\n<b>V:</b> <i>Na’i Sadi’a ami</i> <b>P:</b> Na’i sadi’a ami\n<b>V:</b> <i>Cristo sadi’a ami</i> <b>P:</b> Cristo sadi’a ami\n<b>V:</b> <i>Na’i sadi’a ami</i> <b>P:</b> Na’i sadi’a ami"
    },
    {
        "title": "GLÓRIA",
        "content": "<b>S:</b> <i>Glória ba Maromak iha leten aas liu,</i>\n<b>P:</b> Paz iha rai-klaran, ba ema sira be laran-di’ak.\nNa’i Maromak, Liurai lalehan, Aman Maromak kbiit-tomak Na’in: ami hawelok Ita, ami hahí Ita, ami adora Ita, ami haliban Ita, tan Ita-nia glória boot tebes.\nNa’i Jesus Cristo, Oan-mane Mesak, Na’i Maromak, Bibi-oan Maromak, Aman Maromak nia Oan: Ita be kasu mundu salan, sadi’a ami. Ita be kasu mundu salan, simu ami nia harohan. Ita be hatodan-An iha Aman nia sorin kwana, sadi’a ami.\nTan Ita mesak de’it Santo; Ita mesak de’it Na’i; Ita mesak de’it, Aas liu nobun, Jesus Cristo, hamutuk ho Espírito Santo: iha Aman Maromak nia glória. Amen.\n\n<red><b>ORAÇÃO</b></red>\n<b>S:</b> <i>Mai ita harohan..., Hodi ami Na’i Jesus Cristo, ita Oan, be Maromak ho ita, hamutuk iha Espírito Santo.</i>\n<b>P:</b> Amen.\n\n<red><b>LITURGIA DA PALAVRA</b></red>\nPrimeira leitura\n<b>L:</b> Na’i nia futar Lia.\n<b>P:</b> Agradece ba Maromak\n\n<b>Salmo.</b>\n\nSegunda leitura\n<b>L:</b> Na’i nia futar Lia.\n<b>P:</b> Agradece ba Maromak\n\n<b>Evangelho.</b>\n<b>S:</b> Na’i horik ho imi.\n<b>P:</b> Horik mos ho ita.\n<b>S:</b> Na’i Jesus Cristo nia Evangelho, tuir São N.\n<b>P:</b> Na’i Glória ba Ita.\n<b>S:</b> Lia maksoin.\n<b>P:</b> Cristo, ami hahí Ita\n\n<b>HOMILIA</b>"
    },
    {
        "title": "PROFISSÃO DA FÉ",
        "content": "<b>S:</b> <i>Ha’u fiar Maromak mesak ida de’it,</i>\n<b>P:</b> Aman Kbiit-tomak Na’in, Mahalo lalehan no rai, buat hotu be bele haré no labele haré.\nHa’u fiar Na’i ida de’it, Jesus Cristo, Maromak Oan-mane Mesak, moris nanis hosi Aman molok tempo hahú. Maromak hosi Maromak, Naroman hosi Naroman. Maromak loos, hosi Maromak loloos; Aman hako’us, la halo Nia, nia-An ida de’it ho Aman. Buat hotu halo ona hodi Nia.\nTan ita ema, atu soi ita, Nia tun ona hosi Lalehan. Hodi Espírito Santo, Nia hola isin iha Virgem Maria nia knotak, halo nia-An ba ema. Tan mos ba ita, ema hedi Nia ba cruz, iha Pôncio Pilatos nia ukun; terus, mate tiha, ema hakoi Nia.\nLiu loron tolu, tuir Escritura, Nia hahú moris-hi’as; hi’it-An ba Lalehan, he’in-An iha Aman nia sorin kwana. Nia sei mai fali ho glória, atu tesilia ba ema moris no ba ema mate; nia ukun sei rohan-laek.\nHa’u fiar Espírito Santo, Na’i be haraik moris, mai hosi Aman no Oan; ema haNa’i, haliban hamutuk ho Aman no Oan: Nia ha’e lia tun liu hosi Profeta sira.\nHa’u fiar Kreda ida-mesak, santa, católica, apostólica. Ha’u haklaken batismo ida de’it atu kasu salan. Ha’u hein moris-hi’as mate siran, no moris ida be sei mai. Amen.\n\n<red><b>Símbolo dos Apóstolos (Tempo Quaresma e Tempo da Pascoa)</b></red>\n\n<b>P:</b> <i>Ha’u fiar Maromak</i>\nAman Kbiit-tomak Na’in, Mahalo lalehan no rai; no Jesus Cristo, nia Oan-mane Mesak, ita Na’in, be ko’us ona hodi Espírito Sant nia kbiit; moris hosi Virgem Maria; terus iha Pôncio Pilatos nia ukun, hedi iha cruz, mate no hakoi tiha; tun ba mate sira hela fatin; liu loron tolu moris-hi’as; hi’it-An ba Lalehan; he’in-An iha Aman Maromak Kbiit-tomak Na’in nia sorin kwana, hosi nebé sei hi’it-An mai atu tesilia ba ema moris no ba ema mate.\nHa’u fiar Espírito Santo; santa Kreda Católica; Santo sira tulun malu; salan sira kasu ona; moris-hi’as isin nian no moris rohan-laek. Amen."
    },
    {
        "title": "ORAÇÃO DOS FIÉIS (Tempo Comum)",
        "content": "S: Creio em um só Deus,\nS: Querido povo de Deus aqui reunido, roguemos ao Senhor nossas súplicas e pedidos, dizendo:\n<b>P: Senhor, escutai a nossa prece.</b>\nLeitor: Pela Santa Madre Igreja Católica, para que siga os passos de Nosso Senhor Jesus Cristo, sendo uma Igreja servidora e missionária, nós vos pedimos:\n<b>P: Senhor, escutai a nossa prece.</b>\nLeitor: Por todos os doentes de nossa comunidade, para que Deus lhes dê saúde e paz, rezemos ao Senhor:\n<b>P: Senhor, escutai a nossa prece.</b>\nLeitor: Pelo Santo Padre o Papa, sucessor de São Pedro, para que seja um bom pastor para a vinha do Senhor, levando a Palavra de Deus aos que precisam, rezemos ao Senhor:\n<b>P: Senhor, escutai a nossa prece.</b>\nLeitor: Por todos os bispos e padres da nossa Igreja, para que sejam servos humildes e não desanimem de levar Cristo aos que precisam, rezemos ao Senhor:\n<b>P: Senhor, escutai a nossa prece.</b>\n(A comunidade pode preparar outras preces com antecedência)\nS: Possam agradar-Vos, ó Deus, as preces de vossa Igreja, para que recebamos por vossa misericórdia o que por nossos méritos não ousamos esperar. Por Cristo, nosso Senhor.\n<b>P: Amém.</b>"
    },
    {
        "title": "LITURGIA EUCARÍSTICA",
        "content": "<b>Oração sobre as oblatas</b>\n<b>S:</b> Maun-alin no feton sira, harohan ba atu Aman Maromak Kbiit-tomak Na’in bele simu karan-mutun ha’un no imi nian.\n<b>P:</b> Na’i simu netik karan-mutun ne’e hosi o liman atu hahí no hawelok nia naran, ba ita nia di’ak no ba santa Kreda hotu nian.\n\n<red><b>ORAÇÃO EUCARÍSTICA</b></red>\n<b>S:</b> Maromak horik ho imi.\n<b>P:</b> Horik mos ho ita.\n<b>S:</b> Hasa’e imi neon ba Maromak.\n<b>P:</b> Ami hasa’e ona ba Maromak.\n<b>S:</b> Mai ita agradece Na’i ita nia Maromak.\n<b>P:</b> Ne’e ita nia knaar, ita maksoin.\n\n<red><b>PREFÁCIO</b></red>\n<b>P:</b> <b>Santo, Santo, Santo</b> Na’i Maromak kbiit-tomak Na’in.\nLalehan no rai haklaken ita glória.\nHosana leten aas ba.\nDiak tebes Ida be mai hodi Na’i nia naran.\nHosana leten aas ba.\n\n<red><b>CONSAGRAÇÃO</b></red>\n(S: Vós, Senhor, sois verdadeiramente santo... )\n<b>S:</b> Mistério fiar nian.\n<b>P:</b> Na’i, ami fo hatene ita nia mate, ami haklaken ita nia moris-hi’as. Na’i Jesus, hi’it-An mai!"
    },
    {
        "title": "MEMORIAL E INTERCESSÕES",
        "content": "S: Celebrando agora, Senhor, o memorial da morte e ressurreição de vosso Filho, nós Vos oferecemos o pão da vida e o cálice da salvação e Vos damos graças porque nos admitistes à vossa presença para Vos servir nestes santos mistérios. Humildemente Vos suplicamos que, participando no Corpo e Sangue de Cristo, sejamos reunidos, pelo Espírito Santo num só corpo. Lembrai-Vos, Senhor, da vossa Igreja, dispersa por toda a terra, e tornai-a perfeita na caridade em comunhão com o Papa N., o nosso Bispo N. e todos aqueles que estão ao serviço do vosso povo. Lembrai-Vos também dos nossos irmãos que adormeceram na esperança da ressurreição, e de todos aqueles que na vossa misericórdia partiram deste mundo: admiti-os na luz da vossa presença. Tende misericórdia de nós, Senhor, e dai-nos a graça de participar na vida eterna, com a Virgem Maria, Mãe de Deus, os bem-aventurados Apóstolos e todos os Santos que desde o princípio do mundo viveram na vossa amizade, para cantarmos os vossos louvores, por Jesus Cristo, vosso Filho."
    },
    {
        "title": "DOXOLOGIA FINAL",
        "content": "S: Por Cristo, com Cristo, em Cristo, a Vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda a honra e toda a glória agora e para sempre.\n<b>P: Amen.</b>"
    },
    {
        "title": "RITOS DA COMUNHÃO",
        "content": "<b>Pater noster</b>\n<b>S:</b> Tuir Maksoi hanorin, ita barani harohan:\n<b>P:</b> Ami Aman, be iha lalehan,\nhalo ami hahí-hana’i Ita naran,\nhalo Ita nia reino to’o mai ami;\nIta nia hakaran halo tuir ba iha rai nu’udar iha lalehan.\nOhin ne’e haraik aihan lor-loron nian mai ami;\nharaik perdão mai ami salan, nu’udar ami perdua ema halo aat ami;\nlabele husik ami monu ba tentação;\nmaibé hasai ami hosi aat.\n\n<b>S:</b> Na’i, hasai ami hosi aat tomak…\n<b>P:</b> Ita mak Ita mak Liurai, Ita mak ukun ho kbiit-liurai ba nafatin.\n\n<red><b>SINAL DA PAZ</b></red>\n<b>S:</b> Ita be Maromak ho Aman hamutuk iha Espírito Santo.\n<b>P:</b> Amen.\n<b>S:</b> Na’i nia damen horik nafatin ho imi.\n<b>P:</b> Cristo-Nia domin halo ita hamutuk ona.\n\n<red><b>CORDEIRO DE DEUS</b></red>\n<b>P:</b> Bibi-oan Maromak nian be kasu mundo salan, sadi’a ami.\nBibi-oan Maromak nian be kasu mundo salan, sadi’a ami.\nBibi-oan Maromak nian be kasu mundo salan, haraik damen mai ami.\n\n<red><b>CONVITE À COMUNHÃO</b></red>\n<b>S:</b> Rahun-di’ak ba sira be tene ona ba Han-kalan Na’i nian. Ne’e ha’e Bibi-oan Maromak, be kasu mundo salan.\n<b>P:</b> Na’i, ha’u la so’i Ita-Boot hi’it-An mai ha’u horik-fatin maibé, Ita-Boot dehan de’it liafuan ida, ha’u sei hetan maksoin.\n\n<red><b>COMUNHÃO</b></red>\nS: O Corpo de Cristo.\n<b>P: Amen.</b>"
    },
    {
        "title": "RITOS FINAIS",
        "content": "<b>S:</b> Maromak horik ho imi.\n<b>P:</b> Nia horik ho ami.\n<b>S:</b> Missa hotu ona ba ho Maromak.\n<b>P:</b> Kmanek wa’in ba Maromak."
    }
];

function parseInlineText(input: string): React.ReactNode[] {
    const tokens: React.ReactNode[] = [];
    const regex = /(<\/?b>|<\/?i>|<\/?center>|<\/?red>)/g;
    let last = 0;
    let bold = false;
    let italic = false;
    let center = false;
    let red = false;
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
                    red && styles.redText
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
        else if (match === "<red>") red = true;
        else if (match === "</red>") red = false;
        last = offset + match.length;
        return match;
    });

    pushText(input.slice(last));
    return tokens;
}

export default function DoaScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.pageTitle}>Missal Romano</Text>

            {sections.map((section, index) => (
                <View key={index} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <Text style={styles.sectionText}>{parseInlineText(section.content)}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f2e8",
    },
    content: {
        padding: 16,
        paddingBottom: 28,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#4b2e1f",
        marginBottom: 16,
        textAlign: "center",
    },
    section: {
        marginBottom: 18,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#e5d5c7",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#c1121f",
        marginBottom: 8,
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 25,
        color: "#2b2b2b",
        textAlign: "justify",
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
    redText: {
        color: "#c1121f",
    }
});
