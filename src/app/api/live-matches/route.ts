import { NextResponse } from 'next/server';

// Função para mapear o nome do time da API para as nossas siglas de 3 letras
function getTeamCodeFromName(apiName: string): string {
  const map: Record<string, string> = {
    'Mexico': 'MEX', 'South Africa': 'RSA', 'South Korea': 'KOR', 'Czech Republic': 'CZE',
    'Canada': 'CAN', 'Switzerland': 'SUI', 'Qatar': 'QAT', 'Bosnia': 'BIH', 'Bosnia and Herzegovina': 'BIH',
    'Brazil': 'BRA', 'Morocco': 'MAR', 'Haiti': 'HAI', 'Scotland': 'SCO',
    'USA': 'USA', 'Paraguay': 'PAR', 'Australia': 'AUS', 'Turkey': 'TUR', 'Türkiye': 'TUR',
    'Germany': 'GER', 'Ecuador': 'ECU', 'Ivory Coast': 'CIV', 'Curaçao': 'CUW',
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
    // Usando a SUA chave da API-Football
    const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all&league=1&season=2026', {
      headers: {
        'x-apisports-key': 'ec50909d01fae2fb2fd37676eb2ed718'
      },
      // Cache configurado para tentar atualizar a cada 60 segundos na Vercel
      next: { revalidate: 60 }
    });

    const data = await response.json();

    // Se a API bloquear por causa do plano gratuito, retornamos um Mock pro Radar não morrer no ambiente de teste
    if (data.errors && data.errors.plan) {
      console.warn("API Error:", data.errors.plan);
      return NextResponse.json({ 
        matches: [
          {
            id: "live_mock_1",
            homeTeamId: "COL",
            awayTeamId: "COD",
            homeScore: 1,
            awayScore: 0,
            status: "IN_PROGRESS",
            group: "",
            phase: "GROUP"
          }
        ] 
      });
    }

    const liveMatches = (data.response || []).map((item: any) => ({
      id: `live_${item.fixture.id}`,
      homeTeamId: getTeamCodeFromName(item.teams.home.name),
      awayTeamId: getTeamCodeFromName(item.teams.away.name),
      homeScore: item.goals.home ?? 0,
      awayScore: item.goals.away ?? 0,
      status: 'IN_PROGRESS',
      group: '', // Radar ignora o grupo
      phase: 'GROUP' // Ou mata-mata dependendo da data, mas pro radar não importa
    }));

    return NextResponse.json({ matches: liveMatches });
  } catch (error) {
    console.error("Live fetch error:", error);
    return NextResponse.json({ matches: [] });
  }
}
