import { TestBed } from '@angular/core/testing';

import { ManageRoleService } from './manage-role.service';

describe('ManageRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageRoleService = TestBed.get(ManageRoleService);
    expect(service).toBeTruthy();
  });
});
