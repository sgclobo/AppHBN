import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EventType, SongSelection, MISA_PARTS, TERCO_PARTS } from './planner_types';
import { SongSelector } from './SongSelector';
import { Song } from './songs_data';

interface EventFormProps {
  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (v: string) => void;
  eventType: EventType;
  setEventType: (v: EventType) => void;
  eventTitle: string;
  setEventTitle: (v: string) => void;
  selections: SongSelection[];
  setSelections: (v: SongSelection[] | ((prev: SongSelection[]) => SongSelection[])) => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  date, setDate,
  time, setTime,
  eventType, setEventType,
  eventTitle, setEventTitle,
  selections, setSelections
}) => {

  const handleSongSelect = (index: number, song: Song | null) => {
    setSelections(prev => {
      const next = [...prev];
      next[index] = { ...next[index], songId: song ? song.id : null };
      return next;
    });
  };

  const handleAddSelection = () => {
    setSelections(prev => [
      ...prev.slice(0, prev.length - 1),
      { partLabel: `${prev.length - 1}º Cântico`, songId: null },
      prev[prev.length - 1]
    ]);
  };

  const handleAddCommunion = () => {
    setSelections(prev => {
      const communionCount = prev.filter(s => s.partLabel.startsWith('Comunhão')).length;
      if (communionCount >= 5) return prev;
      
      const lastCommunionIndex = prev.findLastIndex(s => s.partLabel.startsWith('Comunhão'));
      const next = [...prev];
      next.splice(lastCommunionIndex + 1, 0, { partLabel: `Comunhão ${communionCount + 1}`, songId: null });
      return next;
    });
  };

  const updateSelukCount = (count: number) => {
    const newSelections: SongSelection[] = [{ partLabel: 'Início', songId: null }];
    for (let i = 1; i <= count; i++) {
        newSelections.push({ partLabel: `${i}º Cântico`, songId: null });
    }
    newSelections.push({ partLabel: 'Final', songId: null });
    setSelections(newSelections);
  };

  return (
    <View style={styles.container}>
      {/* Basic Info */}
      <View style={styles.formRow}>
        <View style={[styles.field, { flex: 1.2 }]}>
          <Text style={styles.label}>Date</Text>
          <TextInput 
            style={styles.input} 
            placeholder="27 Mar 2026" 
            value={date} 
            onChangeText={setDate}
          />
        </View>
        <View style={[styles.field, { flex: 0.8, marginLeft: 12 }]}>
          <Text style={styles.label}>Time</Text>
          <TextInput 
            style={styles.input} 
            placeholder="06:30" 
            value={time} 
            onChangeText={setTime}
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Event Type</Text>
        <View style={styles.typeSelector}>
          {(['Misa', 'Terço', 'Seluk'] as EventType[]).map(type => (
            <TouchableOpacity 
              key={type}
              style={[styles.typeButton, eventType === type && styles.activeType]}
              onPress={() => setEventType(type)}
            >
              <Text style={[styles.typeText, eventType === type && styles.activeTypeText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{eventType === 'Seluk' ? 'Event Name / Title' : 'Liturgical Name (Optional)'}</Text>
        <TextInput 
          style={styles.input} 
          placeholder={eventType === 'Seluk' ? "e.g. Oração iha Kantor" : "e.g. Misa Syukuran"} 
          value={eventTitle} 
          onChangeText={setEventTitle}
        />
      </View>

      {eventType === 'Seluk' && (
         <View style={styles.field}>
           <Text style={styles.label}>Number of songs</Text>
           <View style={styles.countRow}>
                {[1, 2, 3, 4, 5, 8].map(num => (
                    <TouchableOpacity 
                        key={num} 
                        onPress={() => updateSelukCount(num)}
                        style={[styles.countBtn, selections.length === num + 2 && styles.countBtnActive]}
                    >
                        <Text style={[styles.countBtnText, selections.length === num + 2 && styles.countBtnActiveText]}>{num}</Text>
                    </TouchableOpacity>
                ))}
           </View>
         </View>
      )}

      {/* Song Slots */}
      <View style={styles.slotsHeader}>
        <Text style={styles.slotsTitle}>Song Selection</Text>
        <View style={styles.slotsLine} />
      </View>

      {selections.map((item, index) => (
        <SongSelector 
          key={`${item.partLabel}-${index}`}
          label={item.partLabel}
          selectedSongId={item.songId}
          onSelect={(song) => handleSongSelect(index, song)}
        />
      ))}

      {eventType === 'Misa' && selections.filter(s => s.partLabel.startsWith('Comunhão')).length < 5 && (
        <TouchableOpacity style={styles.addBtn} onPress={handleAddCommunion}>
          <Ionicons name="add-circle" size={20} color="#c1121f" />
          <Text style={styles.addBtnText}>Add Comunhão Slot</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#ead9cf', marginBottom: 20 },
  formRow: { flexDirection: 'row', marginBottom: 16 },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '800', color: '#6b4f3a', textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 },
  input: { 
    height: 48, backgroundColor: '#fdfbf7', borderRadius: 12, paddingHorizontal: 16,
    borderWidth: 1, borderColor: '#ead9cf', fontSize: 16, color: '#4b2e1f' 
  },
  typeSelector: { flexDirection: 'row', backgroundColor: '#fdfbf7', borderRadius: 12, padding: 4, borderWidth: 1, borderColor: '#ead9cf' },
  typeButton: { flex: 1, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  activeType: { backgroundColor: '#c1121f' },
  typeText: { fontSize: 14, fontWeight: '700', color: '#6b4f3a' },
  activeTypeText: { color: '#fff' },
  slotsHeader: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  slotsTitle: { fontSize: 14, fontWeight: '900', color: '#c1121f', textTransform: 'uppercase', marginRight: 12 },
  slotsLine: { flex: 1, height: 1.5, backgroundColor: '#fedcdc' },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 12, borderStyle: 'dashed', borderWidth: 1.5, borderColor: '#c1121f', marginTop: -8, marginBottom: 16 },
  addBtnText: { marginLeft: 8, fontSize: 14, fontWeight: '700', color: '#c1121f' },
  countRow: { flexDirection: 'row', justifyContent: 'space-between' },
  countBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fdfbf7', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ead9cf' },
  countBtnActive: { backgroundColor: '#c1121f', borderColor: '#c1121f' },
  countBtnText: { fontSize: 15, fontWeight: '700', color: '#6b4f3a' },
  countBtnActiveText: { color: '#fff' }
});
