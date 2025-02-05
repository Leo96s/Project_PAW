import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard3DoadorComponent } from './dashboard3-doador.component';

describe('Dashboard3DoadorComponent', () => {
  let component: Dashboard3DoadorComponent;
  let fixture: ComponentFixture<Dashboard3DoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard3DoadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Dashboard3DoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
