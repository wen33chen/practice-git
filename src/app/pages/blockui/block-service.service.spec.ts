import { TestBed } from '@angular/core/testing';

import { BlockServiceService } from './block-service.service';

describe('BlockServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockServiceService = TestBed.get(BlockServiceService);
    expect(service).toBeTruthy();
  });
});
