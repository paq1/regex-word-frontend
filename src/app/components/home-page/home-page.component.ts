import {Component} from '@angular/core';
import {LineModel} from '../../models/line.model';
import {NgClass} from '@angular/common';

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

  isSucceeded(word: LineModel): boolean { return word.isSucceeded || false; };
  isFailed(word: LineModel): boolean { return (!word.isSucceeded && word.isSucceeded !== undefined); };
  isNothing(word: LineModel): boolean { return word.isSucceeded === undefined; };

}
