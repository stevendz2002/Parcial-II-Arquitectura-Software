import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../core/domain/models/user.model';

/**
 * Componente presentacional encargado de renderizar la tabla de Usuarios.
 */
@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  /** Lista de usuarios a mostrar en la tabla */
  @Input() users: UserModel[] = [];
}
