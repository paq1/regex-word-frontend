import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/states/RegexWord';
import {Observable} from 'rxjs';
import {WordSdd} from '../models/word.model';
import {selectTable} from '../store/reducer/reducer';

@Injectable({
  providedIn: 'root'
})
export class StoreManagerService {


  readonly currentState$: Observable<WordSdd>;

  constructor(private readonly store: Store<AppState>) {
    this.currentState$ = this.store.pipe(select(state => selectTable(state)))
  }
}
