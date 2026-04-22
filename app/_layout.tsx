import { Stack } from 'expo-router';
import { EventsProvider } from '../context/EventsContext';

export default function RootLayout() {
  return (
    <EventsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="EventFormScreen" options={{ presentation: 'modal', title: 'Event Form' }} />
        <Stack.Screen name="EventDetailScreen" options={{ title: 'Event Details' }} />
      </Stack>
    </EventsProvider>
  );
}
