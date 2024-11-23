import {createAction, props} from '@ngrx/store';
import {RegexApiModel} from '../../models/regex-api.model';
import {TableSdd} from '../../models/word.model';
import {SingleJsonApi} from '../../../../core/models/jsonapi.model';

export const initialLoad = createAction('load table');
export const loadRegexSucceed = createAction('regex loaded succeeded', props<{ regexApi: SingleJsonApi<RegexApiModel>, table: TableSdd | null }>());
export const loadRegexFailed = createAction('regex loaded failed', props<{ error: string }>());
export const updateTable = createAction('update table', props<{ newTable: TableSdd }>());
