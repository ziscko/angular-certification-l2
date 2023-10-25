import { BackButtonDirective } from './back-button.directive';
import { NavigationService } from '../services/navigation.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('BackButtonDirective', () => {
  it('should create an instance', () => {
    const router: Router = {} as Router;
    const location: Location = {} as Location;
    const navigationService = new NavigationService(router, location);
    const directive = new BackButtonDirective(navigationService);
    expect(directive).toBeTruthy();
  });
});
