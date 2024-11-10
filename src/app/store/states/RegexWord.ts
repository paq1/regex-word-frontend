export interface RegexWordData {
  word: string;
  succeeded?: boolean;
}

export interface Table {
  length: number;
  try: number;
  currentIndex: number;
  maxIndex: number;
  firstLetter: string;
  words: RegexWordData[];
}

export interface AppState {
  table: Table;
}
