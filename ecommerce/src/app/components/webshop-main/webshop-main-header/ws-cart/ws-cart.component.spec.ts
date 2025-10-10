import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsCartComponent } from './ws-cart.component';

describe('WsCartComponent', () => {
  let component: WsCartComponent;
  let fixture: ComponentFixture<WsCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WsCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
