import {createAction, props} from '@ngrx/store';
import {RegexApiModel} from '../../models/regex-api.model';
import {WordSdd} from '../../models/word.model';

export const initialLoad = createAction('load table');
export const loadRegexSucceed = createAction('regex loaded succeeded', props<{ regexApi: RegexApiModel }>());
export const loadRegexFailed = createAction('regex loaded failed', props<{ error: string }>());
export const pressLetter = createAction('press keyboar', props<{ newState: WordSdd }>());
export const keyupLetter = createAction('keyup keyboar');
