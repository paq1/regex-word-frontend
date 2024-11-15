import {Component, HostListener, OnInit} from '@angular/core';
import {LineModel} from '../../models/line.model';
import {AsyncPipe, NgClass} from '@angular/common';
import {WordSdd} from '../../models/word.model';
import {WordUpdateService} from '../../services/word.update.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {initialLoad, keyupLetter} from '../../store/actions/table.actions';
import {AppState} from '../../store/states/RegexWord';
import {StoreManagerService} from '../../services/store-manager.service';


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

  constructor(private wordUpdateService: WordUpdateService, private readonly store: Store<AppState>, private readonly storeManagerService: StoreManagerService) {
  }

  get getTable$(): Observable<WordSdd> {
    return this.storeManagerService.currentState$;
  }

  ngOnInit(): void {
    this.store.dispatch(initialLoad());
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.wordUpdateService.mutateWords(event.key);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent() {
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
