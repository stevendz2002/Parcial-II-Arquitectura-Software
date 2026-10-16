package com.uceva.users;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de inicio para el Microservicio de Usuarios.
 * Configura el arranque de Spring Boot y la documentación OpenAPI / Swagger.
 */
@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Users Microservice API",
        version = "1.0",
        description = "API de Usuarios con Clean Architecture"
    )
)
public class UsersApplication {

    /**
     * Punto de entrada de la aplicación Spring Boot.
     *
     * @param args Argumentos de la línea de comandos.
     */
    public static void main(String[] args) {
        SpringApplication.run(UsersApplication.class, args);
    }
}
