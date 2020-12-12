import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsDialogOpenComponent } from './contents-dialog-open.component';

describe('ContentsComponent', () => {
  let component: ContentsDialogOpenComponent;
  let fixture: ComponentFixture<ContentsDialogOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsDialogOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsDialogOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
