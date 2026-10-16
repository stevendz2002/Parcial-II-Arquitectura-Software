/**
 * Representa los posibles estados del ciclo de vida visual de una vista o componente.
 *
 * @remarks
 * Permite gestionar de manera predecible las transiciones entre inicialización,
 * carga asíncrona, éxito y manejo de errores.
 */
export type State =
  /** Estado inicial antes de disparar la consulta */
  | 'init'
  /** Estado en progreso mientras se resuelve la promesa u observable */
  | 'loading'
  /** Estado exitoso tras obtener la información solicitada */
  | 'success'
  /** Estado de fallo ante un error de red o de negocio */
  | 'error';

/**
 * Representa las variantes visuales soportadas por el componente AlertComponent.
 *
 * @remarks
 * Se utiliza para alternar entre una alerta informativa de carga (spinner)
 * y una alerta de error (icono de advertencia).
 */
export type AlertState =
  /** Indica un proceso asíncrono en curso */
  | 'loading'
  /** Indica la ocurrencia de un fallo en la operación */
  | 'error';
