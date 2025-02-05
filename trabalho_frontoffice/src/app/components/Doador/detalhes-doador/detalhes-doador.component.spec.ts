import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDoadorComponent } from './detalhes-doador.component';

describe('DetalhesDoadorComponent', () => {
  let component: DetalhesDoadorComponent;
  let fixture: ComponentFixture<DetalhesDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
