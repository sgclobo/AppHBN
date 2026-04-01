import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EventForm } from './EventForm';
import { EventSummary } from './EventSummary';
import { EventType, SongSelection, EventPlan, MISA_PARTS, TERCO_PARTS } from './planner_types';
import { Song } from './songs_data';

import { storageHelper } from './persistence_helper';

const STORAGE_KEYS = {
  PLANS: 'AppHBN_EventPlans',
  DRAFT: 'AppHBN_EventPlanDraft'
};

interface FavoritusViewProps {
  onPressSong: (song: Song) => void;
}

export const FavoritusView: React.FC<FavoritusViewProps> = ({ onPressSong }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventType, setEventType] = useState<EventType>('Misa');
  const [eventTitle, setEventTitle] = useState('');
  const [selections, setSelections] = useState<SongSelection[]>([]);
  const [savedPlans, setSavedPlans] = useState<EventPlan[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize/Load Draft
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [storedPlans, storedDraft] = await Promise.all([
          storageHelper.getItem(STORAGE_KEYS.PLANS),
          storageHelper.getItem(STORAGE_KEYS.DRAFT)
        ]);

        if (storedPlans) {
          setSavedPlans(JSON.parse(storedPlans));
        }

        if (storedDraft) {
          const draft = JSON.parse(storedDraft) as EventPlan;
          setDate(draft.date);
          setTime(draft.time);
          setEventType(draft.eventType);
          setEventTitle(draft.eventTitle);
          setSelections(draft.selections);
        } else {
          // Default initialization if no draft
          setSelections(MISA_PARTS.map(part => ({ partLabel: part, songId: null })));
        }
      } catch (e) {
        console.error("Error loading data from AsyncStorage", e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadInitialData();
  }, []);

  // Persist Draft on Change
  useEffect(() => {
    if (!isLoaded) return;
    const saveDraft = async () => {
      try {
        const draft: EventPlan = {
          id: 'draft',
          date, time, eventType, eventTitle, selections,
          createdAt: new Date().toISOString()
        };
        await storageHelper.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draft));
      } catch (e) {
        console.error("Error saving draft:", e);
      }
    };
    saveDraft();
  }, [date, time, eventType, eventTitle, selections, isLoaded]);


  // Handle manual selection of EventType (reset selections only if not loading from draft)
  const changeEventType = (type: EventType) => {
    if (type === eventType) return;
    setEventType(type);
    if (type === 'Misa') {
      setSelections(MISA_PARTS.map(part => ({ partLabel: part, songId: null })));
    } else if (type === 'Terço') {
      setSelections(TERCO_PARTS.map(part => ({ partLabel: part, songId: null })));
    } else if (type === 'Seluk') {
      setSelections([
        { partLabel: 'Início', songId: null },
        { partLabel: '1º Cântico', songId: null },
        { partLabel: 'Final', songId: null }
      ]);
    }
  };


  const confirmAction = (title: string, msg: string, onConfirm: () => void) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`${title}\n\n${msg}`)) onConfirm();
    } else {
      Alert.alert(title, msg, [
        { text: "Cancel", style: "cancel" },
        { text: title.includes('Delete') ? "Delete" : "Clear", style: "destructive", onPress: onConfirm }
      ]);
    }
  };

  const handleClear = () => {
    confirmAction("Clear Form", "Are you sure you want to reset the current plan form?", async () => {
      setDate('');
      setTime('');
      setEventTitle('');
      changeEventType('Misa');
      await storageHelper.removeItem(STORAGE_KEYS.DRAFT);
    });
  };

  const handleSave = async () => {
    if (!date || !time) {
        Alert.alert("Error", "Please fill in Date and Time.");
        return;
    }
    
    const hasSongs = selections.some(s => s.songId !== null);
    if (!hasSongs) {
        Alert.alert("Error", "Please select at least one song.");
        return;
    }

    const newPlan: EventPlan = {
      id: Date.now().toString(),
      date, time, eventType, eventTitle, selections,
      createdAt: new Date().toISOString()
    };

    try {
        const updatedPlans = [newPlan, ...savedPlans];
        await storageHelper.setItem(STORAGE_KEYS.PLANS, JSON.stringify(updatedPlans));
        setSavedPlans(updatedPlans);
        Alert.alert("Success", "Plan saved successfully!");
    } catch (e) {
        Alert.alert("Error", "Failed to save plan.");
    }
  };

  const deletePlan = (id: string) => {
    confirmAction("Delete Plan", "Are you sure you want to delete this saved plan?", async () => {
      const updatedPlans = savedPlans.filter(p => p.id !== id);
      await storageHelper.setItem(STORAGE_KEYS.PLANS, JSON.stringify(updatedPlans));
      setSavedPlans(updatedPlans);
    });
  };

  const loadPlan = (plan: EventPlan) => {
    setDate(plan.date);
    setTime(plan.time);
    setEventType(plan.eventType);
    setEventTitle(plan.eventTitle);
    setSelections(plan.selections);
    Alert.alert("Loaded", `Loaded plan: ${plan.eventTitle || plan.eventType}`);
  };

  const currentPlan: EventPlan = {
    id: 'current',
    date, time, eventType, eventTitle, selections,
    createdAt: ''
  };

  if (!isLoaded) return <View style={styles.loading}><Text>Loading Planner...</Text></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Event Planner</Text>
        <Text style={styles.subtitle}>Prepare and save songs for celebrations</Text>
      </View>

      <EventForm 
        date={date} setDate={setDate}
        time={time} setTime={setTime}
        eventType={eventType} setEventType={changeEventType}
        eventTitle={eventTitle} setEventTitle={setEventTitle}
        selections={selections} setSelections={setSelections}
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={handleSave}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.saveBtnText}>Save to List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.clearBtn]} onPress={handleClear}>
          <Ionicons name="refresh-outline" size={20} color="#c1121f" />
          <Text style={styles.clearBtnText}>Reset Form</Text>
        </TouchableOpacity>
      </View>

      {savedPlans.length > 0 && (
          <View style={styles.savedSection}>
              <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Saved Plans ({savedPlans.length})</Text>
                  <View style={styles.sectionLine} />
              </View>
              {savedPlans.map(plan => (
                  <View key={plan.id} style={styles.planItem}>
                      <TouchableOpacity style={styles.planInfo} onPress={() => loadPlan(plan)}>
                          <Text style={styles.planDate}>{plan.date} - {plan.time}</Text>
                          <Text style={styles.planTitle}>{plan.eventTitle || plan.eventType}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deleteBtn} onPress={() => deletePlan(plan.id)}>
                          <Ionicons name="trash-outline" size={20} color="#a18d7c" />
                      </TouchableOpacity>
                  </View>
              ))}
          </View>
      )}

      <EventSummary plan={currentPlan} onPressSong={onPressSong} />
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfbf7' },
  scrollContent: { padding: 16 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 },
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
  clearBtnText: { marginLeft: 8, fontSize: 16, fontWeight: '700', color: '#c1121f' },
  savedSection: { marginBottom: 32, backgroundColor: '#fff', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#ead9cf' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: '#4b2e1f', textTransform: 'uppercase', marginRight: 12 },
  sectionLine: { flex: 1, height: 1, backgroundColor: '#ead9cf' },
  planItem: { 
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12, 
    borderBottomWidth: 1, borderBottomColor: '#f7f2e8' 
  },
  planInfo: { flex: 1 },
  planDate: { fontSize: 12, color: '#a18d7c', fontWeight: '600' },
  planTitle: { fontSize: 16, fontWeight: '700', color: '#4b2e1f', marginTop: 2 },
  deleteBtn: { padding: 8, marginLeft: 8 },
});
