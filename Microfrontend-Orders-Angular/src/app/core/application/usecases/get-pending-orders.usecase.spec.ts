import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { GetPendingOrdersUseCase } from './get-pending-orders.usecase';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';

describe('GetPendingOrdersUseCase', () => {
  let useCase: GetPendingOrdersUseCase;
  let orderRepositoryMock: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    orderRepositoryMock = {
      getAll: jest.fn(),
      getPending: jest.fn(),
      getCompleted: jest.fn(),
    } as unknown as jest.Mocked<OrderRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetPendingOrdersUseCase,
        { provide: OrderRepository, useValue: orderRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetPendingOrdersUseCase);
  });

  it('debe instanciarse correctamente', () => {
    expect(useCase).toBeTruthy();
    expect(useCase).toBeInstanceOf(GetPendingOrdersUseCase);
  });

  it('debe delegar la llamada al repositorio getPending() en caso de éxito', (done) => {
    const pendingOrders = ORDERS_MOCK.filter((order) => order.status === 'PENDING');
    orderRepositoryMock.getPending.mockReturnValue(of(pendingOrders));

    useCase.execute().subscribe({
      next: (orders) => {
        expect(orders).toEqual(pendingOrders);
        expect(orderRepositoryMock.getPending).toHaveBeenCalledTimes(1);
        done();
      },
      error: done.fail,
    });
  });

  it('debe propagar el error cuando el repositorio getPending() falle', (done) => {
    const errorEsperado = new Error('Error al obtener órdenes pendientes');
    orderRepositoryMock.getPending.mockReturnValue(throwError(() => errorEsperado));

    useCase.execute().subscribe({
      next: () => done.fail('Se esperaba error'),
      error: (error) => {
        expect(error).toBe(errorEsperado);
        expect(orderRepositoryMock.getPending).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });
});
