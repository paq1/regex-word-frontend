import {RegexApiModel} from '../../models/regex-api.model';
import {AppState} from '../states/RegexWord';

export function fromRegexToInitialTable(regexApi: RegexApiModel): AppState {
  return {
    table: {
      length: regexApi.wordModel.size,
      try: 6,
      currentIndex: 0,
      firstLetter: regexApi.wordModel.firstLetter,
      words: []
    },
    lastKeyboardAction: "keyup",
    currentRegexes: {
      regexes: regexApi.regexes.map(data => {
        if (data.regex) {
          return {
            regex: data.regex,
            readyAt: data.dateEffet
          };
        } else {
          return {
            readyAt: data.dateEffet
          };
        }
      })
    }
  };
}
