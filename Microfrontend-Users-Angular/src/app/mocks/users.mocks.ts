import { UserModel } from '../core/domain/models/user.model';

/**
 * Datos simulados de Usuarios para pruebas unitarias e implementación local.
 */
export const USERS_MOCK: UserModel[] = [
  {
    id: 'u-1',
    name: 'Jhon Loaiza',
    email: 'jhon.loaiza@uceva.edu.co',
    role: 'ADMIN',
    active: true,
  },
  {
    id: 'u-2',
    name: 'Andres Saavedra',
    email: 'andres.saavedra@uceva.edu.co',
    role: 'USER',
    active: true,
  },
  {
    id: 'u-3',
    name: 'Sebastian Arenas',
    email: 'sebastian.arenas@uceva.edu.co',
    role: 'USER',
    active: false,
  },
];
