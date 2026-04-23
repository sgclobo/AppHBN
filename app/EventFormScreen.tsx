import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SongSelector } from "../components/SongSelector";
import { MISA_SLOTS } from "../constants/misaSlots";
import { useEvents } from "../context/EventsContext";
import { EventPlan, loadEvents, saveEvent } from "../utils/eventStorage";

export default function EventFormScreen() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();
  const isEditing = !!eventId;

  const { setActiveEventId, refreshEvents } = useEvents();

  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [eventType, setEventType] = useState<"Misa" | "Terço" | "Seluk">(
    "Misa",
  );
  const [eventName, setEventName] = useState("");

  // New structure state
  const [slots, setSlots] = useState<Record<string, any[]>>({});
  const [songs, setSongs] = useState<any[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatDateForInput = (d: Date) => d.toISOString().split("T")[0];
  const formatTimeForInput = (d: Date) =>
    `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;

  useEffect(() => {
    if (isEditing && eventId) {
      loadEvents().then((events) => {
        const ev = events.find((e) => e.id === eventId);
        if (ev) {
          setDate(new Date(ev.date));
          const [h, m] = ev.time.split(":");
          const dTime = new Date();
          dTime.setHours(parseInt(h, 10));
          dTime.setMinutes(parseInt(m, 10));
          setTime(dTime);
          setEventType(ev.eventType as any);
          setEventName(ev.name || "");

          // Data migration / loading
          if (ev.eventType === "Misa") {
            if (ev.slots) {
              setSlots(ev.slots);
            } else if (
              (ev as any).songs &&
              typeof (ev as any).songs === "object" &&
              !Array.isArray((ev as any).songs)
            ) {
              // Migrate old object structure to new slots structure
              const migratedSlots: Record<string, any[]> = {};
              const oldSongs = (ev as any).songs;
              Object.keys(oldSongs).forEach((key) => {
                if (oldSongs[key]) {
                  // Map old keys to new slot IDs if necessary
                  let slotId = key;
                  if (key === "salmoResponsorial") slotId = "salmo";
                  if (key === "aleluia") slotId = "aclamacao";
                  if (key === "acaoDegracas") slotId = "acao_gracas";
                  if (key.startsWith("comunhao")) slotId = "comunhao";

                  if (!migratedSlots[slotId]) migratedSlots[slotId] = [];
                  migratedSlots[slotId].push(oldSongs[key]);
                }
              });
              setSlots(migratedSlots);
            }
          } else {
            setSongs(ev.songs || []);
          }
        }
      });
    }
  }, [eventId, isEditing]);

  const handleSave = async () => {
    const id = eventId || Date.now().toString();
    const ev: EventPlan = {
      id,
      date: date.toISOString().split("T")[0],
      time: `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`,
      eventType,
      name: eventName,
      slots: eventType === "Misa" ? slots : undefined,
      songs: eventType !== "Misa" ? songs : undefined,
      createdAt: isEditing
        ? (await loadEvents()).find((e) => e.id === eventId)?.createdAt ||
          new Date().toISOString()
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveEvent(ev);
    await setActiveEventId(id); // Set as active event as per requirements
    await refreshEvents();
    router.back();
  };

  const handleReset = () => {
    Alert.alert("Reset form", "Are you sure you want to clear all fields?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => {
          setDate(new Date());
          setTime(new Date());
          setEventType("Misa");
          setEventName("");
          setSlots({});
          setSongs([]);
        },
      },
    ]);
  };

  const updateSlot = (slotId: string, song: any) => {
    setSlots((prev) => ({ ...prev, [slotId]: song ? [song] : [] }));
  };

  const updateSong = (index: number, song: any) => {
    setSongs((prev) => {
      const next = [...prev];
      if (song) next[index] = song;
      else next.splice(index, 1);
      return next;
    });
  };

  const addSongField = () => {
    setSongs((prev) => [...prev, null]);
  };

  const renderMisaSlots = () => {
    return MISA_SLOTS.map((slot) => (
      <SongSelector
        key={slot.id}
        label={slot.label}
        selectedSongId={slots[slot.id]?.[0]?.id || null}
        onSelect={(song) => updateSlot(slot.id, song)}
      />
    ));
  };

  const renderFreeFormSongs = () => {
    // Ensure at least one field
    const displaySongs = songs.length === 0 ? [null] : songs;
    return (
      <View>
        {displaySongs.map((song, idx) => (
          <SongSelector
            key={idx}
            label={`${idx + 1}º Kântiku`}
            selectedSongId={song?.id || null}
            onSelect={(s) => {
              const next = [...songs];
              if (s) next[idx] = s;
              else next.splice(idx, 1);
              setSongs(next);
            }}
          />
        ))}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setSongs([...songs, null])}
        >
          <Text style={styles.addBtnText}>+ Adisiona Kântiku</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← Back to events</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{isEditing ? "Edit event" : "New event"}</Text>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>DATE</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.pickerBox}
          >
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
        <View style={styles.col}>
          <Text style={styles.label}>TIME</Text>
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={styles.pickerBox}
          >
            <Text>
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && Platform.OS !== "web" && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, d) => {
            setShowDatePicker(Platform.OS === "ios");
            if (d) setDate(d);
          }}
        />
      )}
      {showTimePicker && Platform.OS !== "web" && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(e, d) => {
            setShowTimePicker(Platform.OS === "ios");
            if (d) setTime(d);
          }}
        />
      )}

      {Platform.OS === "web" && (showDatePicker || showTimePicker) && (
        <View style={styles.webPickerOverlay}>
          <View style={styles.webPickerContent}>
            <Text style={styles.webPickerTitle}>
              {showDatePicker ? "Select date" : "Select time"}
            </Text>
            <input
              type={showDatePicker ? "date" : "time"}
              value={
                showDatePicker
                  ? formatDateForInput(date)
                  : formatTimeForInput(time)
              }
              onChange={(event) => {
                const value = event.target.value;
                if (!value) return;

                if (showDatePicker) {
                  const next = new Date(value);
                  if (!isNaN(next.getTime())) setDate(next);
                } else {
                  const [hours, minutes] = value.split(":").map(Number);
                  if (!isNaN(hours) && !isNaN(minutes)) {
                    const next = new Date(time);
                    next.setHours(hours);
                    next.setMinutes(minutes);
                    setTime(next);
                  }
                }
              }}
              style={{
                width: "100%",
                height: "40px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "0 8px",
                marginBottom: "16px",
              }}
            />
            <TouchableOpacity
              style={styles.webPickerDoneBtn}
              onPress={() => {
                setShowDatePicker(false);
                setShowTimePicker(false);
              }}
            >
              <Text style={styles.webPickerDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Text style={styles.label}>EVENT TYPE</Text>
      <View style={styles.segmentedControl}>
        {(["Misa", "Terço", "Seluk"] as const).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.segmentBtn,
              eventType === type && styles.segmentBtnActive,
            ]}
            onPress={() => setEventType(type)}
          >
            <Text
              style={[
                styles.segmentText,
                eventType === type && styles.segmentTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>EVENT NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Misa Syukuran"
        value={eventName}
        onChangeText={setEventName}
      />

      <View style={styles.sectionDivider}>
        <Text style={styles.sectionHeader}>SONG SELECTION</Text>
        <View style={styles.line} />
      </View>

      {eventType === "Misa" ? renderMisaSlots() : renderFreeFormSongs()}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>💾 Save event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetBtnText}>↺ Reset form</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f0eb" },
  content: { padding: 16 },
  backBtn: { marginBottom: 16 },
  backBtnText: { color: "#c0392b", fontSize: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
  row: { flexDirection: "row", marginBottom: 16 },
  col: { flex: 1 },
  spacer: { width: 16 },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
    marginTop: 8,
  },
  pickerBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    marginBottom: 16,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  segmentBtnActive: { backgroundColor: "#c0392b" },
  segmentText: { color: "#333", fontWeight: "500" },
  segmentTextActive: { color: "#fff", fontWeight: "bold" },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    fontSize: 16,
  },
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#c0392b",
    marginRight: 12,
  },
  line: { flex: 1, height: 1, backgroundColor: "#c0392b" },
  saveBtn: {
    backgroundColor: "#c0392b",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  resetBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#c0392b",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  resetBtnText: { color: "#c0392b", fontSize: 16, fontWeight: "bold" },
  addBtn: {
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c0392b",
    borderRadius: 8,
    borderStyle: "dashed",
    marginBottom: 16,
  },
  addBtnText: { color: "#c0392b", fontWeight: "bold" },
  webPickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: 20,
  },
  webPickerContent: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  webPickerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  webPickerDoneBtn: {
    backgroundColor: "#c0392b",
    borderRadius: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  webPickerDoneText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
