package com.uceva.users.infrastructure.repositories;

import com.uceva.users.domain.models.User;
import com.uceva.users.domain.repositories.UserRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private final List<User> users;

    public UserRepositoryImpl() {
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

    @Override
    public List<User> getAll() {
        return this.users;
    }

    @Override
    public List<User> getActive() {
        return this.users.stream()
                .filter(User::isActive)
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getAdmins() {
        return this.users.stream()
                .filter(u -> "ADMIN".equalsIgnoreCase(u.getRole()))
                .collect(Collectors.toList());
    }
}
