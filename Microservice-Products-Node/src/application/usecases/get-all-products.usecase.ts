import { Product } from "../../domain/models/product.model";
import { ProductRepository } from "../../domain/repositories/product.repository";

/**
 * Caso de Uso 1: Obtener todos los productos registrados en el sistema.
 *
 * @remarks
 * Pertenece a la capa de Application y orquesta la consulta de productos
 * a través de la abstracción ProductRepository sin acoplarse a detalles de infraestructura.
 */
export class GetAllProductsUseCase {
  /**
   * Crea una nueva instancia del caso de uso.
   * @param productRepository Repositorio abstracto de productos.
   */
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Ejecuta el caso de uso para consultar la totalidad de productos.
   * @returns Promesa con el arreglo completo de productos.
   */
  execute(): Promise<Product[]> {
    return this.productRepository.getAll();
  }
}
