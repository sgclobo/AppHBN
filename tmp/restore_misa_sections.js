const fs = require('fs');
const filePath = 'app/_components/songs_misa.ts';
let content = fs.readFileSync(filePath, 'utf8');

const ranges = [
  { start: 1, end: 45, section: "Entrada" },
  { start: 46, end: 83, section: "Responsorial" },
  { start: 84, end: 93, section: "Aleluia" },
  { start: 94, end: 122, section: "Ofertório" },
  { start: 123, end: 126, section: "Sanctus" },
  { start: 127, end: 193, section: "Comunhão" },
  { start: 194, end: 208, section: "Ação de Graças" },
  { start: 209, end: 237, section: "Final" },
  { start: 238, end: 258, section: "Misa Latin" }
];

ranges.forEach(range => {
  // Regex to find id: XX and replace the NEXT section: "..."
  // This is safer than just replacing all because it's id-specific.
  for (let id = range.start; id <= range.end; id++) {
    const idRegex = new RegExp(`(id:\\s*${id},[\\s\\S]*?section:\\s*")[^"]*(")`, 'g');
    content = content.replace(idRegex, `$1${range.section}$2`);
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated songs_misa.ts with detailed sections.");
