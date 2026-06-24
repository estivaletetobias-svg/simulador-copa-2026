const fs = require('fs');
let content = fs.readFileSync('src/lib/data.ts', 'utf-8');
content = content.replace(/Levi\\\\'s/g, "Levi\\'s");
fs.writeFileSync('src/lib/data.ts', content);
