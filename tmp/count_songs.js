const fs = require('fs');
const path = require('path');

const files = [
  'songs_misa_tetum.ts',
  'songs_responsorial.ts',
  'songs_aleluia.ts',
  'songs_ofertorio.ts',
  'songs_sanctus.ts',
  'songs_comunhao.ts',
  'songs_acao_gracas.ts',
  'songs_final.ts',
  'songs_misa_latin.ts',
  'songs_tempo_liturgico.ts',
  'songs_maria.ts',
  'songs_santu_sira.ts',
  'songs_suplementu.ts',
  'songs_portugues_espanhol.ts',
  'songs_indonesia.ts',
  'songs_english.ts'
];

files.forEach(file => {
  const fullPath = path.join('app/_components', file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const ids = content.match(/id:\s*(\d+)/g);
    console.log(`${file}: ${ids ? ids.length : 0} songs`);
  } else {
    console.log(`${file}: NOT FOUND`);
  }
});
