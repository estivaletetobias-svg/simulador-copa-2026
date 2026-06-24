const fs = require('fs');
let content = fs.readFileSync('src/lib/data.ts', 'utf-8');

// The original file already had a venuesList at the bottom. We need to find and remove the second venuesList and the loop at the bottom.
const splitContent = content.split('const venuesList = [');
if (splitContent.length > 2) {
  const finalContent = splitContent[0] + 'const venuesList = [' + splitContent[1];
  fs.writeFileSync('src/lib/data.ts', finalContent);
}

