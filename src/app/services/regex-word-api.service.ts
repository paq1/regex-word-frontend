import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {RegexApiModel} from '../models/regex-api.model';
import {ValidRegexApiModel} from '../models/valid-regex-api.model';

@Injectable({
  providedIn: 'root'
})
export class RegexWordApiService {

  constructor() {
    console.log('RegexWordApiService');
  }

  checkWordValid(word: string): Observable<ValidRegexApiModel> {
    console.log(word);
    return of({
      data: {
        isValid: false,
      }
    })
  }

  fetchRegex(): Observable<RegexApiModel> {
    return of({
      regexes: [
        {
          regex: "xxx",
          dateEffet: new Date(),
        },
        {
          regex: "xxx 2",
          dateEffet: new Date(),
        },
        {
          regex: "xxx 3",
          dateEffet: new Date(),
        }
      ],
      wordModel: {
        firstLetter: "A",
        size: 6
      }
    })
  }
}
