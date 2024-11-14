import {Injectable} from '@angular/core';
import {WordSdd} from '../models/word.model';
import {BackspaceKeyPressed, CoRKeyPressed, EnterKeyPressed, LetterKeyPressed} from './keypressed.behaviors';
import {RegexWordApiService} from './regex-word-api.service';
import {map, mergeMap, Observable, take} from 'rxjs';
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
          this.store.dispatch(pressLetter({newState: data}));
        },
        error: err => {
          console.error(err);
        }
      });
  }

  handleKeypress(key: string): Observable<WordSdd> {
    return this.storeManagerService.currentState$
      .pipe(
        take(1), // hack: ne retrigger pas le state si le state change
        mergeMap(currentState => {
          const wordSdd = (currentState as AppState).table

          const keyValue = key.toLowerCase();
          const maybeNewLine =
            wordSdd.words.length == wordSdd.currentIndex ? [...wordSdd.words, {word: wordSdd.firstLetter}] : wordSdd.words
          const wordsWithNewLine: WordSdd = {...wordSdd, words: maybeNewLine};

          return this.corKeyPressed
            .resolve(wordsWithNewLine, keyValue)
            .pipe(
              map(data => data || wordsWithNewLine)
            )
        })
      )
  }

}
