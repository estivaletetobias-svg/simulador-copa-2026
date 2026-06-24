"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { TEAMS, INITIAL_MATCHES } from '../lib/data';
import { Match } from '../types';
import { calculateGroupStandings, generateRoundOf32, generateNextRound } from '../lib/simulator';
import MatchCard from '../components/MatchCard';
import GroupTable from '../components/GroupTable';
import LiveRadar from '../components/LiveRadar';
import KnockoutBracket from '../components/KnockoutBracket';

export default function Home() {
  const [matches, setMatches] = useState(INITIAL_MATCHES);

  const knockoutMatches = React.useMemo(() => {
    const applySavedScores = (baseMatches: Match[]) => baseMatches.map(baseMatch => {
      const savedMatch = matches.find(m => m.id === baseMatch.id);
      return savedMatch ? { ...baseMatch, homeScore: savedMatch.homeScore, awayScore: savedMatch.awayScore } : baseMatch;
    });

    const r32 = applySavedScores(generateRoundOf32(TEAMS, matches));
    
    // Oitavas
    const r16 = applySavedScores(generateNextRound(r32, 'ROUND_OF_16', 1));
    
    // Quartas
    const qf = applySavedScores(generateNextRound(r16, 'QUARTER_FINALS', 1));
    
    // Semis
    const sf = applySavedScores(generateNextRound(qf, 'SEMI_FINALS', 1));
    
    // Final
    const final = applySavedScores(generateNextRound(sf, 'FINAL', 1));

    return [...r32, ...r16, ...qf, ...sf, ...final];
  }, [matches]);

  const handleScoreChange = (matchId: string, homeScore: number | null, awayScore: number | null) => {
    setMatches(prev => {
      const exists = prev.find(m => m.id === matchId);
      if (exists) {
        return prev.map(m => m.id === matchId ? { ...m, homeScore, awayScore } : m);
      }
      // Se for um jogo do mata-mata que ainda não está no state
      const koMatch = knockoutMatches.find(m => m.id === matchId);
      if (koMatch) {
        return [...prev, { ...koMatch, homeScore, awayScore }];
      }
      return prev;
    });
  };

  const handleLiveUpdate = (liveMatches: Match[]) => {
    setMatches(prev => {
      let updated = [...prev];
      liveMatches.forEach(lm => {
        const index = updated.findIndex(m => m.id === lm.id);
        if (index !== -1) {
          // Sobrescreve com os dados reais ao vivo
          updated[index] = { ...updated[index], homeScore: lm.homeScore, awayScore: lm.awayScore, status: lm.status };
        }
      });
      return updated;
    });
  };

  const groups = Array.from(new Set(TEAMS.map(t => t.group))).sort();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className="text-gradient">Copa do Mundo 2026</h1>
        <p className={styles.subtitle}>Simulador Oficial</p>
      </header>

      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <LiveRadar onLiveUpdate={handleLiveUpdate} />
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {groups.map(group => {
          const groupMatches = matches.filter(m => m.group === group);
          const standings = calculateGroupStandings(TEAMS, matches, group);
          
          return (
            <div key={group} style={{ 
              width: '100%', 
              maxWidth: '1200px', 
              display: 'flex', 
              gap: '40px', 
              marginBottom: '60px', 
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              
              <div style={{ flex: '1 1 450px', maxWidth: '550px' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--color-text-secondary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  Jogos - Grupo {group}
                </h3>
                {groupMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    homeTeam={TEAMS.find(t => t.id === m.homeTeamId)!} 
                    awayTeam={TEAMS.find(t => t.id === m.awayTeamId)!}
                    onScoreChange={handleScoreChange}
                  />
                ))}
              </div>

              <div style={{ flex: '1 1 450px', maxWidth: '550px' }}>
                <GroupTable 
                  groupName={group} 
                  standings={standings} 
                  teams={TEAMS} 
                />
              </div>

            </div>
          );
        })}
      </div>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <KnockoutBracket teams={TEAMS} matches={knockoutMatches} onScoreChange={handleScoreChange} />
      </div>
    </div>
  );
}
