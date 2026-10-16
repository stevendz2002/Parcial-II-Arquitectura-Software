package com.uceva.users.domain.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Entidad que representa un usuario del sistema")
public class User {

    @Schema(description = "Identificador único del usuario", example = "550e8400-e29b-41d4-a716-446655440000")
    private String id;

    @Schema(description = "Nombre completo del usuario", example = "Usuario UCEVA 1")
    private String name;

    @Schema(description = "Correo electrónico del usuario", example = "usuario1@uceva.edu.co")
    private String email;

    @Schema(description = "Rol del usuario en el sistema", example = "USER", allowableValues = {"USER", "ADMIN"})
    private String role;

    @Schema(description = "Indica si el usuario está activo", example = "true")
    private boolean active;

    public User() {}

    public User(String id, String name, String email, String role, boolean active) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.active = active;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
