import {Component, HostListener, OnInit} from '@angular/core';
import {LineModel} from '../../models/line.model';
import {AsyncPipe, NgClass} from '@angular/common';
import {WordSdd} from '../../models/word.model';
import {WordUpdateService} from '../../services/word.update.service';
import {Store} from '@ngrx/store';
import {AppState, Table} from '../../store/states/RegexWord';
import {map, Observable, tap} from 'rxjs';
import {initialLoad} from '../../store/actions/table.actions';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  // table$: Observable<Table>;

  constructor(private wordUpdateService: WordUpdateService, private readonly store: Store<Table>) {
    // this.table$ = this.store.select(state => state).pipe(tap(data => console.log("table tap : ", data)));
  }

  get getTable$(): Observable<Table> {
    return this.store.select(state => state).pipe(map(data => ((data as any).tableReducer as Table)));
  }

  ngOnInit(): void {
    this.store.dispatch(initialLoad());
    console.log('dispatcher')
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.wordUpdateService.mutateWords(event.key);
  }

  isSucceeded(word: LineModel): boolean {
    return word.isSucceeded || false;
  };

  isFailed(word: LineModel): boolean {
    return (!word.isSucceeded && word.isSucceeded !== undefined);
  };

  isNothing(word: LineModel): boolean {
    return word.isSucceeded === undefined;
  };

  protected readonly Array = Array;
}
