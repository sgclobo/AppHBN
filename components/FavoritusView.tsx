import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { EventPlan, loadEvents, saveEvent } from '../utils/eventStorage';
import { EventCard } from './EventCard';
import * as DocumentPicker from 'expo-document-picker';
import { readAsStringAsync, EncodingType } from 'expo-file-system/legacy';

export const FavoritusView: React.FC<any> = () => {
  const [events, setEvents] = useState<EventPlan[]>([]);
  const router = useRouter();

  const fetchEvents = async () => {
    const data = await loadEvents();
    setEvents(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  const handleImportJSON = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
      if (result.canceled) return;
      const content = await readAsStringAsync(result.assets[0].uri, {
        encoding: EncodingType.UTF8,
      });
      const parsed = JSON.parse(content);
      // Basic validation
      if (parsed.id && parsed.date && parsed.eventType) {
        await saveEvent(parsed);
        fetchEvents();
        Alert.alert('Success', 'Event imported successfully.');
      } else {
        throw new Error('Missing required fields.');
      }
    } catch (error: any) {
      Alert.alert('Invalid file format', error.message || 'Could not parse the file.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        <Text style={styles.subtitle}>Manage your song playlists</Text>
      </View>

      <TouchableOpacity 
        style={styles.createBtn} 
        onPress={() => router.push('/EventFormScreen')}
      >
        <Text style={styles.createBtnText}>＋ Create new event</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.importBtn} 
        onPress={handleImportJSON}
      >
        <Text style={styles.importBtnText}>⬆ Import JSON</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Saved events ({events.length})</Text>
      </View>

      {events.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No events yet. Create your first one!</Text>
        </View>
      ) : (
        events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onEdit={() => router.push({ pathname: '/EventFormScreen', params: { eventId: event.id } })}
            onRefresh={fetchEvents}
          />
        ))
      )}
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f0eb' },
  content: { padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 4 },
  createBtn: { 
    backgroundColor: '#c0392b', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 12 
  },
  createBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  importBtn: { 
    backgroundColor: 'transparent', 
    borderWidth: 1, 
    borderColor: '#c0392b', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 24 
  },
  importBtnText: { color: '#c0392b', fontSize: 16, fontWeight: 'bold' },
  sectionHeader: { marginBottom: 12 },
  sectionLabel: { fontSize: 14, fontWeight: 'bold', color: '#555', textTransform: 'uppercase' },
  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#888', marginTop: 12, fontSize: 15 },
});
