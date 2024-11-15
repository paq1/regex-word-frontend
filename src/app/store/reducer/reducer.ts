import {createReducer, on} from '@ngrx/store';
import {keyupLetter, loadRegexSucceed, pressLetter} from '../actions/table.actions';
import {AppState} from '../states/RegexWord';
import {fromRegexToInitialTable} from './loadinitial';

const initialState: AppState = {
  table: {
    length: 0,
    try: 6,
    currentIndex: 0,
    maxIndex: 6,
    firstLetter: '',
    words: []
  },
  lastKeyboardAction: "keyup"
}

export const tableReducer = createReducer(
  initialState,
  on(loadRegexSucceed, (state, { regexApi }) => fromRegexToInitialTable(regexApi)),
  on(pressLetter, (state, { newState }) => {
    return { table: newState, lastKeyboardAction: "keydown" }
  }),
  on(keyupLetter, state => {
    return {
      ...state,
      lastKeyboardAction: "keyup"
    }
  })
);

