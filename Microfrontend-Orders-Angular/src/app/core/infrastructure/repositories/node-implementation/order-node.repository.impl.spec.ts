import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { OrderNodeRepositoryImpl } from './order-node.repository.impl';
import { DataService } from '../../services/data.service';
import { ORDERS_MOCK } from '../../../../mocks/orders.mocks';
import { environment } from '../../../../../environments/environment';

describe('OrderNodeRepositoryImpl', () => {
  let repository: OrderNodeRepositoryImpl;
  let dataServiceMock: jest.Mocked<DataService>;
  const expectedBaseUrl = `${environment.apiUrlNode}/orders`;

  beforeEach(() => {
    dataServiceMock = {
      getAll: jest.fn(),
    } as unknown as jest.Mocked<DataService>;

    TestBed.configureTestingModule({
      providers: [
        OrderNodeRepositoryImpl,
        { provide: DataService, useValue: dataServiceMock },
      ],
    });

    repository = TestBed.inject(OrderNodeRepositoryImpl);
  });

  it('debe crearse e instanciarse correctamente', () => {
    expect(repository).toBeTruthy();
    expect(repository).toBeInstanceOf(OrderNodeRepositoryImpl);
  });

  it('debe llamar a dataService.getAll con la URL base para getAll()', (done) => {
    dataServiceMock.getAll.mockReturnValue(of(ORDERS_MOCK));

    repository.getAll().subscribe({
      next: (orders) => {
        expect(orders).toEqual(ORDERS_MOCK);
        expect(dataServiceMock.getAll).toHaveBeenCalledWith(expectedBaseUrl);
        done();
      },
      error: done.fail,
    });
  });

  it('debe propagar error en getAll() si el dataService falla', (done) => {
    const errorEsperado = new Error('Fallo de red en Node.js');
    dataServiceMock.getAll.mockReturnValue(throwError(() => errorEsperado));

    repository.getAll().subscribe({
      next: () => done.fail('Se esperaba error'),
      error: (error) => {
        expect(error).toBe(errorEsperado);
        done();
      },
    });
  });

  it('debe llamar a dataService.getAll con la URL /pending para getPending()', (done) => {
    const pendingOrders = ORDERS_MOCK.filter((o) => o.status === 'PENDING');
    dataServiceMock.getAll.mockReturnValue(of(pendingOrders));

    repository.getPending().subscribe({
      next: (orders) => {
        expect(orders).toEqual(pendingOrders);
        expect(dataServiceMock.getAll).toHaveBeenCalledWith(`${expectedBaseUrl}/pending`);
        done();
      },
      error: done.fail,
    });
  });

  it('debe propagar error en getPending() si el dataService falla', (done) => {
    const errorEsperado = new Error('Fallo al obtener pendientes');
    dataServiceMock.getAll.mockReturnValue(throwError(() => errorEsperado));

    repository.getPending().subscribe({
      next: () => done.fail('Se esperaba error'),
      error: (error) => {
        expect(error).toBe(errorEsperado);
        done();
      },
    });
  });

  it('debe llamar a dataService.getAll con la URL /completed para getCompleted()', (done) => {
    const completedOrders = ORDERS_MOCK.filter((o) => o.status === 'COMPLETED');
    dataServiceMock.getAll.mockReturnValue(of(completedOrders));

    repository.getCompleted().subscribe({
      next: (orders) => {
        expect(orders).toEqual(completedOrders);
        expect(dataServiceMock.getAll).toHaveBeenCalledWith(`${expectedBaseUrl}/completed`);
        done();
      },
      error: done.fail,
    });
  });

  it('debe propagar error en getCompleted() si el dataService falla', (done) => {
    const errorEsperado = new Error('Fallo al obtener completadas');
    dataServiceMock.getAll.mockReturnValue(throwError(() => errorEsperado));

    repository.getCompleted().subscribe({
      next: () => done.fail('Se esperaba error'),
      error: (error) => {
        expect(error).toBe(errorEsperado);
        done();
      },
    });
  });
});
