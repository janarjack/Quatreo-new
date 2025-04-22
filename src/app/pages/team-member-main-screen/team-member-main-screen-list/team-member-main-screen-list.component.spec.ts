import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberMainScreenListComponent } from './team-member-main-screen-list.component';

describe('TeamMemberMainScreenListComponent', () => {
  let component: TeamMemberMainScreenListComponent;
  let fixture: ComponentFixture<TeamMemberMainScreenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberMainScreenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberMainScreenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
