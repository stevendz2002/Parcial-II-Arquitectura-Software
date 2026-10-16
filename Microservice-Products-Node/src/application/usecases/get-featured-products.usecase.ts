import { Product } from "../../domain/models/product.model";
import { ProductRepository } from "../../domain/repositories/product.repository";

/**
 * Caso de Uso 3: Obtener únicamente los productos catalogados como destacados.
 *
 * @remarks
 * Pertenece a la capa de Application y orquesta la consulta de productos destacados
 * (featured === true) a través de la abstracción ProductRepository.
 */
export class GetFeaturedProductsUseCase {
  /**
   * Crea una nueva instancia del caso de uso.
   * @param productRepository Repositorio abstracto de productos.
   */
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Ejecuta el caso de uso para consultar los productos destacados.
   * @returns Promesa con el listado de productos destacados.
   */
  execute(): Promise<Product[]> {
    return this.productRepository.getFeatured();
  }
}
