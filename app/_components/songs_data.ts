import { SONGS_MISA_LATIN } from "./songs_misa_latin";
import { SONGS_MISA_TETUM } from "./songs_misa_tetum";
import { SONGS_OTHER } from "./songs_other";
import { SONGS_RESPONSORIAL } from "./songs_responsorial";

export interface Song {
  id: number;
  title: string;
  category: string;
  section?: string;
  refrain?: string;
  verses: string[];
  language?: string;
  tags?: string[];
  notes?: string;
}

export const SONGS_DATA: Song[] = [
  ...SONGS_MISA_TETUM,
  ...SONGS_MISA_LATIN,
  ...SONGS_OTHER,
  ...SONGS_RESPONSORIAL,
];
