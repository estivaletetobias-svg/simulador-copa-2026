import { Team, Match, GroupStanding } from '../types';

export function calculateGroupStandings(teams: Team[], matches: Match[], group: string): GroupStanding[] {
  const groupTeams = teams.filter(t => t.group === group);
  
  // Consider both finished matches and in-progress matches that have a score,
  // or user predictions that override the "SCHEDULED" state if they have scores set locally.
  const groupMatches = matches.filter(m => 
    m.group === group && 
    m.homeScore !== null && 
    m.awayScore !== null
  );

  const standings: Record<string, GroupStanding> = {};

  groupTeams.forEach(t => {
    standings[t.id] = {
      teamId: t.id,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    };
  });

  groupMatches.forEach(m => {
    const home = standings[m.homeTeamId];
    const away = standings[m.awayTeamId];

    if (!home || !away) return;

    home.played++;
    away.played++;
    
    home.goalsFor += m.homeScore!;
    home.goalsAgainst += m.awayScore!;
    away.goalsFor += m.awayScore!;
    away.goalsAgainst += m.homeScore!;

    if (m.homeScore! > m.awayScore!) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (m.homeScore! < m.awayScore!) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points += 1;
      away.points += 1;
    }
  });

  Object.values(standings).forEach(s => {
    s.goalDifference = s.goalsFor - s.goalsAgainst;
  });

  // Basic FIFA tiebreakers: Points -> Goal Difference -> Goals For
  // Note: H2H (Head-to-head) is more complex and usually comes after if GD and GF are equal.
  return Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });
}

export function getQualifiedTeams(teams: Team[], matches: Match[]) {
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  
  const top2: GroupStanding[] = [];
  const thirdPlaces: GroupStanding[] = [];

  groups.forEach(g => {
    const standings = calculateGroupStandings(teams, matches, g);
    if (standings.length >= 3) {
      top2.push(standings[0]);
      top2.push(standings[1]);
      thirdPlaces.push(standings[2]);
    }
  });

  // Ordena os 3º colocados (Pontos -> Saldo -> Gols)
  thirdPlaces.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  const best8Thirds = thirdPlaces.slice(0, 8);

  return { top2, best8Thirds };
}

export function generateRoundOf32(teams: Team[], matches: Match[]): Match[] {
  const { top2, best8Thirds } = getQualifiedTeams(teams, matches);
  
  const qualified = [...top2, ...best8Thirds];
  if (qualified.length < 32) return [];

  const roundOf32Matches: Match[] = [];
  
  const getTeam = (group: string, pos: number) => {
    const standings = calculateGroupStandings(teams, matches, group);
    return standings[pos - 1]?.teamId;
  };

  let idCounter = 1;
  const createMatch = (homeId: string, awayId: string): Match => ({
    id: `ko_32_${idCounter++}`,
    homeTeamId: homeId,
    awayTeamId: awayId,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: '',
    stadium: 'Mata-Mata',
    phase: 'ROUND_OF_32'
  });

  // Mapeamento simplificado e dinâmico para garantir o funcionamento do Bracket
  roundOf32Matches.push(createMatch(getTeam('A', 1), best8Thirds[0]?.teamId));
  roundOf32Matches.push(createMatch(getTeam('B', 1), best8Thirds[1]?.teamId));
  roundOf32Matches.push(createMatch(getTeam('C', 1), best8Thirds[2]?.teamId));
  roundOf32Matches.push(createMatch(getTeam('D', 1), best8Thirds[3]?.teamId));
  roundOf32Matches.push(createMatch(getTeam('E', 1), best8Thirds[4]?.teamId));
  roundOf32Matches.push(createMatch(getTeam('F', 1), best8Thirds[5]?.teamId));
  roundOf32Matches.push(createMatch(getTeam('G', 1), best8Thirds[6]?.teamId));
  roundOf32Matches.push(createMatch(getTeam('H', 1), best8Thirds[7]?.teamId));

  roundOf32Matches.push(createMatch(getTeam('I', 1), getTeam('A', 2)));
  roundOf32Matches.push(createMatch(getTeam('J', 1), getTeam('B', 2)));
  roundOf32Matches.push(createMatch(getTeam('K', 1), getTeam('C', 2)));
  roundOf32Matches.push(createMatch(getTeam('L', 1), getTeam('D', 2)));

  roundOf32Matches.push(createMatch(getTeam('E', 2), getTeam('F', 2)));
  roundOf32Matches.push(createMatch(getTeam('G', 2), getTeam('H', 2)));
  roundOf32Matches.push(createMatch(getTeam('I', 2), getTeam('J', 2)));
  roundOf32Matches.push(createMatch(getTeam('K', 2), getTeam('L', 2)));

  return roundOf32Matches;
}

export function generateNextRound(prevRoundMatches: Match[], nextPhaseName: Match['phase'], startId: number): Match[] {
  const nextRoundMatches: Match[] = [];
  
  // Avança de 2 em 2 (vencedor do jogo 1 contra vencedor do jogo 2)
  for (let i = 0; i < prevRoundMatches.length; i += 2) {
    const m1 = prevRoundMatches[i];
    const m2 = prevRoundMatches[i + 1];

    let winner1 = '';
    if (m1 && m1.homeScore !== null && m1.awayScore !== null) {
      // Empates no mata-mata precisarão ser evitados pela UI ou considerados como o primeiro no if
      winner1 = m1.homeScore > m1.awayScore ? m1.homeTeamId : (m1.awayScore > m1.homeScore ? m1.awayTeamId : '');
    }
    
    let winner2 = '';
    if (m2 && m2.homeScore !== null && m2.awayScore !== null) {
      winner2 = m2.homeScore > m2.awayScore ? m2.homeTeamId : (m2.awayScore > m2.homeScore ? m2.awayTeamId : '');
    }

    nextRoundMatches.push({
      id: `ko_${nextPhaseName}_${startId++}`,
      homeTeamId: winner1,
      awayTeamId: winner2,
      homeScore: null,
      awayScore: null,
      status: 'SCHEDULED',
      date: '',
      stadium: 'Mata-Mata',
      phase: nextPhaseName
    });
  }

  return nextRoundMatches;
}
