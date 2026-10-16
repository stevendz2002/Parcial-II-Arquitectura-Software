import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { OrderRepository } from './core/domain/repositories/order.repository';
import { OrderNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/order-node.repository.impl';

/**
 * Configuración principal de la aplicación Angular del microfrontend de órdenes.
 *
 * @remarks
 * Define los proveedores globales registrados al arrancar de forma aislada la aplicación,
 * configurando el enrutamiento, detección de cambios, cliente HTTP y el repositorio de órdenes.
 */
export const appConfig: ApplicationConfig = {
  /**
   * Proveedores globales de la aplicación.
   */
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: OrderRepository,
      useClass: OrderNodeRepositoryImpl,
    },
  ],
};
