import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EventPlan, deleteEvent } from '../utils/eventStorage';
import { exportJSON } from '../utils/jsonHelpers';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

import { PrintableEventCard } from './PrintableEventCard';

interface Props {
  event: EventPlan;
  onEdit: (event: EventPlan) => void;
  onRefresh: () => void;
}

export const EventCard: React.FC<Props> = ({ event, onEdit, onRefresh }) => {
  const cardRef = useRef<View>(null);
  const printRef = useRef<View>(null);

  const handleDelete = () => {
    Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive', 
        onPress: async () => {
          await deleteEvent(event.id);
          onRefresh();
        }
      }
    ]);
  };

  const selectedCount = Object.values(event.songs || {}).filter(s => s != null).length;

  const handleSaveImage = async () => {
    try {
      if (Platform.OS === 'web') {
        Alert.alert("Web Version", "Image capture is optimized for Android/iOS.");
        return;
      }
      const { status } = await MediaLibrary.requestPermissionsAsync(true);
      if (status !== 'granted') {
        Alert.alert("Permission Error", "We need permission to save to your gallery.");
        return;
      }
      if (printRef.current) {
        // Wait a bit for the hidden view to be ready if needed
        await new Promise(resolve => setTimeout(resolve, 500));
        const uri = await captureRef(printRef, { 
          format: 'png', 
          quality: 1.0,
          result: 'tmpfile'
        });
        if (uri) {
          await MediaLibrary.saveToLibraryAsync(uri);
          Alert.alert("Success", "Event list saved as image to your gallery!");
        } else {
          throw new Error("Failed to generate image URI.");
        }
      }
    } catch (e: any) {
      Alert.alert("Save Failed", "Error: " + (e.message || "Unknown error"));
    }
  };

  const handleExport = async () => {
    await exportJSON(event);
  };

  return (
    <View>
      {/* Visible Card */}
      <TouchableOpacity style={styles.card} onPress={() => onEdit(event)} activeOpacity={0.7} ref={cardRef} collapsable={false}>
        <View style={styles.content}>
          <Text style={styles.topRow}>{event.date} · {event.time} · {event.eventType}</Text>
          <Text style={styles.title}>{event.name || event.eventType}</Text>
          <Text style={styles.subtitle}>{selectedCount} songs selected</Text>
        </View>
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
      </TouchableOpacity>

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
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#c0392b',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  actionBtn: {
    marginLeft: 8,
    padding: 4,
  },
  hiddenContainer: {
    position: 'absolute',
    left: -5000, // Move off-screen
    top: 0,
  }
});
