import {TestBed} from '@angular/core/testing';

import {WordUpdateService} from './word.update.service';
import {provideStore} from '@ngrx/store';

describe('WordUpdateService', () => {
  let service: WordUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore()],
    });
    service = TestBed.inject(WordUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
