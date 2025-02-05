import { TestBed } from '@angular/core/testing';

import { DoadorGuard } from './doador-guard.guard'; 

describe('DoadorGuard', () => {
  let guard: DoadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
