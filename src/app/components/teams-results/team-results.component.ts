import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FixtureResponse } from '../../models/fixture.model';
import { FootballService } from '../../services/football.service';
import { TeamsResponse } from '../../models/team';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss']
})
export class TeamResultsComponent implements OnDestroy {
  teamId: number | undefined;
  teamInfo$: Observable<TeamsResponse[]> | undefined;
  teamFixtures$: Observable<FixtureResponse[]> | undefined;
  loadingError: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private footballAPI: FootballService) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['id'];
    this.getTeamInfo();
    this.getResults();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getResults(): void {
    if (this.teamId) {
      this.teamFixtures$ = this.footballAPI.getResults(this.teamId, 10).pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.loadingError = true;
          return [];
        })
      );
    }
  }

  getTeamInfo(): void {
    if (this.teamId) {
      this.teamInfo$ = this.footballAPI.getTeamInfo(this.teamId);
      this.teamInfo$.pipe(takeUntil(this.destroy$)).subscribe();
    }
  }
}
