import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebshopMainHeaderComponent } from './webshop-main-header.component';

describe('WebshopMainHeaderComponent', () => {
  let component: WebshopMainHeaderComponent;
  let fixture: ComponentFixture<WebshopMainHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebshopMainHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebshopMainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
