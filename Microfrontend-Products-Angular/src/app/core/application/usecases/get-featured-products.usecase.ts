import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

/**
 * Caso de Uso 3: Obtener únicamente los productos catalogados como destacados.
 *
 * @remarks
 * Esta clase orquesta la consulta de productos destacados (featured === true)
 * apoyándose en el contrato abstracto `ProductRepository`.
 */
@Injectable({
  providedIn: 'root',
})
export class GetFeaturedProductsUseCase {
  /** Repositorio abstracto de productos inyectado */
  private readonly repository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso para consultar los productos destacados.
   * @returns Observable que emite los productos destacados.
   */
  execute(): Observable<ProductModel[]> {
    return this.repository.getFeatured();
  }
}
