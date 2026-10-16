import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductNodeRepositoryImpl } from './product-node.repository.impl';
import { DataService } from '../../services/data.service';
import { PRODUCTS_MOCK } from '../../../../mocks/products.mocks';
import { environment } from '../../../../../environments/environment';

describe('ProductNodeRepositoryImpl', () => {
  let repository: ProductNodeRepositoryImpl;
  let mockDataService: jest.Mocked<DataService>;
  const baseUrl = `${environment.apiUrlNode}/products`;

  beforeEach(() => {
    mockDataService = {
      getAll: jest.fn(),
    } as unknown as jest.Mocked<DataService>;

    TestBed.configureTestingModule({
      providers: [
        ProductNodeRepositoryImpl,
        {
          provide: DataService,
          useValue: mockDataService,
        },
      ],
    });

    repository = TestBed.inject(ProductNodeRepositoryImpl);
  });

  it('debería crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  describe('getAll', () => {
    it('debería consultar el endpoint base de Node.js y retornar los productos', (done) => {
      mockDataService.getAll.mockReturnValue(of(PRODUCTS_MOCK));

      repository.getAll().subscribe({
        next: (products) => {
          expect(products).toEqual(PRODUCTS_MOCK);
          expect(mockDataService.getAll).toHaveBeenCalledWith(baseUrl);
          done();
        },
        error: done.fail,
      });
    });

    it('debería propagar error cuando el microservicio de Node.js falla en getAll', (done) => {
      const error = new Error('Fallo de red en Node');
      mockDataService.getAll.mockReturnValue(throwError(() => error));

      repository.getAll().subscribe({
        next: () => done.fail('Se esperaba error'),
        error: (err) => {
          expect(err).toBe(error);
          done();
        },
      });
    });
  });

  describe('getAvailable', () => {
    it('debería consultar el endpoint /available de Node.js y retornar los productos', (done) => {
      const available = PRODUCTS_MOCK.filter((p) => p.available);
      mockDataService.getAll.mockReturnValue(of(available));

      repository.getAvailable().subscribe({
        next: (products) => {
          expect(products).toEqual(available);
          expect(mockDataService.getAll).toHaveBeenCalledWith(`${baseUrl}/available`);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('getFeatured', () => {
    it('debería consultar el endpoint /featured de Node.js y retornar los productos', (done) => {
      const featured = PRODUCTS_MOCK.filter((p) => p.featured);
      mockDataService.getAll.mockReturnValue(of(featured));

      repository.getFeatured().subscribe({
        next: (products) => {
          expect(products).toEqual(featured);
          expect(mockDataService.getAll).toHaveBeenCalledWith(`${baseUrl}/featured`);
          done();
        },
        error: done.fail,
      });
    });
  });
});
