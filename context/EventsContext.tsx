import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { EventPlan, loadEvents, saveEvent, deleteEvent as storageDeleteEvent, getActiveEventId, setActiveEventId as storageSetActiveEventId } from '../utils/eventStorage';
import { Song } from '../components/songs_data';
import { MISA_SLOTS } from '../constants/misaSlots';

interface EventsContextType {
  events: EventPlan[];
  activeEventId: string | null;
  activeEvent: EventPlan | null;
  setActiveEventId: (id: string | null) => Promise<void>;
  addSongToEvent: (eventId: string, song: Song, slotId?: string) => Promise<boolean>;
  removeSongFromEvent: (eventId: string, songId: number, slotId?: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventPlan[]>([]);
  const [activeEventId, setActiveEventIdState] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const refreshEvents = useCallback(async () => {
    try {
      const [allEvents, activeId] = await Promise.all([
        loadEvents(),
        getActiveEventId()
      ]);
      setEvents(allEvents);
      setActiveEventIdState(activeId);
    } catch (e) {
      console.error('Error refreshing events:', e);
    }
  }, []);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  const activeEvent = events.find(e => e.id === activeEventId) || null;

  const setActiveEventId = async (id: string | null) => {
    await storageSetActiveEventId(id);
    setActiveEventIdState(id);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const addSongToEvent = async (eventId: string, song: Song, slotId?: string) => {
    const currentEvents = [...events];
    const eventIdx = currentEvents.findIndex(e => e.id === eventId);
    if (eventIdx === -1) return false;

    const event = { ...currentEvents[eventIdx] };

    if (event.eventType === 'Misa' && slotId) {
      const currentSlots = event.slots ? { ...event.slots } : {};
      const slotSongs = currentSlots[slotId] ? [...currentSlots[slotId]] : [];
      
      if (slotSongs.find(s => s.id === song.id)) {
        return false;
      }
      
      slotSongs.push(song);
      currentSlots[slotId] = slotSongs;
      event.slots = currentSlots;
      
      const slotLabel = MISA_SLOTS.find(s => s.id === slotId)?.label || slotId;
      showToast(`Adisionadu ba ${slotLabel} ✓`);
    } else {
      const currentSongs = event.songs ? [...event.songs] : [];
      
      if (currentSongs.find(s => s.id === song.id)) {
        Alert.alert("Aviso", "Kântikus ne'e iha ona iha lista");
        return false;
      }
      
      currentSongs.push(song);
      event.songs = currentSongs;
      showToast(`Adisionadu ba ${event.name} ✓`);
    }

    event.updatedAt = new Date().toISOString();
    await saveEvent(event);
    await refreshEvents();
    return true;
  };

  const removeSongFromEvent = async (eventId: string, songId: number, slotId?: string) => {
    const currentEvents = [...events];
    const eventIdx = currentEvents.findIndex(e => e.id === eventId);
    if (eventIdx === -1) return;

    const event = { ...currentEvents[eventIdx] };

    if (event.eventType === 'Misa' && slotId && event.slots) {
      if (event.slots[slotId]) {
        event.slots[slotId] = event.slots[slotId].filter(s => s.id !== songId);
      }
    } else if (event.songs) {
      event.songs = event.songs.filter(s => s.id !== songId);
    }

    event.updatedAt = new Date().toISOString();
    await saveEvent(event);
    await refreshEvents();
  };

  const deleteEvent = async (id: string) => {
    await storageDeleteEvent(id);
    await refreshEvents();
  };

  return (
    <EventsContext.Provider value={{ 
      events, 
      activeEventId, 
      activeEvent, 
      setActiveEventId, 
      addSongToEvent, 
      removeSongFromEvent, 
      refreshEvents,
      deleteEvent
    }}>
      <View style={{ flex: 1 }}>
        {children}
        {toastVisible && (
          <View style={styles.toastContainer} pointerEvents="none">
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}
      </View>
    </EventsContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 9999,
  },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
