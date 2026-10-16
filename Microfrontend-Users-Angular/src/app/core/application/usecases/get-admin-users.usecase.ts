import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso 3: Obtener únicamente los usuarios con rol ADMIN.
 */
@Injectable({
  providedIn: 'root',
})
export class GetAdminUsersUseCase {
  /** Repositorio abstracto de usuarios inyectado */
  private readonly repository = inject(UserRepository);

  /**
   * Ejecuta la consulta de usuarios administradores.
   * @returns Observable con el arreglo de UserModel administradores.
   */
  execute(): Observable<UserModel[]> {
    return this.repository.getAdmins();
  }
}
