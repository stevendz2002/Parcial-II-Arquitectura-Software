import { faker } from "@faker-js/faker";
import { Product } from "../../domain/models/product.model";
import { ProductRepository } from "../../domain/repositories/product.repository";

/**
 * Implementación concreta en memoria del repositorio de Productos.
 *
 * @remarks
 * Esta clase pertenece a la capa de Infrastructure y genera dinámicamente 15 productos
 * simulados utilizando `@faker-js/faker`. Proporciona la persistencia simulada y
 * los filtros correspondientes a disponibilidad y productos destacados.
 */
export class ProductRepositoryImpl extends ProductRepository {
  /** Colección en memoria de productos generados dinámicamente */
  private readonly products: Product[];

  /**
   * Inicializa la instancia del repositorio generando 15 productos simulados.
   */
  constructor() {
    super();
    this.products = this.generateProducts(15);
  }

  /**
   * Genera una colección de 15 productos simulados utilizando Faker.
   *
   * @param count Cantidad de productos a generar en memoria.
   * @returns Arreglo de productos simulados con datos realistas y tipado estricto.
   */
  private generateProducts(count: number): Product[] {
    const list: Product[] = [];
    for (let i = 1; i <= count; i++) {
      list.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
        price: Number(faker.commerce.price({ min: 15, max: 1200, dec: 2 })),
        available: i % 3 !== 0, // Asegura productos disponibles (true) y agotados (false)
        featured: i % 2 === 0,  // Asegura productos destacados (true) y estándar (false)
      });
    }
    return list;
  }

  /**
   * Retorna la totalidad de los 15 productos generados.
   * @returns Promesa con el listado completo de productos.
   */
  async getAll(): Promise<Product[]> {
    return this.products;
  }

  /**
   * Retorna únicamente los productos con disponibilidad en inventario.
   * @returns Promesa con los productos filtrados por available === true.
   */
  async getAvailable(): Promise<Product[]> {
    return this.products.filter((product) => product.available === true);
  }

  /**
   * Retorna únicamente los productos catalogados como destacados.
   * @returns Promesa con los productos filtrados por featured === true.
   */
  async getFeatured(): Promise<Product[]> {
    return this.products.filter((product) => product.featured === true);
  }
}
