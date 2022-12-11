import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExcursionViewComponent } from './single-excursion-view.component';

describe('SingleExcursionViewComponent', () => {
  let component: SingleExcursionViewComponent;
  let fixture: ComponentFixture<SingleExcursionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleExcursionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleExcursionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
