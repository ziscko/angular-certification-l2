import { Team } from './fixture';

export interface StandingsResponse {
  league: League;
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Array<Standing[]>;
}

export interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: All;
  home: All;
  away: All;
  update: Date;
}

interface All {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
}

interface Goals {
  away: number;
  home: number;
}
