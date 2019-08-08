import { TestBed } from '@angular/core/testing';

import { Demoa00100Service } from './demoa00100.service';

describe('Demoa00100Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Demoa00100Service = TestBed.get(Demoa00100Service);
    expect(service).toBeTruthy();
  });
});
