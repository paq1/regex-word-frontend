import {WordSdd} from '../models/word.model';
import {RegexWordApiService} from './regex-word-api.service';
import {map, mergeMap, Observable, of} from 'rxjs';

export abstract class CoRKeyPressed {

  next: CoRKeyPressed | undefined;

  constructor(next: CoRKeyPressed | undefined) {
    this.next = next;
  }

  resolve(fromWord: WordSdd, key: string): Observable<WordSdd | undefined> {

    return this.resolve_children(fromWord, key)
      .pipe(
        map(maybeResolved => {
          if (maybeResolved !== undefined) {
            return of(maybeResolved);
          } else {
            if (this.next === undefined) {
              return of(undefined);
            } else {
              return this.next.resolve(fromWord, key);
            }
          }
        }),
        mergeMap(data => data)
      );
  }

  abstract resolve_children(from: WordSdd, key: string): Observable<WordSdd | undefined>
}

export class EnterKeyPressed extends CoRKeyPressed {

  constructor(
    private readonly regexWordApiService: RegexWordApiService,
    next: CoRKeyPressed | undefined
  ) {
    super(next);
  }

  override resolve_children(from: WordSdd, key: string): Observable<WordSdd | undefined> {

    if (key.toLowerCase() === "enter") {
      const currentWord = from.words[from.currentIndex];
      if (currentWord.word.length === from.length) {
        return this
          .regexWordApiService
          .checkWordValid(currentWord.word)
          .pipe(
            map((result) => result.data.isValid),
            map((isValid) => {
              return {
                ...from,
                words: [...from.words.slice(0, -1), {word: `${currentWord.word}`, isSucceeded: isValid}],
                currentIndex: from.currentIndex < from.try - 1 ? from.currentIndex + 1 : from.currentIndex,
              }
            })
          )
      } else {
        return of(from);
      }
    } else {
      return of(undefined);
    }
  }
}

export class BackspaceKeyPressed extends CoRKeyPressed {

  constructor(next: CoRKeyPressed | undefined) {
    super(next);
  }

  override resolve_children(from: WordSdd, key: string): Observable<WordSdd | undefined> {
    if (key.toLowerCase() === "backspace") {
      const currentWord = from.words[from.currentIndex];

      if (currentWord.word.length > 1) {

        return of({...from, words: [...from.words.slice(0, -1), {word: currentWord.word.slice(0, -1)}]});

      } else {
        return of(from);
      }
    } else {
      return of(undefined);
    }
  }
}

export class LetterKeyPressed extends CoRKeyPressed {

  constructor(next: CoRKeyPressed | undefined) {
    super(next);
  }

  override resolve_children(from: WordSdd, key: string): Observable<WordSdd | undefined> {
    if (LetterKeyPressed.isLetter(key)) {
      const currentWord = from.words[from.currentIndex];

      if (currentWord.word.length <= from.length - 1) {
        return of({...from, words: [...from.words.slice(0, -1), {word: `${currentWord.word}${key.toUpperCase()}`}]});
      } else {
        return of(from);
      }
    } else {
      return of(undefined);
    }
  }

  static isLetter(key: string): boolean {
    const sanitizeKey = key.toLowerCase();
    const test = (/[a-z]+/gm).test(sanitizeKey);
    return test && key.length === 1;
  }
}

