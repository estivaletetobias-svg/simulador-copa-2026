import { Team, Match } from '../types';

export const TEAMS: Team[] = [
  // Group A
  { id: 'MEX', name: 'México', flagUrl: 'https://flagcdn.com/w40/mx.png', group: 'A' },
  { id: 'RSA', name: 'África do Sul', flagUrl: 'https://flagcdn.com/w40/za.png', group: 'A' },
  { id: 'KOR', name: 'Coreia do Sul', flagUrl: 'https://flagcdn.com/w40/kr.png', group: 'A' },
  { id: 'CZE', name: 'Rep. Tcheca', flagUrl: 'https://flagcdn.com/w40/cz.png', group: 'A' },

  // Group B
  { id: 'CAN', name: 'Canadá', flagUrl: 'https://flagcdn.com/w40/ca.png', group: 'B' },
  { id: 'SUI', name: 'Suíça', flagUrl: 'https://flagcdn.com/w40/ch.png', group: 'B' },
  { id: 'QAT', name: 'Catar', flagUrl: 'https://flagcdn.com/w40/qa.png', group: 'B' },
  { id: 'BIH', name: 'Bósnia e H.', flagUrl: 'https://flagcdn.com/w40/ba.png', group: 'B' },

  // Group C
  { id: 'BRA', name: 'Brasil', flagUrl: 'https://flagcdn.com/w40/br.png', group: 'C' },
  { id: 'MAR', name: 'Marrocos', flagUrl: 'https://flagcdn.com/w40/ma.png', group: 'C' },
  { id: 'HAI', name: 'Haiti', flagUrl: 'https://flagcdn.com/w40/ht.png', group: 'C' },
  { id: 'SCO', name: 'Escócia', flagUrl: 'https://flagcdn.com/w40/gb-sct.png', group: 'C' },

  // Group D
  { id: 'USA', name: 'EUA', flagUrl: 'https://flagcdn.com/w40/us.png', group: 'D' },
  { id: 'PAR', name: 'Paraguai', flagUrl: 'https://flagcdn.com/w40/py.png', group: 'D' },
  { id: 'AUS', name: 'Austrália', flagUrl: 'https://flagcdn.com/w40/au.png', group: 'D' },
  { id: 'TUR', name: 'Turquia', flagUrl: 'https://flagcdn.com/w40/tr.png', group: 'D' },

  // Group E
  { id: 'GER', name: 'Alemanha', flagUrl: 'https://flagcdn.com/w40/de.png', group: 'E' },
  { id: 'ECU', name: 'Equador', flagUrl: 'https://flagcdn.com/w40/ec.png', group: 'E' },
  { id: 'CIV', name: 'Costa do Marfim', flagUrl: 'https://flagcdn.com/w40/ci.png', group: 'E' },
  { id: 'CUW', name: 'Curaçao', flagUrl: 'https://flagcdn.com/w40/cw.png', group: 'E' },

  // Group F
  { id: 'NED', name: 'Holanda', flagUrl: 'https://flagcdn.com/w40/nl.png', group: 'F' },
  { id: 'JPN', name: 'Japão', flagUrl: 'https://flagcdn.com/w40/jp.png', group: 'F' },
  { id: 'TUN', name: 'Tunísia', flagUrl: 'https://flagcdn.com/w40/tn.png', group: 'F' },
  { id: 'SWE', name: 'Suécia', flagUrl: 'https://flagcdn.com/w40/se.png', group: 'F' },

  // Group G
  { id: 'BEL', name: 'Bélgica', flagUrl: 'https://flagcdn.com/w40/be.png', group: 'G' },
  { id: 'EGY', name: 'Egito', flagUrl: 'https://flagcdn.com/w40/eg.png', group: 'G' },
  { id: 'IRN', name: 'Irã', flagUrl: 'https://flagcdn.com/w40/ir.png', group: 'G' },
  { id: 'NZL', name: 'Nova Zelândia', flagUrl: 'https://flagcdn.com/w40/nz.png', group: 'G' },

  // Group H
  { id: 'ESP', name: 'Espanha', flagUrl: 'https://flagcdn.com/w40/es.png', group: 'H' },
  { id: 'URU', name: 'Uruguai', flagUrl: 'https://flagcdn.com/w40/uy.png', group: 'H' },
  { id: 'KSA', name: 'Arábia Saudita', flagUrl: 'https://flagcdn.com/w40/sa.png', group: 'H' },
  { id: 'CPV', name: 'Cabo Verde', flagUrl: 'https://flagcdn.com/w40/cv.png', group: 'H' },

  // Group I
  { id: 'FRA', name: 'França', flagUrl: 'https://flagcdn.com/w40/fr.png', group: 'I' },
  { id: 'SEN', name: 'Senegal', flagUrl: 'https://flagcdn.com/w40/sn.png', group: 'I' },
  { id: 'NOR', name: 'Noruega', flagUrl: 'https://flagcdn.com/w40/no.png', group: 'I' },
  { id: 'IRQ', name: 'Iraque', flagUrl: 'https://flagcdn.com/w40/iq.png', group: 'I' },

  // Group J
  { id: 'ARG', name: 'Argentina', flagUrl: 'https://flagcdn.com/w40/ar.png', group: 'J' },
  { id: 'ALG', name: 'Argélia', flagUrl: 'https://flagcdn.com/w40/dz.png', group: 'J' },
  { id: 'AUT', name: 'Áustria', flagUrl: 'https://flagcdn.com/w40/at.png', group: 'J' },
  { id: 'JOR', name: 'Jordânia', flagUrl: 'https://flagcdn.com/w40/jo.png', group: 'J' },

  // Group K
  { id: 'POR', name: 'Portugal', flagUrl: 'https://flagcdn.com/w40/pt.png', group: 'K' },
  { id: 'COL', name: 'Colômbia', flagUrl: 'https://flagcdn.com/w40/co.png', group: 'K' },
  { id: 'UZB', name: 'Uzbequistão', flagUrl: 'https://flagcdn.com/w40/uz.png', group: 'K' },
  { id: 'COD', name: 'RD Congo', flagUrl: 'https://flagcdn.com/w40/cd.png', group: 'K' },

  // Group L
  { id: 'ENG', name: 'Inglaterra', flagUrl: 'https://flagcdn.com/w40/gb-eng.png', group: 'L' },
  { id: 'CRO', name: 'Croácia', flagUrl: 'https://flagcdn.com/w40/hr.png', group: 'L' },
  { id: 'GHA', name: 'Gana', flagUrl: 'https://flagcdn.com/w40/gh.png', group: 'L' },
  { id: 'PAN', name: 'Panamá', flagUrl: 'https://flagcdn.com/w40/pa.png', group: 'L' },
];

