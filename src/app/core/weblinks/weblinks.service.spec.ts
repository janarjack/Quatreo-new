import { TestBed } from '@angular/core/testing';

import { WeblinksService } from './weblinks.service';

describe('WeblinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeblinksService = TestBed.get(WeblinksService);
    expect(service).toBeTruthy();
  });
});
