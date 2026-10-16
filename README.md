# Parcial II - Arquitectura de Software

Monorepositorio del ecosistema de **Microfrontends con Clean Architecture** para el Parcial II de Arquitectura de Software.

**Integrante 2 - Módulo de Usuarios (Users)**

## Arquitectura General

```text
┌──────────────────────────────┐
│  Client-Host-Angular (:4200) │  ← Host con Navbar (rutas federadas)
└──────────────┬───────────────┘
               │ Module Federation (loadRemoteModule → usersMfe)
┌──────────────▼───────────────┐
│ Microfrontend-Users-Angular  │  ← MFE Users (Clean Architecture)
│         (puerto 4202)        │
└──────────────┬───────────────┘
               │ HTTP (DataService / UserRepository)
┌──────────────▼───────────────┐
│ Microservice-Users-SpringBoot│  ← API REST Users (Clean Architecture)
│         (puerto 8081)        │
└──────────────────────────────┘
```

## Puertos y Proyectos

| Proyecto | Tecnología | Puerto | Rol |
|---|---|---|---|
| `Client-Host-Angular` | Angular 17 + Module Federation + SCSS | **4200** | Host: Navbar (`routerLink="/users"`) y orquestación de microfrontends remotos |
| `Microfrontend-Users-Angular` | Angular 17 + Clean Architecture + Module Federation | **4202** | Microfrontend 2: Gestión de Usuarios (expone `./routes` como `usersMfe`) |
| `Microservice-Users-SpringBoot` | Spring Boot 3 + Java 17 | **8081** | Microservicio 2: API REST de Usuarios con Swagger |

## Client Host: `Client-Host-Angular` (puerto 4200)

Host colaborativo (los 3 integrantes registran aquí sus microfrontends). El Integrante 2 registró únicamente `usersMfe`:

- `webpack.config.js` → remoto `usersMfe: 'http://localhost:4202/remoteEntry.js'`.
- `src/app/app.routes.ts` → ruta `/users` con `loadRemoteModule` (`exposedModule: './routes'`) y redirección `'' → /users`.
- `src/app/app.component.html` → Navbar con `routerLink="/users"` y `routerLinkActive="active"` (espacio reservado para los Integrantes 1 y 3).

**Ejecución:**
```bash
cd Client-Host-Angular
npm install
npm start
```

## Microfrontend 2: `Microfrontend-Users-Angular` (puerto 4202)

Clean Architecture con las capas `core/domain`, `core/application`, `core/infrastructure` y `presentation`:

- **Dominio:** modelo `UserModel` y contrato abstracto `UserRepository`.
- **Aplicación:** los 3 casos de uso (`GetAllUsersUseCase`, `GetActiveUsersUseCase`, `GetAdminUsersUseCase`).
- **Infraestructura:** `DataService` (HttpClient) y tres implementaciones de `UserRepository`: `local-implementation` (mocks), `node-implementation` (`http://localhost:3001/api`) y `springboot-implementation` (`http://localhost:8081/api`, la usada por defecto).
- **Presentación:** `UsersPage` (inyecta únicamente los 3 casos de uso), `UsersTableComponent` y `AlertComponent`.

**Ejecución:**
```bash
cd Microfrontend-Users-Angular
npm install
npm start
npm test -- --coverage   # Jest: 10 suites, 31 tests, cobertura 100% (exigida > 90%)
npm run doc              # Compodoc: documentación técnica 100%
```

## Microservicio 2: `Microservice-Users-SpringBoot` (puerto 8081)

API REST bajo Clean Architecture (`domain` → `application` → `infrastructure` → `presentation`), consumida por el microfrontend vía `http://localhost:8081/api/users`.

**Endpoints:**

| Método | Ruta | Caso de uso |
|---|---|---|
| `GET` | `http://localhost:8081/api/users` | Caso de uso 1: todos los usuarios |
| `GET` | `http://localhost:8081/api/users/active` | Caso de uso 2: usuarios activos |
| `GET` | `http://localhost:8081/api/users/admins` | Caso de uso 3: usuarios ADMIN |

**Documentación Swagger:** `http://localhost:8081/swagger-ui.html` (OpenAPI en `http://localhost:8081/api-docs`).

**Ejecución** (requiere Java 17 y Maven):
```bash
cd Microservice-Users-SpringBoot
mvn spring-boot:run
```

## Ejecución completa del ecosistema (orden recomendado)

```bash
cd Microservice-Users-SpringBoot && mvn spring-boot:run     # 1. Levantar el microservicio (8081)
cd Microfrontend-Users-Angular && npm start                 # 2. Levantar el microfrontend (4202)
cd Client-Host-Angular && npm start                         # 3. Levantar el host (4200)
```

Navegar a `http://localhost:4200` → redirige a `/users` (Navbar → Microfrontend de Usuarios → tabla del microservicio).

## Ramas de Trabajo

| Rama | Contenido |
|---|---|
| `main` | Rama principal |
| `microservice-users-springboot` | Fases 1-3: Microservicio de Usuarios (Spring Boot, puerto 8081) |
| `microfrontend-users-angular` | Fases 4-7: Microfrontend de Usuarios (Angular, puerto 4202) |
| `Client-Host-Angular` | Fase 8: Host (puerto 4200) con navbar y ruta federada `/users`, fusionada a `microfrontend-users-angular` |
