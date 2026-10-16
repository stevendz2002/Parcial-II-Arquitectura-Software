/**
 * Variables de entorno para el Microfrontend de Órdenes.
 *
 * @remarks
 * Contiene la configuración de los endpoints de backend disponibles:
 * microservicio en Node.js (puerto 3002) y microservicio en Spring Boot (puerto 8082).
 */
export const environment = {
  /** Indica si la aplicación se ejecuta en modo de producción */
  production: false,
  /** URL base de la API del microservicio en Node.js (Puerto 3002) */
  apiUrlNode: 'http://localhost:3002/api',
  /** URL base de la API del microservicio en Spring Boot (Puerto 8082) */
  apiUrlSpringBoot: 'http://localhost:8082/api',
};
