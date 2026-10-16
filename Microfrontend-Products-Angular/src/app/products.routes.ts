import { Routes } from '@angular/router';
import { ProductsPage } from './presentation/pages/products/products.page';
import { ProductRepository } from './core/domain/repositories/product.repository';
import { ProductNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/product-node.repository.impl';

/**
 * Configuración de rutas expuestas para el Microfrontend de Productos.
 *
 * @remarks
 * Provee la implementación de infraestructura `ProductNodeRepositoryImpl`
 * vinculada al contrato abstracto `ProductRepository` para resolver las dependencias
 * de los casos de uso al ser consumido de forma remota a través de Module Federation o localmente.
 */
export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductsPage,
    providers: [
      {
        provide: ProductRepository,
        useClass: ProductNodeRepositoryImpl,
      },
    ],
  },
];
