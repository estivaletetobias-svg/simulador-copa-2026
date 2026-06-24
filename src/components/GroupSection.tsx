"use client";
import React, { useState, useEffect } from 'react';
import MatchCard from './MatchCard';
import GroupTable from './GroupTable';
import { Match, Team, GroupStanding } from '../types';

interface GroupSectionProps {
  group: string;
  groupMatches: Match[];
  standings: GroupStanding[];
  teams: Team[];
  onScoreChange: (matchId: string, homeScore: number | null, awayScore: number | null) => void;
}

export default function GroupSection({ group, groupMatches, standings, teams, onScoreChange }: GroupSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let lastIsMobile = window.innerWidth <= 1024;
    setIsMobile(lastIsMobile);
    setIsOpen(!lastIsMobile);

    const checkMobile = () => {
      const currentIsMobile = window.innerWidth <= 1024;
      if (currentIsMobile !== lastIsMobile) {
        setIsMobile(currentIsMobile);
        setIsOpen(!currentIsMobile);
        lastIsMobile = currentIsMobile;
      }
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '1200px', marginBottom: '40px' }}>
      
      {/* Mobile Header / Accordion Toggle */}
      {isMobile && (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: isOpen ? '20px' : '0',
            color: 'var(--color-primary)',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}
        >
          <span>Grupo {group}</span>
          <span>{isOpen ? '▲' : '▼'}</span>
        </button>
      )}

      {/* Content */}
      <div style={{ 
        display: isOpen ? 'flex' : 'none', 
        gap: '40px', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: isMobile ? '0 10px' : '0'
      }}>
        <div style={{ flex: '1 1 450px', maxWidth: '550px', width: '100%' }}>
          {!isMobile && (
            <h3 style={{ marginBottom: '20px', color: 'var(--color-text-secondary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Jogos - Grupo {group}
            </h3>
          )}
          {groupMatches.map(m => (
            <MatchCard 
              key={m.id} 
              match={m} 
              homeTeam={teams.find(t => t.id === m.homeTeamId)!} 
              awayTeam={teams.find(t => t.id === m.awayTeamId)!}
              onScoreChange={onScoreChange}
            />
          ))}
        </div>

        <div style={{ flex: '1 1 450px', maxWidth: '550px', width: '100%' }}>
          <GroupTable 
            groupName={group} 
            standings={standings} 
            teams={teams} 
          />
        </div>
      </div>
    </div>
  );
}
