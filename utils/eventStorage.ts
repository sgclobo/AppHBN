import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song } from '../components/songs_data';

const KEY = '@favoritus_events';

export interface EventPlan {
  id: string;           // uuid or Date.now().toString()
  date: string;         // ISO date string
  time: string;         // "HH:mm"
  eventType: 'Misa' | 'Terço' | 'Seluk';
  name: string;         // optional display name
  songs: {
    entrada?: Song;
    salmoResponsorial?: Song;
    aleluia?: Song;
    ofertorio?: Song;
    sanctus?: Song;
    comunhao1?: Song;
    comunhao2?: Song;
    comunhao3?: Song;
    comunhao4?: Song;
    comunhao5?: Song;
    acaoDegracas?: Song;
    final?: Song;
  };
  createdAt: string;    // ISO datetime
  updatedAt: string;    // ISO datetime
}

export const loadEvents = async (): Promise<EventPlan[]> => {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveEvent = async (event: EventPlan): Promise<void> => {
  const events = await loadEvents();
  const idx = events.findIndex(e => e.id === event.id);
  if (idx >= 0) events[idx] = event;
  else events.unshift(event);
  await AsyncStorage.setItem(KEY, JSON.stringify(events));
};

export const deleteEvent = async (id: string): Promise<void> => {
  const events = await loadEvents();
  await AsyncStorage.setItem(KEY, JSON.stringify(events.filter(e => e.id !== id)));
};