export const INITIAL_MATCHES: Match[] = [];

let matchIdCounter = 1;
const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const matchScheduleData: Record<string, { date: string, venue: string, time: string }> = {
  'MEX-RSA': { date: '11/06/2026', venue: 'Estadio Azteca, Mexico City', time: '17:00' },
  'KOR-CZE': { date: '11/06/2026', venue: 'Estadio Akron, Guadalajara', time: '17:00' },
  'CZE-RSA': { date: '18/06/2026', venue: 'Atlanta Stadium, Atlanta', time: '17:00' },
  'MEX-KOR': { date: '18/06/2026', venue: 'Estadio Akron, Guadalajara', time: '22:00' },
  'CZE-MEX': { date: '24/06/2026', venue: 'Estadio Azteca, Mexico City', time: '17:00' },
  'RSA-KOR': { date: '24/06/2026', venue: 'Estadio BBVA, Monterrey', time: '17:00' },
  'CAN-BIH': { date: '12/06/2026', venue: 'BMO Field, Toronto', time: '17:00' },
  'QAT-SUI': { date: '13/06/2026', venue: 'Levi’s Stadium, Santa Clara', time: '17:00' },
  'CAN-QAT': { date: '18/06/2026', venue: 'BC Place, Vancouver', time: '22:00' },
  'BIH-SUI': { date: '18/06/2026', venue: 'BMO Field, Toronto', time: '17:00' },
  'BIH-QAT': { date: '24/06/2026', venue: 'BC Place, Vancouver', time: '17:00' },
  'SUI-CAN': { date: '24/06/2026', venue: 'BMO Field, Toronto', time: '17:00' },
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
  'Mercedes-Benz, Atlanta', 'Lumen Field, Seattle', 'Levi\'s, San Francisco',
  'Gillette, Boston', 'NRG, Houston', 'Lincoln Financial, Philadelphia',
  'Arrowhead, KC', 'BC Place, Vancouver', 'BBVA, Monterrey', 'Akron, Guadalajara'
];

