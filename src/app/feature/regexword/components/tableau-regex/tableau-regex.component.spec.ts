import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauRegexComponent } from './tableau-regex.component';

describe('TableauRegexComponent', () => {
  let component: TableauRegexComponent;
  let fixture: ComponentFixture<TableauRegexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
