import { Image, StyleSheet, Text, View } from "react-native";

const Golden3DText = ({ text, style, shadowOffset }: { text: string; style?: any; shadowOffset?: number }) => {
  const o2 = shadowOffset || 4;
  const o1 = Math.round(o2 / 2);
  return (
    <View style={styles.textStack}>
      {/* Deepest 3D shadow */}
      <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.titleText, style, styles.layer2, { top: o2, left: o2 }]}>{text}</Text>
      {/* Mid 3D shadow */}
      <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.titleText, style, styles.layer1, { top: o1, left: o1 }]}>{text}</Text>
      {/* Front text face */}
      <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.titleText, style, styles.layer0]}>{text}</Text>
    </View>
  );
};

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/background-image.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.titleWrapper}>
        <Golden3DText text="HAROHAN" style={styles.h3} shadowOffset={2} />
        <Golden3DText text="BA&nbsp;&nbsp;NAI" style={styles.h2} shadowOffset={4} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B1B2D",
    justifyContent: "flex-end",
  },
  imageWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1A0F1C", // Dark purple border area for fit screen
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleWrapper: {
    paddingBottom: 40,
    paddingLeft: 24,
    paddingRight: 24,
    width: "100%",
    alignItems: "flex-start", // Left aligns the contents
  },
  textStack: {
    marginBottom: 4,
  },
  titleText: {
    fontWeight: "900",
  },
  h2: {
    fontSize: 42,
    lineHeight: 48,
  },
  h3: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 2,
  },
  layer2: {
    position: "absolute",
    color: "#8B5A00",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
  },
  layer1: {
    position: "absolute",
    color: "#C58300",
  },
  layer0: {
    color: "#FFDF00",
  },
});
