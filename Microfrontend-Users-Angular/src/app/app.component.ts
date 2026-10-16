import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz del Microfrontend de Usuarios.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  /** Título identificador del Microfrontend de Usuarios */
  public title = 'Microfrontend-Users-Angular';
}
