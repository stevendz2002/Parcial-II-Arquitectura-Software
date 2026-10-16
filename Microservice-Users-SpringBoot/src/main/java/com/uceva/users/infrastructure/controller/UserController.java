package com.uceva.users.infrastructure.controller;

import com.uceva.users.application.usecase.GetActiveUsersUseCase;
import com.uceva.users.application.usecase.GetAdminUsersUseCase;
import com.uceva.users.application.usecase.GetAllUsersUseCase;
import com.uceva.users.domain.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
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
    @ApiResponse(
            responseCode = "200",
            description = "Lista de todos los usuarios",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = User.class),
                    examples = @ExampleObject(
                            value = "[{\"id\":\"1\",\"name\":\"Usuario UCEVA 1\",\"email\":\"usuario1@uceva.edu.co\",\"role\":\"USER\",\"active\":true}]"
                    )
            )
    )
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(this.getAllUsersUseCase.execute());
    }

    @GetMapping("/active")
    @Operation(summary = "Caso de Uso 2: Obtener usuarios activos")
    @ApiResponse(
            responseCode = "200",
            description = "Lista de usuarios activos",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = User.class),
                    examples = @ExampleObject(
                            value = "[{\"id\":\"2\",\"name\":\"Usuario UCEVA 2\",\"email\":\"usuario2@uceva.edu.co\",\"role\":\"USER\",\"active\":true}]"
                    )
            )
    )
    public ResponseEntity<List<User>> getActive() {
        return ResponseEntity.ok(this.getActiveUsersUseCase.execute());
    }

    @GetMapping("/admins")
    @Operation(summary = "Caso de Uso 3: Obtener usuarios con rol ADMIN")
    @ApiResponse(
            responseCode = "200",
            description = "Lista de usuarios administradores",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = User.class),
                    examples = @ExampleObject(
                            value = "[{\"id\":\"3\",\"name\":\"Usuario UCEVA 3\",\"email\":\"usuario3@uceva.edu.co\",\"role\":\"ADMIN\",\"active\":true}]"
                    )
            )
    )
    public ResponseEntity<List<User>> getAdmins() {
        return ResponseEntity.ok(this.getAdminUsersUseCase.execute());
    }
}
