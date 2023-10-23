import { Injectable } from '@angular/core';
import { League } from '../models/football.model';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {
  leagues: any = [
    { id: 39, name: 'Premier League', country: 'England' },
    { id: 140, name: 'La Liga', country: 'Spain' },
    { id: 61, name: 'Ligue 1', country: 'France' },
    { id: 78, name: 'Bundesliga', country: 'Germany' },
    { id: 135, name: 'Serie A', country: 'Italy' }
  ];
}
