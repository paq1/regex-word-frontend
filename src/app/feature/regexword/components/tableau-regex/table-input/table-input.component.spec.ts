import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInputComponent } from './table-input.component';
import {provideStore} from '@ngrx/store';
import {KeypressedHandlerService} from '../../../services/keypressed-handler.service';
import {provideHttpClient} from '@angular/common/http';

describe('TableInputComponent', () => {
  let component: TableInputComponent;
  let fixture: ComponentFixture<TableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore(), KeypressedHandlerService, provideHttpClient()],
      imports: [TableInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
