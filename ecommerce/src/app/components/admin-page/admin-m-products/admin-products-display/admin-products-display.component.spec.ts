import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsDisplayComponent } from './admin-products-display.component';

describe('AdminProductsDisplayComponent', () => {
  let component: AdminProductsDisplayComponent;
  let fixture: ComponentFixture<AdminProductsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
