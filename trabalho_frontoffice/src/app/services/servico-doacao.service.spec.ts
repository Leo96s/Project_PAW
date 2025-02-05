import { TestBed } from '@angular/core/testing';

import { ServicoDoacaoService } from './servico-doacao.service';

describe('ServicoDoacaoService', () => {
  let service: ServicoDoacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoDoacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
