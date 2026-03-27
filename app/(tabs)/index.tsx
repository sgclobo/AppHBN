import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/background-image.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.titleWrapper}>
        <Pressable 
          style={styles.infoButton} 
          onPress={() => router.push("/about")}
        >
          <Ionicons name="information-circle-outline" size={24} color="rgba(255, 255, 255, 0.7)" />
        </Pressable>
        <Text style={styles.h3}>HAROHAN</Text>
        <Text style={styles.h2}>BA NAI</Text>
        <Text style={styles.subtitle}>Knananuk no Orasoens Katólika</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A0F1C",
  },
  imageWrapper: {
    flex: 1,
    width: "100%",
    paddingTop: 40, // Pulls the image "down" within the wrapper
    backgroundColor: "#1A0F1C",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
    padding: 10,
  },
  titleWrapper: {
    width: "100%",
    backgroundColor: "#8A1E1E", // Deep maroon/red for the banner
    paddingHorizontal: 24,
    paddingVertical: 35, // Equal top and bottom margins for content
    justifyContent: "center",
    borderTopWidth: 2,
    borderTopColor: "#FFDF00", // Gold separator line
  },
  h2: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 48,
    textTransform: "uppercase",
  },
  h3: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 28,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 8,
    fontStyle: "italic",
  },
});
