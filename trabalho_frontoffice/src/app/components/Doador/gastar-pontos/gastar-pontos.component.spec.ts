import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastarPontosComponent } from './gastar-pontos.component';

describe('GastarPontosComponent', () => {
  let component: GastarPontosComponent;
  let fixture: ComponentFixture<GastarPontosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastarPontosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastarPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
