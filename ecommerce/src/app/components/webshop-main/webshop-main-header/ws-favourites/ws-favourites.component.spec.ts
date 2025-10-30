import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsFavouritesComponent } from './ws-favourites.component';

describe('WsFavouritesComponent', () => {
  let component: WsFavouritesComponent;
  let fixture: ComponentFixture<WsFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WsFavouritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
