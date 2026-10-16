import { Routes } from '@angular/router';
import { OrdersPage } from './presentation/pages/orders/orders.page';
import { OrderRepository } from './core/domain/repositories/order.repository';
import { OrderNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/order-node.repository.impl';
import { GetAllOrdersUseCase } from './core/application/usecases/get-all-orders.usecase';
import { GetPendingOrdersUseCase } from './core/application/usecases/get-pending-orders.usecase';
import { GetCompletedOrdersUseCase } from './core/application/usecases/get-completed-orders.usecase';

/**
 * Configuración de rutas expuestas para el Microfrontend de Órdenes.
 *
 * @remarks
 * Provee la implementación de infraestructura `OrderNodeRepositoryImpl`
 * vinculada al contrato abstracto `OrderRepository` junto con los casos de uso
 * en el inyector de la ruta para resolver las dependencias al ser consumido
 * de forma remota a través de Module Federation o localmente.
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
      GetAllOrdersUseCase,
      GetPendingOrdersUseCase,
      GetCompletedOrdersUseCase,
    ],
  },
];
