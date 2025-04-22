import { TestBed } from '@angular/core/testing';

import { ActivityLogService } from './activity-log.service';

describe('ActivityLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityLogService = TestBed.get(ActivityLogService);
    expect(service).toBeTruthy();
  });
});
