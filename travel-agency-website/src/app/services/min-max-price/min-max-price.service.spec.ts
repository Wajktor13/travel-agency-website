import { TestBed } from '@angular/core/testing';

import { MinMaxPriceService } from './min-max-price.service';

describe('MinMaxPriceService', () => {
  let service: MinMaxPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinMaxPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
