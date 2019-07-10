import { TestBed } from '@angular/core/testing';

import { RmeService } from './rme.service';

describe('RmeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RmeService = TestBed.get(RmeService);
    expect(service).toBeTruthy();
  });
});
