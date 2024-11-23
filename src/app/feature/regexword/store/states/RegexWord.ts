import {TableSdd} from '../../models/word.model';

export interface CurrentRegexes {
  identifiant: string;
  regexes: RegexPart[];
}

export interface RegexPart {
  regex?: string;
  readyAt?: Date;
}

export interface RegexWordState {
  table: TableSdd;
  currentRegexes: CurrentRegexes;
}
