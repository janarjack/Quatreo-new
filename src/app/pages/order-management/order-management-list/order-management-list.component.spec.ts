import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagementListComponent } from './order-management-list.component';

describe('OrderManagementListComponent', () => {
  let component: OrderManagementListComponent;
  let fixture: ComponentFixture<OrderManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
