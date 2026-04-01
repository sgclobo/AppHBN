const fs = require('fs');
const path = require('path');
const componentsDir = 'components';

const files = fs.readdirSync(componentsDir);
files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (fs.statSync(filePath).isFile()) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('../../assets/')) {
        console.log(`Fixing assets path in ${file}`);
        content = content.replace(/\.\.\/\.\.\/assets\//g, '../assets/');
        fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});