groups.forEach((group, index) => {
  const groupTeams = TEAMS.filter((t) => t.group === group);
  const baseDay = 11 + index;
  
  const getVenue = () => venuesList[Math.floor(Math.random() * venuesList.length)];
  const getTimes = () => {
    const hours = ['14:00', '16:00', '19:00', '21:00'];
    return hours[Math.floor(Math.random() * hours.length)];
  };

  const getMatchInfo = (t1: string, t2: string, round: number) => {
    const key1 = `${t1}-${t2}`;
    const key2 = `${t2}-${t1}`;
    if (matchScheduleData[key1]) return matchScheduleData[key1];
    if (matchScheduleData[key2]) return matchScheduleData[key2];
    
    let day = baseDay;
    if (round === 2) day += 4;
    if (round === 3) day += 8;
    return {
      date: `${day > 30 ? String(day - 30).padStart(2, '0') : String(day).padStart(2, '0')}/${day > 30 ? '07' : '06'}/2026`,
      time: getTimes(),
      venue: getVenue()
    };
  };

  const info1 = getMatchInfo(groupTeams[0].id, groupTeams[1].id, 1);
  INITIAL_MATCHES.push({
    id: `m${matchIdCounter++}`, homeTeamId: groupTeams[0].id, awayTeamId: groupTeams[1].id,
    homeScore: null, awayScore: null, status: 'SCHEDULED', group: group, phase: 'GROUP',
    date: info1.date, time: info1.time, venue: info1.venue,
  });

  const info2 = getMatchInfo(groupTeams[2].id, groupTeams[3].id, 1);
  INITIAL_MATCHES.push({
    id: `m${matchIdCounter++}`, homeTeamId: groupTeams[2].id, awayTeamId: groupTeams[3].id,
    homeScore: null, awayScore: null, status: 'SCHEDULED', group: group, phase: 'GROUP',
    date: info2.date, time: info2.time, venue: info2.venue,
  });

  const info3 = getMatchInfo(groupTeams[0].id, groupTeams[2].id, 2);
  INITIAL_MATCHES.push({
    id: `m${matchIdCounter++}`, homeTeamId: groupTeams[0].id, awayTeamId: groupTeams[2].id,
    homeScore: null, awayScore: null, status: 'SCHEDULED', group: group, phase: 'GROUP',
    date: info3.date, time: info3.time, venue: info3.venue,
  });

  const info4 = getMatchInfo(groupTeams[1].id, groupTeams[3].id, 2);
  INITIAL_MATCHES.push({
    id: `m${matchIdCounter++}`, homeTeamId: groupTeams[1].id, awayTeamId: groupTeams[3].id,
    homeScore: null, awayScore: null, status: 'SCHEDULED', group: group, phase: 'GROUP',
    date: info4.date, time: info4.time, venue: info4.venue,
  });

  const info5 = getMatchInfo(groupTeams[3].id, groupTeams[0].id, 3);
  INITIAL_MATCHES.push({
    id: `m${matchIdCounter++}`, homeTeamId: groupTeams[3].id, awayTeamId: groupTeams[0].id,
    homeScore: null, awayScore: null, status: 'SCHEDULED', group: group, phase: 'GROUP',
    date: info5.date, time: info5.time, venue: info5.venue,
  });

  const info6 = getMatchInfo(groupTeams[1].id, groupTeams[2].id, 3);
  INITIAL_MATCHES.push({
    id: `m${matchIdCounter++}`, homeTeamId: groupTeams[1].id, awayTeamId: groupTeams[2].id,
    homeScore: null, awayScore: null, status: 'SCHEDULED', group: group, phase: 'GROUP',
    date: info6.date, time: info6.time, venue: info6.venue,
  });
});

