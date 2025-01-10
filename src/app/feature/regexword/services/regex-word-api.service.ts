import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RegexApiModel} from '../models/regex-api.model';
import {SingleJsonApi} from '../../../core/models/jsonapi.model';
import {HttpClient} from '@angular/common/http';
import {CheckApiModel} from '../models/check-api.model';
import {EnvironmentService} from '../../../core/environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class RegexWordApiService {

  urlRegexword: string;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly environmentService: EnvironmentService,
  ) {
    console.log('RegexWordApiService');
    this.urlRegexword = this.environmentService.rgwApiUrl;
  }

  checkWordValid(word: string): Observable<SingleJsonApi<CheckApiModel>> {
    return this._httpClient.get<SingleJsonApi<CheckApiModel>>(`${this.urlRegexword}/regexword/check/${word}`)
  }

  fetchRegex(): Observable<SingleJsonApi<RegexApiModel>> {
    return this._httpClient.get<SingleJsonApi<RegexApiModel>>(`${this.urlRegexword}/regexword/dayword`)
  }
}
