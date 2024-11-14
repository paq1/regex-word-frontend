import {Component, HostListener, OnInit} from '@angular/core';
import {LineModel} from '../../models/line.model';
import {AsyncPipe, NgClass} from '@angular/common';
import {WordSdd} from '../../models/word.model';
import {WordUpdateService} from '../../services/word.update.service';
import {Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {initialLoad, keyupLetter, pressLetter} from '../../store/actions/table.actions';
import {AppState} from '../../store/states/RegexWord';


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

  constructor(private wordUpdateService: WordUpdateService, private readonly store: Store<AppState>) {
    // this.table$ = this.store.select(state => state).pipe(tap(data => console.log("table tap : ", data)));
  }

  get getTable$(): Observable<WordSdd> {
    return this.store.select(state => state).pipe(map(data => {
      return (data as any).tableReducer.table
    }));
  }

  ngOnInit(): void {
    this.store.dispatch(initialLoad());
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.wordUpdateService.mutateWords(event.key);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(event: KeyboardEvent) {
    this.store.dispatch(keyupLetter())
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
