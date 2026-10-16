import { Routes } from '@angular/router';
import { UsersPage } from './presentation/pages/users/users.page';
import { UserRepository } from './core/domain/repositories/user.repository';
import { UserSpringbootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/user-springboot.repository.impl';

/**
 * Rutas principales del Microfrontend de Usuarios.
 */
export const routes: Routes = [
  {
    path: '',
    component: UsersPage,
    providers: [
      { provide: UserRepository, useClass: UserSpringbootRepositoryImpl },
    ],
  },
];
