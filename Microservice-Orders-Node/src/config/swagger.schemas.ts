/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       description: Representa una orden de compra en el sistema
 *       required:
 *         - id
 *         - orderNumber
 *         - customerName
 *         - totalAmount
 *         - status
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           example: "d3b07384-d113-4632-a63e-6d43e5c70bf1"
 *         orderNumber:
 *           type: string
 *           example: "ORD-1001"
 *         customerName:
 *           type: string
 *           example: "Carlos Andrés Gómez"
 *         totalAmount:
 *           type: number
 *           example: 1250.50
 *         status:
 *           type: string
 *           enum:
 *             - PENDING
 *             - COMPLETED
 *           example: "PENDING"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-10-15T14:30:00.000Z"
 */
export {};