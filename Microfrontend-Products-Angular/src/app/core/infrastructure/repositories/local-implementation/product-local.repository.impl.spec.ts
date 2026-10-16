import { TestBed } from '@angular/core/testing';
import { ProductLocalRepositoryImpl } from './product-local.repository.impl';
import { PRODUCTS_MOCK } from '../../../../mocks/products.mocks';

describe('ProductLocalRepositoryImpl', () => {
  let repository: ProductLocalRepositoryImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductLocalRepositoryImpl],
    });

    repository = TestBed.inject(ProductLocalRepositoryImpl);
  });

  it('debería crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debería retornar todos los productos desde PRODUCTS_MOCK con getAll()', (done) => {
    repository.getAll().subscribe({
      next: (products) => {
        expect(products).toEqual(PRODUCTS_MOCK);
        expect(products.length).toBe(PRODUCTS_MOCK.length);
        done();
      },
      error: done.fail,
    });
  });

  it('debería filtrar y retornar únicamente productos con available === true con getAvailable()', (done) => {
    const expected = PRODUCTS_MOCK.filter((p) => p.available === true);

    repository.getAvailable().subscribe({
      next: (products) => {
        expect(products).toEqual(expected);
        expect(products.every((p) => p.available === true)).toBe(true);
        done();
      },
      error: done.fail,
    });
  });

  it('debería filtrar y retornar únicamente productos con featured === true con getFeatured()', (done) => {
    const expected = PRODUCTS_MOCK.filter((p) => p.featured === true);

    repository.getFeatured().subscribe({
      next: (products) => {
        expect(products).toEqual(expected);
        expect(products.every((p) => p.featured === true)).toBe(true);
        done();
      },
      error: done.fail,
    });
  });
});
