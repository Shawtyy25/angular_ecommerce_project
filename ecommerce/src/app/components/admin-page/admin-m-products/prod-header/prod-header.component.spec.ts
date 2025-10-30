import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdHeaderComponent } from './prod-header.component';

describe('ProdHeaderComponent', () => {
  let component: ProdHeaderComponent;
  let fixture: ComponentFixture<ProdHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
