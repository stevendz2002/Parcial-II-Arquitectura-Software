import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsUseCase } from '../../../core/application/usecases/get-all-products.usecase';
import { GetAvailableProductsUseCase } from '../../../core/application/usecases/get-available-products.usecase';
import { GetFeaturedProductsUseCase } from '../../../core/application/usecases/get-featured-products.usecase';
import { ProductModel } from '../../../core/domain/models/product.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Página principal contenedora del módulo de productos (Smart Component).
 *
 * @remarks
 * Esta página gestiona el estado asíncrono y la interacción con los 3 casos de uso del dominio:
 * consulta de todos los productos, productos con disponibilidad y productos destacados.
 * Únicamente inyecta casos de uso respetando las reglas estrictas de Clean Architecture.
 */
@Component({
  selector: 'app-products-page',
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
  imports: [CommonModule, ProductsTableComponent, AlertComponent],
})
export class ProductsPage implements OnInit {
  /** Caso de uso inyectado para obtener todos los productos */
  private readonly getAllProductsUseCase = inject(GetAllProductsUseCase);

  /** Caso de uso inyectado para obtener productos disponibles */
  private readonly getAvailableProductsUseCase = inject(GetAvailableProductsUseCase);

  /** Caso de uso inyectado para obtener productos destacados */
  private readonly getFeaturedProductsUseCase = inject(GetFeaturedProductsUseCase);

  /** Listado actual de productos cargados */
  products: ProductModel[] = [];

  /** Estado actual del flujo de carga de datos */
  state: State = 'init';

  /** Filtro de productos activo actualmente ('ALL', 'AVAILABLE' o 'FEATURED') */
  activeFilter: 'ALL' | 'AVAILABLE' | 'FEATURED' = 'ALL';

  /** Mensaje de error para desplegar en caso de fallo */
  errorMessage: string = '';

  /**
   * Ciclo de vida de inicialización de Angular. Carga por defecto todos los productos.
   */
  ngOnInit(): void {
    this.loadAllProducts();
  }

  /**
   * Carga la totalidad de los productos ejecutando GetAllProductsUseCase.
   */
  loadAllProducts(): void {
    this.activeFilter = 'ALL';
    this.state = 'loading';
    this.getAllProductsUseCase.execute().subscribe({
      next: (products) => {
        this.products = products;
        this.state = 'success';
      },
      error: () => {
        this.products = [];
        this.state = 'error';
        this.errorMessage = 'Ocurrió un error al cargar todos los productos.';
      },
    });
  }

  /**
   * Carga únicamente los productos disponibles ejecutando GetAvailableProductsUseCase.
   */
  loadAvailableProducts(): void {
    this.activeFilter = 'AVAILABLE';
    this.state = 'loading';
    this.getAvailableProductsUseCase.execute().subscribe({
      next: (products) => {
        this.products = products;
        this.state = 'success';
      },
      error: () => {
        this.products = [];
        this.state = 'error';
        this.errorMessage = 'Ocurrió un error al cargar los productos disponibles.';
      },
    });
  }

  /**
   * Carga únicamente los productos destacados ejecutando GetFeaturedProductsUseCase.
   */
  loadFeaturedProducts(): void {
    this.activeFilter = 'FEATURED';
    this.state = 'loading';
    this.getFeaturedProductsUseCase.execute().subscribe({
      next: (products) => {
        this.products = products;
        this.state = 'success';
      },
      error: () => {
        this.products = [];
        this.state = 'error';
        this.errorMessage = 'Ocurrió un error al cargar los productos destacados.';
      },
    });
  }
}
