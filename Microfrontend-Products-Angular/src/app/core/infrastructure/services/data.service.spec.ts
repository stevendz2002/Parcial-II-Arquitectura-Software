import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería ejecutar una petición GET hacia la URL provista y devolver la respuesta tipada', (done) => {
    const testUrl = 'http://localhost:3001/api/products';
    const mockData = [{ id: '1', name: 'Producto Prueba' }];

    service.getAll<typeof mockData>(testUrl).subscribe({
      next: (response) => {
        expect(response).toEqual(mockData);
        done();
      },
      error: done.fail,
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('debería propagar errores HTTP cuando la petición falla', (done) => {
    const testUrl = 'http://localhost:3001/api/products';

    service.getAll(testUrl).subscribe({
      next: () => done.fail('Se esperaba que fallara'),
      error: (error) => {
        expect(error.status).toBe(500);
        done();
      },
    });

    const req = httpTestingController.expectOne(testUrl);
    req.flush('Error de servidor', { status: 500, statusText: 'Internal Server Error' });
  });
});
