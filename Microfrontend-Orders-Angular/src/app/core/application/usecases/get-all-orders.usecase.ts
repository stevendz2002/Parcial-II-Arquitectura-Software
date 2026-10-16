import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

/**
 * Caso de uso 1: Obtener la totalidad de las órdenes del sistema.
 *
 * @remarks
 * Esta clase orquesta la consulta de todas las órdenes apoyándose en el contrato
 * abstracto `OrderRepository`.
 */
@Injectable({
  providedIn: 'root',
})
export class GetAllOrdersUseCase {
  /** Repositorio abstracto de órdenes inyectado */
  private readonly repository = inject(OrderRepository);

  /**
   * Ejecuta el caso de uso para consultar todas las órdenes.
   * @returns Observable que emite la lista completa de órdenes.
   */
  execute(): Observable<OrderModel[]> {
    return this.repository.getAll();
  }
}
