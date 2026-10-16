import { Request, Response } from "express";
import { GetAllOrdersUseCase } from "../../../application/usecases/get-all-orders.usecase";
import { GetPendingOrdersUseCase } from "../../../application/usecases/get-pending-orders.usecase";
import { GetCompletedOrdersUseCase } from "../../../application/usecases/get-completed-orders.usecase";
import { HandleError } from "../../../domain/erros/handle.error";

/**
 * Controlador de órdenes de la aplicación Express.
 *
 * @remarks
 * Maneja las peticiones HTTP delegando la lógica de negocio a los casos de uso
 * correspondientes y capturando posibles excepciones con HandleError.
 */
export class OrdersController {
  /**
   * Crea una nueva instancia del controlador inyectando los casos de uso.
   * @param getAllOrdersUseCase Caso de uso para obtener todas las órdenes.
   * @param getPendingOrdersUseCase Caso de uso para obtener órdenes pendientes.
   * @param getCompletedOrdersUseCase Caso de uso para obtener órdenes completadas.
   */
  constructor(
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly getPendingOrdersUseCase: GetPendingOrdersUseCase,
    private readonly getCompletedOrdersUseCase: GetCompletedOrdersUseCase
  ) {}

  /**
   * Manejador HTTP para obtener la totalidad de las órdenes.
   * @param req Objeto de petición Express.
   * @param res Objeto de respuesta Express.
   */
  getAll = (req: Request, res: Response): void => {
    this.getAllOrdersUseCase
      .execute()
      .then((orders) => res.status(200).json(orders))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Manejador HTTP para obtener únicamente las órdenes pendientes.
   * @param req Objeto de petición Express.
   * @param res Objeto de respuesta Express.
   */
  getPending = (req: Request, res: Response): void => {
    this.getPendingOrdersUseCase
      .execute()
      .then((orders) => res.status(200).json(orders))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Manejador HTTP para obtener únicamente las órdenes completadas.
   * @param req Objeto de petición Express.
   * @param res Objeto de respuesta Express.
   */
  getCompleted = (req: Request, res: Response): void => {
    this.getCompletedOrdersUseCase
      .execute()
      .then((orders) => res.status(200).json(orders))
      .catch((error) => HandleError.error(error, res));
  };
}
