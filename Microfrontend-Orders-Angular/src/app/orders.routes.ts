import { Routes } from '@angular/router';
import { OrdersPage } from './presentation/pages/orders/orders.page';
import { OrderRepository } from './core/domain/repositories/order.repository';
import { OrderNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/order-node.repository.impl';

/**
 * Configuración de rutas expuestas para el Microfrontend de Órdenes.
 *
 * @remarks
 * Provee la implementación de infraestructura `OrderNodeRepositoryImpl`
 * vinculada al contrato abstracto `OrderRepository` para resolver las dependencias
 * de los casos de uso al ser consumido de forma remota o local.
 */
export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    component: OrdersPage,
    providers: [
      {
        provide: OrderRepository,
        useClass: OrderNodeRepositoryImpl,
      },
    ],
  },
];
