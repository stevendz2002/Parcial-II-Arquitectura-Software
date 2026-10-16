import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { USERS_MOCK } from '../../../../mocks/users.mocks';

/**
 * Implementación local en memoria del repositorio de Usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class UserLocalRepositoryImpl implements UserRepository {
  /**
   * Obtiene todos los usuarios desde el mock local.
   * @returns Observable con USERS_MOCK.
   */
  getAll(): Observable<UserModel[]> {
    return of(USERS_MOCK);
  }

  /**
   * Obtiene los usuarios activos desde el mock local.
   * @returns Observable con usuarios activos.
   */
  getActive(): Observable<UserModel[]> {
    return of(USERS_MOCK.filter((user) => user.active));
  }

  /**
   * Obtiene los usuarios administradores desde el mock local.
   * @returns Observable con usuarios ADMIN.
   */
  getAdmins(): Observable<UserModel[]> {
    return of(USERS_MOCK.filter((user) => user.role === 'ADMIN'));
  }
}
