import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoPendenteComponent } from './estado-pendente.component';

describe('EstadoPendenteComponent', () => {
  let component: EstadoPendenteComponent;
  let fixture: ComponentFixture<EstadoPendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoPendenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadoPendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
