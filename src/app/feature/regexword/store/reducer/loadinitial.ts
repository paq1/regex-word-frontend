import {RegexApiModel} from '../../models/regex-api.model';
import {RegexWordState} from '../states/RegexWord';
import {SingleJsonApi} from '../../../../core/models/jsonapi.model';
import {TableSdd} from '../../models/word.model';

export function fromRegexToInitialTable(regexApi: SingleJsonApi<RegexApiModel>, oldTable: TableSdd | null): RegexWordState {
  const regexes = {
    identifiant: regexApi.data.id,
      regexes: regexApi.data.attributes.regex_parts.map(data => {
      if (data.regex) {
        return {
          regex: data.regex,
          readyAt: data.active_at
        };
      } else {
        return {
          readyAt: data.active_at
        };
      }
    })
  }

  if (oldTable) {
    return {
      table: oldTable,
      currentRegexes: regexes,
    }
  } else {
    const firstLetter = regexApi.data.attributes.word_info.first_letter;
    return {
      table: {
        length: regexApi.data.attributes.word_info.size,
        try: 6,
        currentIndex: 0,
        firstLetter: firstLetter,
        words: [{word: `${firstLetter}`, valid_position: []}]
      },
      currentRegexes: regexes
    }
  }
}
