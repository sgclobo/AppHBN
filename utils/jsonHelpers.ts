import {
    cacheDirectory,
    EncodingType,
    writeAsStringAsync,
} from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Alert, Platform } from "react-native";

export const exportJSON = async (eventData: object) => {
  try {
    const json = JSON.stringify(eventData, null, 2);

    if (Platform.OS === "web") {
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "event-export.json";
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    const fileUri = cacheDirectory + "event-export.json";
    await writeAsStringAsync(fileUri, json, {
      encoding: EncodingType.UTF8,
    });
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(fileUri, {
        mimeType: "application/json",
        dialogTitle: "Share Event JSON",
      });
    } else {
      Alert.alert(
        "Sharing not available",
        "Sharing is not available on this device.",
      );
    }
  } catch (error: any) {
    Alert.alert("Export Failed", error.message);
  }
};
