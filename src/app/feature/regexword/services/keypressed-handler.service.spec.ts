import {TestBed} from '@angular/core/testing';

import {KeypressedHandlerService} from './keypressed-handler.service';
import {provideStore} from '@ngrx/store';
import {provideHttpClient} from '@angular/common/http';
import {RegexWordApiService} from './regex-word-api.service';

describe('KeypressedHandlerService', () => {
  let service: KeypressedHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(), provideHttpClient(), RegexWordApiService],
    });
    service = TestBed.inject(KeypressedHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
