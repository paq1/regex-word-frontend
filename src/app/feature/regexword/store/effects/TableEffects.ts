import {Actions, createEffect, ofType} from '@ngrx/effects';
import {RegexWordApiService} from '../../services/regex-word-api.service';
import {initialLoad, loadRegexFailed, loadRegexSucceed} from '../actions/table.actions';
import {catchError, map, mergeMap, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {RegexStorageService} from '../../services/regex-storage.service';

@Injectable()
export class TableEffects {

  initialLoad$: any;

  constructor(private actions$: Actions, private readonly regexWordApiService: RegexWordApiService, private readonly regexStorageService: RegexStorageService) {
    this.initialLoad$ = createEffect(() =>
      this.actions$.pipe(
        ofType(initialLoad),
        mergeMap(() => this.regexWordApiService.fetchRegex().pipe(map(data => {
          const currentRegexes = this.regexStorageService.getCurrentRegex();
          const needClearAll = currentRegexes ? currentRegexes.identifiant !== data.data.id : false;

          if (needClearAll) {
            console.log("clear datas");
            this.regexStorageService.clear();
          }

          this.regexStorageService.saveCurrentRegex({
            identifiant: data.data.id,
            regexes: data.data.attributes.regex_parts.map(current => {
              return {
                regex: current.regex,
                readyAt: current.active_at
              }
            })
          });

          const oldTable = this.regexStorageService.getTable();
          if (oldTable) {
            return loadRegexSucceed({regexApi: data, table: oldTable});
          } else {
            return loadRegexSucceed({regexApi: data, table: null});
          }
        }), catchError(error => {
          console.error(error);
          return of(loadRegexFailed({error: `error`}));
        })))
      )
    );
  }
}
