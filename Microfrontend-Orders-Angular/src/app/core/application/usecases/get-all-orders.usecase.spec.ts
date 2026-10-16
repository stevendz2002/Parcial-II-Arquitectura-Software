import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { GetAllOrdersUseCase } from './get-all-orders.usecase';
import { ORDERS_MOCK } from '../../../mocks/orders.mocks';

describe('GetAllOrdersUseCase', () => {
  let useCase: GetAllOrdersUseCase;
  let orderRepositoryMock: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    orderRepositoryMock = {
      getAll: jest.fn(),
      getPending: jest.fn(),
      getCompleted: jest.fn(),
    } as unknown as jest.Mocked<OrderRepository>;

    TestBed.configureTestingModule({
      providers: [
        GetAllOrdersUseCase,
        { provide: OrderRepository, useValue: orderRepositoryMock },
      ],
    });

    useCase = TestBed.inject(GetAllOrdersUseCase);
  });

  it('debe instanciarse correctamente', () => {
    expect(useCase).toBeTruthy();
    expect(useCase).toBeInstanceOf(GetAllOrdersUseCase);
  });

  it('debe delegar la llamada al repositorio getAll() en caso de éxito', (done) => {
    orderRepositoryMock.getAll.mockReturnValue(of(ORDERS_MOCK));

    useCase.execute().subscribe({
      next: (orders) => {
        expect(orders).toEqual(ORDERS_MOCK);
        expect(orderRepositoryMock.getAll).toHaveBeenCalledTimes(1);
        done();
      },
      error: done.fail,
    });
  });

  it('debe propagar el error cuando el repositorio getAll() falle', (done) => {
    const errorEsperado = new Error('Error al obtener órdenes');
    orderRepositoryMock.getAll.mockReturnValue(throwError(() => errorEsperado));

    useCase.execute().subscribe({
      next: () => done.fail('Se esperaba error'),
      error: (error) => {
        expect(error).toBe(errorEsperado);
        expect(orderRepositoryMock.getAll).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });
});
