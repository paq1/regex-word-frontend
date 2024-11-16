import {Component, HostListener, OnInit} from '@angular/core';
import {LineModel} from '../../models/line.model';
import {AsyncPipe, DatePipe, NgClass} from '@angular/common';
import {TableSdd} from '../../models/word.model';
import {KeypressedHandlerService} from '../../services/keypressed-handler.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {initialLoad} from '../../store/actions/table.actions';
import {AppState, CurrentRegexes} from '../../store/states/RegexWord';
import {selectCurrentRegexes, selectTable} from '../../store/reducer/reducer';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(private wordUpdateService: KeypressedHandlerService, private readonly store: Store<AppState>) {
  }

  get getTable$(): Observable<TableSdd> {
    return this.store.pipe(select(state => selectTable(state)))
  }

  get regexes$(): Observable<CurrentRegexes> {
    return this.store.pipe(select(state => selectCurrentRegexes(state)))
  }

  ngOnInit(): void {
    this.store.dispatch(initialLoad());
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.wordUpdateService.onKeyPressed(event.key);
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
