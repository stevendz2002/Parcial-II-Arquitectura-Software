import { Request, Response } from "express";
import { GetAllProductsUseCase } from "../../../application/usecases/get-all-products.usecase";
import { GetAvailableProductsUseCase } from "../../../application/usecases/get-available-products.usecase";
import { GetFeaturedProductsUseCase } from "../../../application/usecases/get-featured-products.usecase";
import { HandleError } from "../../../domain/erros/handle.error";

/**
 * Controlador HTTP para el módulo de Productos.
 *
 * @remarks
 * Atiende las peticiones HTTP delegando la lógica en los tres casos de uso
 * correspondientes y capturando excepciones mediante el manejador centralizado HandleError.
 */
export class ProductsController {
  /**
   * Crea una nueva instancia del controlador inyectando los 3 casos de uso.
   * @param getAllProductsUseCase Caso de uso para obtener todos los productos.
   * @param getAvailableProductsUseCase Caso de uso para obtener productos disponibles.
   * @param getFeaturedProductsUseCase Caso de uso para obtener productos destacados.
   */
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getAvailableProductsUseCase: GetAvailableProductsUseCase,
    private readonly getFeaturedProductsUseCase: GetFeaturedProductsUseCase
  ) {}

  /**
   * Manejador HTTP para obtener la totalidad de productos (GET /api/products).
   * @param req Objeto de petición Express.
   * @param res Objeto de respuesta Express.
   */
  getAll = (req: Request, res: Response): void => {
    this.getAllProductsUseCase
      .execute()
      .then((products) => res.status(200).json(products))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Manejador HTTP para obtener productos con stock disponible (GET /api/products/available).
   * @param req Objeto de petición Express.
   * @param res Objeto de respuesta Express.
   */
  getAvailable = (req: Request, res: Response): void => {
    this.getAvailableProductsUseCase
      .execute()
      .then((products) => res.status(200).json(products))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Manejador HTTP para obtener productos destacados (GET /api/products/featured).
   * @param req Objeto de petición Express.
   * @param res Objeto de respuesta Express.
   */
  getFeatured = (req: Request, res: Response): void => {
    this.getFeaturedProductsUseCase
      .execute()
      .then((products) => res.status(200).json(products))
      .catch((error) => HandleError.error(error, res));
  };
}
