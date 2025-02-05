import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesDoadorComponent } from './informacoes-doador.component';

describe('InformacoesDoadorComponent', () => {
  let component: InformacoesDoadorComponent;
  let fixture: ComponentFixture<InformacoesDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacoesDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacoesDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
