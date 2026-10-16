import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductModel } from '../../../domain/models/product.model';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { PRODUCTS_MOCK } from '../../../../mocks/products.mocks';

/**
 * Implementación local en memoria del repositorio de Productos.
 *
 * @remarks
 * Provee acceso a datos simulados basados en `PRODUCTS_MOCK` sin requerir conectividad de red,
 * permitiendo pruebas unitarias rápidas y desarrollo desacoplado del backend.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductLocalRepositoryImpl implements ProductRepository {
  /**
   * Obtiene todos los productos del mock local en memoria.
   * @returns Observable con el arreglo completo de PRODUCTS_MOCK.
   */
  getAll(): Observable<ProductModel[]> {
    return of(PRODUCTS_MOCK);
  }

  /**
   * Obtiene únicamente los productos disponibles filtrados desde el mock local.
   * @returns Observable con los productos donde available === true.
   */
  getAvailable(): Observable<ProductModel[]> {
    return of(PRODUCTS_MOCK.filter((product) => product.available === true));
  }

  /**
   * Obtiene únicamente los productos destacados filtrados desde el mock local.
   * @returns Observable con los productos donde featured === true.
   */
  getFeatured(): Observable<ProductModel[]> {
    return of(PRODUCTS_MOCK.filter((product) => product.featured === true));
  }
}
