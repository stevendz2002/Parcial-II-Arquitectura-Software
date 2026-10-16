import { ProductModel } from '../core/domain/models/product.model';

/**
 * Listado simulado de productos de prueba para implementación local en memoria y pruebas unitarias.
 *
 * @remarks
 * Contiene una colección fija de 5 productos con combinaciones variadas de disponibilidad (`available`)
 * y destacados (`featured`) para probar exhaustivamente los casos de uso y las vistas.
 */
export const PRODUCTS_MOCK: ProductModel[] = [
  {
    id: 'prod-001-uuid',
    name: 'Teclado Mecánico RGB Inalámbrico',
    category: 'Tecnología',
    price: 350.5,
    available: true,
    featured: true,
  },
  {
    id: 'prod-002-uuid',
    name: 'Monitor Curvo Gaming 27 pulgadas',
    category: 'Computación',
    price: 890.0,
    available: true,
    featured: false,
  },
  {
    id: 'prod-003-uuid',
    name: 'Mouse Ergonómico Recargable',
    category: 'Tecnología',
    price: 120.75,
    available: false,
    featured: true,
  },
  {
    id: 'prod-004-uuid',
    name: 'Silla Ergonómica de Oficina',
    category: 'Muebles',
    price: 650.0,
    available: true,
    featured: true,
  },
  {
    id: 'prod-005-uuid',
    name: 'Auriculares con Cancelación de Ruido',
    category: 'Audio',
    price: 240.25,
    available: false,
    featured: false,
  },
];
