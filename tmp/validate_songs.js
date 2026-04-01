const fs = require('fs');

const files = ['songs_misa.ts', 'songs_tempo_liturgico.ts', 'songs_maria_santu.ts', 'songs_suplementu.ts'];

files.forEach(file => {
  const content = fs.readFileSync('app/_components/' + file, 'utf8');
  
  // Basic escaped backtick check
  if (content.includes('\\`')) {
    console.log(`ERROR: Escaped backtick found in ${file}`);
  }

  // Check every song object has verses
  // Song matches: { id: XXX, ... }
  const songBlocks = content.split('  {').slice(1);
  songBlocks.forEach((block, i) => {
    if (!block.includes('verses:')) {
       // Check if it's the last part which might not be a song
       if (block.includes('id:')) {
         console.log(`ERROR: Song missing verses in ${file} around ID ${block.match(/id:\s*(\d+)/)?.[1]}`);
       }
    }
    
    // Check for unclosed double quotes in verses
    const versesMatch = block.match(/verses:\s*\[([\s\S]*?)\]/);
    if (versesMatch) {
       const versesText = versesMatch[1];
       // Simple check: count double quotes
       const quoteCount = (versesText.match(/"/g) || []).length;
       if (quoteCount % 2 !== 0) {
         console.log(`ERROR: Unclosed quote in verses in ${file} around ID ${block.match(/id:\s*(\d+)/)?.[1]}`);
       }
    }
  });
});
