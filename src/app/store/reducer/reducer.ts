import {createReducer, on} from '@ngrx/store';
import {keyupLetter, loadRegexSucceed, pressLetter} from '../actions/table.actions';
import {RegexApiModel} from '../../models/regex-api.model';
import {AppState} from '../states/RegexWord';

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
    console.log("reduce key pressed ok");
    if (state.lastKeyboardAction !== "keydown") {
      return { table: newState, lastKeyboardAction: "keydown" }
    } else return state
  }),
  on(keyupLetter, state => {
    return {
      ...state,
      lastKeyboardAction: "keyup"
    }
  })
);

function fromRegexToInitialTable(regexApi: RegexApiModel): AppState {
  return {
    table: {
      length: regexApi.wordModel.size,
      try: 6,
      currentIndex: 0,
      maxIndex: 6,
      firstLetter: regexApi.wordModel.firstLetter,
      words: []
    },
    lastKeyboardAction: "empty"
  };
}
