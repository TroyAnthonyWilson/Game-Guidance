import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedGamesComponent } from './recommended-games.component';

describe('RecommendedGamesComponent', () => {
  let component: RecommendedGamesComponent;
  let fixture: ComponentFixture<RecommendedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
