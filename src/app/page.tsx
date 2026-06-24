"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { TEAMS, INITIAL_MATCHES } from '../lib/data';
import { Match } from '../types';
import { calculateGroupStandings, generateRoundOf32, generateNextRound } from '../lib/simulator';
import MatchCard from '../components/MatchCard';
import GroupTable from '../components/GroupTable';
import GroupSection from '../components/GroupSection';
import LiveRadar from '../components/LiveRadar';
import KnockoutBracket from '../components/KnockoutBracket';

export default function Home() {
  const [matches, setMatches] = useState(INITIAL_MATCHES);

  useEffect(() => {
    // Sincronizar todos os jogos já finalizados da API openfootball
    fetch('/api/all-matches')
      .then(res => res.json())
      .then(data => {
        if (data && data.matches) {
          setMatches(prev => {
            let updated = [...prev];
            data.matches.forEach((finishedMatch: any) => {
              // Encontrar o jogo correspondente no nosso calendário inicial
              const matchIndex = updated.findIndex(m => 
                (m.homeTeamId === finishedMatch.homeTeamId && m.awayTeamId === finishedMatch.awayTeamId) ||
                (m.homeTeamId === finishedMatch.awayTeamId && m.awayTeamId === finishedMatch.homeTeamId)
              );
              
              if (matchIndex !== -1) {
                const match = updated[matchIndex];
                // Garantir a orientação correta dos placares em relação a quem é home/away no nosso calendário
                if (match.homeTeamId === finishedMatch.homeTeamId) {
                  updated[matchIndex] = { ...match, homeScore: finishedMatch.homeScore, awayScore: finishedMatch.awayScore, status: 'FINISHED' };
                } else {
                  updated[matchIndex] = { ...match, homeScore: finishedMatch.awayScore, awayScore: finishedMatch.homeScore, status: 'FINISHED' };
                }
              }
            });
            return updated;
          });
        }
      })
      .catch(err => console.error("Erro ao sincronizar resultados:", err));
  }, []);

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
  const [activeTab, setActiveTab] = useState<'groups' | 'knockout'>('groups');

  return (
    <div className={styles.dashboard}>
      <nav className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Copa 2026</h2>
        <div className={styles.sidebarNav}>
          <button 
            className={`${styles.navButton} ${activeTab === 'groups' ? styles.navButtonActive : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            Fase de Grupos
          </button>
          
          <span className={styles.navSeparator}>➔</span>

          <button 
            className={`${styles.navButton} ${activeTab === 'knockout' ? styles.navButtonActive : ''}`}
            onClick={() => setActiveTab('knockout')}
          >
            Mata-Mata
          </button>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className="text-gradient">Simulador Oficial</h1>
          <p className={styles.subtitle}>
            {activeTab === 'groups' ? 'Fase de Grupos' : 'Fase Eliminatória'}
          </p>
        </header>

        {activeTab === 'groups' && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {groups.map(group => {
              const groupMatches = matches.filter(m => m.group === group);
              const standings = calculateGroupStandings(TEAMS, matches, group);
              
              return (
                <GroupSection
                  key={group}
                  group={group}
                  groupMatches={groupMatches}
                  standings={standings}
                  teams={TEAMS}
                  onScoreChange={handleScoreChange}
                />
              );
            })}
          </div>
        )}

        {activeTab === 'knockout' && (
          <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <KnockoutBracket teams={TEAMS} matches={knockoutMatches} onScoreChange={handleScoreChange} />
          </div>
        )}
      </main>

      <aside className={styles.rightPanel}>
        <LiveRadar onLiveUpdate={handleLiveUpdate} />
      </aside>
    </div>
  );
}
