import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllOrdersUseCase } from '../../../core/application/usecases/get-all-orders.usecase';
import { GetPendingOrdersUseCase } from '../../../core/application/usecases/get-pending-orders.usecase';
import { GetCompletedOrdersUseCase } from '../../../core/application/usecases/get-completed-orders.usecase';
import { OrdersPage } from './orders.page';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';

describe('OrdersPage', () => {
  let component: OrdersPage;
  let fixture: ComponentFixture<OrdersPage>;

  let getAllOrdersUseCaseMock: { execute: jest.Mock };
  let getPendingOrdersUseCaseMock: { execute: jest.Mock };
  let getCompletedOrdersUseCaseMock: { execute: jest.Mock };

  beforeEach(async () => {
    getAllOrdersUseCaseMock = { execute: jest.fn().mockReturnValue(of(ORDERS_MOCK)) };
    getPendingOrdersUseCaseMock = { execute: jest.fn().mockReturnValue(of([])) };
    getCompletedOrdersUseCaseMock = { execute: jest.fn().mockReturnValue(of([])) };

    await TestBed.configureTestingModule({
      imports: [OrdersPage],
      providers: [
        { provide: GetAllOrdersUseCase, useValue: getAllOrdersUseCaseMock },
        { provide: GetPendingOrdersUseCase, useValue: getPendingOrdersUseCaseMock },
        { provide: GetCompletedOrdersUseCase, useValue: getCompletedOrdersUseCaseMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersPage);
    component = fixture.componentInstance;
  });

  it('debe crearse correctamente e invocar loadAllOrders() en ngOnInit()', () => {
    fixture.detectChanges(); // Ejecuta ngOnInit
    expect(component).toBeTruthy();
    expect(getAllOrdersUseCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(component.orders).toEqual(ORDERS_MOCK);
    expect(component.state).toBe('success');
    expect(component.activeFilter).toBe('ALL');
  });

  it('debe manejar el éxito al invocar loadAllOrders()', () => {
    getAllOrdersUseCaseMock.execute.mockReturnValue(of(ORDERS_MOCK));

    component.loadAllOrders();

    expect(component.activeFilter).toBe('ALL');
    expect(component.state).toBe('success');
    expect(component.orders).toEqual(ORDERS_MOCK);
  });

  it('debe manejar el error al invocar loadAllOrders()', () => {
    getAllOrdersUseCaseMock.execute.mockReturnValue(throwError(() => new Error('Error al cargar')));

    component.loadAllOrders();

    expect(component.state).toBe('error');
    expect(component.orders).toEqual([]);
    expect(component.errorMessage).toContain('Ocurrió un error al cargar todas las órdenes.');
  });

  it('debe manejar el éxito al invocar loadPendingOrders()', () => {
    const pendingOrders = ORDERS_MOCK.filter((o) => o.status === 'PENDING');
    getPendingOrdersUseCaseMock.execute.mockReturnValue(of(pendingOrders));

    component.loadPendingOrders();

    expect(component.activeFilter).toBe('PENDING');
    expect(component.state).toBe('success');
    expect(component.orders).toEqual(pendingOrders);
    expect(getPendingOrdersUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });

  it('debe manejar el error al invocar loadPendingOrders()', () => {
    getPendingOrdersUseCaseMock.execute.mockReturnValue(throwError(() => new Error('Error pendientes')));

    component.loadPendingOrders();

    expect(component.state).toBe('error');
    expect(component.orders).toEqual([]);
    expect(component.errorMessage).toContain('Ocurrió un error al cargar las órdenes pendientes.');
  });

  it('debe manejar el éxito al invocar loadCompletedOrders()', () => {
    const completedOrders = ORDERS_MOCK.filter((o) => o.status === 'COMPLETED');
    getCompletedOrdersUseCaseMock.execute.mockReturnValue(of(completedOrders));

    component.loadCompletedOrders();

    expect(component.activeFilter).toBe('COMPLETED');
    expect(component.state).toBe('success');
    expect(component.orders).toEqual(completedOrders);
    expect(getCompletedOrdersUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });

  it('debe manejar el error al invocar loadCompletedOrders()', () => {
    getCompletedOrdersUseCaseMock.execute.mockReturnValue(throwError(() => new Error('Error completadas')));

    component.loadCompletedOrders();

    expect(component.state).toBe('error');
    expect(component.orders).toEqual([]);
    expect(component.errorMessage).toContain('Ocurrió un error al cargar las órdenes completadas.');
  });
});
