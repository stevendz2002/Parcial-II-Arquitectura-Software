import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../domain/models/product.model';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { DataService } from '../../services/data.service';
import { environment } from '../../../../../environments/environment';

/**
 * Implementación del repositorio de Productos para el microservicio en Spring Boot.
 *
 * @remarks
 * Esta clase consume los endpoints expuestos en el puerto 8081 mediante `DataService`.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductSpringBootRepositoryImpl implements ProductRepository {
  /** Servicio HTTP genérico de infraestructura */
  private readonly dataService = inject(DataService);

  /** URL base para los endpoints de productos en Spring Boot */
  private readonly apiUrl = `${environment.apiUrlSpringBoot}/products`;

  /**
   * Obtiene todos los productos consumiendo el endpoint principal de Spring Boot.
   * @returns Observable con el listado completo de productos.
   */
  getAll(): Observable<ProductModel[]> {
    return this.dataService.getAll<ProductModel[]>(this.apiUrl);
  }

  /**
   * Obtiene los productos disponibles consumiendo el endpoint /products/available de Spring Boot.
   * @returns Observable con los productos donde available === true.
   */
  getAvailable(): Observable<ProductModel[]> {
    return this.dataService.getAll<ProductModel[]>(`${this.apiUrl}/available`);
  }

  /**
   * Obtiene los productos destacados consumiendo el endpoint /products/featured de Spring Boot.
   * @returns Observable con los productos donde featured === true.
   */
  getFeatured(): Observable<ProductModel[]> {
    return this.dataService.getAll<ProductModel[]>(`${this.apiUrl}/featured`);
  }
}
