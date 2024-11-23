import {Component, HostListener, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgClass} from "@angular/common";
import {ColoriseSpacialCharComponent} from "../../../../shared/colorise-spacial-char/colorise-spacial-char.component";
import {KeypressedHandlerService} from '../../services/keypressed-handler.service';
import {select, Store} from '@ngrx/store';
import {AppState, CurrentRegexes} from '../../../../store/states/RegexWord';
import {Observable} from 'rxjs';
import {TableSdd} from '../../models/word.model';
import {selectCurrentRegexes, selectTable} from '../../../../store/reducer/reducer';
import {initialLoad} from '../../../../store/actions/table.actions';
import {LineModel} from '../../models/line.model';

@Component({
  selector: 'app-tableau-regex',
  standalone: true,
  imports: [
    AsyncPipe,
    ColoriseSpacialCharComponent,
    DatePipe,
    NgClass,
  ],
  templateUrl: './tableau-regex.component.html',
  styleUrl: './tableau-regex.component.scss'
})
export class TableauRegexComponent implements OnInit {
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
