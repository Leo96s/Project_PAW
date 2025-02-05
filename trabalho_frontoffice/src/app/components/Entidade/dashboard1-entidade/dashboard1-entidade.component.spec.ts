import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard1EntidadeComponent } from './dashboard1-entidade.component';

describe('Dashboard1EntidadeComponent', () => {
  let component: Dashboard1EntidadeComponent;
  let fixture: ComponentFixture<Dashboard1EntidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard1EntidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Dashboard1EntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
