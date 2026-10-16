import { Routes } from '@angular/router';
import { ProductsPage } from './presentation/pages/products/products.page';
import { ProductRepository } from './core/domain/repositories/product.repository';
import { ProductNodeRepositoryImpl } from './core/infrastructure/repositories/node-implementation/product-node.repository.impl';
import { GetAllProductsUseCase } from './core/application/usecases/get-all-products.usecase';
import { GetAvailableProductsUseCase } from './core/application/usecases/get-available-products.usecase';
import { GetFeaturedProductsUseCase } from './core/application/usecases/get-featured-products.usecase';

/**
 * Configuración de rutas expuestas para el Microfrontend de Productos.
 *
 * @remarks
 * Provee la implementación de infraestructura `ProductNodeRepositoryImpl`
 * vinculada al contrato abstracto `ProductRepository` junto con los casos de uso
 * en el inyector de la ruta para resolver las dependencias al ser consumido
 * de forma remota a través de Module Federation o localmente.
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
      GetAllProductsUseCase,
      GetAvailableProductsUseCase,
      GetFeaturedProductsUseCase,
    ],
  },
];
