import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../../../domain/models/order.model';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { DataService } from '../../services/data.service';
import { environment } from '../../../../../environments/environment';

/**
 * Implementación del repositorio de Órdenes para el microservicio en Node.js (Express).
 *
 * @remarks
 * Esta clase consume los endpoints expuestos en el puerto 3002 mediante `DataService`.
 */
@Injectable({
  providedIn: 'root',
})
export class OrderNodeRepositoryImpl implements OrderRepository {
  /** Servicio HTTP genérico de infraestructura */
  private readonly dataService = inject(DataService);
  /** URL base para los endpoints de órdenes en Node.js */
  private readonly apiUrl = `${environment.apiUrlNode}/orders`;

  /**
   * Obtiene todas las órdenes consumiendo el endpoint principal de Node.js.
   * @returns Observable con el listado completo de órdenes.
   */
  getAll(): Observable<OrderModel[]> {
    return this.dataService.getAll<OrderModel[]>(this.apiUrl);
  }

  /**
   * Obtiene las órdenes pendientes desde el endpoint /orders/pending de Node.js.
   * @returns Observable con las órdenes en estado 'PENDING'.
   */
  getPending(): Observable<OrderModel[]> {
    return this.dataService.getAll<OrderModel[]>(`${this.apiUrl}/pending`);
  }

  /**
   * Obtiene las órdenes completadas desde el endpoint /orders/completed de Node.js.
   * @returns Observable con las órdenes en estado 'COMPLETED'.
   */
  getCompleted(): Observable<OrderModel[]> {
    return this.dataService.getAll<OrderModel[]>(`${this.apiUrl}/completed`);
  }
}
