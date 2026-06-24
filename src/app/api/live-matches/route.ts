import { NextResponse } from 'next/server';

export async function GET() {
  // Simulando jogos ao vivo reais de hoje: 23 de Junho de 2026
  const mockLiveMatches = [
    {
      id: 'm_live_1', // Portugal x Uzbequistão
      homeTeamId: 'POR',
      awayTeamId: 'UZB',
      homeScore: 1,
      awayScore: 0,
      status: 'IN_PROGRESS',
      group: 'K',
      phase: 'GROUP'
    },
    {
      id: 'm_live_2', // Inglaterra x Gana
      homeTeamId: 'ENG',
      awayTeamId: 'GHA',
      homeScore: 2,
      awayScore: 1,
      status: 'IN_PROGRESS',
      group: 'L',
      phase: 'GROUP'
    },
    {
      id: 'm_live_3', // Panamá x Croácia
      homeTeamId: 'PAN',
      awayTeamId: 'CRO',
      homeScore: 0,
      awayScore: 2,
      status: 'IN_PROGRESS',
      group: 'L',
      phase: 'GROUP'
    },
    {
      id: 'm_live_4', // Colômbia x RD Congo
      homeTeamId: 'COL',
      awayTeamId: 'COD',
      homeScore: 1,
      awayScore: 1,
      status: 'IN_PROGRESS',
      group: 'K',
      phase: 'GROUP'
    }
  ];

  return NextResponse.json({ matches: mockLiveMatches });
}
