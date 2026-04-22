import { SONGS_MISA } from "./songs_misa";
import { SONGS_TEMPO_LITURGICO } from "./songs_tempo_liturgico";
import { SONGS_MARIA_SANTU } from "./songs_maria_santu";
import { SONGS_SUPLEMENTU } from "./songs_suplementu";

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
  ...SONGS_MISA,
  ...SONGS_TEMPO_LITURGICO,
  ...SONGS_MARIA_SANTU,
  ...SONGS_SUPLEMENTU,
];
