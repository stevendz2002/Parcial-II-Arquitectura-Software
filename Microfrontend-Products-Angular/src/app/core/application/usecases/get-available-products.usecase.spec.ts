import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAvailableProductsUseCase } from './get-available-products.usecase';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';

describe('GetAvailableProductsUseCase', () => {
  let useCase: GetAvailableProductsUseCase;
  let mockRepository: jest.Mocked<ProductRepository>;

  const availableProducts = PRODUCTS_MOCK.filter((p) => p.available === true);

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      getAvailable: jest.fn(),
      getFeatured: jest.fn(),
    } as unknown as jest.Mocked<ProductRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetAvailableProductsUseCase,
        {
          provide: ProductRepository,
          useValue: mockRepository,
        },
      ],
    });

    useCase = TestBed.inject(GetAvailableProductsUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debería delegar a productRepository.getAvailable() y retornar los productos con stock', (done) => {
    mockRepository.getAvailable.mockReturnValue(of(availableProducts));

    useCase.execute().subscribe({
      next: (products) => {
        expect(products).toEqual(availableProducts);
        expect(mockRepository.getAvailable).toHaveBeenCalledTimes(1);
        done();
      },
      error: done.fail,
    });
  });

  it('debería propagar el error cuando productRepository.getAvailable() falla', (done) => {
    const errorResponse = new Error('Error al consultar productos disponibles');
    mockRepository.getAvailable.mockReturnValue(throwError(() => errorResponse));

    useCase.execute().subscribe({
      next: () => done.fail('Se esperaba un error'),
      error: (error) => {
        expect(error).toBe(errorResponse);
        expect(mockRepository.getAvailable).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });
});
