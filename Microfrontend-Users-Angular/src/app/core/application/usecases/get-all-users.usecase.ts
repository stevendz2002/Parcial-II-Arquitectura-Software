import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso 1: Obtener todos los usuarios del sistema.
 */
@Injectable({
  providedIn: 'root',
})
export class GetAllUsersUseCase {
  /** Repositorio abstracto de usuarios inyectado */
  private readonly repository = inject(UserRepository);

  /**
   * Ejecuta la consulta de todos los usuarios.
   * @returns Observable con el arreglo de UserModel.
   */
  execute(): Observable<UserModel[]> {
    return this.repository.getAll();
  }
}
