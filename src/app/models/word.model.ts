import {LineModel} from './line.model';

export interface WordSdd {
  length: number;
  try: number;
  currentIndex: number;
  firstLetter: string;
  words: LineModel[];
}
