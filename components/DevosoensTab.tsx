import React from "react";
import {
  Image,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  bvsData,
  estacoesImages,
  oTercoData,
  tercoMisericordiaTetumData,
} from "./devosoens_data";

interface DevosoensTabProps {
  scrollViewRef: React.RefObject<ScrollView>;
  onSectionLayout: (sectionName: string, event: LayoutChangeEvent) => void;
}

export default function DevosoensTab({
  scrollViewRef,
  onSectionLayout,
}: DevosoensTabProps) {
  const renderFormattedText = (text: string) => {
    const regex =
      /(<b>.*?<\/b>|<i>.*?<\/i>|\n|Mistériu Ksolok nian \(Segunda no Sábadu\):|Mistériu Naroman nian \(Kinta-feira\):|Mistériu Terus nian \(Tersa no Sesta-feira\):|Mistériu Glória nian \(Kuarta, Sábadu no Domingu\):)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;
      if (part === "\n") return <Text key={index}>{"\n"}</Text>;
      if (part.startsWith("<b>") && part.endsWith("</b>")) {
        return (
          <Text key={index} style={{ fontWeight: "bold" }}>
            {part.replace(/<\/?b>/g, "")}
          </Text>
        );
      }
      if (part.startsWith("<i>") && part.endsWith("</i>")) {
        return (
          <Text key={index} style={{ fontStyle: "italic" }}>
            {part.replace(/<\/?i>/g, "")}
          </Text>
        );
      }
      if (
        [
          "Mistériu Ksolok nian (Segunda no Sábadu):",
          "Mistériu Naroman nian (Kinta-feira):",
          "Mistériu Terus nian (Tersa no Sesta-feira):",
          "Mistériu Glória nian (Kuarta, Sábadu no Domingu):",
        ].includes(part)
      ) {
        return (
          <Text
            key={index}
            style={{ fontWeight: "bold", color: "#9b111e", fontSize: 16 }}
          >
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Devosoens</Text>

      <View
        style={styles.section}
        onLayout={(e) => onSectionLayout("Ita nia Nain Feto nia Rozáriu", e)}
      >
        <Text style={styles.sectionTitle}>Ita nia Nain Feto nia Rozáriu</Text>
        <Image
          source={require("../assets/images/prayers/tersu.png")}
          style={styles.tercoImage}
        />
        <View style={styles.article}>
          <Text style={styles.itemTitle}>{oTercoData[0].label}</Text>
          <Text style={styles.text}>
            {renderFormattedText(oTercoData[0].content)}
          </Text>
        </View>
      </View>

      <View
        style={styles.section}
        onLayout={(e) => onSectionLayout("Tersu Mizerikórdia Divina", e)}
      >
        <Text style={styles.sectionTitle}>
          {tercoMisericordiaTetumData.title}
        </Text>
        <Image
          source={tercoMisericordiaTetumData.image as any}
          style={styles.tercoImage}
        />
        {tercoMisericordiaTetumData.sections.map(
          (section: any, sIdx: number) => (
            <View key={section.id || sIdx} style={styles.article}>
              <Text style={styles.itemTitle}>{section.title}</Text>
              {section.content.map((item: any, cIdx: number) => {
                if (item.type === "subtitle")
                  return (
                    <Text
                      key={cIdx}
                      style={[
                        styles.itemTitle,
                        { marginTop: 8, color: "#4b2e1f" },
                      ]}
                    >
                      {item.text}
                    </Text>
                  );
                if (item.type === "paragraph")
                  return (
                    <Text
                      key={cIdx}
                      style={[
                        styles.text,
                        item.italic && { fontStyle: "italic" },
                        { marginBottom: 8 },
                      ]}
                    >
                      {item.text}
                    </Text>
                  );
                if (item.type === "label")
                  return (
                    <Text key={cIdx} style={[styles.rubric, { marginTop: 4 }]}>
                      {item.text}
                    </Text>
                  );
                return null;
              })}
            </View>
          ),
        )}
      </View>

      {Object.entries(bvsData).map(([sectionName, sectionData]: any) => (
        <View
          key={sectionName}
          style={styles.section}
          onLayout={(e) => onSectionLayout(sectionName, e)}
        >
          <Text style={styles.sectionTitle}>{sectionName}</Text>
          {sectionData.pages.map((page: string, index: number) => {
            const isDalanKruz = sectionName === "Dalan Kruz";
            const stationIndex = index - 4;
            const hasImage =
              isDalanKruz && stationIndex >= 0 && stationIndex < 14;
            return (
              <View key={index} style={styles.estacaoContainer}>
                {hasImage && (
                  <Image
                    source={estacoesImages[stationIndex]}
                    style={styles.estacaoImage}
                  />
                )}
                <View style={styles.estacaoTextContainer}>
                  <Text style={styles.text}>{renderFormattedText(page)}</Text>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  text: {
    fontSize: 16,
    color: "#2b2b2b",
    lineHeight: 25,
    textAlign: "justify",
  },
  tercoImage: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 8,
  },
  estacaoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
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
  },
  rubric: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#6b4f3a",
    marginBottom: 6,
  },
});
