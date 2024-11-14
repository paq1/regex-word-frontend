import {Injectable} from '@angular/core';
import {WordSdd} from '../models/word.model';
import {BackspaceKeyPressed, CoRKeyPressed, EnterKeyPressed, LetterKeyPressed} from './keypressed.behaviors';
import {RegexWordApiService} from './regex-word-api.service';
import {distinctUntilChanged, map, mergeMap, Observable, of, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';
import {pressLetter} from '../store/actions/table.actions';
import {AppState} from '../store/states/RegexWord';
import {StoreManagerService} from './store-manager.service';

@Injectable({
  providedIn: 'root'
})
export class WordUpdateService {

  corKeyPressed: CoRKeyPressed;

  constructor(
    private readonly regexWordApiService: RegexWordApiService,
    private readonly store: Store<AppState>,
    private readonly storeManagerService: StoreManagerService,
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

  mutateWords(key: string): void {
    this.handleKeypress(key)
      .subscribe({
        next: data => {
          if (data) {
            this.store.dispatch(pressLetter({ newState: data }));
          } else {
            console.error("data is undefined");
          }
        },
        error: err => {
          console.error(err);
        }
      });
  }

  handleKeypress(key: string): Observable<WordSdd | undefined> {

    console.log("key pressed", key);
    let currentState: AppState | undefined = this.storeManagerService.getCurrentState();

    console.log("current", currentState);

    if (currentState) {
      const wordSdd = (currentState as AppState).table

      const keyValue = key.toLowerCase();
      const maybeNewLine =
        wordSdd.words.length == wordSdd.currentIndex ? [...wordSdd.words, {word: wordSdd.firstLetter}] : wordSdd.words
      const wordsWithNewLine: WordSdd = {...wordSdd, words: maybeNewLine};

      return this.corKeyPressed
        .resolve(wordsWithNewLine, keyValue)
        .pipe(
          map(data => {
            console.log("word: ", data?.words[0].word)
            return data || wordsWithNewLine
          })
        )
    } else {
      console.warn("state machine with undefined state");
      return of(undefined)
    }
  }

}
