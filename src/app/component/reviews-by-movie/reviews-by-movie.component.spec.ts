import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsByMovieComponent } from './reviews-by-movie.component';

describe('ReviewsByMovieComponent', () => {
  let component: ReviewsByMovieComponent;
  let fixture: ComponentFixture<ReviewsByMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsByMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsByMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
