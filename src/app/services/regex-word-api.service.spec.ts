import {TestBed} from '@angular/core/testing';

import {RegexWordApiService} from './regex-word-api.service';

describe('RegexWordApiService', () => {
  let service: RegexWordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexWordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mock validation with azerty and return true if wordmock is azety', () => {
    service.checkWordValid("azerty").subscribe({
      next: (validable) => {
        expect(validable.data.isValid).toEqual(true);
      }
    });
  });


  it('should mock validation with azerty and return false if wordmock isn\'t azety', () => {
    service.checkWordValid("azerto").subscribe({
      next: (validable) => {
        expect(validable.data.isValid).toEqual(false);
      }
    });
  });
});
