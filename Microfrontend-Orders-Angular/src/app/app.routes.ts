import { Routes } from '@angular/router';

/**
 * Definición de las rutas internas del Microfrontend de Órdenes.
 *
 * @remarks
 * Mapea la ruta raíz hacia el componente standalone `OrdersPage`.
 */
export const routes: Routes = [
  /**
   * Ruta raíz del microfrontend de órdenes.
   */
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/orders/orders.page').then((m) => m.OrdersPage),
  },
];
