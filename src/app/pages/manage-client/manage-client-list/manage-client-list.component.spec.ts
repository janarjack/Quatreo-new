import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClientListComponent } from './manage-client-list.component';

describe('ManageClientListComponent', () => {
  let component: ManageClientListComponent;
  let fixture: ComponentFixture<ManageClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageClientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
