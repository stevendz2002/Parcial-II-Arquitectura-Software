import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllOrdersUseCase } from '../../../core/application/usecases/get-all-orders.usecase';
import { GetPendingOrdersUseCase } from '../../../core/application/usecases/get-pending-orders.usecase';
import { GetCompletedOrdersUseCase } from '../../../core/application/usecases/get-completed-orders.usecase';
import { OrderModel } from '../../../core/domain/models/order.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Página principal contenedora de órdenes (Smart Component).
 *
 * @remarks
 * Esta página gestiona el estado asíncrono y la interacción con los 3 casos de uso:
 * consulta de todas las órdenes, órdenes pendientes y órdenes completadas.
 * Únicamente inyecta casos de uso respetando las reglas estrictas de Clean Architecture.
 */
@Component({
  selector: 'app-orders-page',
  templateUrl: './orders.page.html',
  styleUrl: './orders.page.scss',
  imports: [CommonModule, OrdersTableComponent, AlertComponent],
})
export class OrdersPage implements OnInit {
  /** Caso de uso inyectado para obtener todas las órdenes */
  private readonly getAllOrdersUseCase = inject(GetAllOrdersUseCase);

  /** Caso de uso inyectado para obtener órdenes pendientes */
  private readonly getPendingOrdersUseCase = inject(GetPendingOrdersUseCase);

  /** Caso de uso inyectado para obtener órdenes completadas */
  private readonly getCompletedOrdersUseCase = inject(GetCompletedOrdersUseCase);

  /** Listado actual de órdenes cargadas */
  orders: OrderModel[] = [];

  /** Estado actual del flujo de carga de datos */
  state: State = 'init';

  /** Filtro de órdenes activo actualmente ('ALL', 'PENDING' o 'COMPLETED') */
  activeFilter: 'ALL' | 'PENDING' | 'COMPLETED' = 'ALL';

  /** Mensaje de error para mostrar en caso de fallo */
  errorMessage: string = '';

  /**
   * Ciclo de vida de inicialización de Angular. Carga por defecto todas las órdenes.
   */
  ngOnInit(): void {
    this.loadAllOrders();
  }

  /**
   * Carga todas las órdenes del sistema ejecutando GetAllOrdersUseCase.
   */
  loadAllOrders(): void {
    this.activeFilter = 'ALL';
    this.state = 'loading';
    this.getAllOrdersUseCase.execute().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.state = 'success';
      },
      error: () => {
        this.orders = [];
        this.state = 'error';
        this.errorMessage = 'Ocurrió un error al cargar todas las órdenes.';
      },
    });
  }

  /**
   * Carga únicamente las órdenes pendientes ejecutando GetPendingOrdersUseCase.
   */
  loadPendingOrders(): void {
    this.activeFilter = 'PENDING';
    this.state = 'loading';
    this.getPendingOrdersUseCase.execute().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.state = 'success';
      },
      error: () => {
        this.orders = [];
        this.state = 'error';
        this.errorMessage = 'Ocurrió un error al cargar las órdenes pendientes.';
      },
    });
  }

  /**
   * Carga únicamente las órdenes completadas ejecutando GetCompletedOrdersUseCase.
   */
  loadCompletedOrders(): void {
    this.activeFilter = 'COMPLETED';
    this.state = 'loading';
    this.getCompletedOrdersUseCase.execute().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.state = 'success';
      },
      error: () => {
        this.orders = [];
        this.state = 'error';
        this.errorMessage = 'Ocurrió un error al cargar las órdenes completadas.';
      },
    });
  }
}
