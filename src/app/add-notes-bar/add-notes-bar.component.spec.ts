import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotesBarComponent } from './add-notes-bar.component';

describe('AddNotesBarComponent', () => {
  let component: AddNotesBarComponent;
  let fixture: ComponentFixture<AddNotesBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNotesBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
