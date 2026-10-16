import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso 2: Obtener únicamente los usuarios activos.
 */
@Injectable({
  providedIn: 'root',
})
export class GetActiveUsersUseCase {
  /** Repositorio abstracto de usuarios inyectado */
  private readonly repository = inject(UserRepository);

  /**
   * Ejecuta la consulta de usuarios activos.
   * @returns Observable con el arreglo de UserModel activos.
   */
  execute(): Observable<UserModel[]> {
    return this.repository.getActive();
  }
}
