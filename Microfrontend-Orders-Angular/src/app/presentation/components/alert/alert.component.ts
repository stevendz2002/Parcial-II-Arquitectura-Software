import { Component, Input } from '@angular/core';
import { IconAtom } from '@brejcha13320/design-system-bootstrap';
import { AlertState } from '../../interfaces/state.interface';

/**
 * Componente visual de alerta reutilizable.
 *
 * @remarks
 * Representa estados de carga asincrónica con un spinner o mensajes de error
 * con iconos de advertencia basados en Bootstrap y Design System.
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  imports: [IconAtom],
})
export class AlertComponent {
  /**
   * Estado visual configurado para la alerta ('loading' o 'error').
   */
  @Input({ required: true }) alertState!: AlertState;

  /**
   * Mensaje descriptivo mostrado dentro de la alerta.
   */
  @Input() text: string = '';

  /**
   * Mapeo de variantes de estado a colores de alerta de Bootstrap.
   */
  alertClassMap: Record<AlertState, 'primary' | 'danger'> = {
    error: 'danger',
    loading: 'primary',
  };

  /**
   * Genera dinámicamente la cadena de clases CSS según el alertState actual.
   * @returns Cadena con las clases de alerta de Bootstrap.
   */
  getClass(): string {
    return `alert alert-${this.alertClassMap[this.alertState]} d-flex align-items-center`;
  }
}
