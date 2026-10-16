import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllUsersUseCase } from '../../../core/application/usecases/get-all-users.usecase';
import { GetActiveUsersUseCase } from '../../../core/application/usecases/get-active-users.usecase';
import { GetAdminUsersUseCase } from '../../../core/application/usecases/get-admin-users.usecase';
import { UserModel } from '../../../core/domain/models/user.model';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';
import { UsersTableComponent } from '../../components/users-table/users-table.component';

/**
 * Página contenedora del Microfrontend de Usuarios.
 * Orquesta los 3 casos de uso respetando Clean Architecture.
 */
@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, AlertComponent, UsersTableComponent],
  templateUrl: './users.page.html',
})
export class UsersPage implements OnInit {
  /** Caso de uso 1: Obtener todos los usuarios */
  private readonly getAllUsersUseCase = inject(GetAllUsersUseCase);
  /** Caso de uso 2: Obtener usuarios activos */
  private readonly getActiveUsersUseCase = inject(GetActiveUsersUseCase);
  /** Caso de uso 3: Obtener usuarios administradores */
  private readonly getAdminUsersUseCase = inject(GetAdminUsersUseCase);

  /** Estado reactivo de la vista */
  public state: State<UserModel[]> = {
    loading: true,
    error: false,
    data: [],
  };

  /**
   * Inicializa la página cargando todos los usuarios.
   */
  ngOnInit(): void {
    this.loadAllUsers();
  }

  /**
   * Ejecuta el Caso de Uso 1 (Todos los usuarios).
   */
  loadAllUsers(): void {
    this.state = { loading: true, error: false, data: [] };
    this.getAllUsersUseCase.execute().subscribe({
      next: (data) => (this.state = { loading: false, error: false, data }),
      error: () => (this.state = { loading: false, error: true, data: [] }),
    });
  }

  /**
   * Ejecuta el Caso de Uso 2 (Usuarios activos).
   */
  loadActiveUsers(): void {
    this.state = { loading: true, error: false, data: [] };
    this.getActiveUsersUseCase.execute().subscribe({
      next: (data) => (this.state = { loading: false, error: false, data }),
      error: () => (this.state = { loading: false, error: true, data: [] }),
    });
  }

  /**
   * Ejecuta el Caso de Uso 3 (Usuarios administradores).
   */
  loadAdminUsers(): void {
    this.state = { loading: true, error: false, data: [] };
    this.getAdminUsersUseCase.execute().subscribe({
      next: (data) => (this.state = { loading: false, error: false, data }),
      error: () => (this.state = { loading: false, error: true, data: [] }),
    });
  }
}
