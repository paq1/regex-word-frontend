import {WordSdd} from '../models/word.model';


export abstract class CoRKeyPressed {

  next: CoRKeyPressed | undefined;

  constructor(next: CoRKeyPressed | undefined) {
    this.next = next;
  }

  resolve(from: WordSdd, key: string): WordSdd | undefined {

    const maybeResolved = this.resolve_children(from, key);

    if (maybeResolved !== undefined) {
      return maybeResolved;
    } else {
      if (this.next === undefined) {
        return undefined;
      } else {
        return this.next.resolve(from, key);
      }
    }
  }

  abstract resolve_children(from: WordSdd, key: string): WordSdd | undefined
}

export class EnterKeyPressed extends CoRKeyPressed {

  constructor(next: CoRKeyPressed | undefined) {
    super(next);
  }

  override resolve_children(from: WordSdd, key: string): WordSdd | undefined {
    if (key.toLowerCase() === "enter") {
      const currentWord = from.words[from.currentIndex];

      if (currentWord.word.length === from.length) {
        return {
          ...from,
          words: [ ...from.words.slice(0, -1), { word: `${currentWord.word}`, isSucceeded: false} ],
          currentIndex: from.currentIndex < from.maxIndex ? from.currentIndex + 1 : from.currentIndex,
        }
      } else {
        return from;
      }
    } else {
      return;
    }
  }
}

export class BackspaceKeyPressed extends CoRKeyPressed {

  constructor(next: CoRKeyPressed | undefined) {
    super(next);
  }

  override resolve_children(from: WordSdd, key: string): WordSdd | undefined {
    if (key.toLowerCase() === "backspace") {
      const currentWord = from.words[from.currentIndex];

      if (currentWord.word.length > 1) {
        return { ...from, words: [ ...from.words.slice(0, -1), { word: currentWord.word.slice(0, -1) } ] };
      } else {
        return from;
      }
    } else {
      return;
    }
  }
}

export class LetterKeyPressed extends CoRKeyPressed {

  constructor(next: CoRKeyPressed | undefined) {
    super(next);
  }

  override resolve_children(from: WordSdd, key: string): WordSdd | undefined {
    if (this.isLetter(key.toLowerCase())) {
      const currentWord = from.words[from.currentIndex];

      if (currentWord.word.length <= from.length - 1) {
        return { ...from, words: [...from.words.slice(0, -1), { word: `${currentWord.word}${key}` }] };
      } else {
        return from;
      }
    } else {
      return;
    }
  }

  isLetter(key: string): boolean {
    const sanitizeKey = key.toLowerCase();
    const test = (/[a-z]+/gm).test(sanitizeKey);
    return test && key.length === 1;
  }
}

