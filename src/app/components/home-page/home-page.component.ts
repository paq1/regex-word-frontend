import {Component, HostListener, OnInit} from '@angular/core';
import {LineModel} from '../../models/line.model';
import {AsyncPipe, NgClass} from '@angular/common';
import {WordSdd} from '../../models/word.model';
import {WordUpdateService} from '../../services/word.update.service';
import {Store} from '@ngrx/store';
import {AppState, Table} from '../../store/states/RegexWord';
import {Observable, tap} from 'rxjs';
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


  constructor(private wordUpdateService: WordUpdateService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(initialLoad());
    console.log('dispatcher')
  }

  get wordsSdd$(): Observable<WordSdd> {
    console.log("loaddd")
    return this.store.select('table').pipe(tap(data => console.log(data)));
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
