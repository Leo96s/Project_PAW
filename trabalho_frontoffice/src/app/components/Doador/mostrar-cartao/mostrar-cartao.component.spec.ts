import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCartaoComponent } from './mostrar-cartao.component';

describe('MostrarCartaoComponent', () => {
  let component: MostrarCartaoComponent;
  let fixture: ComponentFixture<MostrarCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarCartaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
