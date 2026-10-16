/**
 * Interfaz genérica para manejar el estado reactivo de la capa de presentación.
 */
export interface State<T> {
  /** Indica si hay una petición en curso */
  loading: boolean;
  /** Indica si ocurrió un error al cargar los datos */
  error: boolean;
  /** Datos almacenados en el estado */
  data: T;
}
