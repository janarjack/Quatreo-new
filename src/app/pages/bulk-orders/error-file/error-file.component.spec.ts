import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFileComponent } from './error-file.component';

describe('ErrorFileComponent', () => {
  let component: ErrorFileComponent;
  let fixture: ComponentFixture<ErrorFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
