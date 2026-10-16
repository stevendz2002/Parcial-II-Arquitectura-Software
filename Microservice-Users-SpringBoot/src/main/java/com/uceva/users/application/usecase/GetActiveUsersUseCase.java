package com.uceva.users.application.usecase;

import com.uceva.users.domain.entity.User;
import com.uceva.users.domain.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Caso de uso encargado de filtrar y obtener los usuarios en estado activo.
 */
@Service
public class GetActiveUsersUseCase {

    private final UserRepository repository;

    /**
     * Constructor con inyección del repositorio de usuarios.
     *
     * @param repository Repositorio de dominio para usuarios.
     */
    public GetActiveUsersUseCase(UserRepository repository) {
        this.repository = repository;
    }

    /**
     * Ejecuta la lógica del caso de uso.
     *
     * @return Lista de usuarios activos.
     */
    public List<User> execute() {
        return this.repository.getActive();
    }
}
