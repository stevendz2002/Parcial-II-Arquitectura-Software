import { Router } from "express";
import { GetAllProductsUseCase } from "../../../application/usecases/get-all-products.usecase";
import { GetAvailableProductsUseCase } from "../../../application/usecases/get-available-products.usecase";
import { GetFeaturedProductsUseCase } from "../../../application/usecases/get-featured-products.usecase";
import { ProductRepositoryImpl } from "../../../infrastructure/repositories/product.repository.impl";
import { ProductsController } from "./products.controller";

/**
 * Rutas Express para el módulo de Productos.
 */
export class ProductsRoutes {
  /**
   * Configura e instancia las dependencias y endpoints del router de productos.
   * @returns Router configurado con los 3 endpoints de productos.
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

    router.get("/", controller.getAll);
    router.get("/available", controller.getAvailable);
    router.get("/featured", controller.getFeatured);

    return router;
  }
}
