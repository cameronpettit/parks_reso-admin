import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

import { ReservationService } from './reservation.service';
import { LoggerService } from './logger.service';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient, HttpHandler, ConfigService, LoggerService
      ]
    });
    service = TestBed.inject(ReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
