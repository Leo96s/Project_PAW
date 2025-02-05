import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarDoacaoComponent } from './registar-doacao.component';

describe('RegistarDoacaoComponent', () => {
  let component: RegistarDoacaoComponent;
  let fixture: ComponentFixture<RegistarDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistarDoacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistarDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
