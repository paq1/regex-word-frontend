import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/states/RegexWord';

@Injectable({
  providedIn: 'root'
})
export class StoreManagerService {

  constructor(private readonly store: Store<AppState>) { }

  getCurrentState(): AppState | undefined {
    let currentState: AppState | undefined = undefined;

    this.store
      .select(state => state)
      .subscribe({
        next: data => {
          currentState = (data as any).tableReducer;
        }
      })
    return currentState
  }
}
