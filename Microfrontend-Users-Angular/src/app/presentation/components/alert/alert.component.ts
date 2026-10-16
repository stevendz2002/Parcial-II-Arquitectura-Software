import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente presentacional para mostrar alertas de carga o error.
 */
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  /** Mensaje informativo a mostrar en la alerta */
  @Input() message = '';
  /** Tipo visual de la alerta (info o error) */
  @Input() type: 'info' | 'error' = 'info';
}
