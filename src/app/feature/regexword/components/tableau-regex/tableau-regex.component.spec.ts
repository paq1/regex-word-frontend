import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauRegexComponent } from './tableau-regex.component';
import {provideStore} from '@ngrx/store';
import {KeypressedHandlerService} from '../../services/keypressed-handler.service';
import {provideHttpClient} from '@angular/common/http';

describe('TableauRegexComponent', () => {
  let component: TableauRegexComponent;
  let fixture: ComponentFixture<TableauRegexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore(), KeypressedHandlerService, provideHttpClient()],
      imports: [TableauRegexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauRegexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
