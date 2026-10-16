import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductsPage } from './products.page';
import { GetAllProductsUseCase } from '../../../core/application/usecases/get-all-products.usecase';
import { GetAvailableProductsUseCase } from '../../../core/application/usecases/get-available-products.usecase';
import { GetFeaturedProductsUseCase } from '../../../core/application/usecases/get-featured-products.usecase';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;

  let mockGetAllProductsUseCase: jest.Mocked<GetAllProductsUseCase>;
  let mockGetAvailableProductsUseCase: jest.Mocked<GetAvailableProductsUseCase>;
  let mockGetFeaturedProductsUseCase: jest.Mocked<GetFeaturedProductsUseCase>;

  beforeEach(async () => {
    mockGetAllProductsUseCase = {
      execute: jest.fn().mockReturnValue(of(PRODUCTS_MOCK)),
    } as unknown as jest.Mocked<GetAllProductsUseCase>;

    mockGetAvailableProductsUseCase = {
      execute: jest.fn().mockReturnValue(of(PRODUCTS_MOCK.filter((p) => p.available))),
    } as unknown as jest.Mocked<GetAvailableProductsUseCase>;

    mockGetFeaturedProductsUseCase = {
      execute: jest.fn().mockReturnValue(of(PRODUCTS_MOCK.filter((p) => p.featured))),
    } as unknown as jest.Mocked<GetFeaturedProductsUseCase>;

    await TestBed.configureTestingModule({
      imports: [ProductsPage],
      providers: [
        { provide: GetAllProductsUseCase, useValue: mockGetAllProductsUseCase },
        { provide: GetAvailableProductsUseCase, useValue: mockGetAvailableProductsUseCase },
        { provide: GetFeaturedProductsUseCase, useValue: mockGetFeaturedProductsUseCase },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar loadAllProducts automáticamente en ngOnInit', () => {
    const spy = jest.spyOn(component, 'loadAllProducts');
    fixture.detectChanges(); // Dispara ngOnInit

    expect(spy).toHaveBeenCalledTimes(1);
    expect(mockGetAllProductsUseCase.execute).toHaveBeenCalledTimes(1);
    expect(component.products).toEqual(PRODUCTS_MOCK);
    expect(component.state).toBe('success');
    expect(component.activeFilter).toBe('ALL');
  });

  describe('loadAllProducts', () => {
    it('debería manejar el flujo exitoso actualizando el estado a success', () => {
      mockGetAllProductsUseCase.execute.mockReturnValue(of(PRODUCTS_MOCK));

      component.loadAllProducts();

      expect(component.activeFilter).toBe('ALL');
      expect(component.state).toBe('success');
      expect(component.products).toEqual(PRODUCTS_MOCK);
    });

    it('debería manejar el flujo de error actualizando el estado a error', () => {
      mockGetAllProductsUseCase.execute.mockReturnValue(throwError(() => new Error('Error al cargar')));

      component.loadAllProducts();

      expect(component.state).toBe('error');
      expect(component.products).toEqual([]);
      expect(component.errorMessage).toBe('Ocurrió un error al cargar todos los productos.');
    });
  });

  describe('loadAvailableProducts', () => {
    it('debería consultar GetAvailableProductsUseCase y actualizar a success', () => {
      const available = PRODUCTS_MOCK.filter((p) => p.available);
      mockGetAvailableProductsUseCase.execute.mockReturnValue(of(available));

      component.loadAvailableProducts();

      expect(component.activeFilter).toBe('AVAILABLE');
      expect(component.state).toBe('success');
      expect(component.products).toEqual(available);
      expect(mockGetAvailableProductsUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it('debería manejar errores al consultar productos disponibles', () => {
      mockGetAvailableProductsUseCase.execute.mockReturnValue(throwError(() => new Error('Error')));

      component.loadAvailableProducts();

      expect(component.activeFilter).toBe('AVAILABLE');
      expect(component.state).toBe('error');
      expect(component.products).toEqual([]);
      expect(component.errorMessage).toBe('Ocurrió un error al cargar los productos disponibles.');
    });
  });

  describe('loadFeaturedProducts', () => {
    it('debería consultar GetFeaturedProductsUseCase y actualizar a success', () => {
      const featured = PRODUCTS_MOCK.filter((p) => p.featured);
      mockGetFeaturedProductsUseCase.execute.mockReturnValue(of(featured));

      component.loadFeaturedProducts();

      expect(component.activeFilter).toBe('FEATURED');
      expect(component.state).toBe('success');
      expect(component.products).toEqual(featured);
      expect(mockGetFeaturedProductsUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it('debería manejar errores al consultar productos destacados', () => {
      mockGetFeaturedProductsUseCase.execute.mockReturnValue(throwError(() => new Error('Error')));

      component.loadFeaturedProducts();

      expect(component.activeFilter).toBe('FEATURED');
      expect(component.state).toBe('error');
      expect(component.products).toEqual([]);
      expect(component.errorMessage).toBe('Ocurrió un error al cargar los productos destacados.');
    });
  });
});
