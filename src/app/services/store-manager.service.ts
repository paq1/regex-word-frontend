import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/states/RegexWord';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreManagerService {


  readonly currentState$: Observable<AppState>;

  constructor(private readonly store: Store<AppState>) {
    this.currentState$ = this.store.pipe(select(state => (state as any).tableReducer))
  }
}
