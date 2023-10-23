import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaguesSelectorComponent } from './components/leagues-selector/leagues-selector.component';
import { StandingsComponent } from './components/standings/standings.component';
import { TeamResultsComponent } from './components/teams-results/team-results.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';
import { ImgSizeDirective } from './img-size.directive';

@NgModule({
  declarations: [
    AppComponent,
    LeaguesSelectorComponent,
    StandingsComponent,
    TeamResultsComponent,
    ImgSizeDirective
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
