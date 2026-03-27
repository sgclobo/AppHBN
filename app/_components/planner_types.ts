export type EventType = 'Misa' | 'Terço' | 'Seluk';

export interface SongSelection {
  partLabel: string;
  songId: number | null;
}

export interface EventPlan {
  id: string;
  date: string;
  time: string;
  eventType: EventType;
  eventTitle: string;
  selections: SongSelection[];
  createdAt: string;
}

export const MISA_PARTS = [
  'Entrada',
  'Salmo Responsorial',
  'Aleluia',
  'Ofertório',
  'Sanctus',
  'Comunhão 1',
  'Comunhão 2',
  'Comunhão 3',
  'Comunhão 4',
  'Comunhão 5',
  'Ação de Graças',
  'Final'
];

export const TERCO_PARTS = [
  'Entrada',
  '1º Mistério',
  '2º Mistério',
  '3º Mistério',
  '4º Mistério',
  '5º Mistério',
  'Antes de Ladainha',
  'Final'
];
