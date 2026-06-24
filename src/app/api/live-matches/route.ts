import { NextResponse } from 'next/server';

export async function GET() {
  // Simulando jogos ao vivo com base nos times reais dos grupos C (Brasil) e D (EUA)
  const mockLiveMatches = [
    {
      id: 'm13', // Brasil x Marrocos
      homeTeamId: 'BRA',
      awayTeamId: 'MAR',
      homeScore: 3,
      awayScore: 0,
      status: 'IN_PROGRESS',
      group: 'C',
      phase: 'GROUP'
    },
    {
      id: 'm19', // EUA x Paraguai
      homeTeamId: 'USA',
      awayTeamId: 'PAR',
      homeScore: 1,
      awayScore: 1,
      status: 'IN_PROGRESS',
      group: 'D',
      phase: 'GROUP'
    }
  ];

  return NextResponse.json({ matches: mockLiveMatches });
}
