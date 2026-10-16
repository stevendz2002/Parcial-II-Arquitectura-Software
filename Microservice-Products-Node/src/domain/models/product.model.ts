/**
 * Modelo de dominio que representa un Producto en el sistema.
 *
 * @remarks
 * Esta entidad pertenece a la capa de Domain y define el contrato de datos
 * esencial para un producto, compartido de forma idéntica entre Backend y Frontend.
 */
export interface Product {
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
