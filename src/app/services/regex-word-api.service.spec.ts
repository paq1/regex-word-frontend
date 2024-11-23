import {TestBed} from '@angular/core/testing';

import {RegexWordApiService} from './regex-word-api.service';
import {provideHttpClient} from '@angular/common/http';

describe('RegexWordApiService', () => {
  let service: RegexWordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(RegexWordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mock validation with azerty and return true if wordmock is azety', () => {
    service.checkWordValid("azerty").subscribe({
      next: (validable) => {
        expect(validable.data.attributes.is_valid).toEqual(true);
      }
    });
  });


  it('should mock validation with azerty and return false if wordmock isn\'t azety', () => {
    service.checkWordValid("azerto").subscribe({
      next: (validable) => {
        expect(validable.data.attributes.is_valid).toEqual(false);
      }
    });
  });

  it('should mock regex', () => {
    service.fetchRegex().subscribe({
      next: (apiModel) => {
        expect(apiModel.data.attributes.word_info.first_letter).toEqual("A");
        expect(apiModel.data.attributes.word_info.size).toEqual(6);
        expect(apiModel.data.attributes.regex_parts.length).toEqual(3);
        expect(apiModel.data.attributes.regex_parts[0].regex).toEqual("(az)")
        expect(apiModel.data.attributes.regex_parts[1].regex).toEqual("(er)")
        expect(apiModel.data.attributes.regex_parts[2].regex).toBeUndefined()
        expect(apiModel.data.attributes.regex_parts[2].active_at).toEqual(new Date(2000, 1, 1, 22, 30));
      }
    });
  });
});
