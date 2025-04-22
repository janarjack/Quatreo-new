import { TestBed } from '@angular/core/testing';

import { ManageClientService } from './manage-client.service';

describe('ManageClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageClientService = TestBed.get(ManageClientService);
    expect(service).toBeTruthy();
  });
});
