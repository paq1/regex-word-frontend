import {Component, HostListener, OnInit} from '@angular/core';
import {AsyncPipe, NgClass} from "@angular/common";
import {KeypressedHandlerService} from '../../../services/keypressed-handler.service';
import {select, Store} from '@ngrx/store';
import {RegexWordState} from '../../../store/states/RegexWord';
import {Observable} from 'rxjs';
import {TableSdd} from '../../../models/word.model';
import {selectTable} from '../../../store/reducer/reducer';
import {initialLoad} from '../../../store/actions/table.actions';
import {LineModel} from '../../../models/line.model';

@Component({
  selector: 'app-table-input',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass
  ],
  templateUrl: './table-input.component.html',
  styleUrl: './table-input.component.scss'
})
export class TableInputComponent implements OnInit {

  constructor(private wordUpdateService: KeypressedHandlerService, private readonly store: Store<RegexWordState>) {
  }

  get getTable$(): Observable<TableSdd> {
    return this.store.pipe(select(state => selectTable(state)))
  }

  ngOnInit(): void {
    this.store.dispatch(initialLoad());
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.wordUpdateService.onKeyPressed(event.key);
  }

  isSucceededTable(table: TableSdd): boolean {
    return !!table.words.find(lineModel => this.isSucceeded(lineModel))
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
