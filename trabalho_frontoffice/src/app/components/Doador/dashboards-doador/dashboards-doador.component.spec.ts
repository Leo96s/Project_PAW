import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsDoadorComponent } from './dashboards-doador.component';

describe('DashboardsDoadorComponent', () => {
  let component: DashboardsDoadorComponent;
  let fixture: ComponentFixture<DashboardsDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsDoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardsDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
