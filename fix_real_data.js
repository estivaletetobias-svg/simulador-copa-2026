const fs = require('fs');

let content = fs.readFileSync('src/lib/data.ts', 'utf-8');

const startIdx = content.indexOf(`for (let i = 0; i < 12; i++) {`);
const endIdx = content.indexOf(`export const getInitialMatches`);

const newLoop = `for (let i = 0; i < 12; i++) {
  const group = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'][i];
  const groupTeams = initialTeams.filter(t => t.group === group);
  
  const baseDay = 11 + i; // from 11th to 22nd for Round 1
  
  const getVenue = () => venuesList[Math.floor(Math.random() * venuesList.length)];
  const getTimes = () => {
    const hours = ['14:00', '16:00', '19:00', '21:00'];
    return hours[Math.floor(Math.random() * hours.length)];
  };

  const getMatchInfo = (t1, t2, round) => {
    const key1 = \`\${t1}-\${t2}\`;
    const key2 = \`\${t2}-\${t1}\`;
    if (matchScheduleData[key1]) return matchScheduleData[key1];
    if (matchScheduleData[key2]) return matchScheduleData[key2];
    
    // Fallback if not mapped
    let day = baseDay;
    if (round === 2) day += 4;
    if (round === 3) day += 8;
    return {
      date: \`\${day > 30 ? (day - 30) : day}/\${day > 30 ? '07' : '06'}/2026\`,
      time: getTimes(),
      venue: getVenue()
    };
  };

  // Rodada 1
  const info1 = getMatchInfo(groupTeams[0].id, groupTeams[1].id, 1);
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[0].id,
    awayTeamId: groupTeams[1].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: info1.date,
    time: info1.time,
    venue: info1.venue,
    group: group,
    phase: 'GROUP',
  });
  
  const info2 = getMatchInfo(groupTeams[2].id, groupTeams[3].id, 1);
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[2].id,
    awayTeamId: groupTeams[3].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: info2.date,
    time: info2.time,
    venue: info2.venue,
    group: group,
    phase: 'GROUP',
  });
  
  // Rodada 2
  const info3 = getMatchInfo(groupTeams[0].id, groupTeams[2].id, 2);
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[0].id,
    awayTeamId: groupTeams[2].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: info3.date,
    time: info3.time,
    venue: info3.venue,
    group: group,
    phase: 'GROUP',
  });
  
  const info4 = getMatchInfo(groupTeams[1].id, groupTeams[3].id, 2);
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[1].id,
    awayTeamId: groupTeams[3].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: info4.date,
    time: info4.time,
    venue: info4.venue,
    group: group,
    phase: 'GROUP',
  });
  
  // Rodada 3
  const info5 = getMatchInfo(groupTeams[3].id, groupTeams[0].id, 3);
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[3].id,
    awayTeamId: groupTeams[0].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: info5.date,
    time: info5.time,
    venue: info5.venue,
    group: group,
    phase: 'GROUP',
  });
  
  const info6 = getMatchInfo(groupTeams[2].id, groupTeams[1].id, 3);
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: groupTeams[2].id,
    awayTeamId: groupTeams[1].id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: info6.date,
    time: info6.time,
    venue: info6.venue,
    group: group,
    phase: 'GROUP',
  });
}

`;

const dictInject = `// The actual parsed official schedule dates and venues for 2026 based on the FIFA match schedule
const matchScheduleData: Record<string, { date: string, venue: string, time: string }> = {
  // GROUP A
  'MEX-RSA': { date: '11/06/2026', venue: 'Estadio Azteca, Mexico City', time: '17:00' },
  'KOR-CZE': { date: '11/06/2026', venue: 'Estadio Akron, Guadalajara', time: '17:00' },
  'CZE-RSA': { date: '18/06/2026', venue: 'Atlanta Stadium, Atlanta', time: '17:00' },
  'MEX-KOR': { date: '18/06/2026', venue: 'Estadio Akron, Guadalajara', time: '22:00' },
  'CZE-MEX': { date: '24/06/2026', venue: 'Estadio Azteca, Mexico City', time: '17:00' },
  'RSA-KOR': { date: '24/06/2026', venue: 'Estadio BBVA, Monterrey', time: '17:00' },
  
  // GROUP B
  'CAN-BIH': { date: '12/06/2026', venue: 'BMO Field, Toronto', time: '17:00' },
  'QAT-SUI': { date: '13/06/2026', venue: 'Levi’s Stadium, Santa Clara', time: '17:00' },
  'CAN-QAT': { date: '18/06/2026', venue: 'BC Place, Vancouver', time: '22:00' },
  'BIH-SUI': { date: '18/06/2026', venue: 'BMO Field, Toronto', time: '17:00' },
  'BIH-QAT': { date: '24/06/2026', venue: 'BC Place, Vancouver', time: '17:00' },
  'SUI-CAN': { date: '24/06/2026', venue: 'BMO Field, Toronto', time: '17:00' },

  // GROUP C
  'BRA-MAR': { date: '13/06/2026', venue: 'New York New Jersey Stadium', time: '17:00' },
  'SCO-HAI': { date: '13/06/2026', venue: 'Boston Stadium, Foxborough', time: '17:00' },
  'BRA-SCO': { date: '19/06/2026', venue: 'Los Angeles Stadium, Inglewood', time: '22:00' },
  'MAR-HAI': { date: '19/06/2026', venue: 'Boston Stadium, Foxborough', time: '17:00' },
  'SCO-MAR': { date: '25/06/2026', venue: 'Los Angeles Stadium, Inglewood', time: '17:00' },
  'HAI-BRA': { date: '25/06/2026', venue: 'Miami Stadium, Miami Gardens', time: '17:00' }
};

const venuesList = [
  'MetLife Stadium, NY', 'SoFi Stadium, LA', 'Azteca, CDMX', 
  'BMO Field, Toronto', 'Hard Rock, Miami', 'AT&T Stadium, Dallas', 
  'Mercedes-Benz, Atlanta', 'Lumen Field, Seattle', 'Levis, San Francisco',
  'Gillette, Boston', 'NRG, Houston', 'Lincoln Financial, Philadelphia',
  'Arrowhead, KC', 'BC Place, Vancouver', 'BBVA, Monterrey', 'Akron, Guadalajara'
];

`;

content = content.substring(0, startIdx) + dictInject + newLoop + content.substring(endIdx);
fs.writeFileSync('src/lib/data.ts', content);
