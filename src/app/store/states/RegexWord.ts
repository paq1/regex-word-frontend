import {WordSdd} from '../../models/word.model';
import {createFeature, createFeatureSelector, createSelector} from '@ngrx/store';

export interface AppState {
  table: WordSdd;
  lastKeyboardAction: string;
}

// export const selectAppState = createFeatureSelector<AppState>('table');
//
// export const selectTable = createSelector(selectAppState, (state: AppState) => state);
