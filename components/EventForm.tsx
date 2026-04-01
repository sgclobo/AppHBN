import React from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[selectedDate.getMonth()];
      const year = selectedDate.getFullYear();
      setDate(`${day} ${month} ${year}`);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    }
  };

  const parseDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  const parseTime = (timeStr: string) => {
    if (!timeStr) return new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);
    const d = new Date();
    if (!isNaN(hours)) d.setHours(hours);
    if (!isNaN(minutes)) d.setMinutes(minutes);
    return d;
  };

  return (
    <View style={styles.container}>
      {/* Basic Info */}
      <View style={styles.formRow}>
        <View style={[styles.field, { flex: 1.2 }]}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity 
            style={styles.pickerTrigger} 
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#c1121f" style={{ marginRight: 8 }} />
            <Text style={[styles.pickerText, !date && styles.pickerPlaceholder]}>
              {date || "Select Date"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.field, { flex: 0.8, marginLeft: 12 }]}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity 
            style={styles.pickerTrigger} 
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons name="time-outline" size={20} color="#c1121f" style={{ marginRight: 8 }} />
            <Text style={[styles.pickerText, !time && styles.pickerPlaceholder]}>
              {time || "06:30"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={parseDate(date)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      {showTimePicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={parseTime(time)}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      {Platform.OS === 'web' && (showDatePicker || showTimePicker) && (
        <View style={styles.webPickerOverlay}>
          <View style={styles.webPickerContent}>
            <Text style={styles.label}>{showDatePicker ? "Select Date" : "Select Time"}</Text>
            <input 
              type={showDatePicker ? "date" : "time"}
              value={showDatePicker ? (date ? new Date(date).toISOString().split('T')[0] : '') : time}
              onChange={(e) => {
                const val = e.target.value;
                if (showDatePicker) {
                  onDateChange({}, new Date(val));
                } else {
                  const [h, m] = val.split(':').map(Number);
                  const d = new Date();
                  d.setHours(h); d.setMinutes(m);
                  onTimeChange({}, d);
                }
              }}
              style={{
                width: '100%', height: '40px', fontSize: '16px', borderRadius: '8px', 
                border: '1px solid #ead9cf', padding: '0 8px', marginBottom: '16px'
              }}
            />
            <TouchableOpacity 
              style={styles.closePickerBtn} 
              onPress={() => { setShowDatePicker(false); setShowTimePicker(false); }}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
  pickerTrigger: {
    height: 48, backgroundColor: '#fdfbf7', borderRadius: 12, paddingHorizontal: 16,
    borderWidth: 1, borderColor: '#ead9cf', flexDirection: 'row', alignItems: 'center'
  },
  pickerText: {
    fontSize: 16, color: '#4b2e1f', fontWeight: '600'
  },
  pickerPlaceholder: {
    color: '#a18d7c', fontWeight: '400'
  },
  webPickerOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    padding: 20
  },
  webPickerContent: {
    backgroundColor: '#fff', padding: 24, borderRadius: 16, width: '100%', maxWidth: 320,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5
  },
  closePickerBtn: {
    backgroundColor: '#c1121f', height: 44, borderRadius: 10, 
    justifyContent: 'center', alignItems: 'center', marginTop: 8
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
