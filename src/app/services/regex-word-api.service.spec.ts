import { TestBed } from '@angular/core/testing';

import { RegexWordApiService } from './regex-word-api.service';

describe('RegexWordApiService', () => {
  let service: RegexWordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexWordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
