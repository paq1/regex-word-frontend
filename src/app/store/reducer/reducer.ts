import {createFeature, createReducer, on} from '@ngrx/store';
import {loadRegexSucceed, updateTable} from '../actions/table.actions';
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
  currentRegexes: {
    identifiant: "",
    regexes: []
  }
}

export const tableReducer = createReducer(
  initialState,
  on(loadRegexSucceed, (_, {regexApi}) => fromRegexToInitialTable(regexApi)),
  on(updateTable, (state, {newTable}) => {
    return {...state, table: newTable}
  }),
);

export const AppFeature = createFeature({
  name: 'app',
  reducer: tableReducer
})

export const {
  name, // feature name
  reducer, // feature reducer
  selectTable,
  selectCurrentRegexes,
} = AppFeature;
