import { Router } from "express";
import { GetAllProductsUseCase } from "../../../application/usecases/get-all-products.usecase";
import { GetAvailableProductsUseCase } from "../../../application/usecases/get-available-products.usecase";
import { GetFeaturedProductsUseCase } from "../../../application/usecases/get-featured-products.usecase";
import { ProductRepositoryImpl } from "../../../infrastructure/repositories/product.repository.impl";
import { ProductsController } from "./products.controller";

/**
 * Enrutador y documentación OpenAPI para el módulo de Productos.
 */
export class ProductsRoutes {
  /**
   * Configura las rutas Express y sus anotaciones OpenAPI correspondientes.
   * @returns Instancia de Express Router con los endpoints de productos.
   */
  static get routes(): Router {
    const router = Router();

    const productRepository = new ProductRepositoryImpl();
    const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
    const getAvailableProductsUseCase = new GetAvailableProductsUseCase(productRepository);
    const getFeaturedProductsUseCase = new GetFeaturedProductsUseCase(productRepository);

    const controller = new ProductsController(
      getAllProductsUseCase,
      getAvailableProductsUseCase,
      getFeaturedProductsUseCase
    );

    /**
     * @openapi
     * /api/products:
     *   get:
     *     summary: Caso de Uso 1 - Obtener todos los productos
     *     description: Retorna el listado completo de productos registrados en el catálogo.
     *     tags:
     *       - Products
     *     responses:
     *       200:
     *         description: Listado completo de productos retornado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       500:
     *         description: Error interno del servidor al procesar la solicitud
     */
    router.get("/", controller.getAll);

    /**
     * @openapi
     * /api/products/available:
     *   get:
     *     summary: Caso de Uso 2 - Obtener productos disponibles
     *     description: Retorna únicamente los productos con inventario disponible (available === true).
     *     tags:
     *       - Products
     *     responses:
     *       200:
     *         description: Listado de productos disponibles retornado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       500:
     *         description: Error interno del servidor al procesar la solicitud
     */
    router.get("/available", controller.getAvailable);

    /**
     * @openapi
     * /api/products/featured:
     *   get:
     *     summary: Caso de Uso 3 - Obtener productos destacados
     *     description: Retorna únicamente los productos clasificados como destacados (featured === true).
     *     tags:
     *       - Products
     *     responses:
     *       200:
     *         description: Listado de productos destacados retornado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       500:
     *         description: Error interno del servidor al procesar la solicitud
     */
    router.get("/featured", controller.getFeatured);

    return router;
  }
}
