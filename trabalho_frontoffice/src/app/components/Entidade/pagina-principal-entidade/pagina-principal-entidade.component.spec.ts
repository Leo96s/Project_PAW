import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipalEntidadeComponent } from './pagina-principal-entidade.component';

describe('PaginaPrincipalEntidadeComponent', () => {
  let component: PaginaPrincipalEntidadeComponent;
  let fixture: ComponentFixture<PaginaPrincipalEntidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaPrincipalEntidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaPrincipalEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
