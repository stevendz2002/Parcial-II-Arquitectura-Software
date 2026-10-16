import { Routes } from '@angular/router';

/**
 * Definición de las rutas internas de ejecución autónoma del Microfrontend de Productos.
 *
 * @remarks
 * Mapea la ruta raíz hacia el componente standalone `ProductsPage`.
 */
export const routes: Routes = [
  /**
   * Ruta raíz del microfrontend de productos.
   */
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/products/products.page').then((m) => m.ProductsPage),
  },
];
