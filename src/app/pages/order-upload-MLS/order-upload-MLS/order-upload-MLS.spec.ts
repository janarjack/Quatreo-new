import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUploadMLSComponent } from './order-upload-MLS.component';

describe('BulkOrdersListComponent', () => {
  let component: OrderUploadMLSComponent;
  let fixture: ComponentFixture<OrderUploadMLSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUploadMLSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUploadMLSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
