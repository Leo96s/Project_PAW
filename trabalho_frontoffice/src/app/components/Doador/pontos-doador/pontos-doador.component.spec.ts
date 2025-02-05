import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PontosDoadorComponent } from './pontos-doador.component';

describe('PontosDoadorComponent', () => {
  let component: PontosDoadorComponent;
  let fixture: ComponentFixture<PontosDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PontosDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PontosDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
