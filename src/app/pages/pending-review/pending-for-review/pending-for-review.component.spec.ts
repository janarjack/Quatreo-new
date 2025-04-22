import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingForReviewComponent } from './pending-for-review.component';

describe('PendingForReviewComponent', () => {
  let component: PendingForReviewComponent;
  let fixture: ComponentFixture<PendingForReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingForReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingForReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
