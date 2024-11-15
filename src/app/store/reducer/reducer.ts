import {createFeature, createReducer, on} from '@ngrx/store';
import {keyupLetter, loadRegexSucceed, pressLetter} from '../actions/table.actions';
import {AppState} from '../states/RegexWord';
import {fromRegexToInitialTable} from './loadinitial';

const initialState: AppState = {
  table: {
    length: 0,
    try: 6,
    currentIndex: 0,
    firstLetter: '',
    words: []
  },
  lastKeyboardAction: "keyup",
  currentRegexes: {
    regexes: []
  }
}

export const tableReducer = createReducer(
  initialState,
  on(loadRegexSucceed, (state, {regexApi}) => fromRegexToInitialTable(regexApi)),
  on(pressLetter, (state, {newState}) => {
    return {...state, table: newState, lastKeyboardAction: "keydown"}
  }),
  on(keyupLetter, state => {
    return {
      ...state,
      lastKeyboardAction: "keyup"
    }
  })
);

export const AppFeature = createFeature({
  name: 'app',
  reducer: tableReducer
})

export const {
  name, // feature name
  reducer, // feature reducer
  selectTable,
  selectLastKeyboardAction,
  selectCurrentRegexes,
} = AppFeature;
