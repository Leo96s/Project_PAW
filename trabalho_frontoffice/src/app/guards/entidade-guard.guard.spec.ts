import { TestBed } from '@angular/core/testing';

import { EntidadeGuard } from './entidade-guard.guard';

describe('EntidadeGuard', () => {
  let guard: EntidadeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EntidadeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
