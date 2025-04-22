import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAuditListComponent } from './pending-audit-list.component';

describe('PendingAuditListComponent', () => {
  let component: PendingAuditListComponent;
  let fixture: ComponentFixture<PendingAuditListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingAuditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAuditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
