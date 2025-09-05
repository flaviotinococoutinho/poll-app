import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

import { PollService } from './poll.service';

describe('PollService', () => {
  let service: PollService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PollService]
    });

    service = TestBed.inject(PollService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call findAllPagedAuth with correct url', () => {
    service.findAllPagedAuth(1).subscribe();

    const req = httpMock.expectOne(environment.apiUrl + '/api/poll/authorized?page=1&size=4');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
