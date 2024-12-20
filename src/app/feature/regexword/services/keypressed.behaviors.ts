import {TableSdd} from '../models/word.model';
import {RegexWordApiService} from './regex-word-api.service';
import {map, mergeMap, Observable, of} from 'rxjs';

export abstract class CoRKeyPressed {

  next: CoRKeyPressed | undefined;

  constructor(next: CoRKeyPressed | undefined) {
    this.next = next;
  }

  resolve(fromWord: TableSdd, key: string): Observable<TableSdd | undefined> {

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

  abstract resolve_children(from: TableSdd, key: string): Observable<TableSdd | undefined>
}

export class EnterKeyPressed extends CoRKeyPressed {

  constructor(
    private readonly regexWordApiService: RegexWordApiService,
    next: CoRKeyPressed | undefined
  ) {
    super(next);
  }

  override resolve_children(from: TableSdd, key: string): Observable<TableSdd | undefined> {

    if (key.toLowerCase() === "enter") {
      const currentWord = from.words[from.currentIndex];
      if (currentWord.word.length === from.length && from.currentIndex < from.try) {
        return this
          .regexWordApiService
          .checkWordValid(currentWord.word)
          .pipe(
            map((result) => result.data.attributes),
            map(({valid_position, is_valid}) => {
              return {
                ...from,
                words: [...from.words.slice(0, -1), {word: `${currentWord.word}`, isSucceeded: is_valid, valid_position: valid_position}, {word: `${from.firstLetter}`, valid_position: []}],
                currentIndex: from.currentIndex + 1,
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

  override resolve_children(from: TableSdd, key: string): Observable<TableSdd | undefined> {
    if (key.toLowerCase() === "backspace") {
      const currentWord = from.words[from.currentIndex];

      if (currentWord.word.length > 1) {

        return of({...from, words: [...from.words.slice(0, -1), {word: currentWord.word.slice(0, -1), valid_position: []}]});

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

  override resolve_children(from: TableSdd, key: string): Observable<TableSdd | undefined> {
    if (LetterKeyPressed.isLetter(key)) {
      const currentWord = from.words[from.currentIndex];

      if (currentWord.word.length <= from.length - 1) {
        return of({...from, words: [...from.words.slice(0, -1), {word: `${currentWord.word}${key.toUpperCase()}`, valid_position: []}]});
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

