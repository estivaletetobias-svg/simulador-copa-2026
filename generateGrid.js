const fs = require('fs');

const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const grid = [];
let matchIdCounter = 1;

// Base dates per group (approximations based on 2026 calendar structure)
const baseDates = {
  A: 11, B: 12, C: 13, D: 14, E: 15, F: 15,
  G: 16, H: 16, I: 17, J: 17, K: 18, L: 18
};

const venues = [
  'MetLife Stadium, NY', 'SoFi Stadium, LA', 'Estadio Azteca, Mexico City', 
  'BMO Field, Toronto', 'Hard Rock Stadium, Miami', 'AT&T Stadium, Dallas', 
  'Mercedes-Benz Stadium, Atlanta', 'Lumen Field, Seattle', 'Levi\'s Stadium, San Francisco',
  'Gillette Stadium, Boston', 'NRG Stadium, Houston', 'Lincoln Financial Field, Philadelphia',
  'Arrowhead Stadium, KC', 'BC Place, Vancouver', 'Estadio BBVA, Monterrey', 'Estadio Akron, Guadalajara'
];

groups.forEach(group => {
  const d1 = baseDates[group];
  const d2 = d1 + 6;
  const d3 = d2 + 6;

  // Round 1
  grid.push({ group, matchId: matchIdCounter++, homePos: 1, awayPos: 2, date: `${d1.toString().padStart(2, '0')}/06/2026`, time: '14:00', venue: venues[Math.floor(Math.random()*venues.length)] });
  grid.push({ group, matchId: matchIdCounter++, homePos: 3, awayPos: 4, date: `${d1.toString().padStart(2, '0')}/06/2026`, time: '17:00', venue: venues[Math.floor(Math.random()*venues.length)] });

  // Round 2
  grid.push({ group, matchId: matchIdCounter++, homePos: 1, awayPos: 3, date: `${d2.toString().padStart(2, '0')}/06/2026`, time: '17:00', venue: venues[Math.floor(Math.random()*venues.length)] });
  grid.push({ group, matchId: matchIdCounter++, homePos: 4, awayPos: 2, date: `${d2.toString().padStart(2, '0')}/06/2026`, time: '21:00', venue: venues[Math.floor(Math.random()*venues.length)] });

  // Round 3
  grid.push({ group, matchId: matchIdCounter++, homePos: 4, awayPos: 1, date: `${d3.toString().padStart(2, '0')}/06/2026`, time: '17:00', venue: venues[Math.floor(Math.random()*venues.length)] });
  grid.push({ group, matchId: matchIdCounter++, homePos: 2, awayPos: 3, date: `${d3.toString().padStart(2, '0')}/06/2026`, time: '17:00', venue: venues[Math.floor(Math.random()*venues.length)] });
});

// Hardcode Group C to match the specific dates user wants!
// User requested:
// R1: 13/06 (1v2, 3v4)
// R2: 19/06 (1v3, 4v2 -> wait, in my code: 1v3, 2v4? user screenshot: Brasil(1) x Haiti(3) -> Brasil 3 x 0 Haiti)
// Let's fix Group C perfectly to match the image:
grid.forEach(m => {
  if (m.group === 'C') {
    if (m.homePos === 1 && m.awayPos === 2) { m.date = '13/06/2026'; m.time = '17:00'; m.venue = 'New York New Jersey Stadium'; } // BRA vs MAR
    if (m.homePos === 3 && m.awayPos === 4) { m.date = '13/06/2026'; m.time = '17:00'; m.venue = 'Boston Stadium, Foxborough'; } // HAI vs SCO
    
    if (m.homePos === 1 && m.awayPos === 3) { m.date = '19/06/2026'; m.time = '17:00'; m.venue = 'Miami Stadium, Miami Gardens'; } // BRA vs HAI (2nd round!)
    if (m.homePos === 4 && m.awayPos === 2) { m.date = '19/06/2026'; m.time = '21:00'; m.venue = 'Los Angeles Stadium, Inglewood'; } // SCO vs MAR (2nd round!)
    
    if (m.homePos === 4 && m.awayPos === 1) { m.date = '25/06/2026'; m.time = '17:00'; m.venue = 'Los Angeles Stadium, Inglewood'; } // SCO vs BRA (3rd round!)
    if (m.homePos === 2 && m.awayPos === 3) { m.date = '25/06/2026'; m.time = '17:00'; m.venue = 'Boston Stadium, Foxborough'; } // MAR vs HAI (3rd round!)
  }
});

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
console.log('FIFA Grid generated.');
