import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductRepository } from './core/domain/repositories/product.repository';
import { ProductNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/product-node.repository.impl';

/**
 * Configuración principal de la aplicación Angular del microfrontend de productos.
 *
 * @remarks
 * Define los proveedores globales registrados al arrancar de forma aislada la aplicación,
 * configurando el enrutamiento, detección de cambios zonales, cliente HTTP y la inyección
 * de la implementación `ProductNodeRepositoryImpl` para el token abstracto `ProductRepository`.
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
      provide: ProductRepository,
      useClass: ProductNodeRepositoryImpl,
    },
  ],
};
