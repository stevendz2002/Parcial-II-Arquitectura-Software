import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Especificación de Swagger (OpenAPI) para la API de Productos.
 *
 * @remarks
 * Este objeto configura Swagger mediante `swagger-jsdoc`,
 * generando automáticamente la documentación OpenAPI a partir
 * de comentarios JSDoc presentes en los archivos de rutas.
 */
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Microservicio de Productos NodeJS',
      version: '1.0.0',
      description: 'Documentación de la API de Productos con Swagger OpenAPI bajo Clean Architecture',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: [
    './src/presentation/modules/**/*.routes.ts',
    './src/config/swagger.schemas.ts',
  ],
});
