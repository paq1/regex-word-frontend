import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RegexApiModel} from '../models/regex-api.model';
import {SingleJsonApi} from '../../../core/models/jsonapi.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CheckApiModel} from '../models/check-api.model';

@Injectable({
  providedIn: 'root'
})
export class RegexWordApiService {

  urlRegexword = environment.apiRegexword

  constructor(private readonly _httpClient: HttpClient) {
    console.log('RegexWordApiService');
  }

  checkWordValid(word: string): Observable<SingleJsonApi<CheckApiModel>> {
    return this._httpClient.get<SingleJsonApi<CheckApiModel>>(`${this.urlRegexword}/regexword/check/${word}`)
  }

  fetchRegex(): Observable<SingleJsonApi<RegexApiModel>> {
    return this._httpClient.get<SingleJsonApi<RegexApiModel>>(`${this.urlRegexword}/regexword/dayword`)
  }
}
