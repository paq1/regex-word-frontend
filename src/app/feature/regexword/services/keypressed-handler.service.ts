import {Injectable} from '@angular/core';
import {TableSdd} from '../models/word.model';
import {BackspaceKeyPressed, CoRKeyPressed, EnterKeyPressed, LetterKeyPressed} from './keypressed.behaviors';
import {RegexWordApiService} from './regex-word-api.service';
import {map, mergeMap, Observable, of, take, tap} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {updateTable} from '../../../store/actions/table.actions';
import {AppState} from '../../../store/states/RegexWord';
import {selectTable} from '../../../store/reducer/reducer';
import {RegexStorageService} from './regex-storage.service';


@Injectable({
  providedIn: 'root'
})
export class KeypressedHandlerService {

  corKeyPressed: CoRKeyPressed;

  constructor(
    private readonly regexWordApiService: RegexWordApiService,
    private readonly store: Store<AppState>,
    private readonly regexStorageService: RegexStorageService
  ) {
    this.corKeyPressed = new LetterKeyPressed(
      new EnterKeyPressed(
        this.regexWordApiService,
        new BackspaceKeyPressed(
          undefined
        )
      )
    )
  }

  onKeyPressed(key: string): void {
    this.safeMutateWordWhenGameInProgress(key)
  }

  private safeMutateWordWhenGameInProgress(key: string): void {
    this.store.pipe(
      take(1),
      select(state => selectTable(state)),
      mergeMap(oldTable => {
        if (this.isInProgress(oldTable)) {
          return this.computeNewTableFromKeypressed(key, oldTable)
            .pipe(
              map(data => [data, true] as [TableSdd, boolean])
            )
        } else {
          return of([oldTable, false] as [TableSdd, boolean]);
        }
      }),
      tap(([table, needUpdateTable]) => {
        if (needUpdateTable) {
          this.regexStorageService.saveTable(table);
          this.store.dispatch(updateTable({newTable: table}));
        } else {
          console.log("game finished");
        }
      }),
    )
      .subscribe()
  }

  private computeNewTableFromKeypressed(key: string, oldTable: TableSdd): Observable<TableSdd> {
    const tableSdd = oldTable
    const keyValue = key.toLowerCase();
    const maybeNewLine =
      tableSdd.words.length == tableSdd.currentIndex ? [...tableSdd.words, {word: tableSdd.firstLetter}] : tableSdd.words
    const wordsWithNewLine: TableSdd = {...tableSdd, words: maybeNewLine};

    return this.corKeyPressed
      .resolve(wordsWithNewLine, keyValue)
      .pipe(
        map(data => data || wordsWithNewLine)
      )
  }

  private isInProgress(table: TableSdd): boolean {
    return !this.isWin(table) && !this.isLose(table);
  }

  private isWin(table: TableSdd): boolean {
    return !!table.words.find(data => data.isSucceeded === true);
  }

  private isLose(table: TableSdd): boolean {
    return table.words.filter(data => data.isSucceeded === false).length === table.try;
  }

}
