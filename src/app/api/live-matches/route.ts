import { NextResponse } from 'next/server';

function parseMatchDate(dateStr: string, timeStr: string): Date {
  // dateStr: "2026-06-23", timeStr: "20:00 UTC-6"
  const [time, timezone] = timeStr.split(' ');
  const sign = timezone.includes('-') ? '-' : '+';
  const hoursOffset = parseInt(timezone.replace('UTC', '').replace('+', '').replace('-', ''), 10) || 0;
  
  const paddedOffset = String(hoursOffset).padStart(2, '0');
  const isoString = `${dateStr}T${time}:00${sign}${paddedOffset}:00`;
  return new Date(isoString);
}

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
    const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json', {
      next: { revalidate: 60 }
    });
    const data = await response.json();
    const now = new Date();
    
    // Calcula quais jogos estão acontecendo agora (entre start time e start time + 115 mins)
    const liveMatches = data.matches.filter((m: any) => {
      if (!m.date || !m.time) return false;
      const startTime = parseMatchDate(m.date, m.time);
      const endTime = new Date(startTime.getTime() + 115 * 60000); // 1h55m
      return now >= startTime && now <= endTime;
    }).map((m: any) => {
      let homeScore = 0;
      let awayScore = 0;
      if (m.score && m.score.ft) {
        homeScore = m.score.ft[0] || 0;
        awayScore = m.score.ft[1] || 0;
      }
      return {
        id: `live_${m.team1}_${m.team2}`,
        homeTeamId: getTeamCodeFromName(m.team1),
        awayTeamId: getTeamCodeFromName(m.team2),
        homeScore,
        awayScore,
        status: 'IN_PROGRESS',
        group: m.group || '',
        phase: 'GROUP'
      };
    });

    return NextResponse.json({ matches: liveMatches });
  } catch (error) {
    console.error("Live fetch error:", error);
    return NextResponse.json({ matches: [] });
  }
}
