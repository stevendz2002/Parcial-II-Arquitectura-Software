import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllProductsUseCase } from './get-all-products.usecase';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';

describe('GetAllProductsUseCase', () => {
  let useCase: GetAllProductsUseCase;
  let mockRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      getAvailable: jest.fn(),
      getFeatured: jest.fn(),
    } as unknown as jest.Mocked<ProductRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetAllProductsUseCase,
        {
          provide: ProductRepository,
          useValue: mockRepository,
        },
      ],
    });

    useCase = TestBed.inject(GetAllProductsUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debería delegar la consulta a productRepository.getAll() y retornar todos los productos', (done) => {
    mockRepository.getAll.mockReturnValue(of(PRODUCTS_MOCK));

    useCase.execute().subscribe({
      next: (products) => {
        expect(products).toEqual(PRODUCTS_MOCK);
        expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        done();
      },
      error: done.fail,
    });
  });

  it('debería propagar el error cuando productRepository.getAll() falla', (done) => {
    const errorResponse = new Error('Error al consultar productos');
    mockRepository.getAll.mockReturnValue(throwError(() => errorResponse));

    useCase.execute().subscribe({
      next: () => done.fail('Se esperaba un error'),
      error: (error) => {
        expect(error).toBe(errorResponse);
        expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });
});
