import { Order } from "../../domain/models/order.model";
import { OrderRepository } from "../../domain/repositories/order.repository";

/**
 * Caso de uso 3: Obtener las órdenes completadas en el sistema.
 *
 * @remarks
 * Pertenece a la capa de Application y orquesta la consulta de órdenes
 * en estado 'COMPLETED'.
 */
export class GetCompletedOrdersUseCase {
  /**
   * Crea una nueva instancia del caso de uso.
   * @param orderRepository Repositorio abstracto de órdenes.
   */
  constructor(private readonly orderRepository: OrderRepository) {}

  /**
   * Ejecuta el caso de uso.
   * @returns Promesa con el arreglo de órdenes completadas.
   */
  execute(): Promise<Order[]> {
    return this.orderRepository.getCompleted();
  }
}
