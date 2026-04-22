const fs = require('fs');
const files = fs.readdirSync('app/_components').filter(f => f.startsWith('songs_') && f.endsWith('.ts'));

files.forEach(file => {
  const content = fs.readFileSync('app/_components/' + file, 'utf8');
  // Look for `... \`, where the \ is before the last `
  // This happens when backslash is part of the string but it's now followed by the template literal's backtick.
  // Actually, let's just find anything matching /\\`/
  const matches = content.match(/\\`/g);
  if (matches) {
    console.log(`File: ${file} has ${matches.length} escaped backticks.`);
    // Print the lines
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('\\`')) {
        console.log(`  Line ${i+1}: ${line}`);
      }
    });
  }
});
