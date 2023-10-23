import { Component } from '@angular/core';
import { League } from 'src/app/models/football.model';
import { LeaguesService } from 'src/app/services/leagues.service';

@Component({
  selector: 'app-leagues-selector',
  templateUrl: './leagues-selector.component.html',
  styleUrls: ['./leagues-selector.component.scss']
})
export class LeaguesSelectorComponent {
  leagues: League[];

  constructor(readonly leaguesService: LeaguesService) {
    this.leagues = leaguesService.leagues;
  }
}
