import React from 'react';
import { Team, Match } from '../types';

interface Props {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
  onScoreChange: (matchId: string, homeScore: number | null, awayScore: number | null) => void;
  onPenaltyChange?: (matchId: string, homePenalties: number | null, awayPenalties: number | null) => void;
}

export default function MatchCard({ match, homeTeam, awayTeam, onScoreChange, onPenaltyChange }: Props) {
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
    <div className="glass-panel mc-panel">
      
      {/* Match Info (Venue, Date, Time) */}
      {(match.venue || match.date || match.time) && (
        <div className="mc-info">
          {match.venue && <span>📍 {match.venue}</span>}
          {match.date && <span>📅 {match.date}</span>}
          {match.time && <span>às {match.time} (BRT)</span>}
        </div>
      )}

      <div className="mc-row">
        {/* Home Team */}
        <div className="mc-team mc-team-home">
          <span className="mc-team-name">{homeTeam.name}</span>
          <img src={homeTeam.flagUrl} alt={`Bandeira ${homeTeam.name}`} className="mc-flag" />
        </div>

        {/* Score / Inputs */}
        <div className="mc-score-area">
          <input 
            type="number" 
            className="score-input" 
            value={match.homeScore ?? ''} 
            onChange={handleHomeChange}
            readOnly={isReadOnly}
            min="0"
            max="99"
          />
          <span className="mc-score-divider">X</span>
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
        <div className="mc-team mc-team-away">
          <img src={awayTeam.flagUrl} alt={`Bandeira ${awayTeam.name}`} className="mc-flag" />
          <span className="mc-team-name">{awayTeam.name}</span>
        </div>
      </div>

      {/* Penalties Area */}
      {match.phase !== 'GROUP' && match.homeScore !== null && match.homeScore === match.awayScore && onPenaltyChange && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          <span>Pênaltis:</span>
          <input 
            type="number" 
            style={{ width: '30px', padding: '2px', textAlign: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-card-border)', color: 'white', borderRadius: '4px' }}
            value={match.homePenalties ?? ''} 
            onChange={(e) => onPenaltyChange(match.id, e.target.value ? parseInt(e.target.value, 10) : null, match.awayPenalties ?? null)}
            readOnly={isReadOnly}
            min="0"
          />
          <span>X</span>
          <input 
            type="number" 
            style={{ width: '30px', padding: '2px', textAlign: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-card-border)', color: 'white', borderRadius: '4px' }}
            value={match.awayPenalties ?? ''} 
            onChange={(e) => onPenaltyChange(match.id, match.homePenalties ?? null, e.target.value ? parseInt(e.target.value, 10) : null)}
            readOnly={isReadOnly}
            min="0"
          />
        </div>
      )}
    </div>
  );
}
