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
  
  // New plan: Use a more robust split logic. 
  // Each song is an object inside the array [...].
  // We can find the start of each object by looking for { id:
  const songsData = content.split(/(\{\s*id:)/).filter(Boolean);
  
  for (let i = 0; i < songsData.length; i++) {
    if (songsData[i].match(/\{\s*id:/)) {
      let songBlock = songsData[i] + songsData[i+1];
      // Find the closing brace of the song object
      // This is still a bit tricky if there are nested braces in verses (rare for this app)
      // But for this app, songs end with either }, or } ].
      // A simple regex match for the whole block until the next { id: or end of file.
      const match = songBlock.match(/\{\s*id:[\s\S]*?\n\s*\}/);
      if (match) {
        const raw = match[0];
        
        // Extract fields
        const id = parseInt(raw.match(/id:\s*(\d+)/)[1]);
        const titleMatch = raw.match(/title:\s*[`"']([\s\S]*?)[`"']/);
        const title = titleMatch ? titleMatch[1] : null;
        const categoryMatch = raw.match(/category:\s*(?:["']([\s\S]*?)["']|.+)/);
        const category = categoryMatch ? (categoryMatch[1] || categoryMatch[0].split(':')[1].trim()) : null;
        
        const sectionMatch = raw.match(/section:\s*["']([\s\S]*?)["']/);
        const section = sectionMatch ? sectionMatch[1] : null;

        const versesMatch = raw.match(/verses:\s*\[([\s\S]*?)\]/);
        const verses = versesMatch ? versesMatch[1] : null;

        const refrainMatch = raw.match(/refrain:\s*[`"']([\s\S]*?)[`"']/);
        const refrain = refrainMatch ? refrainMatch[1] : null;

        const langMatch = raw.match(/language:\s*["']([\s\S]*?)["']/);
        const language = langMatch ? langMatch[1] : null;

        const tagsMatch = raw.match(/tags:\s*\[([\s\S]*?)\]/);
        const tags = tagsMatch ? tagsMatch[1] : null;

        const notesMatch = raw.match(/notes:\s*[`"']([\s\S]*?)[`"']/);
        const notes = notesMatch ? notesMatch[1] : null;

        allSongs.push({
          _oldId: id,
          _oldFile: file,
          _oldCategory: (category || "").replace(/['",]/g, '').trim(),
          _oldSection: section,
          title,
          verses,
          refrain,
          language,
          tags,
          notes
        });
      }
      i++;
    }
  }
});

// Mapping and Transformation
allSongs.forEach(song => {
  if (song._oldCategory === "Misa" || 
      ["songs_misa_tetum.ts", "songs_responsorial.ts", "songs_aleluia.ts", "songs_ofertorio.ts", "songs_sanctus.ts", "songs_comunhao.ts", "songs_acao_gracas.ts", "songs_final.ts"].includes(song._oldFile)) {
    song.category = "Misa";
    song.section = "Misa Baibain";
  } else if (song._oldCategory === "Misa Latin" || song._oldFile === "songs_misa_latin.ts") {
    song.category = "Misa";
    song.section = "Misa Latin";
  } else if (song._oldCategory === "Tempo Litúrgico" || song._oldFile === "songs_tempo_liturgico.ts") {
    song.category = "Tempo Litúrgico";
    song.section = song._oldSection;
  } else if (song._oldCategory === "Maria" || song._oldFile === "songs_maria.ts") {
    song.category = "Maria no Santu Sira";
    song.section = "Maria";
  } else if (song._oldCategory === "Santu Sira" || song._oldFile === "songs_santu_sira.ts") {
    song.category = "Maria no Santu Sira";
    song.section = "Santu Sira";
  } else if (song._oldCategory === "Suplementu" || song._oldFile === "songs_suplementu.ts") {
    song.category = "Suplementu";
    song.section = "Tetum";
  } else if (song._oldCategory === "Knananuk Portugues no Espanhol" || song._oldFile === "songs_portugues_espanhol.ts") {
    song.category = "Suplementu";
    song.section = (song._oldSection === "Portugues") ? "Portugues" : "Espanhol";
  } else if (song._oldCategory === "Knananuk Indonesia" || song._oldFile === "songs_indonesia.ts") {
    song.category = "Suplementu";
    song.section = "Bahasa";
  } else if (song._oldCategory === "Knananuk Inglês" || song._oldFile === "songs_english.ts") {
    song.category = "Suplementu";
    song.section = "Inglês";
  } else {
    song.category = "Suplementu";
    song.section = "Tetum";
  }
});

// Sorting Logic
const categoryOrder = ["Misa", "Tempo Litúrgico", "Maria no Santu Sira", "Suplementu"];
const sectionOrderMap = {
  "Misa": ["Misa Baibain", "Misa Latin"],
  "Tempo Litúrgico": ["Advento", "Natal", "Quaresma", "Páscoa", "Pentecostes"],
  "Maria no Santu Sira": ["Maria", "Santu Sira"],
  "Suplementu": ["Tetum", "Portugues", "Bahasa", "Inglês", "Espanhol"]
};
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
allSongs.forEach((song, i) => { song.id = i + 1; });

// Generation of files
function writeCategoryFile(category, filename, exportName) {
  const filtered = allSongs.filter(s => s.category === category);
  let content = `import { Song } from "./songs_data";\n\nexport const ${exportName}: Song[] = [\n`;
  filtered.forEach(s => {
    content += `  {\n`;
    content += `    id: ${s.id},\n`;
    content += `    category: "${s.category}",\n`;
    if (s.section) content += `    section: "${s.section}",\n`;
    content += `    title: \`${s.title}\`,\n`;
    if (s.language) content += `    language: "${s.language}",\n`;
    if (s.refrain) content += `    refrain: \`${s.refrain}\`,\n`;
    if (s.verses) content += `    verses: [${s.verses}],\n`;
    if (s.tags) content += `    tags: [${s.tags}],\n`;
    if (s.notes) content += `    notes: \`${s.notes}\`,\n`;
    content += `  },\n`;
  });
  content += `];\n`;
  fs.writeFileSync(path.join(componentsPath, filename), content);
}

writeCategoryFile("Misa", "songs_misa.ts", "SONGS_MISA");
writeCategoryFile("Tempo Litúrgico", "songs_tempo_liturgico.ts", "SONGS_TEMPO_LITURGICO");
writeCategoryFile("Maria no Santu Sira", "songs_maria_santu.ts", "SONGS_MARIA_SANTU");
writeCategoryFile("Suplementu", "songs_suplementu.ts", "SONGS_SUPLEMENTU");

console.log("Files generated successfully.");
