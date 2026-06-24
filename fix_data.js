const fs = require('fs');

let content = fs.readFileSync('src/lib/data.ts', 'utf-8');

const venues = [
  'MetLife Stadium, NY', 'SoFi Stadium, LA', 'Azteca, CDMX', 
  'BMO Field, Toronto', 'Hard Rock, Miami', 'AT&T Stadium, Dallas', 
  'Mercedes-Benz, Atlanta', 'Lumen Field, Seattle', 'Levi’s, San Francisco',
  'Gillette, Boston', 'NRG, Houston', 'Lincoln Financial, Philadelphia',
  'Arrowhead, Kansas City', 'BC Place, Vancouver', 'BBVA, Monterrey', 'Akron, Guadalajara'
];

let groupStartDates = {
  'A': 11, 'B': 12, 'C': 13, 'D': 14, 'E': 15, 'F': 16,
  'G': 17, 'H': 18, 'I': 19, 'J': 20, 'K': 21, 'L': 22
};

// We will replace the whole INITIAL_MATCHES generation loop
// It starts at `for (const group of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']) {`
// and ends at `export const getInitialMatches = () => {`
const startIdx = content.indexOf(`for (const group of ['A'`);
const endIdx = content.indexOf(`export const getInitialMatches`);

const newLoop = `const venuesList = [
  'MetLife Stadium, NY', 'SoFi Stadium, LA', 'Azteca, CDMX', 
  'BMO Field, Toronto', 'Hard Rock, Miami', 'AT&T Stadium, Dallas', 
  'Mercedes-Benz, Atlanta', 'Lumen Field, Seattle', 'Levi\\'s, San Francisco',
  'Gillette, Boston', 'NRG, Houston', 'Lincoln Financial, Philadelphia',
  'Arrowhead, KC', 'BC Place, Vancouver', 'BBVA, Monterrey', 'Akron, Guadalajara'
];

for (let i = 0; i < 12; i++) {
  const group = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'][i];
  const groupTeams = initialTeams.filter(t => t.group === group);
  
  const baseDay = 11 + i; // from 11th to 22nd for Round 1
  
  const getVenue = () => venuesList[Math.floor(Math.random() * venuesList.length)];
  const getTimes = () => {
    const hours = ['14:00', '16:00', '19:00', '21:00'];
    return hours[Math.floor(Math.random() * hours.length)];
  };

  // Rodada 1
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[0].id,
    awayTeamId: groupTeams[1].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: \`\${baseDay}/06/2026\`,
    time: getTimes(),
    venue: getVenue(),
    group: group,
    phase: 'GROUP',
  });
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[2].id,
    awayTeamId: groupTeams[3].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: \`\${baseDay}/06/2026\`,
    time: getTimes(),
    venue: getVenue(),
    group: group,
    phase: 'GROUP',
  });
  // Rodada 2
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[0].id,
    awayTeamId: groupTeams[2].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: \`\${baseDay + 4}/06/2026\`,
    time: getTimes(),
    venue: getVenue(),
    group: group,
    phase: 'GROUP',
  });
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[1].id,
    awayTeamId: groupTeams[3].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: \`\${baseDay + 4}/06/2026\`,
    time: getTimes(),
    venue: getVenue(),
    group: group,
    phase: 'GROUP',
  });
  // Rodada 3
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[3].id,
    awayTeamId: groupTeams[0].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: \`\${baseDay + 8 > 30 ? (baseDay + 8 - 30) : baseDay + 8}/\${baseDay + 8 > 30 ? '07' : '06'}/2026\`,
    time: getTimes(),
    venue: getVenue(),
    group: group,
    phase: 'GROUP',
  });
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[2].id,
    awayTeamId: groupTeams[1].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: \`\${baseDay + 8 > 30 ? (baseDay + 8 - 30) : baseDay + 8}/\${baseDay + 8 > 30 ? '07' : '06'}/2026\`,
    time: getTimes(),
    venue: getVenue(),
    group: group,
    phase: 'GROUP',
  });
}

`;

content = content.substring(0, startIdx) + newLoop + content.substring(endIdx);
fs.writeFileSync('src/lib/data.ts', content);
