/**
 * Modelo de dominio que representa un Producto en el Microfrontend.
 *
 * @remarks
 * Esta interfaz pertenece a la capa de Domain y establece el contrato
 * de datos estricto para los productos, coincidiendo exactamente con el contrato del backend.
 */
export interface ProductModel {
  /** Identificador único universal (UUID) del producto */
  id: string;

  /** Nombre comercial o descriptivo del producto */
  name: string;

  /** Categoría a la que pertenece el producto */
  category: string;

  /** Precio unitario comercial del producto */
  price: number;

  /** Indica si el producto se encuentra disponible para venta */
  available: boolean;

  /** Indica si el producto está catalogado como destacado */
  featured: boolean;
}
