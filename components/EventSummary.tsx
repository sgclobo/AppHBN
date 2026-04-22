import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { EventPlan } from './planner_types';
import { SONGS_DATA, Song } from './songs_data';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

interface EventSummaryProps {
  plan: EventPlan;
  onPressSong: (song: Song) => void;
  onExportJson: () => void;
  onImportJson: () => void;
}

export const EventSummary: React.FC<EventSummaryProps> = ({ 
  plan, 
  onPressSong,
  onExportJson,
  onImportJson
}) => {
  const getSong = (id: number | null) => SONGS_DATA.find(s => s.id === id);
  const cardRef = useRef<View>(null);

  const onSaveImage = async () => {
    try {
      if (Platform.OS === 'web') {
        Alert.alert("Web Version", "To save as image on web:\n1. Open browser menu\n2. Select 'Print'\n3. Save as PDF (or use a screenshot tool).\n\nOptimized gallery saving is available in the Android/iOS app.");
        return;
      }

      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync(true);
      if (status !== 'granted') {
          Alert.alert("Permission Error", "We need permission to save to your gallery.");
          return;
      }

      if (cardRef.current) {
        // Small delay to ensure any pending layout/renders are done
        await new Promise(resolve => setTimeout(resolve, 300));

        const uri = await captureRef(cardRef, { 
            format: 'png', 
            quality: 1.0,
            result: 'tmpfile'
        });
        
        if (uri) {
          await MediaLibrary.saveToLibraryAsync(uri);
          Alert.alert("Success", "Card saved as image to your gallery!");
        } else {
          throw new Error("Failed to generate image URI.");
        }
      }
    } catch (e: any) {
      console.error("Capture Error:", e);
      Alert.alert("Save Failed", "Error: " + (e.message || "Unknown error") + "\n\nTry taking a manual screenshot if this persists.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card} ref={cardRef} collapsable={false}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerTitle}>Live Preview</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.dateText}>{plan.date || "Date not set"}</Text>
          <Text style={styles.timeText}>Oras: {plan.time || "--:--"}</Text>
          <Text style={styles.eventTitle}>{plan.eventTitle || plan.eventType}</Text>
        </View>

        <View style={styles.selectionsList}>
          {plan.selections.map((selection, index) => {
            const song = getSong(selection.songId);
            return (
              <View key={`${selection.partLabel}-${index}`} style={styles.selectionRow}>
                <View style={styles.leftCol}>
                  <Text style={styles.partLabel}>{selection.partLabel}: </Text>
                </View>
                <View style={styles.rightCol}>
                  {song ? (
                    <TouchableOpacity onPress={() => onPressSong(song)}>
                      <Text style={styles.songLink}>{song.id} - {song.title}</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.emptySong}>---</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.imageSaveBtn} onPress={onSaveImage}>
          <Ionicons name="image" size={20} color="#fff" />
          <Text style={styles.btnText}>Save as Image for Gallery</Text>
      </TouchableOpacity>

      <View style={styles.jsonActions}>
        <TouchableOpacity style={[styles.actionBtn, styles.exportBtn]} onPress={onExportJson}>
            <Ionicons name="share-social" size={20} color="#fff" />
            <Text style={styles.btnText}>Export as JSON</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.importBtn]} onPress={onImportJson}>
            <Ionicons name="cloud-upload" size={20} color="#4b2e1f" />
            <Text style={[styles.btnText, { color: '#4b2e1f' }]}>Import JSON</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 30 },
  card: { 
    backgroundColor: '#fff', padding: 22, borderRadius: 16, 
    borderWidth: 1, borderColor: '#ead9cf',
    shadowColor: "#4b2e1f", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 13, fontWeight: '900', color: '#c1121f', textTransform: 'uppercase', marginRight: 12 },
  headerLine: { flex: 1, height: 1, backgroundColor: '#fedcdc' },
  infoSection: { marginBottom: 20, alignItems: 'center' },
  dateText: { fontSize: 18, fontWeight: '800', color: '#4b2e1f' },
  timeText: { fontSize: 14, color: '#6b4f3a', marginTop: 2 },
  eventTitle: { fontSize: 22, fontWeight: '900', color: '#c1121f', marginTop: 8, textAlign: 'center' },
  selectionsList: { borderTopWidth: 1, borderTopColor: '#f7f2e8', paddingTop: 16 },
  selectionRow: { flexDirection: 'row', marginBottom: 14 },
  leftCol: { width: 130, alignItems: 'flex-end', paddingRight: 10 },
  rightCol: { flex: 1, alignItems: 'flex-start' },
  partLabel: { fontSize: 14, fontWeight: '800', color: '#6b4f3a', textAlign: 'right' },
  songLink: { fontSize: 14, fontWeight: '700', color: '#c1121f', textDecorationLine: 'none' },
  emptySong: { fontSize: 14, color: '#a18d7c', fontStyle: 'italic' },
  imageSaveBtn: {
    backgroundColor: '#4b2e1f',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#3a2318',
    elevation: 2,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3
  },
  jsonActions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12
  },
  actionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3
  },
  exportBtn: {
    backgroundColor: '#c1121f',
  },
  importBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ead9cf'
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10
  },
});
