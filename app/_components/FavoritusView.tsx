import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EventForm } from './EventForm';
import { EventSummary } from './EventSummary';
import { EventType, SongSelection, EventPlan, MISA_PARTS, TERCO_PARTS } from './planner_types';
import { Song } from './songs_data';

interface FavoritusViewProps {
  onPressSong: (song: Song) => void;
}

export const FavoritusView: React.FC<FavoritusViewProps> = ({ onPressSong }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventType, setEventType] = useState<EventType>('Misa');
  const [eventTitle, setEventTitle] = useState('');
  const [selections, setSelections] = useState<SongSelection[]>([]);

  // Initialize selections when eventType changes
  useEffect(() => {
    if (eventType === 'Misa') {
      setSelections(MISA_PARTS.map(part => ({ partLabel: part, songId: null })));
    } else if (eventType === 'Terço') {
      setSelections(TERCO_PARTS.map(part => ({ partLabel: part, songId: null })));
    } else if (eventType === 'Seluk') {
      setSelections([
        { partLabel: 'Início', songId: null },
        { partLabel: '1º Cântico', songId: null },
        { partLabel: 'Final', songId: null }
      ]);
    }
  }, [eventType]);

  const handleClear = () => {
    Alert.alert(
      "Clear Plan",
      "Are you sure you want to clear the current plan?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: () => {
            setDate('');
            setTime('');
            setEventTitle('');
            setEventType('Misa'); // This will trigger useEffect to reset selections
          }
        }
      ]
    );
  };

  const handleSave = () => {
    if (!date || !time || !eventType) {
        Alert.alert("Error", "Please fill in Date, Time and Event Type.");
        return;
    }
    
    const hasSongs = selections.some(s => s.songId !== null);
    if (!hasSongs) {
        Alert.alert("Error", "Please select at least one song.");
        return;
    }

    // Prepare for future persistence
    const newPlan: EventPlan = {
      id: Date.now().toString(),
      date,
      time,
      eventType,
      eventTitle,
      selections,
      createdAt: new Date().toISOString()
    };

    console.log("Saving plan:", newPlan);
    Alert.alert("Success", "Plan ready! (Persistence to be added in future versions)");
  };

  const currentPlan: EventPlan = {
    id: 'current',
    date,
    time,
    eventType,
    eventTitle,
    selections,
    createdAt: ''
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Event Planner</Text>
        <Text style={styles.subtitle}>Prepare songs for your celebration</Text>
      </View>

      <EventForm 
        date={date} setDate={setDate}
        time={time} setTime={setTime}
        eventType={eventType} setEventType={setEventType}
        eventTitle={eventTitle} setEventTitle={setEventTitle}
        selections={selections} setSelections={setSelections}
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={handleSave}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.saveBtnText}>Save Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.clearBtn]} onPress={handleClear}>
          <Ionicons name="trash-outline" size={20} color="#c1121f" />
          <Text style={styles.clearBtnText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <EventSummary plan={currentPlan} onPressSong={onPressSong} />
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfbf7' },
  scrollContent: { padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '900', color: '#4b2e1f' },
  subtitle: { fontSize: 14, color: '#a18d7c', marginTop: 4 },
  actionsRow: { flexDirection: 'row', marginBottom: 24 },
  actionBtn: { 
    flex: 1, height: 48, borderRadius: 12, flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'center', elevation: 2,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3
  },
  saveBtn: { backgroundColor: '#c1121f', marginRight: 12 },
  saveBtnText: { marginLeft: 8, fontSize: 16, fontWeight: '700', color: '#fff' },
  clearBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#c1121f' },
  clearBtnText: { marginLeft: 8, fontSize: 16, fontWeight: '700', color: '#c1121f' }
});
