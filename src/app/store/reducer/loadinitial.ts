import {RegexApiModel} from '../../models/regex-api.model';
import {AppState} from '../states/RegexWord';
import {SingleJsonApi} from '../../models/jsonapi.model';

export function fromRegexToInitialTable(regexApi: SingleJsonApi<RegexApiModel>): AppState {
  return {
    table: {
      length: regexApi.data.attributes.wordModel.size,
      try: 6,
      currentIndex: 0,
      firstLetter: regexApi.data.attributes.wordModel.firstLetter,
      words: []
    },
    currentRegexes: {
      identifiant: regexApi.data.id,
      regexes: regexApi.data.attributes.regexes.map(data => {
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
    },
  };
}
