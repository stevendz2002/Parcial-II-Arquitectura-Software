# Parcial II - Arquitectura de Software

Monorepositorio del ecosistema de **Microfrontends con Clean Architecture** para el Parcial II de Arquitectura de Software (UCEVA).

- **Módulo de Productos (Products)**: Microservicio Node.js (:3001) + Microfrontend Angular (:4201)
- **Módulo de Usuarios (Users)**: Microservicio Spring Boot (:8081) + Microfrontend Angular (:4202)
- **Módulo de Órdenes (Orders)**: Microservicio Node.js (:3002) + Microfrontend Angular (:4203)

---

## Arquitectura General

```text
                     ┌───────────────────────────────────────────┐
                     │        Client-Host-Angular (:4200)        │  ← Host con Navbar (rutas federadas)
                     └───────┬──────────────┬────────────┬───────┘
                             │              │            │
     loadRemoteModule        │              │            │ loadRemoteModule
     (productsMfe)           │              │            │ (ordersMfe)
             ┌───────────────┘              │            └───────────────┐
             │            loadRemoteModule  │                            │
             │            (usersMfe)        │                            │
             ▼                              ▼                            ▼
┌──────────────────────────────┐┌──────────────────────────────┐┌──────────────────────────────┐
│ Microfrontend-Products-Angular││ Microfrontend-Users-Angular  ││ Microfrontend-Orders-Angular │
│        (puerto 4201)         ││        (puerto 4202)         ││        (puerto 4203)         │
└──────────────┬───────────────┘└──────────────┬───────────────┘└──────────────┬───────────────┘
               │ HTTP                          │ HTTP                          │ HTTP
┌──────────────▼───────────────┐┌──────────────▼───────────────┐┌──────────────▼───────────────┐
│  Microservice-Products-Node  ││Microservice-Users-SpringBoot ││   Microservice-Orders-Node   │
│        (puerto 3001)         ││        (puerto 8081)         ││        (puerto 3002)         │
└──────────────────────────────┘└──────────────────────────────┘└──────────────────────────────┘
```

---

## Puertos y Proyectos

| Proyecto | Tecnología | Puerto | Rol |
|---|---|---|---|
| `Client-Host-Angular` | Angular 17/20 + Module Federation + SCSS | **4200** | Host: Navbar (`/products`, `/users`, `/orders`) y orquestación de microfrontends remotos |
| `Microfrontend-Products-Angular` | Angular 20 + Clean Architecture + Module Federation | **4201** | Microfrontend: Gestión de Productos (expone `./routes` como `productsMfe`) |
| `Microservice-Products-Node` | Node.js + Express + TypeScript + Clean Architecture | **3001** | Microservicio: API REST de Productos con Swagger |
| `Microfrontend-Users-Angular` | Angular 17 + Clean Architecture + Module Federation | **4202** | Microfrontend: Gestión de Usuarios (expone `./routes` como `usersMfe`) |
| `Microservice-Users-SpringBoot` | Spring Boot 3 + Java 17 | **8081** | Microservicio: API REST de Usuarios con Swagger |
| `Microfrontend-Orders-Angular` | Angular 20 + Clean Architecture + Module Federation | **4203** | Microfrontend: Gestión de Órdenes (expone `./routes` como `ordersMfe`) |
| `Microservice-Orders-Node` | Node.js + Express + TypeScript + Clean Architecture | **3002** | Microservicio: API REST de Órdenes con Swagger |

---

## Client Host: `Client-Host-Angular` (puerto 4200)

Host colaborativo que integra los microfrontends remotos a través de Webpack Module Federation:

- `webpack.config.js`:
  - `usersMfe: 'http://localhost:4202/remoteEntry.js'`
  - `productsMfe: 'http://localhost:4201/remoteEntry.js'`
  - `ordersMfe: 'http://localhost:4203/remoteEntry.js'`
- `src/app/app.routes.ts`:
  - Ruta `/products` con `loadRemoteModule` (`exposedModule: './routes'`) cargando `PRODUCTS_ROUTES`.
  - Ruta `/users` con `loadRemoteModule` (`exposedModule: './routes'`) cargando `USERS_ROUTES`.
  - Ruta `/orders` con `loadRemoteModule` (`exposedModule: './routes'`) cargando `ORDERS_ROUTES`.
- `src/app/app.component.html`: Navbar con enlaces activos (`routerLinkActive="active"`) hacia `/products`, `/users` y `/orders`.

**Ejecución:**
```bash
cd Client-Host-Angular
npm install
npm start
```

---

## Módulo de Productos (Products)

### Microfrontend: `Microfrontend-Products-Angular` (puerto 4201)

Implementado bajo **Clean Architecture** estricta:

