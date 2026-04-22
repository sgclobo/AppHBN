import { writeAsStringAsync, readAsStringAsync, cacheDirectory, EncodingType } from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';
import { EventPlan, SongSelection } from '../components/planner_types';
import { Song, SONGS_DATA } from '../components/songs_data';
import { findSongMatch, MatchResult } from '../utils/songMatcher';

const FORMAT_VERSION = 1;
const APP_NAME = "Hananu ba Nai";
const PLAN_TYPE = "celebration_song_plan";

export interface PlanExportData {
  format_version: number;
  app: string;
  type: string;
  created_at: string;
  event: {
    date: string;
    time: string;
    event_type: string;
    title: string;
  };
  songs: Array<{
    slot_key: string;
    slot_label: string;
    song_id: string | number | null;
    song_number: string | number | null;
    song_title: string;
  }>;
}

export const planService = {
  /**
   * Exports an EventPlan to a JSON file and opens the share sheet.
   */
  exportPlan: async (plan: EventPlan) => {
    try {
      const exportData: PlanExportData = {
        format_version: FORMAT_VERSION,
        app: APP_NAME,
        type: PLAN_TYPE,
        created_at: new Date().toISOString(),
        event: {
          date: plan.date,
          time: plan.time,
          event_type: plan.eventType,
          title: plan.eventTitle,
        },
        songs: plan.selections.map((sel, index) => {
          const song = SONGS_DATA.find(s => s.id === sel.songId);
          return {
            slot_key: `${sel.partLabel.toLowerCase().replace(/\s+/g, '_')}_${index}`,
            slot_label: sel.partLabel,
            song_id: sel.songId,
            song_number: sel.songId, // In this app, ID is the number
            song_title: song ? song.title : "",
          };
        }),
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const sanitizedTitle = (plan.eventTitle || plan.eventType).replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const fileName = `hananu-plan-${plan.date.replace(/\s+/g, '-')}-${sanitizedTitle}.json`;
      
      if (Platform.OS === 'web') {
        // Fallback for web: download file
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        return { success: true, message: "File downloaded." };
      }

      // Native mobile: Save to cache and share
      const fileUri = `${cacheDirectory}${fileName}`;
      await writeAsStringAsync(fileUri, jsonString, { encoding: EncodingType.UTF8 });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: `Share ${APP_NAME} Plan`,
          UTI: 'public.json'
        });
        return { success: true };
      } else {
        return { success: false, error: "Sharing is not available on this device." };
      }
    } catch (error: any) {
      console.error("Export Error:", error);
      return { success: false, error: error.message || "Failed to export plan." };
    }
  },

  /**
   * Picks a JSON file and parses it into an EventPlan structure.
   */
  importPlan: async (): Promise<{ success: boolean; plan?: EventPlan; warnings?: string[]; error?: string }> => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return { success: false };
      }

      const asset = result.assets[0];
      const fileContent = await readAsStringAsync(asset.uri);
      const data = JSON.parse(fileContent) as PlanExportData;

      // 1. Basic Schema Validation
      if (!data || typeof data !== 'object') throw new Error("Invalid file content.");
      if (data.app !== APP_NAME && data.type !== PLAN_TYPE) {
        throw new Error("This file is not a valid Hananu ba Nai plan.");
      }
      if (data.format_version > FORMAT_VERSION) {
        throw new Error(`Unsupported format version: ${data.format_version}. Please update the app.`);
      }

      const warnings: string[] = [];
      
      // 2. Map back to EventPlan
      const selections: SongSelection[] = data.songs.map((impSong) => {
        const matchResult: MatchResult = findSongMatch(
          { 
            song_id: impSong.song_id ?? undefined, 
            song_number: impSong.song_number ?? undefined, 
            song_title: impSong.song_title 
          }, 
          SONGS_DATA
        );

        if (!matchResult.song) {
          warnings.push(matchResult.warning || `Song "${impSong.song_title}" not found.`);
        }

        return {
          partLabel: impSong.slot_label,
          songId: matchResult.song ? matchResult.song.id : null
        };
      });

      const importedPlan: EventPlan = {
        id: 'imported_' + Date.now(),
        date: data.event.date || "",
        time: data.event.time || "",
        eventType: data.event.event_type as any || "Misa",
        eventTitle: data.event.title || "",
        selections: selections,
        createdAt: data.created_at || new Date().toISOString(),
      };

      return {
        success: true,
        plan: importedPlan,
        warnings: warnings.length > 0 ? warnings : undefined
      };

    } catch (error: any) {
      console.error("Import Error:", error);
      return { success: false, error: error.message || "Failed to import plan." };
    }
  }
};
