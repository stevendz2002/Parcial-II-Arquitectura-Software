import { Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';

/**
 * Contrato abstracto del repositorio de Órdenes en Angular.
 *
 * @remarks
 * Esta clase abstracta pertenece a la capa de Domain y establece el contrato
 * que deben implementar todos los adaptadores de infraestructura (Local, Node y SpringBoot).
 * Los casos de uso dependen exclusivamente de esta abstracción.
 */
export abstract class OrderRepository {
  /**
   * Obtiene la totalidad de las órdenes disponibles.
   * @returns Observable que emite la lista completa de órdenes.
   */
  abstract getAll(): Observable<OrderModel[]>;

  /**
   * Obtiene únicamente las órdenes cuyo estado sea 'PENDING'.
   * @returns Observable que emite las órdenes pendientes.
   */
  abstract getPending(): Observable<OrderModel[]>;

  /**
   * Obtiene únicamente las órdenes cuyo estado sea 'COMPLETED'.
   * @returns Observable que emite las órdenes completadas.
   */
  abstract getCompleted(): Observable<OrderModel[]>;
}
