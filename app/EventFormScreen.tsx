import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { EventPlan, saveEvent, loadEvents } from '../utils/eventStorage';
import { SongSelector } from '../components/SongSelector';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EventFormScreen() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();
  const isEditing = !!eventId;

  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [eventType, setEventType] = useState<'Misa' | 'Terço' | 'Seluk'>('Misa');
  const [eventName, setEventName] = useState('');
  const [songs, setSongs] = useState<EventPlan['songs']>({});

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (isEditing && eventId) {
      loadEvents().then(events => {
        const ev = events.find(e => e.id === eventId);
        if (ev) {
          setDate(new Date(ev.date));
          const [h, m] = ev.time.split(':');
          const dTime = new Date();
          dTime.setHours(parseInt(h, 10));
          dTime.setMinutes(parseInt(m, 10));
          setTime(dTime);
          setEventType(ev.eventType);
          setEventName(ev.name || '');
          setSongs(ev.songs || {});
        }
      });
    }
  }, [eventId, isEditing]);

  const handleSave = async () => {
    const ev: EventPlan = {
      id: eventId || Date.now().toString(),
      date: date.toISOString().split('T')[0],
      time: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`,
      eventType,
      name: eventName,
      songs,
      createdAt: isEditing ? (await loadEvents()).find(e => e.id === eventId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await saveEvent(ev);
    router.back();
  };

  const handleReset = () => {
    Alert.alert('Reset form', 'Are you sure you want to clear all fields?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => {
        setDate(new Date());
        setTime(new Date());
        setEventType('Misa');
        setEventName('');
        setSongs({});
      }}
    ]);
  };

  const updateSong = (key: keyof EventPlan['songs'], song: any) => {
    setSongs(prev => ({ ...prev, [key]: song }));
  };

  const renderSongSlots = () => {
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

    return slots.map(slot => (
      <SongSelector 
        key={slot.key}
        label={slot.label}
        selectedSongId={songs[slot.key]?.id || null}
        onSelect={(song) => updateSong(slot.key, song)}
      />
    ));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← Back to events</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{isEditing ? 'Edit event' : 'New event'}</Text>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>DATE</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.pickerBox}>
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
        <View style={styles.col}>
          <Text style={styles.label}>TIME</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.pickerBox}>
            <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, d) => { setShowDatePicker(Platform.OS === 'ios'); if (d) setDate(d); }}
        />
      )}
      {showTimePicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(e, d) => { setShowTimePicker(Platform.OS === 'ios'); if (d) setTime(d); }}
        />
      )}

      <Text style={styles.label}>EVENT TYPE</Text>
      <View style={styles.segmentedControl}>
        {(['Misa', 'Terço', 'Seluk'] as const).map(type => (
          <TouchableOpacity 
            key={type} 
            style={[styles.segmentBtn, eventType === type && styles.segmentBtnActive]}
            onPress={() => setEventType(type)}
          >
            <Text style={[styles.segmentText, eventType === type && styles.segmentTextActive]}>{type}</Text>
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

      {renderSongSlots()}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>💾 Save event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetBtnText}>↺ Reset form</Text>
      </TouchableOpacity>
      
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f0eb' },
  content: { padding: 16 },
  backBtn: { marginBottom: 16 },
  backBtnText: { color: '#c0392b', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 16 },
  col: { flex: 1 },
  spacer: { width: 16 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#666', marginBottom: 8, marginTop: 8 },
  pickerBox: { 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    borderRadius: 8 
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 16
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc'
  },
  segmentBtnActive: { backgroundColor: '#c0392b' },
  segmentText: { color: '#333', fontWeight: '500' },
  segmentTextActive: { color: '#fff', fontWeight: 'bold' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    fontSize: 16
  },
  sectionDivider: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#c0392b', marginRight: 12 },
  line: { flex: 1, height: 1, backgroundColor: '#c0392b' },
  saveBtn: {
    backgroundColor: '#c0392b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resetBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#c0392b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32
  },
  resetBtnText: { color: '#c0392b', fontSize: 16, fontWeight: 'bold' },
});
