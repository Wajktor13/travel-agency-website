import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcursionCardsListComponent } from './excursion-cards-list.component';

describe('ExcursionCardsListComponent', () => {
  let component: ExcursionCardsListComponent;
  let fixture: ComponentFixture<ExcursionCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcursionCardsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcursionCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
