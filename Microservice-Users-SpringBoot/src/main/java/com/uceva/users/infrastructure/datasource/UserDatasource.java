package com.uceva.users.infrastructure.datasource;

import com.uceva.users.domain.entity.User;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class UserDatasource {
    private final List<User> users;

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

    public List<User> getUsers() {
        return this.users;
    }
}
