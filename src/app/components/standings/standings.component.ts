import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { League, Standing, StandingsResponse } from 'src/app/models/football.model';
import { FootballService } from 'src/app/services/football.service';
import { LeaguesService } from 'src/app/services/leagues.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  leagues: League[];
  leagueId: number | undefined;
  standingsData$: Observable<Standing[]> | undefined;

  constructor(
    private router: Router,
    private footballAPI: FootballService,
    private route: ActivatedRoute,
    readonly leaguesService: LeaguesService
  ) {
    this.leagues = leaguesService.leagues;
  }

  ngOnInit(): void {
    this.isHomeRoute();

    this.route.params.subscribe((params) => {
      this.leagueId = params['id'];
      if (!this.leagueId) return;
      this.getStandings();
    });
  }

  private getStandings() {
    this.leagueId = +this.route.snapshot.params['id'];
    if (!this.leagueId) return;
    this.standingsData$ = this.footballAPI.getStandings(this.leagueId);
  }

  getTeamResults(teamId: number) {
    this.router.navigateByUrl(`/team-results/${teamId}`);
  }

  private isHomeRoute(): void {
    if (this.router.url === '/') {
      this.router.navigate(['/standings/' + this.leagues.at(0)?.id]);
    }
  }
}
