/**
 * Modelo de dominio que representa un Usuario dentro del sistema.
 */
export interface UserModel {
  /** Identificador único del usuario */
  id: string;
  /** Nombre completo del usuario */
  name: string;
  /** Correo electrónico del usuario */
  email: string;
  /** Rol asignado al usuario (ADMIN o USER) */
  role: string;
  /** Indica si el usuario se encuentra activo */
  active: boolean;
}
