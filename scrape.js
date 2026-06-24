const cheerio = require('cheerio');
const https = require('https');

https.get('https://en.wikipedia.org/wiki/2026_FIFA_World_Cup', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const $ = cheerio.load(data);
    const matches = [];
    
    // Find all rows in tables that look like match rows
    $('table.wikitable tr').each((i, el) => {
      const cols = $(el).find('td, th');
      if (cols.length >= 5) {
        const text = $(el).text();
        if (text.includes('Group A') || text.includes('Group B') || text.includes('Group C') || text.includes('Group D') || text.includes('Group E') || text.includes('Group F') || text.includes('Group G') || text.includes('Group H') || text.includes('Group I') || text.includes('Group J') || text.includes('Group K') || text.includes('Group L')) {
           matches.push($(el).text().replace(/\n+/g, ' | '));
        }
      }
    });
    
    console.log(`Found ${matches.length} possible matches.`);
    console.log(matches.slice(0, 5).join('\n'));
  });
});
