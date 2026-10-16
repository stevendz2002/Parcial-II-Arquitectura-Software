/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       description: Representa un producto dentro del catálogo del sistema
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *         - available
 *         - featured
 *       properties:
 *         id:
 *           type: string
 *           example: "d3b07384-d113-4632-a63e-6d43e5c70bf1"
 *         name:
 *           type: string
 *           example: "Laptop Gamer Ultra Pro"
 *         category:
 *           type: string
 *           example: "Computación"
 *         price:
 *           type: number
 *           example: 1450.99
 *         available:
 *           type: boolean
 *           example: true
 *         featured:
 *           type: boolean
 *           example: true
 */
export {};
