import { TestBed } from '@angular/core/testing';

import { EntidadePendenteGuard } from './entidade-pendente.guard'; 

describe('EntidadePendenteGuard', () => {
  let guard: EntidadePendenteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EntidadePendenteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
