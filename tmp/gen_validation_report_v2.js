const fs = require('fs');

const files = ['songs_misa.ts', 'songs_tempo_liturgico.ts', 'songs_maria_santu.ts', 'songs_suplementu.ts'];
let report = "";

files.forEach(file => {
  const content = fs.readFileSync('app/_components/' + file, 'utf8');
  
  const songBlocks = content.split('  {').slice(1);
  songBlocks.forEach((block) => {
    const idMatch = block.match(/id:\s*(\d+)/);
    const id = idMatch ? idMatch[1] : "unknown";
    
    // Check for "verses: [" but no ending "]"
    const versesStart = block.indexOf('verses: [');
    if (versesStart !== -1) {
      const versesEnd = block.indexOf(']', versesStart);
      if (versesEnd === -1) {
         report += `ERROR: Verses array never closed in ${file} ID ${id}\n`;
      } else {
         const versesText = block.substring(versesStart, versesEnd + 1);
         // Check for unclosed strings within the array
         // Find all double quotes that are NOT escaped
         const unescapedQuotes = versesText.match(/(?:^|[^\\])"/g) || [];
         if (unescapedQuotes.length % 2 !== 0) {
           report += `ERROR: Unclosed quote in verses in ${file} ID ${id} (unescaped count: ${unescapedQuotes.length})\n`;
         }
      }
    }
  });
});

fs.writeFileSync('tmp/validation_report_v2.txt', report);
console.log("Report written to tmp/validation_report_v2.txt");
