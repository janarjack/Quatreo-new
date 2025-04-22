import { TestBed } from '@angular/core/testing';

import { ManageSkillService } from './manage-skill.service';

describe('ManageSkillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageSkillService = TestBed.get(ManageSkillService);
    expect(service).toBeTruthy();
  });
});
