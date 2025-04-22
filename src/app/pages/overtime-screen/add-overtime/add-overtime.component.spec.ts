import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOvertimeComponent } from './add-overtime.component';

describe('AddOvertimeComponent', () => {
  let component: AddOvertimeComponent;
  let fixture: ComponentFixture<AddOvertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOvertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
