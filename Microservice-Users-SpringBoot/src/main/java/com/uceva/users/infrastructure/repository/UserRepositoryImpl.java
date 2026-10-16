package com.uceva.users.infrastructure.repository;

import com.uceva.users.domain.entity.User;
import com.uceva.users.domain.repository.UserRepository;
import com.uceva.users.infrastructure.datasource.UserDatasource;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private final UserDatasource datasource;

    public UserRepositoryImpl(UserDatasource datasource) {
        this.datasource = datasource;
    }

    @Override
    public List<User> getAll() {
        return this.datasource.getUsers();
    }

    @Override
    public List<User> getActive() {
        return this.datasource.getUsers().stream()
                .filter(User::isActive)
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getAdmins() {
        return this.datasource.getUsers().stream()
                .filter(u -> "ADMIN".equalsIgnoreCase(u.getRole()))
                .collect(Collectors.toList());
    }
}
