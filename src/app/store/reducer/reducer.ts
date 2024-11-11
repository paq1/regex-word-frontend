import { createReducer, on } from '@ngrx/store';
import { Table } from '../states/RegexWord';
import { loadRegexSucceed } from '../actions/table.actions';
import { RegexApiModel } from '../../models/regex-api.model';

const initialState: Table = {
  length: 0,
  try: 6,
  currentIndex: 0,
  maxIndex: 6,
  firstLetter: '',
  words: []
}

export const tableReducer = createReducer(
  initialState,
  on(loadRegexSucceed, (state, { regexApi }) => fromRegexToInitialTable(regexApi))
);

function fromRegexToInitialTable(regexApi: RegexApiModel): Table {
  console.log('reduction etat ok ');
  return {

    // length: 6,
    // try: 6,
    // currentIndex: 0,
    // maxIndex: 5,
    // firstLetter: "A",
    // words: []

    length: regexApi.wordModel.size,
    try: 6,
    currentIndex: 0,
    maxIndex: 6,
    firstLetter: regexApi.wordModel.firstLetter,
    words: []
  };
}
