import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventPlan } from '../utils/eventStorage';

interface Props {
  event: EventPlan;
}

import { MISA_SLOTS } from '../constants/misaSlots';

export const PrintableEventCard: React.FC<Props> = ({ event }) => {
  const renderMisaSlots = () => {
    return MISA_SLOTS.map(slot => {
      const assignedSongs = event.slots?.[slot.id] || [];
      if (assignedSongs.length === 0) return null;

      return (
        <View key={slot.id} style={styles.songItem}>
          <Text style={styles.slotLabel}>{slot.label}</Text>
          {assignedSongs.map(song => (
            <View key={song.id} style={styles.songEntry}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songMeta}>#{song.id} · {song.category}</Text>
            </View>
          ))}
        </View>
      );
    });
  };

  const renderFreeFormSongs = () => {
    const songs = event.songs || [];
    return songs.map((song, idx) => (
      <View key={song.id} style={styles.songItem}>
        <Text style={styles.slotLabel}>{idx + 1}º KÂNTIKU</Text>
        <View style={styles.songEntry}>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songMeta}>#{song.id} · {song.category}</Text>
        </View>
      </View>
    ));
  };

  const hasSongs = event.eventType === 'Misa' 
    ? Object.values(event.slots || {}).some(s => s.length > 0)
    : (event.songs?.length || 0) > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateRow}>{event.date} · {event.time}</Text>
        <Text style={styles.eventType}>{event.eventType}</Text>
        <Text style={styles.eventName}>{event.name || 'Sem Nome'}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.songList}>
        {hasSongs ? (
          event.eventType === 'Misa' ? renderMisaSlots() : renderFreeFormSongs()
        ) : (
          <Text style={styles.noSongs}>Nenhuma música selecionada</Text>
        )}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Gerado por AppHBN</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    width: 500, // Fixed width for consistent capture
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dateRow: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c0392b',
    textTransform: 'uppercase',
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#c0392b',
    marginVertical: 15,
  },
  songList: {
    marginTop: 10,
  },
  songItem: {
    marginBottom: 16,
  },
  songEntry: {
    marginBottom: 6,
  },
  slotLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: '#c0392b',
    marginBottom: 2,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  songMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  noSongs: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#bbb',
  },
});
