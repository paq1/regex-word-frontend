import {createAction, props} from '@ngrx/store';
import {RegexApiModel} from '../../models/regex-api.model';

export const initialLoad = createAction('load table');
export const loadRegexSucceed = createAction('regex loaded', props<{ regexApi: RegexApiModel }>());
export const loadRegexFailed = createAction('regex loaded', props<{ error: string }>());
// export const pressEnter = createAction('press Enter', props<{ key: string }>());
// export const pressLetter = createAction('press Letter', props<{ key: string }>());
// export const pressBackspace = createAction('press Backspace', props<{ key: string }>());
