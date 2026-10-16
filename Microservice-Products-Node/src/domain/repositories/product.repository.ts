import { Product } from "../models/product.model";

/**
 * Contrato abstracto del repositorio de Productos.
 *
 * @remarks
 * Esta clase abstracta pertenece a la capa de Domain y establece las operaciones
 * requeridas para el acceso y filtrado de productos sin acoplarse a detalles de infraestructura.
 */
export abstract class ProductRepository {
  /**
   * Obtiene la totalidad de los productos registrados en el sistema.
   * @returns Promesa con el listado completo de productos.
   */
  abstract getAll(): Promise<Product[]>;

  /**
   * Obtiene únicamente los productos con disponibilidad en inventario (available === true).
   * @returns Promesa con el listado de productos disponibles.
   */
  abstract getAvailable(): Promise<Product[]>;

  /**
   * Obtiene únicamente los productos catalogados como destacados (featured === true).
   * @returns Promesa con el listado de productos destacados.
   */
  abstract getFeatured(): Promise<Product[]>;
}
