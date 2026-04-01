const fs = require('fs');
const path = require('path');

const files = ['songs_misa.ts', 'songs_tempo_liturgico.ts', 'songs_maria_santu.ts', 'songs_suplementu.ts'];

files.forEach(file => {
  const filePath = path.join('app/_components', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Rule 1: Fix unclosed strings followed by notes or closing brace
  // Pattern: "text, \n    notes:
  // or "text, \n  },
  content = content.replace(/",\s*\n\s*(notes:|},)/g, (match, p1) => {
    // This is already closed. 
    return match;
  });
  
  // Wait, let's just find specific known bad patterns.
  // 1. Missing closing quote and bracket before newline and next property
  // Example: [repeats], \n   },
  content = content.replace(/([^"]+),\s*\n\s*(notes:|},|id:)/g, (match, p1, p2) => {
    if (p1.trim().endsWith('`') || p1.trim().endsWith('"') || p1.trim().endsWith(']') || p1.trim().endsWith('}')) {
       return match;
    }
    // If it's a string that should have been closed
    console.log(`Fixing unclosed string in ${file}: ...${p1.slice(-20)}`);
    return `${p1}"\n    ],\n  },\n  { \n    ${p2}`; 
    // Wait, this is getting complicated.
  });

  // Let's do it simpler.
  // We know "verses: [" was opened.
  // We expect a "]" before the next song or end of object.
});
