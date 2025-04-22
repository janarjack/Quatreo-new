import { TestBed } from '@angular/core/testing';

import { OvertimeScreenService } from './overtime-screen.service';

describe('OvertimeScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OvertimeScreenService = TestBed.get(OvertimeScreenService);
    expect(service).toBeTruthy();
  });
});
