import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

/**
 * Caso de uso 2: Obtener las órdenes pendientes en el sistema.
 *
 * @remarks
 * Esta clase orquesta la consulta de órdenes con estado 'PENDING' mediante
 * el contrato abstracto `OrderRepository`.
 */
@Injectable({
  providedIn: 'root',
})
export class GetPendingOrdersUseCase {
  /** Repositorio abstracto de órdenes inyectado */
  private readonly repository = inject(OrderRepository);

  /**
   * Ejecuta el caso de uso para consultar las órdenes pendientes.
   * @returns Observable que emite las órdenes en estado 'PENDING'.
   */
  execute(): Observable<OrderModel[]> {
    return this.repository.getPending();
  }
}
