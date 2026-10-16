package com.uceva.users.application.usecase;

import com.uceva.users.domain.entity.User;
import com.uceva.users.domain.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Caso de uso encargado de obtener todos los usuarios registrados en el sistema.
 */
@Service
public class GetAllUsersUseCase {

    private final UserRepository repository;

    /**
     * Constructor con inyección del repositorio de usuarios.
     *
     * @param repository Repositorio de dominio para usuarios.
     */
    public GetAllUsersUseCase(UserRepository repository) {
        this.repository = repository;
    }

    /**
     * Ejecuta la lógica del caso de uso.
     *
     * @return Lista completa de usuarios.
     */
    public List<User> execute() {
        return this.repository.getAll();
    }
}
