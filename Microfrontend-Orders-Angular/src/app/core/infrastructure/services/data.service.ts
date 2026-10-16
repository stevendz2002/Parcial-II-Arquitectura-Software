import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio genérico de infraestructura para realizar peticiones HTTP.
 *
 * @remarks
 * Encapsula las operaciones del cliente HTTP de Angular para que los repositorios
 * de infraestructura consuman endpoints de forma uniforme y desacoplada.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  /** Cliente HTTP de Angular inyectado */
  private readonly http = inject(HttpClient);

  /**
   * Realiza una petición GET tipada hacia la dirección especificada.
   * @param url Dirección completa del endpoint a consumir.
   * @returns Observable con la respuesta tipada obtenida del backend.
   */
  getAll<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
