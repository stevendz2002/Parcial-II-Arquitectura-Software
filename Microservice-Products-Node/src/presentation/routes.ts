import { Router } from "express";
import { ProductsRoutes } from "./modules/products/products.routes";

/**
 * Enrutador principal de la aplicación.
 *
 * @remarks
 * Centraliza las rutas de los distintos módulos del microservicio.
 */
export class AppRoutes {
  /**
   * Retorna el router principal con el módulo de productos registrado.
   * @returns Instancia de Express Router con /api/products montado.
   */
  static get routes(): Router {
    const router = Router();

    // Registrar rutas del módulo de productos
    router.use("/api/products", ProductsRoutes.routes);

    return router;
  }
}