- **Dominio (`core/domain`)**:
  - Modelo `ProductModel` (`id`, `name`, `category`, `price`, `available`, `featured`).
  - Contrato abstracto `ProductRepository` utilizado como Injection Token en Angular.
- **Aplicación (`core/application/usecases`)**:
  - `GetAllProductsUseCase`: Ejecuta la obtención de todos los productos.
  - `GetAvailableProductsUseCase`: Obtiene únicamente productos con stock disponible (`available: true`).
  - `GetFeaturedProductsUseCase`: Obtiene únicamente productos destacados (`featured: true`).
- **Infraestructura (`core/infrastructure`)**:
  - `DataService`: Wrapper de `HttpClient` para peticiones HTTP con tipado estricto.
  - 3 Implementaciones intercambiables de `ProductRepository`:
    1. `ProductLocalRepositoryImpl`: Datos simulados en memoria (`products.mocks.ts`).
    2. `ProductNodeRepositoryImpl`: Consumo de la API Node.js (`http://localhost:3001/api/products`). **(Activa por defecto)**.
    3. `ProductSpringBootRepositoryImpl`: Consumo alternativo de Spring Boot (`http://localhost:8081/api/products`).
- **Presentación (`presentation`)**:
  - `ProductsPage` (Smart Component): Inyecta **únicamente** los 3 casos de uso, controla el estado reactivo (`State<ProductModel[]>`) y dispara los filtros mediante botones de acción.
  - `ProductsTableComponent` (Dumb Component): Recibe `@Input() products: ProductModel[]` y renderiza la tabla con badges para disponibilidad y destacados.
- **Pruebas y Calidad**:
  - Cobertura de pruebas unitarias en **Jest al 100%** (11 suites, 45 pruebas pasando).
  - Documentación técnica **Compodoc al 100%** con bloques JSDoc en español.

**Ejecución:**
```bash
cd Microfrontend-Products-Angular
npm install
npm start
npm test -- --coverage   # Jest: Cobertura 100% (> 90% exigido)
npm run doc              # Compodoc: Documentación 100%
```

---

### Microservicio: `Microservice-Products-Node` (puerto 3001)

API REST construida con Node.js, Express y TypeScript bajo **Clean Architecture**:

- **Dominio (`src/domain`)**:
  - Modelo `ProductModel` e interfaz `ProductRepository`.
- **Aplicación (`src/application/usecases`)**:
  - Casos de uso `GetAllProductsUseCase`, `GetAvailableProductsUseCase` y `GetFeaturedProductsUseCase`.
- **Infraestructura (`src/infrastructure/repositories`)**:
  - `ProductRepositoryImpl`: Generación de 15 productos realistas con `@faker-js/faker`, aplicando filtrado dinámico por `available` y `featured`.
- **Presentación (`src/presentation`)**:
  - Controlador `ProductsController` y enrutador `ProductsRoutes` montados bajo `/api/products`.
- **Swagger / OpenAPI**:
  - Esquema `Product` registrado y documentado en `/api/docs`.

**Endpoints:**

| Método | Ruta | Caso de Uso |
|---|---|---|
| `GET` | `http://localhost:3001/api/products` | Caso de uso 1: Todos los productos |
| `GET` | `http://localhost:3001/api/products/available` | Caso de uso 2: Productos con stock disponible |
| `GET` | `http://localhost:3001/api/products/featured` | Caso de uso 3: Productos destacados |

**Documentación Swagger:** `http://localhost:3001/api/docs`

**Ejecución:**
```bash
cd Microservice-Products-Node
npm install
npm run dev
```

---

## Módulo de Usuarios (Users)

### Microfrontend: `Microfrontend-Users-Angular` (puerto 4202)

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
npm test -- --coverage   # Jest: 10 suites, 31 tests, cobertura 100%
npm run doc              # Compodoc: documentación técnica 100%
```

---

### Microservicio: `Microservice-Users-SpringBoot` (puerto 8081)

API REST bajo Clean Architecture (`domain` → `application` → `infrastructure` → `presentation`), consumida por el microfrontend vía `http://localhost:8081/api/users`.

**Endpoints:**

| Método | Ruta | Caso de uso |
|---|---|---|
| `GET` | `http://localhost:8081/api/users` | Caso de uso 1: todos los usuarios |
| `GET` | `http://localhost:8081/api/users/active` | Caso de uso 2: usuarios activos |
| `GET` | `http://localhost:8081/api/users/admins` | Caso de uso 3: usuarios ADMIN |

**Documentación Swagger:** `http://localhost:8081/swagger-ui.html` (OpenAPI en `http://localhost:8081/api-docs`).

**Ejecución:**
```bash
cd Microservice-Users-SpringBoot
mvn spring-boot:run
```

---

