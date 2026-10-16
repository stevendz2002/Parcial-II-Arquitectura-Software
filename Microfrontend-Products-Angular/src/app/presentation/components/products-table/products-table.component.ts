import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom } from '@brejcha13320/design-system-bootstrap';
import { ProductModel } from '../../../core/domain/models/product.model';

/**
 * Componente de presentación pura (Dumb Component) que renderiza la tabla de productos.
 *
 * @remarks
 * Despliega los productos en formato tabular incluyendo formato monetario para los precios,
 * badges visuales para el estado de disponibilidad y para productos destacados.
 */
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class ProductsTableComponent {
  /**
   * Colección de productos que se desplegarán en la tabla.
   */
  @Input() products: ProductModel[] = [];

  /**
   * Obtiene la etiqueta amigable en español para la disponibilidad del producto.
   * @param available Indicador booleano de disponibilidad.
   * @returns Cadena con el texto representativo ('Disponible' o 'Agotado').
   */
  getAvailabilityLabel(available: boolean): string {
    return available ? 'Disponible' : 'Agotado';
  }

  /**
   * Obtiene la variante del Badge para la disponibilidad del producto.
   * @param available Indicador booleano de disponibilidad.
   * @returns Tipo de badge ('success' o 'danger').
   */
  getAvailabilityBadgeType(available: boolean): 'success' | 'danger' {
    return available ? 'success' : 'danger';
  }

  /**
   * Obtiene la etiqueta amigable en español para el atributo destacado.
   * @param featured Indicador booleano de producto destacado.
   * @returns Cadena con el texto representativo ('Destacado' o 'Estándar').
   */
  getFeaturedLabel(featured: boolean): string {
    return featured ? 'Destacado' : 'Estándar';
  }

  /**
   * Obtiene la variante del Badge para el atributo destacado.
   * @param featured Indicador booleano de producto destacado.
   * @returns Tipo de badge ('primary' o 'secondary').
   */
  getFeaturedBadgeType(featured: boolean): 'primary' | 'secondary' {
    return featured ? 'primary' : 'secondary';
  }
}
