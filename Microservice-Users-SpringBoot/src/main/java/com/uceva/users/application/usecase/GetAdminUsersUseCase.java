package com.uceva.users.application.usecase;

import com.uceva.users.domain.entity.User;
import com.uceva.users.domain.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GetAdminUsersUseCase {
    private final UserRepository repository;

    public GetAdminUsersUseCase(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> execute() {
        return this.repository.getAdmins();
    }
}
