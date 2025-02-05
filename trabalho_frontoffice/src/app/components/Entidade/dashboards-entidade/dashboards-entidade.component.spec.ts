import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsEntidadeComponent } from './dashboards-entidade.component';

describe('DashboardsEntidadeComponent', () => {
  let component: DashboardsEntidadeComponent;
  let fixture: ComponentFixture<DashboardsEntidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsEntidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardsEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
