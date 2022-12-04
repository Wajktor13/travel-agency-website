import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterExcursionsComponent } from './filter-excursions.component';

describe('FilterExcursionsComponent', () => {
  let component: FilterExcursionsComponent;
  let fixture: ComponentFixture<FilterExcursionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterExcursionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterExcursionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
