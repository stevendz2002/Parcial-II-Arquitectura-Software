import { Product } from "../../domain/models/product.model";
import { ProductRepository } from "../../domain/repositories/product.repository";

/**
 * Caso de Uso 2: Obtener únicamente los productos con disponibilidad en inventario.
 *
 * @remarks
 * Pertenece a la capa de Application y orquesta la consulta de productos disponibles
 * (available === true) a través de la abstracción ProductRepository.
 */
export class GetAvailableProductsUseCase {
  /**
   * Crea una nueva instancia del caso de uso.
   * @param productRepository Repositorio abstracto de productos.
   */
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Ejecuta el caso de uso para consultar los productos disponibles.
   * @returns Promesa con el listado de productos con stock disponible.
   */
  execute(): Promise<Product[]> {
    return this.productRepository.getAvailable();
  }
}
