import React from 'react';
import { Team, GroupStanding } from '../types';

interface Props {
  groupName: string;
  standings: GroupStanding[];
  teams: Team[];
}

export default function GroupTable({ groupName, standings, teams }: Props) {
  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', width: '100%' }}>
      <h3 style={{ marginBottom: '16px', color: 'var(--color-yellow)', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '8px' }}>
        Grupo {groupName}
      </h3>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Seleção</th>
            <th title="Pontos">P</th>
            <th title="Jogos">J</th>
            <th title="Vitórias">V</th>
            <th title="Empates">E</th>
            <th title="Derrotas">D</th>
            <th title="Saldo de Gols">SG</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, index) => {
            const team = teams.find(t => t.id === s.teamId);
            const isQualifying = index < 2; // In real 48-team, top 2 advance + 8 best 3rd. Just highlight top 2 here for now.
            
            return (
              <tr key={s.teamId} style={{ 
                borderTop: '1px solid var(--color-card-border)',
                background: isQualifying ? 'rgba(0, 155, 58, 0.1)' : 'transparent'
              }}>
                <td style={{ textAlign: 'left', padding: '12px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold', width: '20px', color: 'var(--color-text-secondary)' }}>{index + 1}</span>
                  <img src={team?.flagUrl} alt="" width={24} height={18} style={{ borderRadius: '2px' }} />
                  <span style={{ fontWeight: '600' }}>{team?.name}</span>
                </td>
                <td style={{ fontWeight: 'bold', color: 'var(--color-green-light)' }}>{s.points}</td>
                <td>{s.played}</td>
                <td>{s.won}</td>
                <td>{s.drawn}</td>
                <td>{s.lost}</td>
                <td>{s.goalDifference > 0 ? `+${s.goalDifference}` : s.goalDifference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
