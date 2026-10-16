import { Order } from "../../domain/models/order.model";
import { OrderRepository } from "../../domain/repositories/order.repository";

/**
 * Caso de uso 2: Obtener las órdenes pendientes en el sistema.
 *
 * @remarks
 * Pertenece a la capa de Application y orquesta la consulta de órdenes
 * en estado 'PENDING'.
 */
export class GetPendingOrdersUseCase {
  /**
   * Crea una nueva instancia del caso de uso.
   * @param orderRepository Repositorio abstracto de órdenes.
   */
  constructor(private readonly orderRepository: OrderRepository) {}

  /**
   * Ejecuta el caso de uso.
   * @returns Promesa con el arreglo de órdenes pendientes.
   */
  execute(): Promise<Order[]> {
    return this.orderRepository.getPending();
  }
}
