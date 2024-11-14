import {Actions, createEffect, ofType} from '@ngrx/effects';
import {RegexWordApiService} from '../../services/regex-word-api.service';
import {initialLoad, loadRegexFailed, loadRegexSucceed} from '../actions/table.actions';
import {catchError, map, mergeMap, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class TableEffects {

  initialLoad$: any;

  constructor(private actions$: Actions, private readonly regexWordApiService: RegexWordApiService) {
    this.initialLoad$ = createEffect(() =>
      this.actions$.pipe(
        ofType(initialLoad),
        mergeMap(() => this.regexWordApiService.fetchRegex().pipe(map(data => {
          return loadRegexSucceed({ regexApi: data });
        }), catchError(error => {
          return of(loadRegexFailed({error: `error`}));
        })))
      )
    );
  }
}
