import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Song } from "../components/songs_data";
import { MISA_SLOTS } from "../constants/misaSlots";
import { useEvents } from "../context/EventsContext";

export default function EventDetailScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const {
    events,
    activeEventId,
    setActiveEventId,
    removeSongFromEvent,
    deleteEvent,
  } = useEvents();
  const router = useRouter();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text>Event not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isActive = activeEventId === event.id;

  const handleDelete = () => {
    Alert.alert(
      "Hamoos Eventu",
      "Ita sigur katak hakarak hamoos eventu ne'e?",
      [
        { text: "Kansela", style: "cancel" },
        {
          text: "Hamoos",
          style: "destructive",
          onPress: async () => {
            await deleteEvent(event.id);
            router.back();
          },
        },
      ],
    );
  };

  const renderMisaSlots = () => {
    return MISA_SLOTS.map((slot) => {
      const assignedSongs = event.slots?.[slot.id] || [];
      return (
        <View key={slot.id} style={styles.slotContainer}>
          <View style={styles.slotHeader}>
            <Text style={styles.slotLabel}>{slot.label}</Text>
            <Text style={styles.slotLimit}>
              {assignedSongs.length}/{slot.max}
            </Text>
          </View>

          {assignedSongs.length > 0 ? (
            assignedSongs.map((song) => (
              <View key={song.id} style={styles.songRow}>
                <TouchableOpacity
                  style={styles.songPressArea}
                  onPress={() => setSelectedSong(song)}
                >
                  <Text style={styles.songTitle} numberOfLines={1}>
                    {song.id} - {song.title}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    removeSongFromEvent(event.id, song.id, slot.id)
                  }
                >
                  <Ionicons name="close-circle" size={22} color="#c0392b" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptySlot}>— empty —</Text>
          )}
        </View>
      );
    });
  };

  const renderFreeFormSongs = () => {
    const songs = event.songs || [];
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kântikus ({songs.length})</Text>
        {songs.length > 0 ? (
          songs.map((song) => (
            <View key={song.id} style={styles.songRow}>
              <TouchableOpacity
                style={styles.songPressArea}
                onPress={() => setSelectedSong(song)}
              >
                <Text style={styles.songTitle} numberOfLines={1}>
                  {song.id} - {song.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeSongFromEvent(event.id, song.id)}
              >
                <Ionicons name="close-circle" size={22} color="#c0392b" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptySlot}>Nenhuma música selecionada</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{event.name}</Text>
          {isActive && (
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Ativu ★</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>
          {event.date} • {event.time} • {event.eventType}
        </Text>
      </View>

      {!isActive ? (
        <TouchableOpacity
          style={styles.activateBtn}
          onPress={() => setActiveEventId(event.id)}
        >
          <Ionicons name="star" size={20} color="#fff" />
          <Text style={styles.activateBtnText}>Set as Active Event</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.activeIndicator}>
          <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
          <Text style={styles.activeIndicatorText}>
            This event is currently active
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      {event.eventType === "Misa" ? renderMisaSlots() : renderFreeFormSongs()}

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="#c0392b" />
        <Text style={styles.deleteBtnText}>Hamoos Eventu</Text>
      </TouchableOpacity>

      <Modal
        visible={!!selectedSong}
        animationType="slide"
        onRequestClose={() => setSelectedSong(null)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedSong(null)}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.modalHeaderInfo}>
              <Text style={styles.modalSongId}>#{selectedSong?.id}</Text>
              <Text style={styles.modalSongTitle} numberOfLines={1}>
                {selectedSong?.title}
              </Text>
              <Text style={styles.modalSongMeta}>
                {selectedSong?.category} • {selectedSong?.section}
              </Text>
            </View>
          </View>

          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={{ paddingBottom: 60 }}
          >
            {!!selectedSong?.refrain && (
              <View style={styles.refrainBox}>
                <Text style={styles.refrainLabel}>Refrain</Text>
                <Text style={styles.refrainText}>{selectedSong.refrain}</Text>
              </View>
            )}

            {selectedSong?.verses?.map((verse, idx) => (
              <Text
                key={`${selectedSong.id}-verse-${idx}`}
                style={styles.verseText}
              >
                {verse}
              </Text>
            ))}
          </ScrollView>
        </View>
      </Modal>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfbf7" },
  content: { padding: 16 },
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  backLink: { color: "#c0392b", marginTop: 12, fontWeight: "bold" },
  header: { marginBottom: 24 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: { fontSize: 24, fontWeight: "900", color: "#4b2e1f", flex: 1 },
  subtitle: { fontSize: 14, color: "#a18d7c" },
  activeBadge: {
    backgroundColor: "#FFDF00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  activeBadgeText: { fontSize: 12, fontWeight: "bold", color: "#4b2e1f" },
  activateBtn: {
    backgroundColor: "#c0392b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  activateBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  activeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#27ae60",
    backgroundColor: "#f0fff4",
  },
  activeIndicatorText: { color: "#27ae60", fontWeight: "bold", marginLeft: 8 },
  divider: { height: 1, backgroundColor: "#ead9cf", marginBottom: 24 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#4b2e1f",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  slotContainer: { marginBottom: 20 },
  slotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  slotLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#c0392b",
    textTransform: "uppercase",
  },
  slotLimit: { fontSize: 12, color: "#a18d7c" },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ead9cf",
    marginBottom: 8,
  },
  songPressArea: {
    flex: 1,
    marginRight: 8,
  },
  songTitle: {
    fontSize: 15,
    color: "#4b2e1f",
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  emptySlot: {
    fontSize: 14,
    color: "#ccc",
    fontStyle: "italic",
    paddingLeft: 4,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: "#c0392b",
    borderRadius: 12,
  },
  deleteBtnText: { color: "#c0392b", fontWeight: "bold", marginLeft: 8 },
  modalBg: { flex: 1, backgroundColor: "#fdfbf7" },
  modalHeader: {
    backgroundColor: "#c1121f",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  modalHeaderInfo: { marginLeft: 12, flex: 1 },
  modalSongId: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    fontWeight: "700",
  },
  modalSongTitle: { color: "#fff", fontSize: 22, fontWeight: "900" },
  modalSongMeta: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 2 },
  modalContent: { flex: 1, padding: 18 },
  refrainBox: {
    backgroundColor: "#fdf3f3",
    borderLeftWidth: 4,
    borderLeftColor: "#c1121f",
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
  },
  refrainLabel: {
    color: "#c1121f",
    fontWeight: "900",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  refrainText: {
    color: "#4b2e1f",
    fontSize: 18,
    lineHeight: 27,
    fontStyle: "italic",
  },
  verseText: {
    color: "#4b2e1f",
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 16,
  },
});
