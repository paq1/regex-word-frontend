import { TestBed } from '@angular/core/testing';

import { RegexStorageService } from './regex-storage.service';

describe('RegexStorageService', () => {
  let service: RegexStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
