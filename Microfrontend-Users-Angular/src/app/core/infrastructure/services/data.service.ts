import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio genérico de infraestructura para realizar peticiones HTTP.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  /** Cliente HTTP de Angular */
  private readonly http = inject(HttpClient);

  /**
   * Realiza una petición GET tipada hacia la URL especificada.
   * @param url Dirección del endpoint a consultar.
   * @returns Observable con la respuesta tipada T.
   */
  getAll<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
