import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetFeaturedProductsUseCase } from './get-featured-products.usecase';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';

describe('GetFeaturedProductsUseCase', () => {
  let useCase: GetFeaturedProductsUseCase;
  let mockRepository: jest.Mocked<ProductRepository>;

  const featuredProducts = PRODUCTS_MOCK.filter((p) => p.featured === true);

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      getAvailable: jest.fn(),
      getFeatured: jest.fn(),
    } as unknown as jest.Mocked<ProductRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetFeaturedProductsUseCase,
        {
          provide: ProductRepository,
          useValue: mockRepository,
        },
      ],
    });

    useCase = TestBed.inject(GetFeaturedProductsUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debería delegar a productRepository.getFeatured() y retornar los productos destacados', (done) => {
    mockRepository.getFeatured.mockReturnValue(of(featuredProducts));

    useCase.execute().subscribe({
      next: (products) => {
        expect(products).toEqual(featuredProducts);
        expect(mockRepository.getFeatured).toHaveBeenCalledTimes(1);
        done();
      },
      error: done.fail,
    });
  });

  it('debería propagar el error cuando productRepository.getFeatured() falla', (done) => {
    const errorResponse = new Error('Error al consultar productos destacados');
    mockRepository.getFeatured.mockReturnValue(throwError(() => errorResponse));

    useCase.execute().subscribe({
      next: () => done.fail('Se esperaba un error'),
      error: (error) => {
        expect(error).toBe(errorResponse);
        expect(mockRepository.getFeatured).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });
});
