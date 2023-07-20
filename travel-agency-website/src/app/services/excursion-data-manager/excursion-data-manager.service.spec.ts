import { TestBed } from '@angular/core/testing';

import { ExcursionsDataManagerService } from './excursion-data-manager.service';

describe('ExcursionDataFetcherService', () => {
  let service: ExcursionsDataManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcursionsDataManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
