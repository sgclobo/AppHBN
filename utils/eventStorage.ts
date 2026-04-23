import AsyncStorage from "@react-native-async-storage/async-storage";
import { Song } from "../components/songs_data";

const KEY = "@favoritus_events";
const ACTIVE_EVENT_KEY = "@favoritus_active_event_id";

export interface EventPlan {
  id: string;
  date: string;
  time: string;
  eventType: "Misa" | "Terço" | "Seluk" | string; // Seluk/others can be free-form
  name: string;
  slots?: {
    [slotId: string]: Song[];
  };
  songs?: Song[]; // For free-form events
  createdAt: string;
  updatedAt: string;
}

export const loadEvents = async (): Promise<EventPlan[]> => {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveEvent = async (event: EventPlan): Promise<void> => {
  const events = await loadEvents();
  const idx = events.findIndex((e) => e.id === event.id);
  if (idx >= 0) events[idx] = event;
  else events.unshift(event);
  await AsyncStorage.setItem(KEY, JSON.stringify(events));
};

export const deleteEvent = async (id: string): Promise<void> => {
  const events = await loadEvents();
  const normalizedId = String(id);
  await AsyncStorage.setItem(
    KEY,
    JSON.stringify(events.filter((e) => String(e.id) !== normalizedId)),
  );

  // Clear active event if it was the one deleted
  const activeId = await getActiveEventId();
  if (activeId === normalizedId) {
    await setActiveEventId(null);
  }
};

export const getActiveEventId = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(ACTIVE_EVENT_KEY);
};

export const setActiveEventId = async (id: string | null): Promise<void> => {
  if (id) {
    await AsyncStorage.setItem(ACTIVE_EVENT_KEY, id);
  } else {
    await AsyncStorage.removeItem(ACTIVE_EVENT_KEY);
  }
};
