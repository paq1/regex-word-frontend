import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoriseSpacialCharComponent } from './colorise-spacial-char.component';

describe('ColoriseSpacialCharComponent', () => {
  let component: ColoriseSpacialCharComponent;
  let fixture: ComponentFixture<ColoriseSpacialCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoriseSpacialCharComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoriseSpacialCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
