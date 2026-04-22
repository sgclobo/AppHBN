const fs = require('fs');
const content = fs.readFileSync('app/_components/songs_misa.ts', 'utf8');

const regex = /id:\s*(\d+),[\s\S]*?title:\s*[`"']([\s\S]*?)[`"']/g;
let match;
const songs = [];
while ((match = regex.exec(content)) !== null) {
  songs.push({ id: parseInt(match[1]), title: match[2] });
}

fs.writeFileSync('tmp/misa_songs.json', JSON.stringify(songs, null, 2), 'utf8');
console.log("Written to tmp/misa_songs.json");
