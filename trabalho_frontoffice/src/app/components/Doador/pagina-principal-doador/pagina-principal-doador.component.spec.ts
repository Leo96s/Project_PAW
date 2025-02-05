import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipalDoadorComponent } from './pagina-principal-doador.component';

describe('PaginaPrincipalDoadorComponent', () => {
  let component: PaginaPrincipalDoadorComponent;
  let fixture: ComponentFixture<PaginaPrincipalDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaPrincipalDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaPrincipalDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
