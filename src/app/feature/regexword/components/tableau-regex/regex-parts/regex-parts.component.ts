import {Component, Input} from '@angular/core';
import {AsyncPipe, DatePipe, NgClass} from "@angular/common";
import {
  ColoriseSpacialCharComponent
} from "../../../../../shared/colorise-spacial-char/colorise-spacial-char.component";
import {Observable} from 'rxjs';
import {CurrentRegexes, RegexWordState} from '../../../store/states/RegexWord';
import {select, Store} from '@ngrx/store';
import {selectCurrentRegexes} from '../../../store/reducer/reducer';

@Component({
  selector: 'app-regex-parts',
  standalone: true,
  imports: [
    AsyncPipe,
    ColoriseSpacialCharComponent,
    DatePipe,
    NgClass
  ],
  templateUrl: './regex-parts.component.html',
  styleUrl: './regex-parts.component.scss'
})
export class RegexPartsComponent {

  constructor(private readonly store: Store<RegexWordState>) {}

  @Input() isBoomerMode: boolean = false;

  protected readonly Array = Array;

  get regexes$(): Observable<CurrentRegexes> {
    return this.store.pipe(select(state => selectCurrentRegexes(state)))
  }
}
