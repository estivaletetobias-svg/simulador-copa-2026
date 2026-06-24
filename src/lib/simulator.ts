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
    if (!m.homeTeamId || !m.awayTeamId) return;
    
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

  const getThird = () => {
    const t = best8Thirds.shift();
    return t ? t.teamId : null;
  };

  const formatR32Match = (idNum: number, homeId: string | null, awayId: string | null, date: string, time: string, venue: string): Match => {
    return {
      id: `ko_32_${idNum}`,
      homeTeamId: homeId,
      awayTeamId: awayId,
      homeScore: null,
      awayScore: null,
      status: 'SCHEDULED',
      date,
      time,
      venue,
      phase: 'ROUND_OF_32'
    };
  };

  // Ordem sequencial customizada para que as chaves casem perfeitamente
  // O vencedor do item 0 pega o vencedor do item 1
  // Sequência: 74-77, 73-75, 83-84, 81-82, 76-78, 79-80, 86-88, 85-87
  
  roundOf32Matches.push(formatR32Match(74, getTeam('E', 1), getThird(), '29/06/2026', '16:30', 'Boston'));
  roundOf32Matches.push(formatR32Match(77, getTeam('I', 1), getThird(), '30/06/2026', '17:00', 'New York/New Jersey'));
  
  roundOf32Matches.push(formatR32Match(73, getTeam('A', 2), getTeam('B', 2), '28/06/2026', '12:00', 'Los Angeles'));
  roundOf32Matches.push(formatR32Match(75, getTeam('F', 1), getTeam('C', 2), '29/06/2026', '19:00', 'Monterrey'));
  
  roundOf32Matches.push(formatR32Match(83, getTeam('K', 2), getTeam('L', 2), '02/07/2026', '19:00', 'Houston'));
  roundOf32Matches.push(formatR32Match(84, getTeam('H', 1), getTeam('J', 2), '02/07/2026', '12:00', 'Dallas'));
  
  roundOf32Matches.push(formatR32Match(81, getTeam('D', 1), getThird(), '01/07/2026', '17:00', 'San Francisco'));
  roundOf32Matches.push(formatR32Match(82, getTeam('G', 1), getThird(), '01/07/2026', '13:00', 'Seattle'));
  
  roundOf32Matches.push(formatR32Match(76, getTeam('C', 1), getTeam('F', 2), '29/06/2026', '12:00', 'Houston'));
  roundOf32Matches.push(formatR32Match(78, getTeam('E', 2), getTeam('I', 2), '30/06/2026', '12:00', 'Dallas'));
  
  roundOf32Matches.push(formatR32Match(79, getTeam('A', 1), getThird(), '30/06/2026', '19:00', 'Mexico City'));
  roundOf32Matches.push(formatR32Match(80, getTeam('L', 1), getThird(), '01/07/2026', '12:00', 'Atlanta'));
  
  roundOf32Matches.push(formatR32Match(86, getTeam('J', 1), getTeam('H', 2), '03/07/2026', '18:00', 'Philadelphia'));
  roundOf32Matches.push(formatR32Match(88, getTeam('D', 2), getTeam('G', 2), '03/07/2026', '13:00', 'Kansas City'));
  
  roundOf32Matches.push(formatR32Match(85, getTeam('B', 1), getThird(), '02/07/2026', '20:00', 'Vancouver'));
  roundOf32Matches.push(formatR32Match(87, getTeam('K', 1), getThird(), '03/07/2026', '20:30', 'Miami'));

  return roundOf32Matches;
}

// Mapa de referências para os próximos jogos
const KO_METADATA: Record<string, { idNum: number, date: string, time: string, venue: string }> = {
  // Oitavas (89 a 96)
  'ko_ROUND_OF_16_0': { idNum: 89, date: '04/07/2026', time: '18:00', venue: 'Philadelphia' },
  'ko_ROUND_OF_16_1': { idNum: 90, date: '04/07/2026', time: '19:00', venue: 'Houston' },
  'ko_ROUND_OF_16_2': { idNum: 93, date: '06/07/2026', time: '17:00', venue: 'Dallas' },
  'ko_ROUND_OF_16_3': { idNum: 94, date: '06/07/2026', time: '19:00', venue: 'Seattle' },
  'ko_ROUND_OF_16_4': { idNum: 91, date: '05/07/2026', time: '17:00', venue: 'New York/New Jersey' },
  'ko_ROUND_OF_16_5': { idNum: 92, date: '05/07/2026', time: '19:00', venue: 'Mexico City' },
  'ko_ROUND_OF_16_6': { idNum: 95, date: '07/07/2026', time: '18:00', venue: 'Atlanta' },
  'ko_ROUND_OF_16_7': { idNum: 96, date: '07/07/2026', time: '19:00', venue: 'Vancouver' },
  
  // Quartas (97 a 100)
  'ko_QUARTER_FINALS_0': { idNum: 97, date: '09/07/2026', time: '18:00', venue: 'Boston' },
  'ko_QUARTER_FINALS_1': { idNum: 98, date: '10/07/2026', time: '19:00', venue: 'Los Angeles' },
  'ko_QUARTER_FINALS_2': { idNum: 99, date: '11/07/2026', time: '18:00', venue: 'Miami' },
  'ko_QUARTER_FINALS_3': { idNum: 100, date: '11/07/2026', time: '19:00', venue: 'Kansas City' },

  // Semis (101 a 102)
  'ko_SEMI_FINALS_0': { idNum: 101, date: '14/07/2026', time: '18:00', venue: 'Dallas' },
  'ko_SEMI_FINALS_1': { idNum: 102, date: '15/07/2026', time: '19:00', venue: 'Atlanta' },

  // Disputa de 3º Lugar (103)
  'ko_THIRD_PLACE_0': { idNum: 103, date: '18/07/2026', time: '18:00', venue: 'Miami' },

  // Final (104)
  'ko_FINAL_0': { idNum: 104, date: '19/07/2026', time: '15:00', venue: 'New York/New Jersey' }
};

