import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FixtureResponse, HttpResponse } from '../models/fixture.model';
import { TeamsResponse } from '../models/team';
import { Standing, StandingsResponse } from '../models/standing.model';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  readonly apiUrl = 'https://v3.football.api-sports.io';

  constructor(private http: HttpClient) {}

  private get<T>(url: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  getTeamInfo(teamId: number): Observable<TeamsResponse[]> {
    const params = new HttpParams().set('id', teamId);
    const url = `${this.apiUrl}/teams`;
    return this.get<HttpResponse<TeamsResponse[]>>(url, params).pipe(map((data) => data.response));
  }

  getResults(teamId: number, last: number): Observable<FixtureResponse[]> {
    const params = new HttpParams().set('team', teamId.toString()).set('last', last);
    const url = `${this.apiUrl}/fixtures`;
    return this.get<HttpResponse<FixtureResponse[]>>(url, params).pipe(
      map((data) => data.response)
    );
  }

  getStandings(leagueId: number, year: number): Observable<Standing[]> {
    const params = new HttpParams().set('league', leagueId).set('season', year);
    const url = `${this.apiUrl}/standings`;
    return this.get<HttpResponse<StandingsResponse[]>>(url, params).pipe(
      map((data) => data.response[0].league.standings[0])
    );
  }
}
