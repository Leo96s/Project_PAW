import { TestBed } from '@angular/core/testing';

import { ServicoUtilizadorService } from './servico-utilizador.service';

describe('ServicoUtilizadorService', () => {
  let service: ServicoUtilizadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoUtilizadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
