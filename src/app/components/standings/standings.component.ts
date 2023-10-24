import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { League, Standing } from '../../models/football.model';
import { FootballService } from '../../services/football.service';
import { LeaguesService } from '../../services/leagues.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  leagues: League[];
  leagueId: number | undefined;
  loadingError: boolean = false;
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
    this.leagueId = this.route.snapshot.params['id'];
    if (!this.leagueId) return;
    this.standingsData$ = this.footballAPI.getStandings(this.leagueId);

    this.standingsData$.subscribe({
      next: (data) => {
        if (data.length < 1) this.loadingError = true;
      },
      error: () => {
        this.loadingError = true;
      }
    });
  }

  getTeamResults(teamId: number) {
    this.router.navigateByUrl(`/team-results/${teamId}`);
  }

  private isHomeRoute(): void {
    if (this.router.url === '/') {
      this.router.navigate(['/standings/' + this.leagues[0]?.id]);
    }
  }
}
