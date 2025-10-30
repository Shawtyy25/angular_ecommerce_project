import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsProfileComponent } from './ws-profile.component';

describe('WsProfileComponent', () => {
  let component: WsProfileComponent;
  let fixture: ComponentFixture<WsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WsProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
