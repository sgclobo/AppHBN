import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventPlan } from '../utils/eventStorage';

interface Props {
  event: EventPlan;
}

export const PrintableEventCard: React.FC<Props> = ({ event }) => {
  const slots: Array<{ label: string, key: keyof EventPlan['songs'] }> = [
    { label: 'ENTRADA', key: 'entrada' },
    { label: 'SALMO RESPONSORIAL', key: 'salmoResponsorial' },
    { label: 'ALELUIA', key: 'aleluia' },
    { label: 'OFERTÓRIO', key: 'ofertorio' },
    { label: 'SANCTUS', key: 'sanctus' },
    { label: 'COMUNHÃO 1', key: 'comunhao1' },
    { label: 'COMUNHÃO 2', key: 'comunhao2' },
    { label: 'COMUNHÃO 3', key: 'comunhao3' },
    { label: 'COMUNHÃO 4', key: 'comunhao4' },
    { label: 'COMUNHÃO 5', key: 'comunhao5' },
    { label: 'AÇÃO DE GRAÇAS', key: 'acaoDegracas' },
    { label: 'FINAL', key: 'final' },
  ];

  const selectedSongs = slots.filter(slot => event.songs[slot.key]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateRow}>{event.date} · {event.time}</Text>
        <Text style={styles.eventType}>{event.eventType}</Text>
        <Text style={styles.eventName}>{event.name || 'Sem Nome'}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.songList}>
        {selectedSongs.length > 0 ? (
          selectedSongs.map((slot) => (
            <View key={slot.key} style={styles.songItem}>
              <Text style={styles.slotLabel}>{slot.label}</Text>
              <Text style={styles.songTitle}>{event.songs[slot.key]?.title}</Text>
              <Text style={styles.songMeta}>
                #{event.songs[slot.key]?.id} · {event.songs[slot.key]?.category}
              </Text>
            </View>
          ))
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
