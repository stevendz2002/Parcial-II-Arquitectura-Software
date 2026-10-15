import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderModel } from '../../../domain/models/order.model';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { ORDERS_MOCK } from '../../../../mocks/orders.mocks';

/**
 * Implementación local en memoria del repositorio de Órdenes.
 *
 * @remarks
 * Provee acceso a datos simulados basados en `ORDERS_MOCK` sin requerir conectividad de red.
 */
@Injectable({
  providedIn: 'root',
})
export class OrderLocalRepositoryImpl implements OrderRepository {
  /**
   * Obtiene todas las órdenes del mock local.
   * @returns Observable con el arreglo completo de ORDERS_MOCK.
   */
  getAll(): Observable<OrderModel[]> {
    return of(ORDERS_MOCK);
  }

  /**
   * Obtiene las órdenes pendientes filtradas desde el mock local.
   * @returns Observable con las órdenes cuyo estado sea 'PENDING'.
   */
  getPending(): Observable<OrderModel[]> {
    return of(ORDERS_MOCK.filter((order) => order.status === 'PENDING'));
  }

  /**
   * Obtiene las órdenes completadas filtradas desde el mock local.
   * @returns Observable con las órdenes cuyo estado sea 'COMPLETED'.
   */
  getCompleted(): Observable<OrderModel[]> {
    return of(ORDERS_MOCK.filter((order) => order.status === 'COMPLETED'));
  }
}
