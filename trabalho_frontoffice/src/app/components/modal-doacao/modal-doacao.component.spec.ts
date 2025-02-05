import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDoacaoComponent } from './modal-doacao.component';

describe('ModalDoacaoComponent', () => {
  let component: ModalDoacaoComponent;
  let fixture: ComponentFixture<ModalDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDoacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
