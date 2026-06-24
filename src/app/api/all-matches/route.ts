import { NextResponse } from 'next/server';

// Função para mapear o nome do time da API (openfootball) para as nossas siglas de 3 letras
function getTeamCodeFromName(apiName: string): string {
  const map: Record<string, string> = {
    'Mexico': 'MEX', 'South Africa': 'RSA', 'South Korea': 'KOR', 'Czech Republic': 'CZE',
    'Canada': 'CAN', 'Switzerland': 'SUI', 'Qatar': 'QAT', 'Bosnia': 'BIH', 'Bosnia and Herzegovina': 'BIH', 'Bosnia & Herzegovina': 'BIH', 'Bosnia-Herzegovina': 'BIH',
    'Brazil': 'BRA', 'Morocco': 'MAR', 'Haiti': 'HAI', 'Scotland': 'SCO',
    'USA': 'USA', 'United States': 'USA', 'Paraguay': 'PAR', 'Australia': 'AUS', 'Turkey': 'TUR', 'Türkiye': 'TUR',
    'Germany': 'GER', 'Ecuador': 'ECU', 'Ivory Coast': 'CIV', "Côte d'Ivoire": 'CIV', 'Curaçao': 'CUW',
    'Netherlands': 'NED', 'Japan': 'JPN', 'Tunisia': 'TUN', 'Sweden': 'SWE',
    'Belgium': 'BEL', 'Egypt': 'EGY', 'Iran': 'IRN', 'New Zealand': 'NZL',
    'Spain': 'ESP', 'Uruguai': 'URU', 'Uruguay': 'URU', 'Saudi Arabia': 'KSA', 'Cape Verde': 'CPV', 'Cabo Verde': 'CPV',
    'France': 'FRA', 'Senegal': 'SEN', 'Norway': 'NOR', 'Iraq': 'IRQ',
    'Argentina': 'ARG', 'Algeria': 'ALG', 'Austria': 'AUT', 'Jordan': 'JOR',
    'Portugal': 'POR', 'Colombia': 'COL', 'Uzbekistan': 'UZB', 'DR Congo': 'COD', 'Congo DR': 'COD',
    'England': 'ENG', 'Croatia': 'CRO', 'Ghana': 'GHA', 'Panama': 'PAN'
  };
  return map[apiName] || apiName.substring(0, 3).toUpperCase();
}

export async function GET() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json', {
      // Revalida a cada 5 minutos
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch openfootball JSON');
    }

    const data = await response.json();
    const matches = data.matches || [];

    const finishedMatches = matches
      .filter((item: any) => item.score && item.score.ft)
      .map((item: any) => ({
        id: `finished_${item.team1}_${item.team2}`,
        homeTeamId: getTeamCodeFromName(item.team1),
        awayTeamId: getTeamCodeFromName(item.team2),
        homeScore: item.score.ft[0],
        awayScore: item.score.ft[1],
        status: 'FINISHED'
      }));

    return NextResponse.json({ matches: finishedMatches });
  } catch (error) {
    console.error("All-matches fetch error:", error);
    return NextResponse.json({ matches: [] });
  }
}
