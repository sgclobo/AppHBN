const fs = require('fs');
const files = ['songs_misa.ts', 'songs_tempo_liturgico.ts', 'songs_maria_santu.ts', 'songs_suplementu.ts'];

let results = "";
files.forEach(file => {
  const filePath = 'app/_components/' + file;
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('\\`')) {
      results += `${file}:${i+1}: ${line.trim()}\n`;
    }
  });
});
fs.writeFileSync('tmp/fix_report.txt', results);
console.log("Written to tmp/fix_report.txt");
