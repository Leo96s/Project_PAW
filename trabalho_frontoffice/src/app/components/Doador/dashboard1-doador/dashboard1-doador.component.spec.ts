import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard1DoadorComponent } from './dashboard1-doador.component';

describe('Dashboard1DoadorComponent', () => {
  let component: Dashboard1DoadorComponent;
  let fixture: ComponentFixture<Dashboard1DoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard1DoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Dashboard1DoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