export function generateNextRound(prevRoundMatches: Match[], nextPhaseName: Match['phase'], startId: number): Match[] {
  const nextRoundMatches: Match[] = [];
  
  for (let i = 0; i < prevRoundMatches.length; i += 2) {
    const m1 = prevRoundMatches[i];
    const m2 = prevRoundMatches[i + 1];

    let winner1: string | null = null;
    if (m1 && m1.homeScore !== null && m1.awayScore !== null) {
      if (m1.homeScore > m1.awayScore) winner1 = m1.homeTeamId;
      else if (m1.awayScore > m1.homeScore) winner1 = m1.awayTeamId;
      else if (m1.homePenalties !== undefined && m1.awayPenalties !== undefined && m1.homePenalties !== null && m1.awayPenalties !== null) {
        if (m1.homePenalties > m1.awayPenalties) winner1 = m1.homeTeamId;
        else if (m1.awayPenalties > m1.homePenalties) winner1 = m1.awayTeamId;
      }
    }
    
    let winner2: string | null = null;
    if (m2 && m2.homeScore !== null && m2.awayScore !== null) {
      if (m2.homeScore > m2.awayScore) winner2 = m2.homeTeamId;
      else if (m2.awayScore > m2.homeScore) winner2 = m2.awayTeamId;
      else if (m2.homePenalties !== undefined && m2.awayPenalties !== undefined && m2.homePenalties !== null && m2.awayPenalties !== null) {
        if (m2.homePenalties > m2.awayPenalties) winner2 = m2.homeTeamId;
        else if (m2.awayPenalties > m2.homePenalties) winner2 = m2.awayTeamId;
      }
    }

    const keyId = `ko_${nextPhaseName}_${i / 2}`;
    const meta = KO_METADATA[keyId] || { idNum: 0, date: 'TBD', time: 'TBD', venue: 'TBD' };

    nextRoundMatches.push({
      id: `ko_${meta.idNum}`, // Usa o número oficial do jogo (89, 90, etc)
      homeTeamId: winner1,
      awayTeamId: winner2,
      homeScore: null,
      awayScore: null,
      status: 'SCHEDULED',
      date: meta.date,
      time: meta.time,
      venue: meta.venue,
      phase: nextPhaseName
    });
  }

  return nextRoundMatches;
}

export function generateThirdPlaceMatch(semiFinalMatches: Match[]): Match[] {
  if (semiFinalMatches.length !== 2) return [];

  const m1 = semiFinalMatches[0];
  const m2 = semiFinalMatches[1];

  let loser1: string | null = null;
  if (m1 && m1.homeScore !== null && m1.awayScore !== null) {
    if (m1.homeScore < m1.awayScore) loser1 = m1.homeTeamId;
    else if (m1.awayScore < m1.homeScore) loser1 = m1.awayTeamId;
    else if (m1.homePenalties !== undefined && m1.awayPenalties !== undefined && m1.homePenalties !== null && m1.awayPenalties !== null) {
      if (m1.homePenalties < m1.awayPenalties) loser1 = m1.homeTeamId;
      else if (m1.awayPenalties < m1.homePenalties) loser1 = m1.awayTeamId;
    }
  }

  let loser2: string | null = null;
  if (m2 && m2.homeScore !== null && m2.awayScore !== null) {
    if (m2.homeScore < m2.awayScore) loser2 = m2.homeTeamId;
    else if (m2.awayScore < m2.homeScore) loser2 = m2.awayTeamId;
    else if (m2.homePenalties !== undefined && m2.awayPenalties !== undefined && m2.homePenalties !== null && m2.awayPenalties !== null) {
      if (m2.homePenalties < m2.awayPenalties) loser2 = m2.homeTeamId;
      else if (m2.awayPenalties < m2.homePenalties) loser2 = m2.awayTeamId;
    }
  }

  const meta = KO_METADATA['ko_THIRD_PLACE_0'];

  return [{
    id: `ko_${meta.idNum}`,
    homeTeamId: loser1,
    awayTeamId: loser2,
    homeScore: null,
    awayScore: null,
    status: 'SCHEDULED',
    date: meta.date,
    time: meta.time,
    venue: meta.venue,
    phase: 'THIRD_PLACE'
  }];
}
