import { SONGS_MISA_LATIN } from "./songs_misa_latin";
import { SONGS_MISA_TETUM } from "./songs_misa_tetum";
import { SONGS_RESPONSORIAL } from "./songs_responsorial";
import { SONGS_ALELUIA } from "./songs_aleluia";
import { SONGS_OFERTORIO } from "./songs_ofertorio";
import { SONGS_SANCTUS } from "./songs_sanctus";
import { SONGS_COMUNHAO } from "./songs_comunhao";
import { SONGS_ACAO_GRACAS } from "./songs_acao_gracas";
import { SONGS_FINAL } from "./songs_final";
import { SONGS_TEMPO_LITURGICO } from "./songs_tempo_liturgico";
import { SONGS_MARIA } from "./songs_maria";
import { SONGS_SANTU_SIRA } from "./songs_santu_sira";
import { SONGS_ENGLISH } from "./songs_english";
import { SONGS_PORTUGUES_ESPANHOL } from "./songs_portugues_espanhol";
import { SONGS_INDONESIA } from "./songs_indonesia";
import { SONGS_OTHER } from "./songs_other";

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
  ...SONGS_RESPONSORIAL,
  ...SONGS_ALELUIA,
  ...SONGS_OFERTORIO,
  ...SONGS_SANCTUS,
  ...SONGS_COMUNHAO,
  ...SONGS_ACAO_GRACAS,
  ...SONGS_FINAL,
  ...SONGS_TEMPO_LITURGICO,
  ...SONGS_MARIA,
  ...SONGS_SANTU_SIRA,
  ...SONGS_PORTUGUES_ESPANHOL,
  ...SONGS_ENGLISH,
  ...SONGS_INDONESIA,
  ...SONGS_OTHER,
];
