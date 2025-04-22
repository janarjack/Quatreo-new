import { TestBed } from '@angular/core/testing';

import { QualityAuditService } from './quality-audit.service';

describe('QualityAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QualityAuditService = TestBed.get(QualityAuditService);
    expect(service).toBeTruthy();
  });
});
