import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { GetCompletedOrdersUseCase } from './get-completed-orders.usecase';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';

describe('GetCompletedOrdersUseCase', () => {
  let useCase: GetCompletedOrdersUseCase;
  let orderRepositoryMock: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    orderRepositoryMock = {
      getAll: jest.fn(),
      getPending: jest.fn(),
      getCompleted: jest.fn(),
    } as unknown as jest.Mocked<OrderRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetCompletedOrdersUseCase,
        { provide: OrderRepository, useValue: orderRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetCompletedOrdersUseCase);
  });

  it('debe instanciarse correctamente', () => {
    expect(useCase).toBeTruthy();
    expect(useCase).toBeInstanceOf(GetCompletedOrdersUseCase);
  });

  it('debe delegar la llamada al repositorio getCompleted() en caso de éxito', (done) => {
    const completedOrders = ORDERS_MOCK.filter((order) => order.status === 'COMPLETED');
    orderRepositoryMock.getCompleted.mockReturnValue(of(completedOrders));

    useCase.execute().subscribe({
      next: (orders) => {
        expect(orders).toEqual(completedOrders);
        expect(orderRepositoryMock.getCompleted).toHaveBeenCalledTimes(1);
        done();
      },
      error: done.fail,
    });
  });

  it('debe propagar el error cuando el repositorio getCompleted() falle', (done) => {
    const errorEsperado = new Error('Error al obtener órdenes completadas');
    orderRepositoryMock.getCompleted.mockReturnValue(throwError(() => errorEsperado));

    useCase.execute().subscribe({
      next: () => done.fail('Se esperaba error'),
      error: (error) => {
        expect(error).toBe(errorEsperado);
        expect(orderRepositoryMock.getCompleted).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });
});
