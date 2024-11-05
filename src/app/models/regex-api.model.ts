export interface RegexApiModel {
  regexes: OneRegexModel[];
  wordModel: WordModel;
}

export interface OneRegexModel {
  regex?: string;
  dateEffet: Date;
}

export interface WordModel {
  firstLetter: string;
  size: number;
}
