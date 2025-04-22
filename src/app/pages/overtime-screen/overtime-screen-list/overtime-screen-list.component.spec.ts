import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeScreenListComponent } from './overtime-screen-list.component';

describe('OvertimeScreenListComponent', () => {
  let component: OvertimeScreenListComponent;
  let fixture: ComponentFixture<OvertimeScreenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeScreenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeScreenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
