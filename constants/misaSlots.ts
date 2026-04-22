export interface MisaSlot {
  id: string;
  label: string;
  max: number;
}

export const MISA_SLOTS: MisaSlot[] = [
  { id: "entrada",      label: "Entrada",             max: 1 },
  { id: "kyrie",        label: "Kyrie",               max: 1 },
  { id: "gloria",       label: "Glória",              max: 1 },
  { id: "salmo",        label: "Salmo Responsorial",  max: 1 },
  { id: "aclamacao",    label: "Aclamação",           max: 1 },
  { id: "ofertorio",    label: "Ofertório",           max: 1 },
  { id: "santo",        label: "Santo",               max: 1 },
  { id: "pai_nosso",    label: "Pai Nosso",           max: 1 },
  { id: "cordeiro",     label: "Cordeiro de Deus",    max: 1 },
  { id: "comunhao",     label: "Comunhão",            max: 5 },
  { id: "acao_gracas",  label: "Ação de Graças",      max: 1 },
  { id: "final",        label: "Canto Final",         max: 1 },
];
