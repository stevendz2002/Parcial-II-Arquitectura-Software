import "dotenv/config";
import { get } from "env-var";

/**
 * Variables de entorno utilizadas por el microservicio de productos.
 *
 * @remarks
 * Este objeto centraliza la lectura y validación de las variables
 * de entorno requeridas por el servidor HTTP.
 */
export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
};
