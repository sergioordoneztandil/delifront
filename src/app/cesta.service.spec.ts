import { TestBed } from '@angular/core/testing';

import { CestaService } from './cesta.service';

describe('CestaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CestaService = TestBed.get(CestaService);
    expect(service).toBeTruthy();
  });
});
