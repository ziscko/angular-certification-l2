import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Fixture,
  FixtureResponse,
  Standing,
  StandingsResponse,
  Team,
  TeamsResponse
} from '../models/football.model';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private apiUrl = 'https://v3.football.api-sports.io';

  constructor(private http: HttpClient) {}

  getTeamInfo(team: number): Observable<Team[]> {
    return this.http.get<TeamsResponse>(`${this.apiUrl}/teams?id=${team}`).pipe(
      map((data) => {
        return data && data.response.length ? data.response.map((teamsData) => teamsData.team) : [];
      })
    );
  }

  getResults(team: number, last: number): Observable<Fixture[]> {
    return this.http.get<FixtureResponse>(`${this.apiUrl}/fixtures?team=${team}&last=${last}`).pipe(
      map((data) => {
        return data && data.response.length ? data.response.map((fixtureData) => fixtureData) : [];
      })
    );
  }

  getStandings(league: number): Observable<Standing[]> {
    const seasonYear: number = new Date().getFullYear();

    return this.http
      .get<StandingsResponse>(`${this.apiUrl}/standings?league=${league}&season=${seasonYear}`)
      .pipe(
        map((data) =>
          data && data.response.length && data.response[0].league.standings
            ? data.response[0].league.standings[0].map((standings) => standings)
            : []
        )
      );
  }
}
