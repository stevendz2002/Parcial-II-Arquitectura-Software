import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersTableComponent } from './orders-table.component';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';

describe('OrdersTableComponent', () => {
  let component: OrdersTableComponent;
  let fixture: ComponentFixture<OrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersTableComponent);
    component = fixture.componentInstance;
  });

  it('debe crearse con valores por defecto', () => {
    expect(component).toBeTruthy();
    expect(component.orders).toEqual([]);
    expect(component.statusBadgeMap['PENDING']).toBe('warning');
    expect(component.statusBadgeMap['COMPLETED']).toBe('success');
  });

  it('debe renderizar filas de órdenes cuando se suministren datos', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(ORDERS_MOCK.length);
    expect(compiled.textContent).toContain(ORDERS_MOCK[0].customerName);
    expect(compiled.textContent).toContain(ORDERS_MOCK[0].orderNumber);
  });

  it('debe mostrar mensaje vacío cuando orders sea un arreglo vacío', () => {
    component.orders = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No se encontraron órdenes registradas.');
  });
});
