import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarEntidadesComponent } from './filtrar-entidades.component';

describe('FiltrarEntidadesComponent', () => {
  let component: FiltrarEntidadesComponent;
  let fixture: ComponentFixture<FiltrarEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrarEntidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltrarEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
