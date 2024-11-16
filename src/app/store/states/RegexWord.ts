import {TableSdd} from '../../models/word.model';

export interface CurrentRegexes {
  regexes: RegexPart[];
}

export interface RegexPart {
  regex?: string;
  readyAt: Date;
}

export enum StatusEnum {
  InGame = 'in_game',
  Win = 'win',
  Lose = 'lose',
}

export interface AppState {
  table: TableSdd;
  lastKeyboardAction: string;
  currentRegexes: CurrentRegexes;
  status: StatusEnum;
}
