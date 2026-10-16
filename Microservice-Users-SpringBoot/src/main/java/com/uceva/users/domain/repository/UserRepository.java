package com.uceva.users.domain.repository;

import com.uceva.users.domain.entity.User;
import java.util.List;

public interface UserRepository {
    List<User> getAll();
    List<User> getActive();
    List<User> getAdmins();
}
