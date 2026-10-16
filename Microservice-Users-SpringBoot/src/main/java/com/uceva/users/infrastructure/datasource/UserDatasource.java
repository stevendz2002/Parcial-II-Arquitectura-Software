package com.uceva.users.infrastructure.datasource;

import com.uceva.users.domain.entity.User;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Fuente de datos en memoria para el microservicio de usuarios.
 * Inicializa datos simulados de estudiantes y docentes de la UCEVA.
 */
@Component
public class UserDatasource {

    private final List<User> users;

    /**
     * Constructor por defecto que inicializa 12 usuarios simulados.
     */
    public UserDatasource() {
        this.users = IntStream.rangeClosed(1, 12)
                .mapToObj(i -> new User(
                        UUID.randomUUID().toString(),
                        "Usuario UCEVA " + i,
                        "usuario" + i + "@uceva.edu.co",
                        (i % 3 == 0) ? "ADMIN" : "USER",
                        (i % 2 == 0)
                ))
                .collect(Collectors.toList());
    }

    /**
     * Retorna la lista en memoria de usuarios.
     *
     * @return Lista de usuarios.
     */
    public List<User> getUsers() {
        return this.users;
    }
}
