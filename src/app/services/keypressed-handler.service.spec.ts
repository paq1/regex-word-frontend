import {TestBed} from '@angular/core/testing';

import {KeypressedHandlerService} from './keypressed-handler.service';
import {provideStore} from '@ngrx/store';

describe('KeypressedHandlerService', () => {
  let service: KeypressedHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore()],
    });
    service = TestBed.inject(KeypressedHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
