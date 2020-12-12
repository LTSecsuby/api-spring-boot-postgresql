import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationBarComponent } from './authorization-bar.component';

describe('ContentsComponent', () => {
  let component: AuthorizationBarComponent;
  let fixture: ComponentFixture<AuthorizationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
