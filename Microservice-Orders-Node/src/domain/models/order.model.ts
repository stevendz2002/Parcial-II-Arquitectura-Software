/**
 * Estado que puede tomar una orden dentro del sistema.
 */
export type OrderStatus = 'PENDING' | 'COMPLETED';

/**
 * Modelo de dominio que representa una Orden de compra.
 *
 * @remarks
 * Esta entidad pertenece a la capa de Domain y define los datos
 * esenciales de una orden comercial.
 */
export interface Order {
  /** Identificador único de la orden */
  id: string;
  /** Número o código comercial de la orden */
  orderNumber: string;
  /** Nombre completo del cliente que realizó la orden */
  customerName: string;
  /** Monto total de la orden */
  totalAmount: number;
  /** Estado actual de la orden ('PENDING' o 'COMPLETED') */
  status: 'PENDING' | 'COMPLETED';
  /** Fecha y hora de creación de la orden en formato ISO string */
  createdAt: string;
}
