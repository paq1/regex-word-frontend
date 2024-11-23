import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-colorise-spacial-char',
  standalone: true,
  imports: [],
  templateUrl: './colorise-spacial-char.component.html',
  styleUrl: './colorise-spacial-char.component.scss'
})
export class ColoriseSpacialCharComponent {
  @Input() regex!: string | undefined;

  constructor() {}

  isSpecialChar(letter: string): boolean {
    return "+-/[]|(){}".includes(letter.toLowerCase())
  }

}
