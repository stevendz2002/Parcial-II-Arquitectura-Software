import { faker } from '@faker-js/faker';
import { Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

/**
 * Implementación concreta en memoria del repositorio de Órdenes.
 *
 * @remarks
 * Esta clase pertenece a la capa de Infrastructure y genera dinámicamente 15 órdenes
 * simuladas mediante `@faker-js/faker`. Proporciona la persistencia simulada y
 * los filtros por estado requeridos.
 */
export class OrderRepositoryImpl extends OrderRepository {
  /** Colección en memoria de órdenes generadas dinámicamente */
  private readonly orders: Order[];

  /**
   * Inicializa la instancia del repositorio generando 15 órdenes simuladas.
   */
  constructor() {
    super();
    this.orders = this.generateOrders(15);
  }

  /**
   * Genera una cantidad determinada de órdenes ficticias.
   * @param count Cantidad de órdenes a generar.
   * @returns Arreglo de órdenes generadas.
   */
  private generateOrders(count: number): Order[] {
    const list: Order[] = [];
    for (let i = 1; i <= count; i++) {
      list.push({
        id: faker.string.uuid(),
        orderNumber: `ORD-${1000 + i}`,
        customerName: faker.person.fullName(),
        totalAmount: Number(faker.commerce.price({ min: 50, max: 2500, dec: 2 })),
        status: i % 2 === 0 ? 'COMPLETED' : 'PENDING',
        createdAt: faker.date.recent({ days: 30 }).toISOString(),
      });
    }
    return list;
  }

  /**
   * Retorna todas las órdenes generadas.
   * @returns Promesa con el listado completo de 15 órdenes.
   */
  async getAll(): Promise<Order[]> {
    return this.orders;
  }

  /**
   * Retorna únicamente las órdenes en estado 'PENDING'.
   * @returns Promesa con las órdenes pendientes filtradas.
   */
  async getPending(): Promise<Order[]> {
    return this.orders.filter((order) => order.status === 'PENDING');
  }

  /**
   * Retorna únicamente las órdenes en estado 'COMPLETED'.
   * @returns Promesa con las órdenes completadas filtradas.
   */
  async getCompleted(): Promise<Order[]> {
    return this.orders.filter((order) => order.status === 'COMPLETED');
  }
}
