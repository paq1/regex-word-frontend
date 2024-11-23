import {LineModel} from './line.model';

export interface TableSdd {
  length: number;
  try: number;
  currentIndex: number;
  firstLetter: string;
  words: LineModel[];
}
