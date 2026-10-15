import { OrderModel } from '../core/domain/models/order.model';

/**
 * Listado simulado de órdenes de compra utilizado para pruebas unitarias e implementación local en memoria.
 *
 * @remarks
 * Incluye registros tanto en estado 'PENDING' como en estado 'COMPLETED'
 * para validar los diferentes flujos y casos de uso del módulo.
 */
export const ORDERS_MOCK: OrderModel[] = [
  {
    id: 'ord-001-uuid',
    orderNumber: 'ORD-1001',
    customerName: 'Carlos Gómez',
    totalAmount: 150000,
    status: 'PENDING',
    createdAt: '2026-10-10T10:00:00.000Z',
  },
  {
    id: 'ord-002-uuid',
    orderNumber: 'ORD-1002',
    customerName: 'Laura Martínez',
    totalAmount: 320000,
    status: 'COMPLETED',
    createdAt: '2026-10-11T11:30:00.000Z',
  },
  {
    id: 'ord-003-uuid',
    orderNumber: 'ORD-1003',
    customerName: 'Andrés Felipe Restrepo',
    totalAmount: 78500,
    status: 'PENDING',
    createdAt: '2026-10-12T14:15:00.000Z',
  },
  {
    id: 'ord-004-uuid',
    orderNumber: 'ORD-1004',
    customerName: 'Valentina Soto',
    totalAmount: 450000,
    status: 'COMPLETED',
    createdAt: '2026-10-13T09:45:00.000Z',
  },
  {
    id: 'ord-005-uuid',
    orderNumber: 'ORD-1005',
    customerName: 'Juan Pablo Arango',
    totalAmount: 210000,
    status: 'PENDING',
    createdAt: '2026-10-14T16:20:00.000Z',
  },
];
