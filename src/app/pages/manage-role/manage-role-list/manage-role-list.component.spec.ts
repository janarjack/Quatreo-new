import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoleListComponent } from './manage-role-list.component';

describe('ManageRoleListComponent', () => {
  let component: ManageRoleListComponent;
  let fixture: ComponentFixture<ManageRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRoleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
