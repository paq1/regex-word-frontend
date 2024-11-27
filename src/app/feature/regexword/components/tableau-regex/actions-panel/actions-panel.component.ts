import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-actions-panel',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './actions-panel.component.html',
  styleUrl: './actions-panel.component.scss'
})
export class ActionsPanelComponent {
  isBoomerMode: boolean = false;

  @Output() isBoomerModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onBoomerMode(): void {
    this.isBoomerMode = !this.isBoomerMode;
    this.isBoomerModeChange.emit(this.isBoomerMode);
  }
}
