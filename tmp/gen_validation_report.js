const fs = require('fs');

const files = ['songs_misa.ts', 'songs_tempo_liturgico.ts', 'songs_maria_santu.ts', 'songs_suplementu.ts'];
let report = "";

files.forEach(file => {
  const content = fs.readFileSync('app/_components/' + file, 'utf8');
  
  if (content.includes('\\`')) {
    report += `ERROR: Escaped backtick found in ${file}\n`;
  }

  const songBlocks = content.split('  {').slice(1);
  songBlocks.forEach((block) => {
    const idMatch = block.match(/id:\s*(\d+)/);
    const id = idMatch ? idMatch[1] : "unknown";
    
    if (block.includes('id:') && !block.includes('verses:')) {
         report += `ERROR: Song missing verses in ${file} ID ${id}\n`;
    }
    
    const versesMatch = block.match(/verses:\s*\[([\s\S]*?)\]/);
    if (versesMatch) {
       const versesText = versesMatch[1];
       const quoteCount = (versesText.match(/"/g) || []).length;
       if (quoteCount % 2 !== 0) {
         report += `ERROR: Unclosed quote in verses in ${file} ID ${id}\n`;
       }
    }
  });
});

fs.writeFileSync('tmp/validation_report.txt', report);
console.log("Report written to tmp/validation_report.txt");
