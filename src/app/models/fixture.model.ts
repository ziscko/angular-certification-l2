import { Standing } from './standing.model';

export interface FixtureResponse {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: Goals;
  score: Score;
}

interface Fixture {
  id: number;
  referee: null;
  timezone: string;
  date: Date;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
}

export interface League {
  id: number;
  name: string;
  country: string;
  standings?: Array<Standing[]>;
  logo?: string;
  flag?: string;
  season?: number;
}

interface Teams {
  away: Team;
  home: Team;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

export interface Venue {
  id: number;
  name: string;
  city: string;
}

interface Score {
  halftime: Goals;
  fulltime: Goals;
  extratime: Goals;
  penalty: Goals;
}

interface Goals {
  away: number;
  home: number;
}

interface Periods {
  first: number;
  second: number;
}

interface Status {
  long: string;
  short: string;
  elapsed: number;
}

//API
export interface HttpResponse<Response> {
  errors: errors;
  get: string;
  paging: Paging;
  parameters: Parameters;
  response: Response;
  results: number;
}

interface errors {
  time?: string;
  bug?: string;
  report?: string;
}

interface Parameters {
  [key: string]: string;
}

interface Paging {
  current: number;
  total: number;
}
