'use client';
import React from 'react';
import { Match, Team } from '../types';

interface Props {
  teams: Team[];
  matches: Match[];
  onScoreChange: (matchId: string, homeScore: number | null, awayScore: number | null) => void;
}

export default function KnockoutBracket({ teams, matches, onScoreChange }: Props) {
  const getTeam = (teamId: string | null): Team | null => {
    if (!teamId) return null;
    return teams.find(t => t.id === teamId) || null;
  };

  const renderMatch = (match: Match) => {
    const homeTeam = getTeam(match.homeTeamId);
    const awayTeam = getTeam(match.awayTeamId);

    const homeWon = match.homeScore !== null && match.awayScore !== null && match.homeScore > match.awayScore;
    const awayWon = match.homeScore !== null && match.awayScore !== null && match.awayScore > match.homeScore;
    const isFinished = match.homeScore !== null && match.awayScore !== null;

    return (
      <div key={match.id} className={`match-card ${isFinished ? 'finished' : ''}`}>
        
        {/* Match Info (Venue, Date, Time) */}
        {(match.venue || match.date || match.time) && (
          <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '8px', letterSpacing: '0.05em' }}>
            {match.venue && <div>📍 {match.venue}</div>}
            <div style={{ marginTop: '2px' }}>
              {match.date && <span>📅 {match.date}</span>}
              {match.time && <span style={{ marginLeft: '4px' }}>às {match.time} (BRT)</span>}
            </div>
          </div>
        )}

        {/* Home Team */}
        <div className={`match-team-row ${homeWon ? 'winner' : ''}`}>
          <div className="match-team-info">
            {homeTeam ? (
              <img src={homeTeam.flagUrl} alt={homeTeam.name} className="match-flag" />
            ) : (
              <div className="match-flag-placeholder" />
            )}
            <span className={`match-team-name ${homeTeam ? 'active' : ''}`}>
              {homeTeam ? homeTeam.name : 'A Definir'}
            </span>
          </div>
          <input
            type="number"
            min="0"
            className="score-input"
            value={match.homeScore ?? ''}
            onChange={(e) => onScoreChange(match.id, e.target.value ? parseInt(e.target.value) : null, match.awayScore)}
            disabled={!homeTeam}
          />
        </div>

        <div className="match-divider"></div>

        {/* Away Team */}
        <div className={`match-team-row ${awayWon ? 'winner' : ''}`}>
          <div className="match-team-info">
            {awayTeam ? (
              <img src={awayTeam.flagUrl} alt={awayTeam.name} className="match-flag" />
            ) : (
              <div className="match-flag-placeholder" />
            )}
            <span className={`match-team-name ${awayTeam ? 'active' : ''}`}>
              {awayTeam ? awayTeam.name : 'A Definir'}
            </span>
          </div>
          <input
            type="number"
            min="0"
            className="score-input"
            value={match.awayScore ?? ''}
            onChange={(e) => onScoreChange(match.id, match.homeScore, e.target.value ? parseInt(e.target.value) : null)}
            disabled={!awayTeam}
          />
        </div>

      </div>
    );
  };

  return (
    <div className="bracket-container">
      <div className="bracket-bg-glow"></div>
      
      <h2 className="bracket-title text-gradient">
        Fase Final <span style={{ color: '#fff' }}>2026</span>
      </h2>

      <div className="bracket-scroll">
        
        <div className="bracket-column">
          <h3 className="bracket-col-title">16-Avos de Final</h3>
          {matches.filter(m => m.phase === 'ROUND_OF_32').map(m => (
            <div key={m.id} className="bracket-cell">{renderMatch(m)}</div>
          ))}
        </div>

        <div className="bracket-column">
          <h3 className="bracket-col-title">Oitavas de Final</h3>
          {matches.filter(m => m.phase === 'ROUND_OF_16').map(m => (
            <div key={m.id} className="bracket-cell">{renderMatch(m)}</div>
          ))}
        </div>

        <div className="bracket-column">
          <h3 className="bracket-col-title">Quartas de Final</h3>
          {matches.filter(m => m.phase === 'QUARTER_FINALS').map(m => (
            <div key={m.id} className="bracket-cell">{renderMatch(m)}</div>
          ))}
        </div>

        <div className="bracket-column">
          <h3 className="bracket-col-title" style={{ color: 'var(--color-yellow)' }}>Semifinais</h3>
          {matches.filter(m => m.phase === 'SEMI_FINALS').map(m => (
            <div key={m.id} className="bracket-cell">{renderMatch(m)}</div>
          ))}
        </div>

        <div className="bracket-column">
          <div className="final-glow"></div>
          <h3 className="final-title">GRANDE FINAL</h3>
          {matches.filter(m => m.phase === 'FINAL').map(m => (
            <div key={m.id} className="bracket-cell">{renderMatch(m)}</div>
          ))}
        </div>

      </div>
    </div>
  );
}
