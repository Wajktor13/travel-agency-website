import { TestBed } from '@angular/core/testing';

import { ExcursionDataFetcherService } from './excursion-data-fetcher.service';

describe('ExcursionDataFetcherService', () => {
  let service: ExcursionDataFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcursionDataFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
