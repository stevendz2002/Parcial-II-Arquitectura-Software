import { Routes } from '@angular/router';
import { UsersPage } from './presentation/pages/users/users.page';
import { UserRepository } from './core/domain/repositories/user.repository';
import { UserSpringbootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/user-springboot.repository.impl';

/**
 * Rutas expuestas por el Microfrontend de Usuarios para Module Federation.
 */
export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersPage,
    providers: [
      { provide: UserRepository, useClass: UserSpringbootRepositoryImpl },
    ],
  },
];
