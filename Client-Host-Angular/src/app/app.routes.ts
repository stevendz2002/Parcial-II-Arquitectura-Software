import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

/**
 * Definición de rutas del Host.
 * Integra el Microfrontend de Usuarios (Puerto 4202) y Productos (Puerto 4201).
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
      }).then((m) => m.PRODUCTS_ROUTES),
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];
