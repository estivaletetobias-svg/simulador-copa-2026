'use client';

import { Match, Team } from '../types';

interface KnockoutBracketProps {
  teams: Team[];
  matches: Match[];
  onScoreChange: (matchId: string, home: number | null, away: number | null) => void;
}

export default function KnockoutBracket({ teams, matches, onScoreChange }: KnockoutBracketProps) {
  const getTeam = (id: string | null | undefined) => teams.find(t => t.id === id);

  const renderMatch = (match: Match) => {
    const homeTeam = getTeam(match.homeTeamId);
    const awayTeam = getTeam(match.awayTeamId);

    return (
      <div key={match.id} className="bg-card-bg backdrop-blur-md rounded-xl p-4 mb-4 border border-white/10 shadow-lg">
        <div className="flex flex-col gap-3">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {homeTeam ? (
                <img src={homeTeam.flagUrl} alt={homeTeam.name} className="w-8 h-6 rounded object-cover shadow-sm" />
              ) : (
                <div className="w-8 h-6 bg-white/10 rounded" />
              )}
              <span className="font-semibold text-white truncate max-w-[120px]">
                {homeTeam ? homeTeam.name : 'A Definir'}
              </span>
            </div>
            <input
              type="number"
              min="0"
              className="w-12 h-10 bg-white/10 text-white rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-green-light"
              value={match.homeScore ?? ''}
              onChange={(e) => onScoreChange(match.id, e.target.value ? parseInt(e.target.value) : null, match.awayScore)}
              disabled={!homeTeam}
            />
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {awayTeam ? (
                <img src={awayTeam.flagUrl} alt={awayTeam.name} className="w-8 h-6 rounded object-cover shadow-sm" />
              ) : (
                <div className="w-8 h-6 bg-white/10 rounded" />
              )}
              <span className="font-semibold text-white truncate max-w-[120px]">
                {awayTeam ? awayTeam.name : 'A Definir'}
              </span>
            </div>
            <input
              type="number"
              min="0"
              className="w-12 h-10 bg-white/10 text-white rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-green-light"
              value={match.awayScore ?? ''}
              onChange={(e) => onScoreChange(match.id, match.homeScore, e.target.value ? parseInt(e.target.value) : null)}
              disabled={!awayTeam}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-black text-white mb-8 text-center uppercase tracking-wider">
        Mata-Mata <span className="text-yellow">2026</span>
      </h2>

      <div className="flex overflow-x-auto gap-8 pb-8 snap-x" style={{ minHeight: '600px' }}>
        {/* 16-Avos */}
        <div className="min-w-[300px] snap-center">
          <h3 className="text-xl font-bold text-green-light mb-6 text-center">16-Avos de Final</h3>
          {matches.filter(m => m.phase === 'ROUND_OF_32').map(renderMatch)}
        </div>

        {/* Oitavas */}
        <div className="min-w-[300px] snap-center flex flex-col justify-around">
          <h3 className="text-xl font-bold text-green-light mb-6 text-center">Oitavas de Final</h3>
          {matches.filter(m => m.phase === 'ROUND_OF_16').map(renderMatch)}
        </div>

        {/* Quartas */}
        <div className="min-w-[300px] snap-center flex flex-col justify-around">
          <h3 className="text-xl font-bold text-green-light mb-6 text-center">Quartas de Final</h3>
          {matches.filter(m => m.phase === 'QUARTER_FINALS').map(renderMatch)}
        </div>

        {/* Semis */}
        <div className="min-w-[300px] snap-center flex flex-col justify-around">
          <h3 className="text-xl font-bold text-green-light mb-6 text-center">Semifinais</h3>
          {matches.filter(m => m.phase === 'SEMI_FINALS').map(renderMatch)}
        </div>

        {/* Final */}
        <div className="min-w-[300px] snap-center flex flex-col justify-center">
          <h3 className="text-2xl font-black text-yellow mb-6 text-center">FINAL</h3>
          {matches.filter(m => m.phase === 'FINAL').map(renderMatch)}
        </div>
      </div>
    </div>
  );
}
