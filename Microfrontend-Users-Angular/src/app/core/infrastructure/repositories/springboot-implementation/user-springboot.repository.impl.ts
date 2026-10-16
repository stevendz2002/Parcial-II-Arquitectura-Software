import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { DataService } from '../../services/data.service';
import { environment } from '../../../../../environments/environment';

/**
 * Implementación del repositorio de Usuarios conectada al Microservicio en Spring Boot (Puerto 8081).
 */
@Injectable({
  providedIn: 'root',
})
export class UserSpringbootRepositoryImpl implements UserRepository {
  /** Servicio HTTP de infraestructura */
  private readonly dataService = inject(DataService);
  /** URL del endpoint en Spring Boot */
  private readonly apiUrl = `${environment.apiUrlSpringBoot}/users`;

  /**
   * Obtiene todos los usuarios desde Spring Boot.
   * @returns Observable con UserModel[].
   */
  getAll(): Observable<UserModel[]> {
    return this.dataService.getAll<UserModel[]>(this.apiUrl);
  }

  /**
   * Obtiene los usuarios activos desde Spring Boot.
   * @returns Observable con UserModel[].
   */
  getActive(): Observable<UserModel[]> {
    return this.dataService.getAll<UserModel[]>(`${this.apiUrl}/active`);
  }

  /**
   * Obtiene los usuarios administradores desde Spring Boot.
   * @returns Observable con UserModel[].
   */
  getAdmins(): Observable<UserModel[]> {
    return this.dataService.getAll<UserModel[]>(`${this.apiUrl}/admins`);
  }
}
