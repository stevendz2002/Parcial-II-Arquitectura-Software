import { Order } from "../../domain/models/order.model";
import { OrderRepository } from "../../domain/repositories/order.repository";

/**
 * Caso de uso 1: Obtener todas las órdenes registradas en el sistema.
 *
 * @remarks
 * Pertenece a la capa de Application y orquesta la consulta de órdenes
 * a través de la abstracción OrderRepository sin acoplarse a detalles de infraestructura.
 */
export class GetAllOrdersUseCase {
  /**
   * Crea una nueva instancia del caso de uso.
   * @param orderRepository Repositorio abstracto de órdenes.
   */
  constructor(private readonly orderRepository: OrderRepository) {}

  /**
   * Ejecuta el caso de uso.
   * @returns Promesa con el arreglo de todas las órdenes.
   */
  execute(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }
}
