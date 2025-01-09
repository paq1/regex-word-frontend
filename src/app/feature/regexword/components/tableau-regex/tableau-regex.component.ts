import {Component} from '@angular/core';
import {RegexPartsComponent} from './regex-parts/regex-parts.component';
import {TableInputComponent} from './table-input/table-input.component';
import {ActionsPanelComponent} from './actions-panel/actions-panel.component';
import {EnvironmentService} from '../../../../core/environment/environment.service';

@Component({
  selector: 'app-tableau-regex',
  standalone: true,
  imports: [
    RegexPartsComponent,
    TableInputComponent,
    ActionsPanelComponent,
  ],
  templateUrl: './tableau-regex.component.html',
  styleUrl: './tableau-regex.component.scss'
})
export class TableauRegexComponent {

  isBoomerMode: boolean = false;

  onBoomerMode($event: boolean): void {
    this.isBoomerMode = $event;
  }

  constructor(private readonly environmentService: EnvironmentService) {
    console.log(`environment variable : ${environmentService.testVar}`);
  }

  protected readonly Array = Array;
}
