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
          {matches.filter(m => m.phase === 'FINAL').map(m => {
            let champion = null;
            if (m.homeScore !== null && m.awayScore !== null && m.homeScore !== m.awayScore) {
              const championId = m.homeScore > m.awayScore ? m.homeTeamId : m.awayTeamId;
              champion = teams.find(t => t.id === championId);
            }
            
            return (
              <React.Fragment key={m.id}>
                <div className="bracket-cell">{renderMatch(m)}</div>
                
                {champion && (
                  <div style={{ marginTop: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(254,223,0,0.3)', zIndex: 10 }}>
                    <p style={{ color: 'var(--color-yellow)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{champion.name} Campeão!</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                      ✓ Simulação validada pelo sistema Tobias-Maria Tech.
                    </p>
                    <a 
                      href={`https://wa.me/?text=O%20${champion.name}%20vai%20ser%20o%20Campe%C3%A3o%20da%20Copa%202026%21%20%F0%9F%8F%86%20Fiz%20minha%20simula%C3%A7%C3%A3o%20no%20site%20que%20o%20pai%20da%20Maria%20construiu%21%20Fa%C3%A7a%20o%20seu%20palpite%20tamb%C3%A9m%21`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'inline-block',
                        background: '#25D366', 
                        color: '#fff', 
                        padding: '8px 16px', 
                        borderRadius: '20px', 
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textDecoration: 'none'
                      }}
                    >
                      Compartilhar no WhatsApp
                    </a>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
}
