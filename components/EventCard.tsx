import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import React, { useRef } from "react";
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { captureRef } from "react-native-view-shot";
import { MISA_SLOTS } from "../constants/misaSlots";
import { EventPlan, deleteEvent } from "../utils/eventStorage";
import { exportJSON } from "../utils/jsonHelpers";

import { PrintableEventCard } from "./PrintableEventCard";

interface Props {
  event: EventPlan;
  onEdit: (event: EventPlan) => void;
  onRefresh: () => void;
}

export const EventCard: React.FC<Props> = ({ event, onEdit, onRefresh }) => {
  const cardRef = useRef<View>(null);
  const printRef = useRef<View>(null);

  const handleDelete = () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteEvent(event.id);
          onRefresh();
        },
      },
    ]);
  };

  const selectedCount =
    event.eventType === "Misa"
      ? Object.values(event.slots || {}).reduce(
          (acc, songs) => acc + songs.length,
          0,
        )
      : event.songs?.length || 0;

  const handleSaveImage = async () => {
    if (Platform.OS === "web") {
      try {
        // Build canvas entirely from event data — no DOM capture needed
        const W = 600;
        const PADDING = 32;
        const LINE = 22;
        const SMALL_LINE = 18;

        // Collect all lines first so we can size the canvas
        type DrawLine = {
          text: string;
          style:
            | "date"
            | "type"
            | "name"
            | "divider"
            | "slot"
            | "song"
            | "meta"
            | "footer"
            | "gap";
        };
        const lines: DrawLine[] = [];

        lines.push({ text: `${event.date}  ·  ${event.time}`, style: "date" });
        lines.push({ text: event.eventType.toUpperCase(), style: "type" });
        lines.push({ text: event.name || event.eventType, style: "name" });
        lines.push({ text: "", style: "divider" });

        if (event.eventType === "Misa" && event.slots) {
          MISA_SLOTS.forEach((slot) => {
            const songs = event.slots?.[slot.id] || [];
            if (songs.length === 0) return;
            lines.push({ text: slot.label.toUpperCase(), style: "slot" });
            songs.forEach((song) => {
              lines.push({ text: `  ${song.title}`, style: "song" });
              lines.push({
                text: `  #${song.id} · ${song.category || ""}`,
                style: "meta",
              });
            });
            lines.push({ text: "", style: "gap" });
          });
        } else if (event.songs) {
          event.songs.forEach((song, idx) => {
            lines.push({ text: `${idx + 1}º KÂNTIKU`, style: "slot" });
            lines.push({ text: `  ${song.title}`, style: "song" });
            lines.push({
              text: `  #${song.id} · ${song.category || ""}`,
              style: "meta",
            });
            lines.push({ text: "", style: "gap" });
          });
        }

        lines.push({ text: "", style: "gap" });
        lines.push({ text: "Gerado por Harohan ba Nai", style: "footer" });

        // Calculate total height
        let totalH = PADDING;
        lines.forEach((l) => {
          if (l.style === "divider") totalH += LINE * 1.5;
          else if (l.style === "gap") totalH += LINE * 0.5;
          else if (l.style === "name") totalH += LINE * 1.6;
          else if (l.style === "meta") totalH += SMALL_LINE;
          else totalH += LINE;
        });
        totalH += PADDING;

        const canvas = document.createElement("canvas");
        canvas.width = W;
        canvas.height = Math.max(totalH, 250);
        const ctx = canvas.getContext("2d")!;

        // Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, W, canvas.height);

        // Top accent bar
        ctx.fillStyle = "#c1121f";
        ctx.fillRect(0, 0, W, 6);

        let y = PADDING + 6;

        lines.forEach((l) => {
          if (l.style === "divider") {
            ctx.strokeStyle = "#eeeeee";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(PADDING, y + LINE * 0.5);
            ctx.lineTo(W - PADDING, y + LINE * 0.5);
            ctx.stroke();
            y += LINE * 1.5;
            return;
          }
          if (l.style === "gap") {
            y += LINE * 0.5;
            return;
          }

          ctx.textAlign = "center";
          switch (l.style) {
            case "date":
              ctx.fillStyle = "#888888";
              ctx.font = `13px system-ui, sans-serif`;
              break;
            case "type":
              ctx.fillStyle = "#c1121f";
              ctx.font = `bold 15px system-ui, sans-serif`;
              break;
            case "name":
              ctx.fillStyle = "#222222";
              ctx.font = `bold 22px system-ui, sans-serif`;
              break;
            case "slot":
              ctx.textAlign = "left";
              ctx.fillStyle = "#c1121f";
              ctx.font = `bold 11px system-ui, sans-serif`;
              break;
            case "song":
              ctx.textAlign = "left";
              ctx.fillStyle = "#222222";
              ctx.font = `14px system-ui, sans-serif`;
              break;
            case "meta":
              ctx.textAlign = "left";
              ctx.fillStyle = "#999999";
              ctx.font = `11px system-ui, sans-serif`;
              break;
            case "footer":
              ctx.fillStyle = "#bbbbbb";
              ctx.font = `11px system-ui, sans-serif`;
              break;
          }

          const xPos =
            l.style === "slot" || l.style === "song" || l.style === "meta"
              ? PADDING
              : W / 2;
          ctx.fillText(l.text, xPos, y);
          y +=
            l.style === "name"
              ? LINE * 1.6
              : l.style === "meta"
                ? SMALL_LINE
                : LINE;
        });

        // Prefer share on mobile web so users can save to gallery apps.
        const filename = `${(event.name || event.eventType).replace(/[^a-z0-9]/gi, "_").toLowerCase()}-songs.png`;
        canvas.toBlob(async (blob) => {
          if (!blob) {
            Alert.alert("Erro", "Falha ao gerar imagem.");
            return;
          }

          const canShareFile =
            typeof navigator !== "undefined" &&
            typeof (navigator as any).share === "function" &&
            typeof File !== "undefined";

          if (canShareFile) {
            try {
              const file = new File([blob], filename, { type: "image/png" });
              const canShareThisFile =
                typeof (navigator as any).canShare === "function"
                  ? (navigator as any).canShare({ files: [file] })
                  : true;

              if (canShareThisFile) {
                await (navigator as any).share({
                  files: [file],
                  title: event.name || event.eventType,
                });
                return;
              }
            } catch {
              // Fall back to download when share is unavailable or cancelled.
            }
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
        }, "image/png");
      } catch (e: any) {
        Alert.alert(
          "Erro",
          `Falha ao gerar imagem: ${e.message || "erro desconhecido"}`,
        );
      }
      return;
    }

    // Native (iOS / Android)
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync(true);
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Precisamos de acesso à galeria para guardar a imagem.",
        );
        return;
      }
      if (!printRef.current) return;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const uri = await captureRef(printRef, {
        format: "png",
        quality: 1.0,
        result: "tmpfile",
      });
      if (uri) {
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Guardado!", "Imagem guardada na sua galeria.");
      }
    } catch (e: any) {
      Alert.alert(
        "Erro",
        `Falha ao guardar imagem: ${e.message || "erro desconhecido"}`,
      );
    }
  };

  const handleExport = async () => {
    await exportJSON(event);
  };

  return (
    <View>
      {/* Visible Card */}
      <View style={styles.card} ref={cardRef} collapsable={false}>
        <TouchableOpacity
          style={styles.content}
          onPress={() => onEdit(event)}
          activeOpacity={0.7}
        >
          <Text style={styles.topRow}>
            {event.date} · {event.time} · {event.eventType}
          </Text>
          <Text style={styles.title}>{event.name || event.eventType}</Text>
          <Text style={styles.subtitle}>{selectedCount} songs selected</Text>
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleExport}>
            <Ionicons name="download-outline" size={24} color="#a18d7c" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleSaveImage}>
            <Ionicons name="camera-outline" size={24} color="#a18d7c" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#c0392b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hidden Card for Printing/Capture */}
      <View style={styles.hiddenContainer} pointerEvents="none">
        <View ref={printRef} collapsable={false}>
          <PrintableEventCard event={event} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  topRow: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#c0392b",
  },
  actions: {
    flexDirection: "row",
    marginLeft: 12,
  },
  actionBtn: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 6,
  },
  hiddenContainer: {
    position: "absolute",
    left: -5000, // Move off-screen
    top: 0,
  },
});
