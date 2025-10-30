import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCardTemplateComponent } from './admin-card-template.component';

describe('AdminCardTemplateComponent', () => {
  let component: AdminCardTemplateComponent;
  let fixture: ComponentFixture<AdminCardTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCardTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