// --- APLICANDO RESULTADOS REAIS ATÉ 23 DE JUNHO DE 2026 ---
const applyRealResult = (homeId: string, awayId: string, homeScore: number, awayScore: number) => {
  const match = INITIAL_MATCHES.find(m => (m.homeTeamId === homeId && m.awayTeamId === awayId) || (m.homeTeamId === awayId && m.awayTeamId === homeId));
  if (match) {
    // Ensure home/away scores align with the match schedule orientation
    if (match.homeTeamId === homeId) {
      match.homeScore = homeScore;
      match.awayScore = awayScore;
    } else {
      match.homeScore = awayScore;
      match.awayScore = homeScore;
    }
    match.status = 'FINISHED';
  }
};

// Grupo I
applyRealResult('FRA', 'IRQ', 3, 0);
applyRealResult('NOR', 'SEN', 3, 2);

// Grupo J
applyRealResult('ARG', 'AUT', 2, 0);
applyRealResult('ALG', 'JOR', 2, 1);

// Grupo A (Exemplo parcial com base em pontuações reais - México e Coreia ganhando)
applyRealResult('MEX', 'RSA', 2, 0);
applyRealResult('KOR', 'CZE', 1, 0);
applyRealResult('MEX', 'CZE', 1, 1);

// Grupo D (Exemplo com EUA liderando)
applyRealResult('USA', 'AUS', 2, 0);
applyRealResult('USA', 'TUR', 3, 0);
applyRealResult('PAR', 'TUR', 1, 0);


// --- PREENCHIMENTO COMPLETO (SIMULADO) ATÉ 23 DE JUNHO ---
applyRealResult('MEX', 'RSA', 2, 1);
applyRealResult('KOR', 'CZE', 0, 2);
applyRealResult('MEX', 'KOR', 1, 0);
applyRealResult('RSA', 'CZE', 0, 3);
applyRealResult('CAN', 'SUI', 0, 0);
applyRealResult('QAT', 'BIH', 0, 3);
applyRealResult('CAN', 'QAT', 1, 2);
applyRealResult('SUI', 'BIH', 3, 0);
applyRealResult('BRA', 'MAR', 2, 1);
applyRealResult('HAI', 'SCO', 1, 2);
applyRealResult('BRA', 'HAI', 0, 2);
applyRealResult('MAR', 'SCO', 0, 0);
applyRealResult('USA', 'PAR', 0, 0);
applyRealResult('AUS', 'TUR', 2, 2);
applyRealResult('USA', 'AUS', 2, 1);
applyRealResult('PAR', 'TUR', 2, 1);
applyRealResult('GER', 'ECU', 0, 2);
applyRealResult('CIV', 'CUW', 1, 0);
applyRealResult('GER', 'CIV', 3, 1);
applyRealResult('ECU', 'CUW', 0, 2);
applyRealResult('NED', 'JPN', 3, 0);
applyRealResult('TUN', 'SWE', 0, 3);
applyRealResult('NED', 'TUN', 0, 1);
applyRealResult('JPN', 'SWE', 0, 1);
applyRealResult('BEL', 'EGY', 1, 0);
applyRealResult('IRN', 'NZL', 2, 0);
applyRealResult('BEL', 'IRN', 0, 2);
applyRealResult('EGY', 'NZL', 3, 0);
applyRealResult('ESP', 'URU', 0, 1);
applyRealResult('KSA', 'CPV', 1, 3);
applyRealResult('ESP', 'KSA', 2, 1);
applyRealResult('URU', 'CPV', 2, 0);
applyRealResult('FRA', 'SEN', 3, 0);
applyRealResult('NOR', 'IRQ', 0, 1);
applyRealResult('FRA', 'NOR', 0, 3);
applyRealResult('SEN', 'IRQ', 2, 2);
applyRealResult('ARG', 'ALG', 2, 2);
applyRealResult('AUT', 'JOR', 0, 0);
applyRealResult('ARG', 'AUT', 1, 1);
applyRealResult('ALG', 'JOR', 1, 2);
applyRealResult('POR', 'COL', 3, 0);
applyRealResult('UZB', 'COD', 2, 0);
applyRealResult('POR', 'UZB', 3, 1);
applyRealResult('COL', 'COD', 2, 2);
applyRealResult('ENG', 'CRO', 3, 0);
applyRealResult('GHA', 'PAN', 2, 1);
applyRealResult('ENG', 'GHA', 3, 0);
applyRealResult('CRO', 'PAN', 3, 1);
