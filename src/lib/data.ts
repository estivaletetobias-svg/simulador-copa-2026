import { Team, Match } from '../types';
import { FIFA_GRID } from './fifaGrid';

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
  { id: 'COD', name: 'RD Congo', flagUrl: 'https://flagcdn.com/w40/cd.png', group: 'K' },
  { id: 'UZB', name: 'Uzbequistão', flagUrl: 'https://flagcdn.com/w40/uz.png', group: 'K' },
  { id: 'COL', name: 'Colômbia', flagUrl: 'https://flagcdn.com/w40/co.png', group: 'K' },

  // Group L
  { id: 'ENG', name: 'Inglaterra', flagUrl: 'https://flagcdn.com/w40/gb-eng.png', group: 'L' },
  { id: 'CRO', name: 'Croácia', flagUrl: 'https://flagcdn.com/w40/hr.png', group: 'L' },
  { id: 'GHA', name: 'Gana', flagUrl: 'https://flagcdn.com/w40/gh.png', group: 'L' },
  { id: 'PAN', name: 'Panamá', flagUrl: 'https://flagcdn.com/w40/pa.png', group: 'L' },
];

export const INITIAL_MATCHES: Match[] = [];

let matchIdCounter = 1;
const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];


FIFA_GRID.forEach(gridMatch => {
  const groupTeams = TEAMS.filter(t => t.group === gridMatch.group);
  if (groupTeams.length < 4) return;
  
  // Pos is 1-indexed
  const homeTeam = groupTeams[gridMatch.homePos - 1];
  const awayTeam = groupTeams[gridMatch.awayPos - 1];
  
  INITIAL_MATCHES.push({
    id: `m${matchIdCounter++}`,
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
// Leftovers removed
// --- APLICANDO RESULTADOS REAIS ATÉ 23 DE JUNHO DE 2026 ---
const applyRealResult = (homeId: string, awayId: string, homeScore: number, awayScore: number) => {
  const match = INITIAL_MATCHES.find(m => (m.homeTeamId === homeId && m.awayTeamId === awayId) || (m.homeTeamId === awayId && m.awayTeamId === homeId));
  if (match) {
    // Only apply if the match is scheduled on or before June 23, 2026
    if (!match.date) return;
    const [day, month, year] = match.date.split('/');
    const matchDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const cutoffDate = new Date(2026, 5, 23); // June 23, 2026
    if (matchDate > cutoffDate) return;

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

// --- APENAS RESULTADOS VERÍDICOS DA COPA DE 2026 (Até 23/06) ---
// Qualquer outro jogo será atualizado pela API de Live Matches ou quando for finalizado.
// Grupo K
applyRealResult('POR', 'COD', 0, 0);
applyRealResult('COL', 'UZB', 3, 0);
applyRealResult('POR', 'UZB', 5, 0);

// A ordem original do FIFA_GRID será preservada para evitar que os jogos de uma mesma rodada
// apareçam fora da ordem lógica (ex: Jogo 4 antes do Jogo 3) devido a fusos horários.

export const getInitialMatches = () => {
  return INITIAL_MATCHES;
};
