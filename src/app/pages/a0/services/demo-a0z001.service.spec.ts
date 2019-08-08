import { TestBed } from '@angular/core/testing';

import { DemoA0Z001Service } from './demo-a0z001.service';

describe('DemoA0z001Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemoA0Z001Service = TestBed.get(DemoA0Z001Service);
    expect(service).toBeTruthy();
  });
});
