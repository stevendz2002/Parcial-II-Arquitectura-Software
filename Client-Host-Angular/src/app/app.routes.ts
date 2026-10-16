import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

/**
 * Rutas principales del Host que integran los Microfrontends mediante Module Federation.
 */
export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './routes',
      }).then((m) => m.USERS_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './routes',
      })
        .then((m) => m.PRODUCTS_ROUTES)
        .catch(() => []),
  },
  {
    path: 'orders',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './routes',
      })
        .then((m) => m.ORDERS_ROUTES)
        .catch(() => []),
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];
