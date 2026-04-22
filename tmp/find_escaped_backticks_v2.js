const fs = require('fs');
const files = ['songs_misa.ts', 'songs_tempo_liturgico.ts', 'songs_maria_santu.ts', 'songs_suplementu.ts'];

files.forEach(file => {
  const filePath = 'app/_components/' + file;
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    // Look for a backslash right before the end of a template literal
    if (line.match(/\\`,/)) {
      console.log(`${file}:${i+1}: ${line}`);
    }
  });
});
