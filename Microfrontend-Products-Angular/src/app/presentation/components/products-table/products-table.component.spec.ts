import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsTableComponent } from './products-table.component';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente con listado vacío por defecto', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.products).toEqual([]);
  });

  it('debería renderizar las filas correspondientes cuando se reciben productos', () => {
    component.products = PRODUCTS_MOCK;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(PRODUCTS_MOCK.length);
    expect(compiled.textContent).toContain(PRODUCTS_MOCK[0]!.name);
  });

  it('debería desplegar mensaje de vacío cuando no hay productos', () => {
    component.products = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No se encontraron productos registrados.');
  });

  it('debería retornar etiquetas y variantes de badge correctas para disponibilidad', () => {
    expect(component.getAvailabilityLabel(true)).toBe('Disponible');
    expect(component.getAvailabilityLabel(false)).toBe('Agotado');
    expect(component.getAvailabilityBadgeType(true)).toBe('success');
    expect(component.getAvailabilityBadgeType(false)).toBe('danger');
  });

  it('debería retornar etiquetas y variantes de badge correctas para destacados', () => {
    expect(component.getFeaturedLabel(true)).toBe('Destacado');
    expect(component.getFeaturedLabel(false)).toBe('Estándar');
    expect(component.getFeaturedBadgeType(true)).toBe('primary');
    expect(component.getFeaturedBadgeType(false)).toBe('secondary');
  });
});
