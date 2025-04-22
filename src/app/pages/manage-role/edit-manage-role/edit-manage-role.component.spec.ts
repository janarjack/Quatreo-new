import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManageRoleComponent } from './edit-manage-role.component';

describe('EditManageRoleComponent', () => {
  let component: EditManageRoleComponent;
  let fixture: ComponentFixture<EditManageRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditManageRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditManageRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
