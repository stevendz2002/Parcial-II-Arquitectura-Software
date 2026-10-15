import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

/**
 * Contrato abstracto del repositorio de Usuarios (API Gateway / Repository).
 */
export abstract class UserRepository {
  /**
   * Caso de uso 1: Obtiene todos los usuarios registrados.
   * @returns Observable con el listado completo de UserModel.
   */
  abstract getAll(): Observable<UserModel[]>;

  /**
   * Caso de uso 2: Obtiene únicamente los usuarios activos.
   * @returns Observable con el listado de UserModel activos.
   */
  abstract getActive(): Observable<UserModel[]>;

  /**
   * Caso de uso 3: Obtiene únicamente los usuarios con rol ADMIN.
   * @returns Observable con el listado de UserModel administradores.
   */
  abstract getAdmins(): Observable<UserModel[]>;
}
