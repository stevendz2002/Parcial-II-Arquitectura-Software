import cors from "cors";
import express, { Router } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger";
import { Options } from "../domain/interfaces/server.interface";

/**
 * Servidor Express para el microservicio de productos.
 *
 * @remarks
 * Esta clase centraliza la configuración del servidor HTTP, middlewares,
 * documentación Swagger y enrutamiento bajo Clean Architecture.
 */
export class Server {
  /** Instancia de la aplicación Express */
  public readonly app = express();

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  /**
   * Crea una nueva instancia del servidor Express.
   * @param options Opciones de configuración (puerto, directorio público, rutas).
   */
  constructor(options: Options) {
    const { port, publicPath, routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  /**
   * Inicializa y levanta el servidor HTTP.
   */
  async start(): Promise<void> {
    //* Middlewares
    this.app.use(cors());
    this.app.use(express.json());

    //* Carpeta estática pública
    this.app.use(express.static(this.publicPath));

    //* Rutas de la API
    this.app.use(this.routes);

    //* Documentación Swagger UI en /api/docs
    this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //* SPA Fallback
    this.app.use((req, res) => {
      res.sendFile(
        path.join(__dirname, `../../${this.publicPath}/index.html`)
      );
    });

    this.app.listen(this.port, () => {
      console.log(`Microservice Products Running on Port ${this.port}`);
    });
  }
}
