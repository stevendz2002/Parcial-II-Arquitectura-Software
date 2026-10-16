import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

/**
 * Caso de Uso 2: Obtener únicamente los productos con inventario disponible.
 *
 * @remarks
 * Esta clase orquesta la consulta de productos en existencia (available === true)
 * apoyándose en el contrato abstracto `ProductRepository`.
 */
@Injectable({
  providedIn: 'root',
})
export class GetAvailableProductsUseCase {
  /** Repositorio abstracto de productos inyectado */
  private readonly repository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso para consultar los productos disponibles.
   * @returns Observable que emite los productos con disponibilidad en inventario.
   */
  execute(): Observable<ProductModel[]> {
    return this.repository.getAvailable();
  }
}
