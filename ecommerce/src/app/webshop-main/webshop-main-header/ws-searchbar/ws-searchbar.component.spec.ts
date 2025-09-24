import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsSearchbarComponent } from './ws-searchbar.component';

describe('WsSearchbarComponent', () => {
  let component: WsSearchbarComponent;
  let fixture: ComponentFixture<WsSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WsSearchbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
