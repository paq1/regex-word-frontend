import { Injectable } from '@angular/core';
import {WordSdd} from '../models/word.model';
import {BackspaceKeyPressed, CoRKeyPressed, EnterKeyPressed, LetterKeyPressed} from '../models/keypressed.behaviors';

@Injectable({
  providedIn: 'root'
})
export class WordUpdateService {

  wordsSdd: WordSdd = {
    length: 6,
    try: 6,
    currentIndex: 0,
    maxIndex: 5,
    firstLetter: "A",
    words: [],
  }

  corKeyPressed: CoRKeyPressed = new LetterKeyPressed(
    new EnterKeyPressed(
      new BackspaceKeyPressed(
        undefined
      )
    )
  )

  constructor() { }

  mutateWords(key: string): void {
    this.wordsSdd = this.handleKeypress(key);
  }

  handleKeypress(key: string): WordSdd {
    const keyValue = key.toLowerCase();
    const maybeNewLine =
      this.wordsSdd.words.length == this.wordsSdd.currentIndex ? [...this.wordsSdd.words, {word: this.wordsSdd.firstLetter}] : this.wordsSdd.words
    const wordsWithNewLine: WordSdd = {...this.wordsSdd, words: maybeNewLine};
    return this.corKeyPressed.resolve(wordsWithNewLine, keyValue) || wordsWithNewLine;
  }

}
