import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexPartsComponent } from './regex-parts.component';
import {provideStore} from '@ngrx/store';
import {provideHttpClient} from '@angular/common/http';

describe('RegexPartsComponent', () => {
  let component: RegexPartsComponent;
  let fixture: ComponentFixture<RegexPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore(), provideHttpClient()],
      imports: [RegexPartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegexPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