## Módulo de Órdenes (Orders)

### Microfrontend: `Microfrontend-Orders-Angular` (puerto 4203)

Clean Architecture con las capas `core/domain`, `core/application`, `core/infrastructure` y `presentation`:

- **Dominio:** modelo `OrderModel` y contrato abstracto `OrderRepository`.
- **Aplicación:** los 3 casos de uso (`GetAllOrdersUseCase`, `GetPendingOrdersUseCase`, `GetCompletedOrdersUseCase`).
- **Infraestructura:** `DataService` (HttpClient) y tres implementaciones de `OrderRepository`: `local-implementation` (mocks), `node-implementation` (`http://localhost:3002/api`, activa por defecto) y `springboot-implementation` (`http://localhost:8082/api`).
- **Presentación:** `OrdersPage` (Smart Component que inyecta únicamente los 3 casos de uso), `OrdersTableComponent` (Dumb Component) y `AlertComponent`.
- **Pruebas y Calidad:** 11 suites, 46 pruebas en Jest al 100% de cobertura y Compodoc al 100%.

**Ejecución:**
```bash
cd Microfrontend-Orders-Angular
npm install
npm start
npm test -- --coverage   # Jest: 11 suites, 46 tests, cobertura 100%
npm run doc              # Compodoc: documentación técnica 100%
```

---

### Microservicio: `Microservice-Orders-Node` (puerto 3002)

API REST construida con Node.js, Express y TypeScript bajo **Clean Architecture**:

- **Dominio (`src/domain`)**: modelo `Order` e interfaz abstracta `OrderRepository`.
- **Aplicación (`src/application/usecases`)**: casos de uso `GetAllOrdersUseCase`, `GetPendingOrdersUseCase` y `GetCompletedOrdersUseCase`.
- **Infraestructura (`src/infrastructure/repositories`)**: `OrderRepositoryImpl` con datos generados mediante `@faker-js/faker`.
- **Presentación (`src/presentation`)**: `OrdersController` y `OrdersRoutes` montados bajo `/api/orders`.
- **Swagger / OpenAPI**: esquema `Order` registrado y documentado en `/api/docs`.

**Endpoints:**

| Método | Ruta | Caso de uso |
|---|---|---|
| `GET` | `http://localhost:3002/api/orders` | Caso de uso 1: todas las órdenes |
| `GET` | `http://localhost:3002/api/orders/pending` | Caso de uso 2: órdenes pendientes |
| `GET` | `http://localhost:3002/api/orders/completed` | Caso de uso 3: órdenes completadas |

**Documentación Swagger:** `http://localhost:3002/api/docs`

**Ejecución:**
```bash
cd Microservice-Orders-Node
npm install
npm start
```

---

## Ejecución completa del ecosistema (orden recomendado)

```bash
# 1. Levantar microservicios backend
cd Microservice-Products-Node && npm run dev                # Puerto 3001 (Node.js)
cd Microservice-Orders-Node && npm start                    # Puerto 3002 (Node.js)
cd Microservice-Users-SpringBoot && mvn spring-boot:run     # Puerto 8081 (Spring Boot)

# 2. Levantar microfrontends remotos
cd Microfrontend-Products-Angular && npm start              # Puerto 4201 (Angular)
cd Microfrontend-Users-Angular && npm start                 # Puerto 4202 (Angular)
cd Microfrontend-Orders-Angular && npm start                # Puerto 4203 (Angular)

# 3. Levantar Host integrador
cd Client-Host-Angular && npm start                         # Puerto 4200 (Host)
```

Navegar a `http://localhost:4200` para acceder a la aplicación integrada con navegación fluida entre **Productos** (`/products`), **Usuarios** (`/users`) y **Órdenes** (`/orders`).

---

## Ramas de Trabajo

| Rama | Contenido |
|---|---|
| `main` | Rama principal de producción |
| `develop` | Rama de integración de desarrollo |
| `microservice-products-node` | Microservicio de Productos (Node.js/Express/TypeScript, puerto 3001) |
| `microfrontend-products-angular` | Microfrontend de Productos (Angular 20, puerto 4201) |
| `client-host-angular` | Host Angular (puerto 4200) con Navbar, rutas federadas y documentación |
| `microservice-users-springboot` | Microservicio de Usuarios (Spring Boot, puerto 8081) |
| `microfrontend-users-angular` | Microfrontend de Usuarios (Angular 17, puerto 4202) |
| `microservice-orders-node` | Microservicio de Órdenes (Node.js/Express/TypeScript, puerto 3002) |
| `microfrontend-orders-angular` | Microfrontend de Órdenes (Angular 20, puerto 4203) |
| `modulo-orders` | Rama integrada del módulo de Órdenes (Microservicio + Microfrontend) |
