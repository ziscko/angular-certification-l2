import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FixtureResponse } from '../models/fixture.model';
import { TeamsResponse } from '../models/team';
import { Standing, StandingsResponse } from '../models/standing.model';
import { ApiResponse } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  readonly apiUrl = 'https://v3.football.api-sports.io';

  constructor(private http: HttpClient) {}

  getTeamInfo(teamId: number): Observable<TeamsResponse[]> {
    return this.http
      .get<ApiResponse<TeamsResponse[]>>(`${this.apiUrl}/teams?id=${teamId}`)
      .pipe(map((data) => data.response));
  }

  getResults(teamId: number, last: number): Observable<FixtureResponse[]> {
    return this.http
      .get<ApiResponse<FixtureResponse[]>>(`${this.apiUrl}/fixtures?team=${teamId}&last=${last}`)
      .pipe(map((data) => data.response));
  }

  getStandings(leagueId: number, year: number): Observable<Standing[]> {
    return this.http
      .get<ApiResponse<StandingsResponse[]>>(
        `${this.apiUrl}/standings?league=${leagueId}&season=${year}`
      )
      .pipe(map((data) => data.response[0].league.standings[0]));
  }
}
