import { TestBed } from '@angular/core/testing';

import { FilterExcursionsService } from './filter-excursions.service';

describe('FilterExcursionsService', () => {
  let service: FilterExcursionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterExcursionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
