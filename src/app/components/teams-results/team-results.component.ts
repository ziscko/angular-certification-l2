import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Fixture, Team } from '../../models/football.model';
import { FootballService } from '../../services/football.service';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss']
})
export class TeamResultsComponent {
  teamId: number | undefined;
  teamInfo$: Observable<Team[]> | undefined;
  teamFixtures$: Observable<Fixture[]> | undefined;
  loadingError: boolean = false;

  constructor(private route: ActivatedRoute, private footballAPI: FootballService) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['id'];
    this.getTeamInfo();
    this.getResults();
  }

  getResults(): void {
    if (this.teamId) {
      this.teamFixtures$ = this.footballAPI.getResults(this.teamId, 10);

      this.teamFixtures$.subscribe({
        next: (data) => {
          if (data.length < 1) this.loadingError = true;
        },
        error: () => {
          this.loadingError = true;
        }
      });
    }
  }

  getTeamInfo(): void {
    if (this.teamId) {
      this.teamInfo$ = this.footballAPI.getTeamInfo(this.teamId);
    }
  }
}
