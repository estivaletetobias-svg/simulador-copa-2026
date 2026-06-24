export type Team = {
  id: string;
  name: string;
  flagUrl: string;
  group: string;
};

export type MatchStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED';

export interface Match {
  id: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeScore: number | null;
  awayScore: number | null;
  homePenalties?: number | null;
  awayPenalties?: number | null;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED';
  group?: string; // Only for group stage
  phase: 'GROUP' | 'ROUND_OF_32' | 'ROUND_OF_16' | 'QUARTER_FINALS' | 'SEMI_FINALS' | 'FINAL' | 'THIRD_PLACE';
  date?: string; // e.g. "15/06/2026"
  time?: string; // e.g. "16:00"
  venue?: string; // e.g. "MetLife Stadium, NY"
};

export type GroupStanding = {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

// Represents the user's prediction overriding a scheduled match
export type Prediction = {
  matchId: string;
  homeScore: number;
  awayScore: number;
};
