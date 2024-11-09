import {LineModel} from './line.model';

export interface WordSdd {
  length: number;
  try: number;
  currentIndex: number;
  maxIndex: number;
  firstLetter: string;
  words: LineModel[];
}
