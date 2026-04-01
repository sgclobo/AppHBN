const fs = require('fs');

const files = ['songs_misa.ts', 'songs_tempo_liturgico.ts', 'songs_maria_santu.ts', 'songs_suplementu.ts'];
let report = "";

files.forEach(file => {
  const content = fs.readFileSync('app/_components/' + file, 'utf8');
  
  const songBlocks = content.split('  {').slice(1);
  songBlocks.forEach((block) => {
    const idMatch = block.match(/id:\s*(\d+)/);
    const id = idMatch ? idMatch[1] : "unknown";
    
    // Improved verses end check: search for '],' at end of line or before '},'
    const versesStart = block.indexOf('verses: [');
    if (versesStart !== -1) {
      const versesEndMatch = block.match(/\],\s*\n\s*(?:notes:|id:|},)/);
      if (!versesEndMatch) {
         // Maybe it's the very last property and ends with ']' then '}'
         if (!block.match(/\],\s*\n\s*\}/)) {
           report += `ERROR: Could not find valid verses closer in ${file} ID ${id}\n`;
           return;
         }
      }
      
      const versesEnd = block.lastIndexOf(']'); // Greedily find the last bracket
      const versesText = block.substring(versesStart, versesEnd + 1);
      
      const allQuotes = versesText.split('"').length - 1;
      const escapedQuotes = versesText.split('\\"').length - 1;
      const unescapedQuotes = allQuotes - escapedQuotes;
      
      if (unescapedQuotes % 2 !== 0) {
           report += `ERROR: Unclosed quote in verses in ${file} ID ${id} (unescaped count: ${unescapedQuotes})\n`;
      }
    }
  });
});

fs.writeFileSync('tmp/validation_report_v3.txt', report);
console.log("Report written to tmp/validation_report_v3.txt");
