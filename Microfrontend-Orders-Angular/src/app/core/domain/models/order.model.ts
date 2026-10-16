/**
 * Estados permitidos para una orden de compra dentro del sistema.
 */
export type OrderStatus = 'PENDING' | 'COMPLETED';

/**
 * Modelo de dominio que representa una Orden en la capa de negocio.
 *
 * @remarks
 * Esta interfaz define la estructura del contrato de dominio para las órdenes
 * comerciales manipuladas a través del microfrontend y microservicios.
 */
export interface OrderModel {
  /** Identificador único universal de la orden */
  id: string;
  /** Código o número de referencia de la orden comercial */
  orderNumber: string;
  /** Nombre completo del cliente que realizó la compra */
  customerName: string;
  /** Monto total facturado en la orden */
  totalAmount: number;
  /** Estado de procesamiento actual de la orden ('PENDING' o 'COMPLETED') */
  status: 'PENDING' | 'COMPLETED';
  /** Fecha y hora de creación de la orden en formato ISO 8601 */
  createdAt: string;
}
