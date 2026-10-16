import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Componente principal del Host encargado de renderizar el Navbar funcional
 * y gestionar la navegación entre los Microfrontends.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /** Título del Host */
  public title = 'Client-Host-Angular';
}
