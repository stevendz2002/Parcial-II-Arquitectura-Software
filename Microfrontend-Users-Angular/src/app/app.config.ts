import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { UserRepository } from './core/domain/repositories/user.repository';
import { UserSpringbootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/user-springboot.repository.impl';

/**
 * Configuración global de inyección de dependencias del Microfrontend de Usuarios.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: UserRepository, useClass: UserSpringbootRepositoryImpl },
  ],
};
