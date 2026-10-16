import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz del Microfrontend de Usuarios.
 * Sirve como shell local cuando el MFE corre de forma independiente en el puerto 4202;
 * cuando se consume de forma remota, el Host utiliza directamente las rutas expuestas.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {}
