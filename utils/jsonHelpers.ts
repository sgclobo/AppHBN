import { writeAsStringAsync, cacheDirectory, EncodingType } from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

export const exportJSON = async (eventData: object) => {
  try {
    const json = JSON.stringify(eventData, null, 2);
    const fileUri = cacheDirectory + 'event-export.json';
    await writeAsStringAsync(fileUri, json, {
      encoding: EncodingType.UTF8,
    });
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: 'Share Event JSON',
      });
    } else {
      Alert.alert('Sharing not available', 'Sharing is not available on this device.');
    }
  } catch (error: any) {
    Alert.alert('Export Failed', error.message);
  }
};
