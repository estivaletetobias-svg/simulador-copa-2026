const fs = require('fs');
let content = fs.readFileSync('src/lib/data.ts', 'utf-8');

// Add import
if (!content.includes('import { FIFA_GRID } from \'./fifaGrid\';')) {
  content = content.replace("import { Team, Match } from '../types';", "import { Team, Match } from '../types';\nimport { FIFA_GRID } from './fifaGrid';");
}

// Remove old arrays and generation logic
content = content.replace(/const matchScheduleData[\s\S]*?groups\.forEach\(\(group, index\) => \{[\s\S]*?\}\);\n/m, `
let matchIdCounter = 1;

FIFA_GRID.forEach(gridMatch => {
  const groupTeams = TEAMS.filter(t => t.group === gridMatch.group);
  if (groupTeams.length < 4) return;
  
  // Pos is 1-indexed
  const homeTeam = groupTeams[gridMatch.homePos - 1];
  const awayTeam = groupTeams[gridMatch.awayPos - 1];
  
  INITIAL_MATCHES.push({
    id: \`m\${matchIdCounter++}\`,
    homeTeamId: homeTeam.id,
    awayTeamId: awayTeam.id,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    group: gridMatch.group,
    phase: 'GROUP',
    date: gridMatch.date,
    time: gridMatch.time,
    venue: gridMatch.venue
  });
});
`);

fs.writeFileSync('src/lib/data.ts', content);
console.log('data.ts updated');
