import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {RegexApiModel} from '../models/regex-api.model';
import {ValidRegexApiModel} from '../models/valid-regex-api.model';
import {SingleJsonApi} from '../models/jsonapi.model';

@Injectable({
  providedIn: 'root'
})
export class RegexWordApiService {

  constructor() {
    console.log('RegexWordApiService');
  }

  checkWordValid(word: string): Observable<ValidRegexApiModel> {

    // TODO : contacter l'api pour connaitre la réponse
    return of({
      data: {
        isValid: word.toLowerCase() === "azerty",
      }
    })
  }

  // TODO : contacter l'api pour récupérer les regexes
  fetchRegex(): Observable<SingleJsonApi<RegexApiModel>> {
    return of({
      data: {
        type: "regex-word-api",
        id: "abc",
        attributes: {
          regexes: [
            {
              regex: "(az)",
              dateEffet: new Date(),
            },
            {
              dateEffet: new Date(2000, 1, 1, 16, 30),
            },
            {
              dateEffet: new Date(2000, 1, 1, 22, 30),
            }
          ],
          wordModel: {
            firstLetter: "A",
            size: 6
          }
        }
      }
    });
  }
}
