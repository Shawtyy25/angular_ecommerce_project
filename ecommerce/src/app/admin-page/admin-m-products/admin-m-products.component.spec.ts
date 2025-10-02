import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMProductsComponent } from './admin-m-products.component';

describe('AdminMProductsComponent', () => {
  let component: AdminMProductsComponent;
  let fixture: ComponentFixture<AdminMProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
