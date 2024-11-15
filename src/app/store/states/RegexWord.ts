import {WordSdd} from '../../models/word.model';

export interface CurrentRegexes {
  regexes: RegexPart[];
}

export interface RegexPart {
  regex?: string;
  readyAt: Date;
}


export interface AppState {
  table: WordSdd;
  lastKeyboardAction: string;
  currentRegexes: CurrentRegexes;
}
