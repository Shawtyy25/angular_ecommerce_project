import { TestBed } from '@angular/core/testing';

import { MainLogoutService } from './main.logout.service';

describe('MainLogoutService', () => {
  let service: MainLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
