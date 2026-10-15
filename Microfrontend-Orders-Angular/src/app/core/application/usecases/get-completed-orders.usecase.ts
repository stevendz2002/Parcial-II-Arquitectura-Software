import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

/**
 * Caso de uso 3: Obtener las órdenes completadas en el sistema.
 *
 * @remarks
 * Esta clase orquesta la consulta de órdenes con estado 'COMPLETED' mediante
 * el contrato abstracto `OrderRepository`.
 */
@Injectable({
  providedIn: 'root',
})
export class GetCompletedOrdersUseCase {
  /** Repositorio abstracto de órdenes inyectado */
  private readonly repository = inject(OrderRepository);

  /**
   * Ejecuta el caso de uso para consultar las órdenes completadas.
   * @returns Observable que emite las órdenes en estado 'COMPLETED'.
   */
  execute(): Observable<OrderModel[]> {
    return this.repository.getCompleted();
  }
}
