import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebshopMainComponent } from './webshop-main.component';

describe('WebshopMainComponent', () => {
  let component: WebshopMainComponent;
  let fixture: ComponentFixture<WebshopMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebshopMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebshopMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
