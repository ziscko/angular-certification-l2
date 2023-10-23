import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesSelectorComponent } from './leagues-selector.component';

describe('LeaguesSelectorComponent', () => {
  let component: LeaguesSelectorComponent;
  let fixture: ComponentFixture<LeaguesSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaguesSelectorComponent]
    });
    fixture = TestBed.createComponent(LeaguesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
