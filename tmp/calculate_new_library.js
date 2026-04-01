const fs = require('fs');
const path = require('path');

const componentsPath = 'app/_components';
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

let allSongs = [];

files.forEach(file => {
  const fullPath = path.join(componentsPath, file);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  // Match objects. This is regex-based and potentially fragile if formatting is weird.
  // But our files are pretty consistent.
  // Using a simplistic { ... } matcher for this pattern.
  const regex = /\{\s*id:[\s\S]*?\n\s*\}/g;
  const matches = content.match(/\{\s*id:[\s\S]*?\n\s*\}/g);
  if (matches) {
    matches.forEach(m => {
      // Evaluate content to object (roughly)
      // Actually, it's safer to extract fields using regex
      const id = parseInt(m.match(/id:\s*(\d+)/)[1]);
      const title = m.match(/title:\s*["']([\s\S]*?)["']/)[1];
      const category = m.match(/category:\s*["']([\s\S]*?)["']/)[1];
      const sectionMatch = m.match(/section:\s*["']([\s\S]*?)["']/);
      const section = sectionMatch ? sectionMatch[1] : null;
      
      const languageMatch = m.match(/language:\s*["']([\s\S]*?)["']/);
      const language = languageMatch ? languageMatch[1] : null;
      
      const refrainMatch = m.match(/refrain:\s*["']([\s\S]*?)["']/);
      const refrain = refrainMatch ? refrainMatch[1] : null;
      
      const versesMatch = m.match(/verses:\s*\[([\s\S]*?)\]/);
      // Verses are harder to parse perfectly with regex if they have nested brackets,
      // but they don't seem to.
      const verses = versesMatch ? versesMatch[1] : null;
      
      allSongs.push({
        _oldId: id,
        _oldCategory: category,
        _oldSection: section,
        _fullMatch: m,
        title,
        language,
        refrain,
        verses,
        _file: file
      });
    });
  }
});

// Mapping Logic
allSongs.forEach(song => {
  // Category Misa
  if (song._oldCategory === "Misa" || 
      ["songs_misa_tetum.ts", "songs_responsorial.ts", "songs_aleluia.ts", "songs_ofertorio.ts", "songs_sanctus.ts", "songs_comunhao.ts", "songs_acao_gracas.ts", "songs_final.ts"].includes(song._file)) {
    song.category = "Misa";
    song.section = "Misa Baibain";
  } else if (song._oldCategory === "Misa Latin" || song._file === "songs_misa_latin.ts") {
    song.category = "Misa";
    song.section = "Misa Latin";
  } else if (song._oldCategory === "Tempo Litúrgico" || song._file === "songs_tempo_liturgico.ts") {
    song.category = "Tempo Litúrgico";
    song.section = song._oldSection; // keep section (Advento, Natal, etc.)
  } else if (song._oldCategory === "Maria" || song._file === "songs_maria.ts") {
    song.category = "Maria no Santu Sira";
    song.section = "Maria";
  } else if (song._oldCategory === "Santu Sira" || song._file === "songs_santu_sira.ts") {
    song.category = "Maria no Santu Sira";
    song.section = "Santu Sira";
  } else if (song._oldCategory === "Suplementu" || song._file === "songs_suplementu.ts") {
    song.category = "Suplementu";
    song.section = "Tetum";
  } else if (song._oldCategory === "Knananuk Portugues no Espanhol" || song._file === "songs_portugues_espanhol.ts") {
    song.category = "Suplementu";
    song.section = (song._oldSection === "Portugues") ? "Portugues" : "Espanhol";
  } else if (song._oldCategory === "Knananuk Indonesia" || song._file === "songs_indonesia.ts") {
    song.category = "Suplementu";
    song.section = "Bahasa";
  } else if (song._oldCategory === "Knananuk Inglês" || song._file === "songs_english.ts") {
    song.category = "Suplementu";
    song.section = "Inglês";
  } else {
    // Other (e.g. SONGS_OTHER)
    song.category = "Suplementu";
    song.section = "Tetum"; // Fallback
  }
});

// Final Sorting Logic
const categoryOrder = ["Misa", "Tempo Litúrgico", "Maria no Santu Sira", "Suplementu"];
const sectionOrderMap = {
  "Misa": ["Misa Baibain", "Misa Latin"],
  "Tempo Litúrgico": ["Advento", "Natal", "Quaresma", "Páscoa", "Pentecostes"],
  "Maria no Santu Sira": ["Maria", "Santu Sira"],
  "Suplementu": ["Tetum", "Portugues", "Bahasa", "Inglês", "Espanhol"]
};

// Misa sub-level order
const formerMisaSectionOrder = ["Entrada", "Responsorial", "Aleluia", "Ofertório", "Sanctus", "Comunhão", "Ação de Graças", "Final"];

allSongs.sort((a, b) => {
  const catA = categoryOrder.indexOf(a.category);
  const catB = categoryOrder.indexOf(b.category);
  if (catA !== catB) return catA - catB;
  
  const secA = sectionOrderMap[a.category].indexOf(a.section);
  const secB = sectionOrderMap[b.category].indexOf(b.section);
  if (secA !== secB) return secA - secB;
  
  if (a.section === "Misa Baibain" && b.section === "Misa Baibain") {
    const fmsA = formerMisaSectionOrder.indexOf(a._oldSection);
    const fmsB = formerMisaSectionOrder.indexOf(b._oldSection);
    if (fmsA !== fmsB) return fmsA - fmsB;
  }
  
  return a._oldId - b._oldId;
});

// Re-indexing
allSongs.forEach((song, i) => {
  song.id = i + 1;
});

// Summarize counts to verify
categoryOrder.forEach(cat => {
  console.log(`Cat: ${cat}`);
  sectionOrderMap[cat].forEach(sec => {
    const count = allSongs.filter(s => s.category === cat && s.section === sec).length;
    console.log(`  Sec: ${sec} -> ${count} songs`);
  });
});

// This script only calculates. I need to actually modify the files.
// It's probably better to rewrite the files now based on their ORIGINAL content but with updated ID/Category/Section.
// I'll maintain a mapping in my mind and use replace_file_content.
// Actually, re-indexing 600 songs is too much for replace_file_content.
// I will create a temporary TS file containing ALL the songs and then point SONGS_DATA to it.
// OR I will redistribute the songs back to their files.
// The user prefers the current modular structure.
