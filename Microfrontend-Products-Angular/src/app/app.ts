import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz del Microfrontend de Productos.
 *
 * @remarks
 * Actúa como punto de montaje principal de la aplicación cuando corre de forma autónoma.
 * Define el router-outlet donde se renderizan las vistas enrutadas.
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App {}
