import { Order } from "../models/order.model";

/**
 * Contrato abstracto del repositorio de Órdenes.
 *
 * @remarks
 * Esta clase abstracta pertenece a la capa de Domain y define las operaciones
 * que cualquier implementación de persistencia o fuente de datos de órdenes
 * debe cumplir.
 */
export abstract class OrderRepository {
  /**
   * Obtiene la totalidad de las órdenes registradas en el sistema.
   * @returns Promesa con el listado completo de órdenes.
   */
  abstract getAll(): Promise<Order[]>;

  /**
   * Obtiene únicamente las órdenes que se encuentran en estado 'PENDING'.
   * @returns Promesa con el listado de órdenes pendientes.
   */
  abstract getPending(): Promise<Order[]>;

  /**
   * Obtiene únicamente las órdenes que se encuentran en estado 'COMPLETED'.
   * @returns Promesa con el listado de órdenes completadas.
   */
  abstract getCompleted(): Promise<Order[]>;
}
