import { TestBed } from '@angular/core/testing';

import { BulkOrdersService } from './bulk-orders.service';

describe('BulkOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BulkOrdersService = TestBed.get(BulkOrdersService);
    expect(service).toBeTruthy();
  });
});
