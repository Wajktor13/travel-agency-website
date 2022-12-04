import { TestBed } from '@angular/core/testing';

import { ExcursionCardsStateHolderService } from './excursion-cards-state-holder.service';

describe('ExcursionCardStateHolderService', () => {
  let service: ExcursionCardsStateHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcursionCardsStateHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
