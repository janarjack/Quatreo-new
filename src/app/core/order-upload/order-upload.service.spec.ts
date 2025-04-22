import { TestBed } from '@angular/core/testing';

import { OrderUploadService } from './order-upload.service';

describe('OrderUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderUploadService = TestBed.get(OrderUploadService);
    expect(service).toBeTruthy();
  });
});
