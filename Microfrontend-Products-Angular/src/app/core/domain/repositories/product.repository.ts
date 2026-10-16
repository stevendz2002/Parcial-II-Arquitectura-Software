import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

/**
 * Contrato abstracto del repositorio de Productos en Angular.
 *
 * @remarks
 * Esta clase abstracta pertenece a la capa de Domain y establece el contrato
 * que deben implementar todos los adaptadores de infraestructura (Local, Node y SpringBoot).
 * Los casos de uso dependen exclusivamente de esta abstracción. Funciona también
 * como InjectionToken para el contenedor de inyección de dependencias de Angular.
 */
export abstract class ProductRepository {
  /**
   * Obtiene la totalidad de los productos registrados.
   * @returns Observable que emite la lista completa de productos.
   */
  abstract getAll(): Observable<ProductModel[]>;

  /**
   * Obtiene únicamente los productos con inventario disponible (available === true).
   * @returns Observable que emite los productos con disponibilidad en inventario.
   */
  abstract getAvailable(): Observable<ProductModel[]>;

  /**
   * Obtiene únicamente los productos catalogados como destacados (featured === true).
   * @returns Observable que emite los productos destacados.
   */
  abstract getFeatured(): Observable<ProductModel[]>;
}
