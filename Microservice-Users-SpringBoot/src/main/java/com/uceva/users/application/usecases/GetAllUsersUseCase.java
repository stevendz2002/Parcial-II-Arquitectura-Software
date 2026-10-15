package com.uceva.users.application.usecases;

import com.uceva.users.domain.models.User;
import com.uceva.users.domain.repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GetAllUsersUseCase {
    private final UserRepository repository;

    public GetAllUsersUseCase(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> execute() {
        return this.repository.getAll();
    }
}
