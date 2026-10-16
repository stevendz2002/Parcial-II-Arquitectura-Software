import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

/**
 * Función principal que instancia y arranca el microservicio de productos.
 */
function main(): void {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });
  server.start();
}

/**
 * Inicialización inmediata del microservicio.
 */
(async () => {
  main();
})();
