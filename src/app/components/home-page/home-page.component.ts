import {AfterViewInit, Component, ElementRef, HostListener, Inject} from '@angular/core';
import {LineModel} from '../../models/line.model';
import {DOCUMENT, NgClass} from '@angular/common';

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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // TODO : mettre la logique ici
    console.log(event.key);
  }

  words: LineModel[] = [
    {
      word: "A_____"
    },
    {
      word: "A_____",
      isSucceeded: false
    },
    {
      word: "A_____",
      isSucceeded: true
    },
    {
      word: "A_____",
      isSucceeded: false
    },
    {
      word: "A_____",
      isSucceeded: true
    },
    {
      word: "A_____"
    },
  ]

  isSucceeded(word: LineModel): boolean {
    return word.isSucceeded || false;
  };

  isFailed(word: LineModel): boolean {
    return (!word.isSucceeded && word.isSucceeded !== undefined);
  };

  isNothing(word: LineModel): boolean {
    return word.isSucceeded === undefined;
  };

}
