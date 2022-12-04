import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcursionFormComponent } from './add-excursion-form.component';

describe('AddExcursionFormComponent', () => {
  let component: AddExcursionFormComponent;
  let fixture: ComponentFixture<AddExcursionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExcursionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExcursionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
