import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamResultsComponent } from './components/teams-results/team-results.component';
import { StandingsComponent } from './components/standings/standings.component';

const routes: Routes = [
  {
    path: 'standings/:id',
    component: StandingsComponent
  },
  {
    path: 'team-results/:id',
    component: TeamResultsComponent
  },
  {
    path: '',
    component: StandingsComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
