import { Routes } from '@angular/router';
import { UsersPage } from './presentation/pages/users/users.page';
import { UserRepository } from './core/domain/repositories/user.repository';
import { UserSpringbootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/user-springboot.repository.impl';
import { GetAllUsersUseCase } from './core/application/usecases/get-all-users.usecase';
import { GetActiveUsersUseCase } from './core/application/usecases/get-active-users.usecase';
import { GetAdminUsersUseCase } from './core/application/usecases/get-admin-users.usecase';

/**
 * Rutas expuestas por el Microfrontend de Usuarios para Module Federation.
 *
 * @remarks
 * Provee la implementación de infraestructura `UserSpringbootRepositoryImpl`
 * vinculada al contrato abstracto `UserRepository` junto con los casos de uso
 * en el inyector de la ruta para resolver las dependencias al ser consumido
 * de forma remota a través de Module Federation o localmente.
 */
export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersPage,
    providers: [
      {
        provide: UserRepository,
        useClass: UserSpringbootRepositoryImpl,
      },
      GetAllUsersUseCase,
      GetActiveUsersUseCase,
      GetAdminUsersUseCase,
    ],
  },
];
