import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesEntidadeComponent } from './detalhes-entidade.component';

describe('DetalhesEntidadeComponent', () => {
  let component: DetalhesEntidadeComponent;
  let fixture: ComponentFixture<DetalhesEntidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesEntidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
