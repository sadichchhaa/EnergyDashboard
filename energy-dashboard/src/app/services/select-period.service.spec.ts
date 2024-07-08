import { TestBed } from '@angular/core/testing';

import { SelectPeriodService } from '../select-period.service';

describe('SelectPeriodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectPeriodService = TestBed.get(SelectPeriodService);
    expect(service).toBeTruthy();
  });
});
