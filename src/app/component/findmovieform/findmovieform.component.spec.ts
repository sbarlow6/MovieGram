import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindmovieformComponent } from './findmovieform.component';

describe('FindmovieformComponent', () => {
  let component: FindmovieformComponent;
  let fixture: ComponentFixture<FindmovieformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindmovieformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindmovieformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
