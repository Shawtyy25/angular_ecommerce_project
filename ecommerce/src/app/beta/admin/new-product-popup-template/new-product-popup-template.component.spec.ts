import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductPopupTemplateComponent } from './new-product-popup-template.component';

describe('NewProductPopupTemplateComponent', () => {
  let component: NewProductPopupTemplateComponent;
  let fixture: ComponentFixture<NewProductPopupTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductPopupTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductPopupTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
