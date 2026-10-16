import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

/**
 * Caso de Uso 1: Obtener la totalidad de los productos registrados en el sistema.
 *
 * @remarks
 * Esta clase orquesta la consulta de todos los productos apoyándose en el contrato
 * abstracto `ProductRepository`, desacoplada de la implementación de infraestructura subyacente.
 */
@Injectable({
  providedIn: 'root',
})
export class GetAllProductsUseCase {
  /** Repositorio abstracto de productos inyectado */
  private readonly repository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso para consultar la totalidad de productos.
   * @returns Observable que emite la lista completa de productos.
   */
  execute(): Observable<ProductModel[]> {
    return this.repository.getAll();
  }
}
