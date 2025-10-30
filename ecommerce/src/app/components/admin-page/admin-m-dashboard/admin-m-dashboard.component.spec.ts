import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMDashboardComponent } from './admin-m-dashboard.component';

describe('AdminMDashboardComponent', () => {
  let component: AdminMDashboardComponent;
  let fixture: ComponentFixture<AdminMDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
