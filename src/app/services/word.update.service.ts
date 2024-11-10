import { Injectable } from '@angular/core';
import {WordSdd} from '../models/word.model';
import {BackspaceKeyPressed, CoRKeyPressed, EnterKeyPressed, LetterKeyPressed} from './keypressed.behaviors';
import {RegexWordApiService} from './regex-word-api.service';
import {from} from 'rxjs';

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

  corKeyPressed: CoRKeyPressed;

  constructor(private readonly regexWordApiService: RegexWordApiService) {
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
    from(this.handleKeypress(key))
      .subscribe({
        next: data => {
          this.wordsSdd = data;
        },
        error: err => {
          console.error(err);
        }
      });
  }

  async handleKeypress(key: string): Promise<WordSdd> {
    const keyValue = key.toLowerCase();
    const maybeNewLine =
      this.wordsSdd.words.length == this.wordsSdd.currentIndex ? [...this.wordsSdd.words, {word: this.wordsSdd.firstLetter}] : this.wordsSdd.words
    const wordsWithNewLine: WordSdd = {...this.wordsSdd, words: maybeNewLine};
    let v = await this.corKeyPressed.resolve(wordsWithNewLine, keyValue)
    return v || wordsWithNewLine;
  }

}
