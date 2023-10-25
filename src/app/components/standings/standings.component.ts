import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, Subject, takeUntil } from 'rxjs'; // Import Subject
import { League } from '../../models/fixture.model';
import { FootballService } from '../../services/football.service';
import { LeaguesService } from '../../services/leagues.service';
import { Standing } from '../../models/standing.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit, OnDestroy {
  leagues: League[];
  leagueId: number | undefined;
  loadingError: boolean = false;
  standingsData$: Observable<Standing[]> | undefined;
  standingsSubscription: Subscription | undefined;
  private destroy$ = new Subject<void>();

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getStandings(): void {
    this.leagueId = this.route.snapshot.params['id'];
    if (!this.leagueId) return;

    const seasonYear: number = new Date().getFullYear();
    this.standingsData$ = this.footballAPI.getStandings(this.leagueId, seasonYear);

    this.standingsSubscription = this.standingsData$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data.length < 1) this.loadingError = true;
      },
      error: () => {
        this.loadingError = true;
      }
    });
  }

  getTeamResults(teamId: number): void {
    this.router.navigateByUrl(`/team-results/${teamId}`);
  }

  private isHomeRoute(): void {
    if (this.router.url === '/') {
      this.router.navigate(['/standings/' + this.leagues[0]?.id]);
    }
  }
}
