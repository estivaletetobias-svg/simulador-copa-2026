import React from 'react';
import { Team, Match } from '../types';

interface Props {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
  onScoreChange: (matchId: string, homeScore: number | null, awayScore: number | null) => void;
}

export default function MatchCard({ match, homeTeam, awayTeam, onScoreChange }: Props) {
  const isReadOnly = match.status === 'FINISHED' || match.status === 'IN_PROGRESS';

  const handleHomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newScore = val === '' ? null : parseInt(val, 10);
    onScoreChange(match.id, newScore, match.awayScore);
  };

  const handleAwayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newScore = val === '' ? null : parseInt(val, 10);
    onScoreChange(match.id, match.homeScore, newScore);
  };

  return (
    <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Home Team */}
      <div style={{ display: 'flex', alignItems: 'center', width: '35%', justifyContent: 'flex-end', gap: '12px' }}>
        <span style={{ fontWeight: '600' }}>{homeTeam.name}</span>
        <img src={homeTeam.flagUrl} alt={`Bandeira ${homeTeam.name}`} width={32} height={24} style={{ borderRadius: '4px' }} />
      </div>

      {/* Score / Inputs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '30%', justifyContent: 'center' }}>
        <input 
          type="number" 
          className="score-input" 
          value={match.homeScore ?? ''} 
          onChange={handleHomeChange}
          readOnly={isReadOnly}
          min="0"
          max="99"
        />
        <span style={{ color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>X</span>
        <input 
          type="number" 
          className="score-input" 
          value={match.awayScore ?? ''} 
          onChange={handleAwayChange}
          readOnly={isReadOnly}
          min="0"
          max="99"
        />
      </div>

      {/* Away Team */}
      <div style={{ display: 'flex', alignItems: 'center', width: '35%', gap: '12px' }}>
        <img src={awayTeam.flagUrl} alt={`Bandeira ${awayTeam.name}`} width={32} height={24} style={{ borderRadius: '4px' }} />
        <span style={{ fontWeight: '600' }}>{awayTeam.name}</span>
      </div>
    </div>
  );
}
