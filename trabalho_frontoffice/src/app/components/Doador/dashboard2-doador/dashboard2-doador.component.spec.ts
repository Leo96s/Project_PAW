import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard2DoadorComponent } from './dashboard2-doador.component';

describe('Dashboard2DoadorComponent', () => {
  let component: Dashboard2DoadorComponent;
  let fixture: ComponentFixture<Dashboard2DoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard2DoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Dashboard2DoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
