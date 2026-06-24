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
    </div>
  );
}
