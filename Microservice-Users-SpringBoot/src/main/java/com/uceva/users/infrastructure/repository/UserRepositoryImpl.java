package com.uceva.users.infrastructure.repository;

import com.uceva.users.domain.entity.User;
import com.uceva.users.domain.repository.UserRepository;
import com.uceva.users.infrastructure.datasource.UserDatasource;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación de la interfaz UserRepository que interactúa con el datasource en memoria.
 */
@Repository
public class UserRepositoryImpl implements UserRepository {

    private final UserDatasource datasource;

    /**
     * Constructor con inyección del datasource de usuarios.
     *
     * @param datasource Fuente de datos de usuarios.
     */
    public UserRepositoryImpl(UserDatasource datasource) {
        this.datasource = datasource;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<User> getAll() {
        return this.datasource.getUsers();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<User> getActive() {
        return this.datasource.getUsers().stream()
                .filter(User::isActive)
                .collect(Collectors.toList());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<User> getAdmins() {
        return this.datasource.getUsers().stream()
                .filter(u -> "ADMIN".equalsIgnoreCase(u.getRole()))
                .collect(Collectors.toList());
    }
}
