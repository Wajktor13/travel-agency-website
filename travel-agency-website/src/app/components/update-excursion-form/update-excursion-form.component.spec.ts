import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExcursionFormComponent } from './update-excursion-form.component';

describe('UpdateExcursionFormComponent', () => {
  let component: UpdateExcursionFormComponent;
  let fixture: ComponentFixture<UpdateExcursionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExcursionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateExcursionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
