import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard2EntidadeComponent } from './dashboard2-entidade.component';

describe('Dashboard2EntidadeComponent', () => {
  let component: Dashboard2EntidadeComponent;
  let fixture: ComponentFixture<Dashboard2EntidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard2EntidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Dashboard2EntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
