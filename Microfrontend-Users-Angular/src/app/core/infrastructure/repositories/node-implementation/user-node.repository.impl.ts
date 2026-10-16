import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { DataService } from '../../services/data.service';
import { environment } from '../../../../../environments/environment';

/**
 * Implementación del repositorio de Usuarios para Node.js.
 */
@Injectable({
  providedIn: 'root',
})
export class UserNodeRepositoryImpl implements UserRepository {
  /** Servicio HTTP de infraestructura */
  private readonly dataService = inject(DataService);
  /** URL del endpoint en Node.js */
  private readonly apiUrl = `${environment.apiUrlNode}/users`;

  /**
   * Obtiene todos los usuarios desde Node.js.
   * @returns Observable con UserModel[].
   */
  getAll(): Observable<UserModel[]> {
    return this.dataService.getAll<UserModel[]>(this.apiUrl);
  }

  /**
   * Obtiene los usuarios activos desde Node.js.
   * @returns Observable con UserModel[].
   */
  getActive(): Observable<UserModel[]> {
    return this.dataService.getAll<UserModel[]>(`${this.apiUrl}/active`);
  }

  /**
   * Obtiene los usuarios administradores desde Node.js.
   * @returns Observable con UserModel[].
   */
  getAdmins(): Observable<UserModel[]> {
    return this.dataService.getAll<UserModel[]>(`${this.apiUrl}/admins`);
  }
}
