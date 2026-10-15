import { TestBed } from '@angular/core/testing';
import { OrderLocalRepositoryImpl } from './order-local.repository.impl';
import { ORDERS_MOCK } from '../../../../mocks/orders.mocks';

describe('OrderLocalRepositoryImpl', () => {
  let repository: OrderLocalRepositoryImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderLocalRepositoryImpl],
    });

    repository = TestBed.inject(OrderLocalRepositoryImpl);
  });

  it('debe crearse e instanciarse correctamente', () => {
    expect(repository).toBeTruthy();
    expect(repository).toBeInstanceOf(OrderLocalRepositoryImpl);
  });

  it('debe retornar todas las órdenes locales con getAll()', (done) => {
    repository.getAll().subscribe({
      next: (orders) => {
        expect(orders).toEqual(ORDERS_MOCK);
        done();
      },
      error: done.fail,
    });
  });

  it('debe retornar únicamente órdenes con estado PENDING con getPending()', (done) => {
    repository.getPending().subscribe({
      next: (orders) => {
        expect(orders.length).toBeGreaterThan(0);
        expect(orders.every((o) => o.status === 'PENDING')).toBe(true);
        done();
      },
      error: done.fail,
    });
  });

  it('debe retornar únicamente órdenes con estado COMPLETED con getCompleted()', (done) => {
    repository.getCompleted().subscribe({
      next: (orders) => {
        expect(orders.length).toBeGreaterThan(0);
        expect(orders.every((o) => o.status === 'COMPLETED')).toBe(true);
        done();
      },
      error: done.fail,
    });
  });
});
