/**
 * Variables de entorno para el Microfrontend de Productos.
 *
 * @remarks
 * Contiene la configuración de los endpoints de backend disponibles:
 * microservicio en Node.js (puerto 3001) y microservicio en Spring Boot (puerto 8081).
 */
export const environment = {
  /** Indica si la aplicación se ejecuta en modo de producción */
  production: false,

  /** URL base de la API del microservicio en Node.js (Puerto 3001) */
  apiUrlNode: 'http://localhost:3001/api',

  /** URL base de la API del microservicio en Spring Boot (Puerto 8081) */
  apiUrlSpringBoot: 'http://localhost:8081/api',
};
