import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcursionCardComponent } from './excursion-card.component';

describe('ExcursionCardComponent', () => {
  let component: ExcursionCardComponent;
  let fixture: ComponentFixture<ExcursionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcursionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcursionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
