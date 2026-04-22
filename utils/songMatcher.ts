import { Song } from '../components/songs_data';

export interface MatchResult {
  song: Song | null;
  matchType: 'id' | 'number' | 'title' | 'none';
  warning?: string;
}

/**
 * Normalizes a string for better matching comparison
 * Removes accents, special chars, and converts to lowercase
 */
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD') // Decompose combined characters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric
    .trim();
};

/**
 * Finds a song in the local database based on imported data.
 * Strategy:
 * 1. Match by Song ID (exact)
 * 2. Match by Song ID (checking for shifted ranges if possible, 
 *    but title match is usually safer for shifted data)
 * 3. Match by Normalized Title
 */
export const findSongMatch = (
  importedSong: { song_id?: string | number, song_number?: string | number, song_title?: string },
  localSongs: Song[]
): MatchResult => {
  const { song_id, song_number, song_title } = importedSong;

  // 1. Try matching by ID (numerical)
  if (song_id !== undefined) {
    const idNum = typeof song_id === 'string' ? parseInt(song_id, 10) : song_id;
    if (!isNaN(idNum)) {
      const match = localSongs.find(s => s.id === idNum);
      if (match) return { song: match, matchType: 'id' };
    }
  }

  // 2. Try matching by song_number if provided and different from id
  if (song_number !== undefined && song_number !== song_id) {
    const num = typeof song_number === 'string' ? parseInt(song_number, 10) : song_number;
    if (!isNaN(num)) {
      const match = localSongs.find(s => s.id === num);
      if (match) return { song: match, matchType: 'number' };
    }
  }

  // 3. Try matching by Title (normalized)
  if (song_title) {
    const normalizedImported = normalizeString(song_title);
    
    // Exact match on normalized strings
    const match = localSongs.find(s => normalizeString(s.title) === normalizedImported);
    if (match) {
      return { 
        song: match, 
        matchType: 'title',
        warning: match.title !== song_title ? `Matched by title (slight variation)` : undefined
      };
    }

    // Fuzzy? For now exact normalized is good enough for liturgical songs
  }

  return { 
    song: null, 
    matchType: 'none',
    warning: song_title ? `Song "${song_title}" not found.` : `Unknown song slot.`
  };
};
