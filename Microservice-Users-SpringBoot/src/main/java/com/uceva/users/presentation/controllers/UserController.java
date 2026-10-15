package com.uceva.users.presentation.controllers;

import com.uceva.users.application.usecases.GetActiveUsersUseCase;
import com.uceva.users.application.usecases.GetAdminUsersUseCase;
import com.uceva.users.application.usecases.GetAllUsersUseCase;
import com.uceva.users.domain.models.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@Tag(name = "Users", description = "Microservicio de Usuarios bajo Clean Architecture")
public class UserController {
    private final GetAllUsersUseCase getAllUsersUseCase;
    private final GetActiveUsersUseCase getActiveUsersUseCase;
    private final GetAdminUsersUseCase getAdminUsersUseCase;

    public UserController(
            GetAllUsersUseCase getAllUsersUseCase,
            GetActiveUsersUseCase getActiveUsersUseCase,
            GetAdminUsersUseCase getAdminUsersUseCase
    ) {
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.getActiveUsersUseCase = getActiveUsersUseCase;
        this.getAdminUsersUseCase = getAdminUsersUseCase;
    }

    @GetMapping
    @Operation(summary = "Caso de Uso 1: Obtener todos los usuarios")
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(this.getAllUsersUseCase.execute());
    }

    @GetMapping("/active")
    @Operation(summary = "Caso de Uso 2: Obtener usuarios activos")
    public ResponseEntity<List<User>> getActive() {
        return ResponseEntity.ok(this.getActiveUsersUseCase.execute());
    }

    @GetMapping("/admins")
    @Operation(summary = "Caso de Uso 3: Obtener usuarios con rol ADMIN")
    public ResponseEntity<List<User>> getAdmins() {
        return ResponseEntity.ok(this.getAdminUsersUseCase.execute());
    }
}
