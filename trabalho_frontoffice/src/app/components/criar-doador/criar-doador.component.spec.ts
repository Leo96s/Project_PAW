import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDoadorComponent } from './criar-doador.component';

describe('CriarDoadorComponent', () => {
  let component: CriarDoadorComponent;
  let fixture: ComponentFixture<CriarDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
