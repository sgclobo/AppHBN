import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { useEvents } from '../context/EventsContext';
import { MISA_SLOTS } from '../constants/misaSlots';
import { Song } from '../components/songs_data';

export default function EventDetailScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const { events, activeEventId, setActiveEventId, removeSongFromEvent, deleteEvent } = useEvents();
  const router = useRouter();

  const event = events.find(e => e.id === eventId);

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
    Alert.alert('Hamoos Eventu', 'Ita sigur katak hakarak hamoos eventu ne\'e?', [
      { text: 'Kansela', style: 'cancel' },
      { 
        text: 'Hamoos', 
        style: 'destructive', 
        onPress: async () => {
          await deleteEvent(event.id);
          router.back();
        }
      }
    ]);
  };

  const renderMisaSlots = () => {
    return MISA_SLOTS.map(slot => {
      const assignedSongs = event.slots?.[slot.id] || [];
      return (
        <View key={slot.id} style={styles.slotContainer}>
          <View style={styles.slotHeader}>
            <Text style={styles.slotLabel}>{slot.label}</Text>
            <Text style={styles.slotLimit}>{assignedSongs.length}/{slot.max}</Text>
          </View>
          
          {assignedSongs.length > 0 ? (
            assignedSongs.map(song => (
              <View key={song.id} style={styles.songRow}>
                <Text style={styles.songTitle} numberOfLines={1}>{song.id} - {song.title}</Text>
                <TouchableOpacity onPress={() => removeSongFromEvent(event.id, song.id, slot.id)}>
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
          songs.map(song => (
            <View key={song.id} style={styles.songRow}>
              <Text style={styles.songTitle} numberOfLines={1}>{song.id} - {song.title}</Text>
              <TouchableOpacity onPress={() => removeSongFromEvent(event.id, song.id)}>
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
        <Text style={styles.subtitle}>{event.date} • {event.time} • {event.eventType}</Text>
      </View>

      {!isActive ? (
        <TouchableOpacity style={styles.activateBtn} onPress={() => setActiveEventId(event.id)}>
          <Ionicons name="star" size={20} color="#fff" />
          <Text style={styles.activateBtnText}>Set as Active Event</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.activeIndicator}>
          <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
          <Text style={styles.activeIndicatorText}>This event is currently active</Text>
        </View>
      )}

      <View style={styles.divider} />

      {event.eventType === 'Misa' ? renderMisaSlots() : renderFreeFormSongs()}

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="#c0392b" />
        <Text style={styles.deleteBtnText}>Hamoos Eventu</Text>
      </TouchableOpacity>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfbf7' },
  content: { padding: 16 },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backLink: { color: '#c0392b', marginTop: 12, fontWeight: 'bold' },
  header: { marginBottom: 24 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  title: { fontSize: 24, fontWeight: '900', color: '#4b2e1f', flex: 1 },
  subtitle: { fontSize: 14, color: '#a18d7c' },
  activeBadge: { backgroundColor: '#FFDF00', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginLeft: 8 },
  activeBadgeText: { fontSize: 12, fontWeight: 'bold', color: '#4b2e1f' },
  activateBtn: {
    backgroundColor: '#c0392b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  activateBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#27ae60',
    backgroundColor: '#f0fff4',
  },
  activeIndicatorText: { color: '#27ae60', fontWeight: 'bold', marginLeft: 8 },
  divider: { height: 1, backgroundColor: '#ead9cf', marginBottom: 24 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#4b2e1f', marginBottom: 12, textTransform: 'uppercase' },
  slotContainer: { marginBottom: 20 },
  slotHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  slotLabel: { fontSize: 14, fontWeight: '800', color: '#c0392b', textTransform: 'uppercase' },
  slotLimit: { fontSize: 12, color: '#a18d7c' },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ead9cf',
    marginBottom: 8,
  },
  songTitle: { fontSize: 15, color: '#4b2e1f', fontWeight: '600', flex: 1, marginRight: 8 },
  emptySlot: { fontSize: 14, color: '#ccc', fontStyle: 'italic', paddingLeft: 4 },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c0392b',
    borderRadius: 12,
  },
  deleteBtnText: { color: '#c0392b', fontWeight: 'bold', marginLeft: 8 },
});
