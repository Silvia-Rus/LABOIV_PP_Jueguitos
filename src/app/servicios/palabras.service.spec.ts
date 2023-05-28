/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PalabrasService } from './palabras.service';

describe('Service: Palabras', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PalabrasService]
    });
  });

  it('should ...', inject([PalabrasService], (service: PalabrasService) => {
    expect(service).toBeTruthy();
  }));
});
