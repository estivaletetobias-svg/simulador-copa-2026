const fs = require('fs');
const https = require('https');

https.get('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const grid = [];
    let matchId = 1;

    // We need to map the team names to their pos in the group (1 to 4)
    // To do this, we'll collect the unique teams per group in the order they appear.
    const groupTeamsMap = {};

    json.matches.forEach(m => {
      if (m.group && m.group.startsWith('Group ')) {
        const groupChar = m.group.split(' ')[1];
        if (!groupTeamsMap[groupChar]) groupTeamsMap[groupChar] = new Set();
        groupTeamsMap[groupChar].add(m.team1);
        groupTeamsMap[groupChar].add(m.team2);
      }
    });

    const groupTeamsList = {};
    for (const [g, set] of Object.entries(groupTeamsMap)) {
      groupTeamsList[g] = Array.from(set); // 0-indexed, pos 1 to 4
    }

    json.matches.forEach(m => {
      if (m.group && m.group.startsWith('Group ')) {
        const groupChar = m.group.split(' ')[1];
        
        // Find pos
        const homePos = groupTeamsList[groupChar].indexOf(m.team1) + 1;
        const awayPos = groupTeamsList[groupChar].indexOf(m.team2) + 1;

        // format date from YYYY-MM-DD to DD/MM/YYYY
        const [year, month, day] = m.date.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        
        // format time (e.g., "13:00 UTC-6" to BRT. BRT is UTC-3. So UTC-6 is 3 hours behind BRT. 13:00 UTC-6 -> 16:00 BRT)
        // Let's parse the UTC offset
        let brtTime = m.time;
        if (m.time) {
          const match = m.time.match(/(\d{2}):(\d{2})\s+UTC([+-]\d+)?/);
          if (match) {
            let hour = parseInt(match[1]);
            const min = match[2];
            const offset = match[3] ? parseInt(match[3]) : 0;
            // BRT is UTC-3.
            // hour in UTC = hour - offset
            const hourUTC = hour - offset;
            let hourBRT = hourUTC - 3;
            if (hourBRT < 0) hourBRT += 24;
            if (hourBRT >= 24) hourBRT -= 24;
            brtTime = `${hourBRT.toString().padStart(2, '0')}:${min}`;
          }
        }

        grid.push({
          matchId: matchId++,
          group: groupChar,
          homePos,
          awayPos,
          date: formattedDate,
          time: brtTime,
          venue: m.ground
        });
      }
    });

    console.log(`Parsed ${grid.length} matches.`);

    const tsCode = `export interface FifaGridMatch {
  matchId: number;
  group: string;
  homePos: number;
  awayPos: number;
  date: string;
  time: string;
  venue: string;
}

export const FIFA_GRID: FifaGridMatch[] = ${JSON.stringify(grid, null, 2)};
`;

    fs.writeFileSync('src/lib/fifaGrid.ts', tsCode);
    console.log('Saved to src/lib/fifaGrid.ts');
  });
});
