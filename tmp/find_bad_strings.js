const fs = require('fs');
const files = ['songs_misa.ts', 'songs_tempo_liturgico.ts', 'songs_maria_santu.ts', 'songs_suplementu.ts'];

files.forEach(file => {
  const filePath = 'app/_components/' + file;
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find lines that end with \ followed by a backtick
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    // Check if the line contains a backslash that is immediately followed by a backtick
    // or if the line ends with a backslash and the next thing is a backtick (multiline)
    if (line.includes('\\`')) {
      console.log(`MATCH line ${i+1} in ${file}: ${line.trim()}`);
    }
  });
});
