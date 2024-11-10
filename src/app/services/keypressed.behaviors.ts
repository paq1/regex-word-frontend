import {WordSdd} from '../models/word.model';
import {RegexWordApiService} from './regex-word-api.service';
import {from, lastValueFrom, map, mergeAll, mergeMap, Observable} from 'rxjs';


export abstract class CoRKeyPressed {

  next: CoRKeyPressed | undefined;

  constructor(next: CoRKeyPressed | undefined) {
    this.next = next;
  }

  async resolve(fromWord: WordSdd, key: string): Promise<WordSdd | undefined> {

    let words$ = from(this.resolve_children(fromWord, key))
      .pipe(
        map(maybeResolved => {
          if (maybeResolved !== undefined) {
            return from(new Promise(resolve => resolve(maybeResolved))) as Observable<WordSdd | undefined>;
          } else {
            if (this.next === undefined) {
              return from(new Promise(resolve => resolve(undefined))) as Observable<WordSdd | undefined>;
            } else {
              return from(this.next.resolve(fromWord, key));
            }
          }
        }),
        mergeMap(data => data)
      );

    return lastValueFrom(words$)
  }

  abstract resolve_children(from: WordSdd, key: string): Promise<WordSdd | undefined>
}

export class EnterKeyPressed extends CoRKeyPressed {

  constructor(
    private readonly regexWordApiService: RegexWordApiService,
    next: CoRKeyPressed | undefined

  ) {
    super(next);
  }

  override resolve_children(from: WordSdd, key: string): Promise<WordSdd | undefined> {

    console.log("pouet 2");
    if (key.toLowerCase() === "enter") {
      const currentWord = from.words[from.currentIndex];
      console.log("pouet");
      if (currentWord.word.length === from.length) {
        console.log("ici")
        const words$ =  this
          .regexWordApiService
          .checkWordValid(currentWord.word)
          .pipe(
            map((result) => result.data.isValid),
            map((isValid) => {
              console.log(isValid);
              return {
                ...from,
                words: [ ...from.words.slice(0, -1), { word: `${currentWord.word}`, isSucceeded: isValid} ],
                currentIndex: from.currentIndex < from.maxIndex ? from.currentIndex + 1 : from.currentIndex,
              }
            })
          )
        return lastValueFrom(words$)
      } else {
        console.log("la")
        return new Promise(resolve => resolve(from));
      }
    } else {
      console.log("encore la")
      return new Promise(resolve => resolve(undefined));
    }
  }
}

export class BackspaceKeyPressed extends CoRKeyPressed {

  constructor(next: CoRKeyPressed | undefined) {
    super(next);
  }

  override resolve_children(from: WordSdd, key: string): Promise<WordSdd | undefined> {
    if (key.toLowerCase() === "backspace") {
      const currentWord = from.words[from.currentIndex];

      if (currentWord.word.length > 1) {

        return new Promise(resolve => resolve({ ...from, words: [ ...from.words.slice(0, -1), { word: currentWord.word.slice(0, -1) } ] }));

      } else {
        return new Promise(resolve => resolve(from));
      }
    } else {
      return new Promise(resolve => resolve(undefined));
    }
  }
}

export class LetterKeyPressed extends CoRKeyPressed {

  constructor(next: CoRKeyPressed | undefined) {
    super(next);
  }

  override resolve_children(from: WordSdd, key: string): Promise<WordSdd | undefined> {
    if (this.isLetter(key.toLowerCase())) {
      const currentWord = from.words[from.currentIndex];

      if (currentWord.word.length <= from.length - 1) {
        return new Promise(resolve => resolve({ ...from, words: [...from.words.slice(0, -1), { word: `${currentWord.word}${key}` }] }));
      } else {
        return new Promise(resolve => resolve(from));
      }
    } else {
      return new Promise(resolve => resolve(undefined));
    }
  }

  isLetter(key: string): boolean {
    const sanitizeKey = key.toLowerCase();
    const test = (/[a-z]+/gm).test(sanitizeKey);
    return test && key.length === 1;
  }
}

