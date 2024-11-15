import {BackspaceKeyPressed, CoRKeyPressed, EnterKeyPressed, LetterKeyPressed} from './keypressed.behaviors';
import {RegexWordApiService} from './regex-word-api.service';
import {WordSdd} from '../models/word.model';

describe('CoRKeyPressed', () => {
  let service: CoRKeyPressed;
  let regexWordApiService: RegexWordApiService
  let baseWordSdd: WordSdd;

  beforeEach(() => {
    regexWordApiService = new RegexWordApiService();
    service = new EnterKeyPressed(regexWordApiService, new BackspaceKeyPressed(new LetterKeyPressed(undefined)));
    baseWordSdd = {
      length: 6,
      try: 6,
      currentIndex: 0,
      firstLetter: "A",
      words: []
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should incr index and isSucceed false when key pressed is enter and length is word.length', () => {

    let key = "enter";
    let oldWord: WordSdd = {...baseWordSdd, words: [{word: "abcdef"}]};

    service
      .resolve(oldWord, key)
      .subscribe(data => {
        expect(data).toBeDefined();
        expect(data?.words.length).toEqual(1);
        expect(data?.words[0].isSucceeded).toBeDefined();
        expect(data?.words[0].isSucceeded).toEqual(false);
        expect(data?.currentIndex).toEqual(1);
      })
  });

  it('should do nothing if length < word.length', () => {

    let key = "enter";
    let oldWord: WordSdd = {...baseWordSdd, length: 6, currentIndex: 0, words: [{word: "abcde"}]};

    service
      .resolve(oldWord, key)
      .subscribe(data => {
        expect(data).toBeDefined();
        expect(data?.words.length).toEqual(1);
        expect(data?.words[0].isSucceeded).toBeUndefined();
        expect(data?.currentIndex).toEqual(0);
      })
  });


  it('should not incr index and isSucceed false when key pressed is enter and length is word.length and table is completed', () => {

    let key = "enter";
    let oldWord: WordSdd = {
      ...baseWordSdd,
      currentIndex: 5,
      words: [
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef"
        },
      ]
    };

    service
      .resolve(oldWord, key)
      .subscribe(data => {
        expect(data).toBeDefined();
        expect(oldWord.words.length).toEqual(6);
        expect(data?.words.length).toEqual(6);
        expect(oldWord.words[5].isSucceeded).toBeUndefined();
        expect(data?.words[5].isSucceeded).toBeDefined();
        expect(data?.words[5].isSucceeded).toEqual(false);
        expect(oldWord.currentIndex).toEqual(5);
        expect(data?.currentIndex).toEqual(5);
      })
  });

  it('should add uppercase letter when key is letter and word.length < length', () => {

    let key = "a";
    let oldWord: WordSdd = {
      ...baseWordSdd,
      currentIndex: 0,
      words: [
        {
          word: "abcd"
        },
      ]
    };

    service
      .resolve(oldWord, key)
      .subscribe(data => {
        expect(data).toBeDefined();
        expect(oldWord.words.length).toEqual(1);
        expect(data?.words.length).toEqual(1);
        expect(oldWord.words[0].isSucceeded).toBeUndefined();
        expect(data?.words[0].isSucceeded).toBeUndefined();
        expect(oldWord.currentIndex).toEqual(0);
        expect(data?.currentIndex).toEqual(0);
        expect(data?.words[0].word).toEqual("abcdA");
      })
  });

  it('should not add key when key is not letter and word.length < length', () => {

    let key = "1";
    let oldWord: WordSdd = {
      ...baseWordSdd,
      currentIndex: 0,
      words: [
        {
          word: "abcd"
        },
      ]
    };

    service
      .resolve(oldWord, key)
      .subscribe(data => {
        expect(data).toBeUndefined();
      })
  });

  it('should do nothing when key is letter and word.length === length', () => {

    let key = "a";
    let oldWord: WordSdd = {
      ...baseWordSdd,
      currentIndex: 0,
      words: [
        {
          word: "abcdef"
        },
      ]
    };

    service
      .resolve(oldWord, key)
      .subscribe(data => {
        expect(data).toBeDefined();
        expect(oldWord.words.length).toEqual(1);
        expect(data?.words.length).toEqual(1);
        expect(oldWord.words[0].isSucceeded).toBeUndefined();
        expect(data?.words[0].isSucceeded).toBeUndefined();
        expect(oldWord.currentIndex).toEqual(0);
        expect(data?.currentIndex).toEqual(0);
        expect(data?.words[0].word).toEqual("abcdef");
      })
  });

  it('should delete letter when key is backspace and letter is present', () => {

    let key = "backspace";
    let oldWord: WordSdd = {
      ...baseWordSdd,
      currentIndex: 0,
      words: [
        {
          word: "abcdef"
        },
      ]
    };

    service
      .resolve(oldWord, key)
      .subscribe(data => {
        expect(data).toBeDefined();
        expect(oldWord.words.length).toEqual(1);
        expect(data?.words.length).toEqual(1);
        expect(oldWord.words[0].isSucceeded).toBeUndefined();
        expect(data?.words[0].isSucceeded).toBeUndefined();
        expect(oldWord.currentIndex).toEqual(0);
        expect(data?.currentIndex).toEqual(0);
        expect(data?.words[0].word).toEqual("abcde");
      })
  });

  it('should not delete letter when key is backspace and not letter is present', () => {

    let key = "backspace";
    let oldWord: WordSdd = {
      ...baseWordSdd,
      currentIndex: 0,
      words: [
        {
          word: ""
        },
      ]
    };

    service
      .resolve(oldWord, key)
      .subscribe(data => {
        expect(oldWord.currentIndex).toEqual(0);
        expect(data?.currentIndex).toEqual(0);
        expect(data?.words[0].word).toEqual("");
      })
  });

  it('should delete letter and isSucceed take undefined when key is backspace and letter is present and all word table is present', () => {

    let key = "backspace";
    let oldWord: WordSdd = {
      ...baseWordSdd,
      currentIndex: 0,
      words: [
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef",
          isSucceeded: false
        },
        {
          word: "abcdef",
          isSucceeded: false
        },
      ]
    };

    service
      .resolve(oldWord, key)
      .subscribe(data => {
        expect(oldWord.currentIndex).toEqual(0);
        expect(data?.currentIndex).toEqual(0);
        expect(data?.words[5].word).toEqual("abcde");
        expect(oldWord.words[5].isSucceeded).toBeDefined();
        expect(data?.words[5].isSucceeded).toBeUndefined();
      })
  });

});
