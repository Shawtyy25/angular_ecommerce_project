import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCategoryComponent } from './modify-category.component';

describe('ModifyCategoryComponent', () => {
  let component: ModifyCategoryComponent;
  let fixture: ComponentFixture<ModifyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
