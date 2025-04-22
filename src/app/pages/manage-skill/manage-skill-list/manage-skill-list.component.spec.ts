import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSkillListComponent } from './manage-skill-list.component';

describe('ManageSkillListComponent', () => {
  let component: ManageSkillListComponent;
  let fixture: ComponentFixture<ManageSkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSkillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
