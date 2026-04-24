import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const sections = [
  {
    title: "Misaun",
    content:
      "Aplikativu ida ne'e dezenvolve ho objetivu atu suporta moris orasaun nian no fasilita asesu ba orasaun no kântikus Katóliku sira, halibur konteúdu iha lian oioin no kontestu kulturál Timor-Leste nian. Nia objetivu atu tulun sarani sira reza kle’an liután, partisipa kle\’an liután iha liturjia, no hametin sira-nia fiar iha moris loroloron nian.",
  },
  {
    title: "Dezenvolvimentu",
    content:
      "Aplikativu ida ne'e dezenvolve hosi TimorApps, ho objetivu atu tau teknolojia iha servisu fiar nian, promove asesu simples, organizadu, no dignu ba rekursu espirituál sira Kreda nian.",
  },
  {
    title: "Objetivu",
    list: [
      "Atu fornese orasaun no kântikus Katóliku nian ne'ebé organiza tuir kategoria",
      "Atu apoia partisipasaun iha Santa Missa no estasaun litúrjika oioin",
      "Atu promove uza lian oioin, inklui Tetum, Portugés, Inglés, no Bahasa Indonesia",
      "Atu serve hanesan instrumentu ba formasaun espirituál no devosaun pesoál",
    ],
  },
  {
    title: "Kolaborasaun no sujestaun",
    content:
      "Aplikativu ida ne'e iha dezenvolvimentu kontínuo nia laran. Partisipasaun utilizadór nian esensiál ba ninia melloramentu.",
    list: [
      "Sujere kântiku ka orasaun foun",
      "Hadia erru  ne'ebe identifika",
      "Kontribui ho tradusaun",
      "Haruka komentáriu ou proposta melloramentu",
    ],
  },
  {
    title: "Kontaktu",
    content: "Email: timordigitalnet@gmail.com\nWhatsApp: +670 7848 2777",
  },
  {
    title: "Nota",
    content:
      "Aplikasaun ida ne'e destina ba uzu pesoál no komunidade nian hanesan ajuda ba orasaun. Nia la substitui livru litúrjiku ofisiál Igreja Katólika nian.",
  },
  {
    title: "Versaun",
    content: "Versaun 1.0",
  },
];

const guideSections = [
  {
    icon: "calendar-outline",
    title: "1. Kria Eventu Favoritus",
    content:
      'Haneha tab "Kântikus" depois hili tab "Favoritus". Haneha "+ Create new event", depois hatama eventu nia naran (ez.:. "Misa Aniversariu Maria Brites") depois hili tipu eventu. Haneha Save atu kria eventu. Wainhira Save tiha ona, eventu nee automatikamente sai Active Event )eventu ativu=',
  },
  {
    icon: "musical-notes-outline",
    title: "2. Hili kântikus ba eventu",
    content:
      'Haneha iha tab  "Lista". Buka kântikus neebé hakarak husi lista ba parte misa relevante (Entrada, Salmo Responsorial, etc.). Klik iha  ikon fitun ( ★ Adisiona ba Favoritus) atu hatama kantiku nee ba parte misa relevante.',
  },
  {
    icon: "save-outline",
    title: "3. Save Eventu",
    content: "Kântikus selesionadu sira sei salva automaticamente iha lista.",
  },
  {
    icon: "download-outline",
    title: "4. Exporta arkivu JSON",
    content:
      'Haneha ikon Download  (↓) iha eventu ne\'ebé salva atu exporta hanesan arkivu JSON. Arkivu nee iha detálles hotu husi eventu no lista kântikus, no bele partilla ho ema seluk neebe uza aplikativu ida nee. Ema neebe simu bele importa wainhira klik  butaun "Import JSON".',
  },
  {
    icon: "image-outline",
    title: "5. Save hanesan Imajen",
    content:
      "Haneha ikon Kamera (📷) iha eventu ne'ebé salva atu jera imajen husi lista kântikus. Imajen nee sei salva direktamente iha galeria foto husi dispositivu, prontu atu partilla ho ema seluk.",
  },
  {
    icon: "trash-outline",
    title: "6. Hamós Event",
    content:
      "Atu hamós eventu ida neebe salva tiha ona, Klik iha ikon Delete (🗑). Aksaun nee permanente; tan nee diak liu  exporta eventu nee antes hatu hamós.",
  },
];

export default function AboutScreen() {
  const [activeTab, setActiveTab] = useState<"informasaun" | "gia">(
    "informasaun",
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Konabá App",
          headerStyle: { backgroundColor: "#1C1C1E" },
          headerTintColor: "#FFDF00",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="chevron-back" size={28} color="#FFDF00" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={28} color="#FFDF00" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons name="information-circle" size={60} color="#FFDF00" />
          <Text style={styles.mainTitle}>Konabá Aplikativu ida ne'e</Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "informasaun" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("informasaun")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "informasaun" && styles.activeTabButtonText,
              ]}
            >
              INFORMASAUN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "gia" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("gia")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "gia" && styles.activeTabButtonText,
              ]}
            >
              GIA UTILIZADOR
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "informasaun" ? (
          sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.content && (
                <Text style={styles.sectionContent}>{section.content}</Text>
              )}
              {section.list && (
                <View style={styles.listContainer}>
                  {section.list.map((item, i) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.listText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.guideContainer}>
            <Text style={styles.guideMainTitle}>Gia Utilizadór</Text>
            {guideSections.map((item, index) => (
              <View key={index} style={styles.guideItem}>
                <View style={styles.guideHeader}>
                  <Ionicons name={item.icon as any} size={24} color="#FFDF00" />
                  <Text style={styles.guideTitle}>{item.title}</Text>
                </View>
                <Text style={styles.guideContent}>{item.content}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 TimorApps</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A0F1C",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
    padding: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFDF00",
    marginTop: 10,
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    padding: 4,
    marginBottom: 22,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "#FFDF00",
  },
  tabButtonText: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  activeTabButtonText: {
    color: "#1A0F1C",
  },
  section: {
    marginBottom: 25,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#FFDF00",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFDF00",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 15,
    color: "#E0E0E0",
    lineHeight: 22,
  },
  listContainer: {
    marginTop: 5,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
    paddingRight: 10,
  },
  bullet: {
    color: "#FFDF00",
    fontSize: 18,
    marginRight: 10,
    marginTop: -2,
  },
  listText: {
    fontSize: 15,
    color: "#E0E0E0",
    flex: 1,
    lineHeight: 20,
  },
  guideContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  guideMainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFDF00",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  guideItem: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 223, 0, 0.2)",
  },
  guideHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  guideTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFDF00",
    marginLeft: 12,
  },
  guideContent: {
    fontSize: 14,
    color: "#E0E0E0",
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 12,
  },
});
