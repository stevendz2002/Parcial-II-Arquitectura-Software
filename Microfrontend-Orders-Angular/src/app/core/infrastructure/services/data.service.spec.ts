import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe instanciarse correctamente', () => {
    expect(service).toBeTruthy();
    expect(service).toBeInstanceOf(DataService);
  });

  it('debe ejecutar una petición GET exitosa retornando los datos esperados', (done) => {
    const url = 'http://localhost:3002/api/orders';
    const mockResponse = [{ id: '1', orderNumber: 'ORD-1001' }];

    service.getAll<typeof mockResponse>(url).subscribe({
      next: (data) => {
        expect(data).toEqual(mockResponse);
        done();
      },
      error: done.fail,
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe propagar el error HTTP cuando el servidor responda con estado de fallo', (done) => {
    const url = 'http://localhost:3002/api/orders';

    service.getAll(url).subscribe({
      next: () => done.fail('Se esperaba fallo HTTP'),
      error: (error) => {
        expect(error.status).toBe(500);
        done();
      },
    });

    const req = httpMock.expectOne(url);
    req.flush('Error de servidor', { status: 500, statusText: 'Internal Server Error' });
  });
});
