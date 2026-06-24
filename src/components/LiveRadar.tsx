"use client";

import React, { useEffect, useState } from 'react';
import { Match } from '../types';

interface Props {
  onLiveUpdate: (matches: Match[]) => void;
}

export default function LiveRadar({ onLiveUpdate }: Props) {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch('/api/live-matches');
        const data = await res.json();
        setLiveMatches(data.matches);
        onLiveUpdate(data.matches);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar jogos ao vivo:', error);
      }
    };

    fetchLive();
    // Atualiza o radar a cada 10 segundos
    const interval = setInterval(fetchLive, 10000);
    return () => clearInterval(interval);
  }, [onLiveUpdate]);

  if (loading || liveMatches.length === 0) return null;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-green-light)', animation: 'pulse 2s infinite' }}></div>
        <h2 style={{ color: 'var(--color-green-light)', margin: 0, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Radar Ao Vivo</h2>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {liveMatches.map(m => (
          <div key={m.id} className="glass-panel" style={{ borderRadius: '8px', padding: '16px', border: '1px solid var(--color-green)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-yellow)', fontWeight: 'bold' }}>
                {m.status === 'IN_PROGRESS' ? 'Em andamento' : 'Encerrado'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>{m.homeTeamId}</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--color-text-primary)' }}>{m.homeScore}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>{m.awayTeamId}</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--color-text-primary)' }}>{m.awayScore}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
