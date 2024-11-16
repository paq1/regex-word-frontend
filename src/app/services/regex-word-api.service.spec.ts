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

  it('should mock regex', () => {
    service.fetchRegex().subscribe({
      next: (apiModel) => {
        expect(apiModel.data.attributes.wordModel.firstLetter).toEqual("A");
        expect(apiModel.data.attributes.wordModel.size).toEqual(6);
        expect(apiModel.data.attributes.regexes.length).toEqual(3);
        expect(apiModel.data.attributes.regexes[0].regex).toEqual("(az)")
        expect(apiModel.data.attributes.regexes[1].regex).toEqual("(er)")
        expect(apiModel.data.attributes.regexes[2].regex).toBeUndefined()
        expect(apiModel.data.attributes.regexes[2].dateEffet).toEqual(new Date(2000, 1, 1, 22, 30));
      }
    });
  });
});
