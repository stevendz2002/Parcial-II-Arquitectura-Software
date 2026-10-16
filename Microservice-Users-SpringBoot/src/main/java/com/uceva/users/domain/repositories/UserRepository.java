package com.uceva.users.domain.repositories;

import com.uceva.users.domain.models.User;
import java.util.List;

public interface UserRepository {
    List<User> getAll();
    List<User> getActive();
    List<User> getAdmins();
}
