import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EventPlan } from './planner_types';
import { SONGS_DATA, Song } from './songs_data';

interface EventSummaryProps {
  plan: EventPlan;
  onPressSong: (song: Song) => void;
}

export const EventSummary: React.FC<EventSummaryProps> = ({ plan, onPressSong }) => {
  const getSong = (id: number | null) => SONGS_DATA.find(s => s.id === id);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
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
              <View key={index} style={styles.selectionRow}>
                <Text style={styles.partLabel}>{selection.partLabel}: </Text>
                {song ? (
                  <TouchableOpacity onPress={() => onPressSong(song)}>
                    <Text style={styles.songLink}>{song.id} - {song.title}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.emptySong}>---</Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 30 },
  card: { 
    backgroundColor: '#fff', padding: 20, borderRadius: 16, 
    borderWidth: 1, borderColor: '#ead9cf',
    shadowColor: "#4b2e1f", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 13, fontWeight: '900', color: '#c1121f', textTransform: 'uppercase', marginRight: 12 },
  headerLine: { flex: 1, height: 1, backgroundColor: '#fedcdc' },
  infoSection: { marginBottom: 20 },
  dateText: { fontSize: 18, fontWeight: '800', color: '#4b2e1f' },
  timeText: { fontSize: 14, color: '#6b4f3a', marginTop: 2 },
  eventTitle: { fontSize: 20, fontWeight: '900', color: '#c1121f', marginTop: 8 },
  selectionsList: { borderTopWidth: 1, borderTopColor: '#f7f2e8', paddingTop: 16 },
  selectionRow: { flexDirection: 'row', marginBottom: 12, flexWrap: 'wrap' },
  partLabel: { fontSize: 15, fontWeight: '700', color: '#6b4f3a' },
  songLink: { fontSize: 15, fontWeight: '700', color: '#c1121f', textDecorationLine: 'underline' },
  emptySong: { fontSize: 15, color: '#a18d7c', fontStyle: 'italic' }
});
