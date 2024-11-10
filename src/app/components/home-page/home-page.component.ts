import {Component, HostListener} from '@angular/core';
import {LineModel} from '../../models/line.model';
import {NgClass} from '@angular/common';
import {WordSdd} from '../../models/word.model';
import {WordUpdateService} from '../../services/word.update.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {


  constructor(private wordUpdateService: WordUpdateService) {
  }

  get wordsSdd(): WordSdd {
    return this.wordUpdateService.wordsSdd;
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
