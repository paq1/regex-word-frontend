export interface RegexApiModel {
  regex_parts: OneRegexModel[];
  word_info: WordModel;
}

export interface OneRegexModel {
  regex?: string;
  active_at?: Date;
}

export interface WordModel {
  first_letter: string;
  size: number;
}
