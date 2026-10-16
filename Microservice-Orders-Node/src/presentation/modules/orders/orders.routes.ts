import { Router } from "express";
import { GetAllOrdersUseCase } from "../../../application/usecases/get-all-orders.usecase";
import { GetPendingOrdersUseCase } from "../../../application/usecases/get-pending-orders.usecase";
import { GetCompletedOrdersUseCase } from "../../../application/usecases/get-completed-orders.usecase";
import { OrderRepositoryImpl } from "../../../infrastructure/repositories/order.repository.impl";
import { OrdersController } from "./orders.controller";

/**
 * Definición de rutas Express para el módulo de órdenes.
 */
export class OrdersRoutes {
  /**
   * Configura y devuelve el router con los endpoints de órdenes y documentación OpenAPI.
   * @returns Instancia de Express Router con los endpoints configurados.
   */
  static get routes(): Router {
    const router = Router();

    const orderRepository = new OrderRepositoryImpl();
    const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
    const getPendingOrdersUseCase = new GetPendingOrdersUseCase(orderRepository);
    const getCompletedOrdersUseCase = new GetCompletedOrdersUseCase(orderRepository);

    const controller = new OrdersController(
      getAllOrdersUseCase,
      getPendingOrdersUseCase,
      getCompletedOrdersUseCase
    );

    /**
     * @openapi
     * /api/orders:
     *   get:
     *     summary: Caso de Uso 1 - Obtener todas las órdenes
     *     description: Retorna el listado completo de órdenes registradas.
     *     tags:
     *       - Orders
     *     responses:
     *       200:
     *         description: Listado completo de órdenes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Order'
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/", controller.getAll);

    /**
     * @openapi
     * /api/orders/pending:
     *   get:
     *     summary: Caso de Uso 2 - Obtener órdenes pendientes
     *     description: Retorna únicamente las órdenes en estado PENDING.
     *     tags:
     *       - Orders
     *     responses:
     *       200:
     *         description: Listado de órdenes pendientes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Order'
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/pending", controller.getPending);

    /**
     * @openapi
     * /api/orders/completed:
     *   get:
     *     summary: Caso de Uso 3 - Obtener órdenes completadas
     *     description: Retorna únicamente las órdenes en estado COMPLETED.
     *     tags:
     *       - Orders
     *     responses:
     *       200:
     *         description: Listado de órdenes completadas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Order'
     *       500:
     *         description: Error interno del servidor
     */
    router.get("/completed", controller.getCompleted);

    return router;
  }
}
