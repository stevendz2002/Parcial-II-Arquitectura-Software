package com.uceva.users.domain.repository;

import com.uceva.users.domain.entity.User;
import java.util.List;

/**
 * Puerto de salida (Repository) en la arquitectura limpia para el acceso a datos de Usuarios.
 */
public interface UserRepository {

    /**
     * Obtiene el listado completo de todos los usuarios registrados.
     *
     * @return Lista con todos los usuarios.
     */
    List<User> getAll();

    /**
     * Obtiene únicamente los usuarios que se encuentran en estado activo.
     *
     * @return Lista de usuarios activos.
     */
    List<User> getActive();

    /**
     * Obtiene los usuarios que poseen el rol ADMIN.
     *
     * @return Lista de administradores.
     */
    List<User> getAdmins();
}
