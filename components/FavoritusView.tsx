import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { EncodingType, readAsStringAsync } from "expo-file-system/legacy";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { saveEvent } from "../utils/eventStorage";
import { EventCard } from "./EventCard";

import { useEvents } from "../context/EventsContext";

export const FavoritusView: React.FC<any> = () => {
  const { events, activeEvent, setActiveEventId, refreshEvents } = useEvents();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      refreshEvents();
    }, [refreshEvents]),
  );

  const readPickedFileAsText = async (
    asset: DocumentPicker.DocumentPickerAsset,
  ): Promise<string> => {
    if (typeof (asset as any).file?.text === "function") {
      return await (asset as any).file.text();
    }

    // On web, picked files may be exposed through blob/object URLs.
    if (asset.uri.startsWith("blob:")) {
      const response = await fetch(asset.uri);
      if (!response.ok) {
        throw new Error("Could not read selected file.");
      }
      return await response.text();
    }

    return await readAsStringAsync(asset.uri, {
      encoding: EncodingType.UTF8,
    });
  };

  const handleImportJSON = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;

      const pickedAsset = result.assets[0];
      const content = await readPickedFileAsText(pickedAsset);
      const parsed = JSON.parse(content);

      // Basic validation
      if (
        parsed &&
        parsed.id &&
        parsed.date &&
        parsed.time &&
        parsed.eventType
      ) {
        await saveEvent(parsed);
        await refreshEvents();
        Alert.alert("Success", "Event imported successfully.");
      } else {
        throw new Error("Missing required fields.");
      }
    } catch (error: any) {
      Alert.alert(
        "Invalid file format",
        error.message || "Could not parse the file.",
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Eventus</Text>
        <Text style={styles.subtitle}>
          Kria Eventu & Hili Kântikus ba Eventu
        </Text>
      </View>

      {activeEvent && (
        <View style={styles.activeBanner}>
          <View style={styles.activeBannerContent}>
            <Ionicons name="musical-notes" size={20} color="#fff" />
            <Text style={styles.activeBannerText} numberOfLines={1}>
              Eventu Ativu: {activeEvent.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setActiveEventId(null)}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => router.push("/EventFormScreen")}
      >
        <Text style={styles.createBtnText}>+ Kria Eventu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.importBtn} onPress={handleImportJSON}>
        <Text style={styles.importBtnText}>⬆ Importa Eventu</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>LISTA EVENTUS ({events.length})</Text>
      </View>

      {events.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>
            No events yet. Create your first one!
          </Text>
        </View>
      ) : (
        events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={() =>
              router.push({
                pathname: "/EventDetailScreen",
                params: { eventId: event.id },
              })
            }
            onRefresh={refreshEvents}
          />
        ))
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f0eb" },
  content: { padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 4 },
  activeBanner: {
    backgroundColor: "#c0392b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  activeBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  activeBannerText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    flex: 1,
  },
  clearText: {
    color: "#fff",
    fontWeight: "900",
    textDecorationLine: "underline",
    marginLeft: 12,
  },
  createBtn: {
    backgroundColor: "#c0392b",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  createBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  importBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#c0392b",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  importBtnText: { color: "#c0392b", fontSize: 16, fontWeight: "bold" },
  sectionHeader: { marginBottom: 12 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    textTransform: "uppercase",
  },
  emptyState: { alignItems: "center", marginTop: 40 },
  emptyText: { color: "#888", marginTop: 12, fontSize: 15 },
});
