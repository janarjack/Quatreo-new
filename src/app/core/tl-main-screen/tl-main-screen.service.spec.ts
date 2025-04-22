import { TestBed } from '@angular/core/testing';

import { TlMainScreenService } from './tl-main-screen.service';

describe('TlMainScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TlMainScreenService = TestBed.get(TlMainScreenService);
    expect(service).toBeTruthy();
  });
});
