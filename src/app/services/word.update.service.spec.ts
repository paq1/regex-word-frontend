import {TestBed} from '@angular/core/testing';

import {WordUpdateService} from './word.update.service';

describe('WordUpdateService', () => {
  let service: WordUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
