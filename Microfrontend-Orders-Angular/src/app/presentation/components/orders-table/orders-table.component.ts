import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { OrderModel, OrderStatus } from '../../../core/domain/models/order.model';

/**
 * Componente de presentación pura (Dumb Component) que renderiza la tabla de órdenes.
 *
 * @remarks
 * Muestra el listado de órdenes en formato tabular con formato monetario para los montos
 * y badges visuales según el estado comercial ('PENDING' o 'COMPLETED').
 */
@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class OrdersTableComponent {
  /**
   * Colección de órdenes que se desplegarán en la tabla.
   */
  @Input() orders: OrderModel[] = [];

  /**
   * Mapeo del estado de la orden al tipo de Badge visual del Design System.
   */
  statusBadgeMap: Record<OrderStatus, BadgeType> = {
    PENDING: 'warning',
    COMPLETED: 'success',
  };

  /**
   * Mapeo de texto amigable en español para cada estado.
   */
  statusLabelMap: Record<OrderStatus, string> = {
    PENDING: 'Pendiente',
    COMPLETED: 'Completada',
  };
}
