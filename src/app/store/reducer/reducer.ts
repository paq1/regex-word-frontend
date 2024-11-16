import {createFeature, createReducer, on} from '@ngrx/store';
import {keyupLetter, loadRegexSucceed, updateTable} from '../actions/table.actions';
import {AppState, StatusEnum} from '../states/RegexWord';
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
  },
  status: StatusEnum.InGame
}

export const tableReducer = createReducer(
  initialState,
  on(loadRegexSucceed, (state, {regexApi}) => fromRegexToInitialTable(regexApi)),
  on(updateTable, (state, {newTable}) => {
    return {...state, table: newTable, lastKeyboardAction: "keydown"}
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
  selectStatus,
} = AppFeature;
