import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { USERS_MOCK } from '../../../mocks/users.mocks';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request and return data', (done) => {
    const testUrl = 'http://localhost:8081/api/users';
    service.getAll(testUrl).subscribe((res) => {
      expect(res).toEqual(USERS_MOCK);
      done();
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('GET');
    req.flush(USERS_MOCK);
  });
});
