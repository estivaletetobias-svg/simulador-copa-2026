'use client';
import React from 'react';
import { Match, Team } from '../types';

interface Props {
  teams: Team[];
  matches: Match[];
  onScoreChange: (matchId: string, homeScore: number | null, awayScore: number | null) => void;
  onPenaltyChange?: (matchId: string, homePenalties: number | null, awayPenalties: number | null) => void;
}

export default function KnockoutBracket({ teams, matches, onScoreChange, onPenaltyChange }: Props) {
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

        {/* Penalties Area */}
        {match.phase !== 'GROUP' && match.homeScore !== null && match.homeScore === match.awayScore && onPenaltyChange && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '8px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-card-border)' }}>
            <span>Pênaltis:</span>
            <input 
              type="number" 
              style={{ width: '30px', padding: '2px', textAlign: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-card-border)', color: 'white', borderRadius: '4px' }}
              value={match.homePenalties ?? ''} 
              onChange={(e) => onPenaltyChange(match.id, e.target.value ? parseInt(e.target.value, 10) : null, match.awayPenalties ?? null)}
              disabled={!homeTeam || !awayTeam}
              min="0"
            />
            <span>X</span>
            <input 
              type="number" 
              style={{ width: '30px', padding: '2px', textAlign: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-card-border)', color: 'white', borderRadius: '4px' }}
              value={match.awayPenalties ?? ''} 
              onChange={(e) => onPenaltyChange(match.id, match.homePenalties ?? null, e.target.value ? parseInt(e.target.value, 10) : null)}
              disabled={!homeTeam || !awayTeam}
              min="0"
            />
          </div>
        )}
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
            if (m.homeScore !== null && m.awayScore !== null) {
              if (m.homeScore > m.awayScore) champion = teams.find(t => t.id === m.homeTeamId);
              else if (m.awayScore > m.homeScore) champion = teams.find(t => t.id === m.awayTeamId);
              else if (m.homePenalties !== undefined && m.awayPenalties !== undefined && m.homePenalties !== null && m.awayPenalties !== null) {
                if (m.homePenalties > m.awayPenalties) champion = teams.find(t => t.id === m.homeTeamId);
                else if (m.awayPenalties > m.homePenalties) champion = teams.find(t => t.id === m.awayTeamId);
              }
            }
            
            return (
              <React.Fragment key={m.id}>
                <div className="bracket-cell" style={{ marginBottom: '1rem' }}>{renderMatch(m)}</div>
                
                {champion && (
                  <div style={{ marginTop: '1rem', marginBottom: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(254,223,0,0.3)', zIndex: 10 }}>
                    <p style={{ color: 'var(--color-yellow)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{champion.name} Campeão!</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                      ✓ Simulação validada pelo sistema Tobias-Maria Tech.
                    </p>
                    <button 
                      onClick={() => {
                        const url = typeof window !== 'undefined' ? window.location.href : 'https://simulador-copa-2026.vercel.app';
                        const text = `🏆 ${champion?.name} será campeão da Copa 2026! Fiz minha simulação no site que o pai da Maria construiu! Faça o seu palpite também: ${url}`;
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      style={{ 
                        display: 'inline-block',
                        background: '#25D366', 
                        color: '#fff', 
                        padding: '8px 16px', 
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '20px', 
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textDecoration: 'none'
                      }}
                    >
                      Compartilhar no WhatsApp
                    </button>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          <div style={{ marginTop: '2rem' }}>
            <h3 className="bracket-col-title" style={{ color: '#cd7f32', marginTop: '2rem' }}>Disputa do 3º Lugar</h3>
            {matches.filter(m => m.phase === 'THIRD_PLACE').map(m => (
              <div key={m.id} className="bracket-cell">{renderMatch(m)}</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
