export type Team = {
  id: string;
  name: string;
  flagUrl: string;
  group: string;
};

export type MatchStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED';

export type Match = {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  date: string;
  stadium: string;
  group?: string; // If it's a group stage match
  phase: 'GROUP' | 'ROUND_OF_32' | 'ROUND_OF_16' | 'QUARTER_FINALS' | 'SEMI_FINALS' | 'FINAL' | 'THIRD_PLACE';
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
