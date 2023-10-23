export interface League {
  id: number;
  name: string;
  country: string;
  standings: [Standing[]];
  logo?: string;
  flag?: string;
  season?: number;
}

export interface Team {
  response: any;
  id: number;
  name: string;
  logo: string;
  winner?: boolean;
}

export interface Fixture {
  teams: { home: Team; away: Team };
  goals: { home: number; away: number };
  league: League;
  fixture: { status?: { short?: string } };
}

export interface Standing {
  league: any;
  team: Team;
  description: string;
  rank: number;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
}

export interface StandingsResponse {
  response: { league: League }[];
}

export interface TeamsResponse {
  response: { team: Team }[];
}

export interface FixtureResponse {
  response: Fixture[];
}
