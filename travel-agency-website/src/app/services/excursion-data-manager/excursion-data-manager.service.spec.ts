import { TestBed } from '@angular/core/testing';

import { ExcursionDataManagerService } from './excursion-data-manager.service';

describe('ExcursionDataFetcherService', () => {
  let service: ExcursionDataManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcursionDataManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
