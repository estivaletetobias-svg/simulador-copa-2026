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

    // Identificar o vencedor visualmente
    const homeWon = match.homeScore !== null && match.awayScore !== null && match.homeScore > match.awayScore;
    const awayWon = match.homeScore !== null && match.awayScore !== null && match.awayScore > match.homeScore;
    const isFinished = match.homeScore !== null && match.awayScore !== null;

    return (
      <div 
        key={match.id} 
        className={`relative bg-gradient-to-br from-[#050b14] to-[#0a192f] rounded-xl p-3 mb-4 border transition-all duration-300 ${
          isFinished ? 'border-green-light/50 shadow-[0_0_15px_rgba(16,194,84,0.2)]' : 'border-white/10 hover:border-white/30'
        }`}
        style={{ minWidth: '260px' }}
      >
        {/* Linha conectora falsa (visual styling) */}
        <div className="absolute top-1/2 -right-4 w-4 h-[2px] bg-white/10 hidden md:block"></div>

        <div className="flex flex-col gap-2">
          {/* Home Team */}
          <div className={`flex items-center justify-between p-1 rounded transition-colors ${homeWon ? 'bg-green-light/10' : ''}`}>
            <div className="flex items-center gap-2">
              {homeTeam ? (
                <img src={homeTeam.flagUrl} alt={homeTeam.name} className="w-6 h-4 rounded-sm object-cover shadow-sm" />
              ) : (
                <div className="w-6 h-4 bg-white/5 border border-white/10 dashed rounded-sm" />
              )}
              <span className={`font-semibold truncate max-w-[110px] text-sm ${homeWon ? 'text-green-light' : (homeTeam ? 'text-white' : 'text-gray-500')}`}>
                {homeTeam ? homeTeam.name : 'A Definir'}
              </span>
            </div>
            <input
              type="number"
              min="0"
              className={`w-10 h-8 bg-black/40 rounded text-center font-bold text-sm outline-none border transition-all ${
                homeWon ? 'border-green-light text-green-light shadow-[0_0_8px_rgba(16,194,84,0.4)]' : 'border-transparent text-white focus:border-yellow'
              }`}
              value={match.homeScore ?? ''}
              onChange={(e) => onScoreChange(match.id, e.target.value ? parseInt(e.target.value) : null, match.awayScore)}
              disabled={!homeTeam}
            />
          </div>

          {/* Divisor */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Away Team */}
          <div className={`flex items-center justify-between p-1 rounded transition-colors ${awayWon ? 'bg-green-light/10' : ''}`}>
            <div className="flex items-center gap-2">
              {awayTeam ? (
                <img src={awayTeam.flagUrl} alt={awayTeam.name} className="w-6 h-4 rounded-sm object-cover shadow-sm" />
              ) : (
                <div className="w-6 h-4 bg-white/5 border border-white/10 dashed rounded-sm" />
              )}
              <span className={`font-semibold truncate max-w-[110px] text-sm ${awayWon ? 'text-green-light' : (awayTeam ? 'text-white' : 'text-gray-500')}`}>
                {awayTeam ? awayTeam.name : 'A Definir'}
              </span>
            </div>
            <input
              type="number"
              min="0"
              className={`w-10 h-8 bg-black/40 rounded text-center font-bold text-sm outline-none border transition-all ${
                awayWon ? 'border-green-light text-green-light shadow-[0_0_8px_rgba(16,194,84,0.4)]' : 'border-transparent text-white focus:border-yellow'
              }`}
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
    <div className="mt-16 p-8 rounded-3xl bg-gradient-to-b from-[#02050a] to-[#050b14] shadow-2xl border border-white/5 relative overflow-hidden">
      {/* Luz de fundo do estádio */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-light/5 blur-[120px] rounded-full pointer-events-none"></div>

      <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow to-green-light mb-12 text-center uppercase tracking-widest drop-shadow-md">
        Fase Final <span className="text-white">2026</span>
      </h2>

      <div className="flex overflow-x-auto gap-12 pb-8 snap-x custom-scrollbar" style={{ minHeight: '800px' }}>
        {/* 16-Avos */}
        <div className="min-w-[260px] snap-center flex flex-col justify-around">
          <h3 className="text-sm font-bold text-gray-400 mb-6 text-center uppercase tracking-widest">16-Avos de Final</h3>
          {matches.filter(m => m.phase === 'ROUND_OF_32').map(renderMatch)}
        </div>

        {/* Oitavas */}
        <div className="min-w-[260px] snap-center flex flex-col justify-around">
          <h3 className="text-sm font-bold text-gray-400 mb-6 text-center uppercase tracking-widest">Oitavas de Final</h3>
          {matches.filter(m => m.phase === 'ROUND_OF_16').map(renderMatch)}
        </div>

        {/* Quartas */}
        <div className="min-w-[260px] snap-center flex flex-col justify-around">
          <h3 className="text-sm font-bold text-gray-400 mb-6 text-center uppercase tracking-widest">Quartas de Final</h3>
          {matches.filter(m => m.phase === 'QUARTER_FINALS').map(renderMatch)}
        </div>

        {/* Semis */}
        <div className="min-w-[260px] snap-center flex flex-col justify-around">
          <h3 className="text-sm font-bold text-yellow mb-6 text-center uppercase tracking-widest drop-shadow-md">Semifinais</h3>
          {matches.filter(m => m.phase === 'SEMI_FINALS').map(renderMatch)}
        </div>

        {/* Final */}
        <div className="min-w-[300px] snap-center flex flex-col justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow/10 blur-[60px] rounded-full pointer-events-none"></div>
          <h3 className="text-3xl font-black text-yellow mb-8 text-center uppercase tracking-widest drop-shadow-[0_0_15px_rgba(254,223,0,0.5)]">GRANDE FINAL</h3>
          {matches.filter(m => m.phase === 'FINAL').map(renderMatch)}
        </div>
      </div>
    </div>
  );
}
