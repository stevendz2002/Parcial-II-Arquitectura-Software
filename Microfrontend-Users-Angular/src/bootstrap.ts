import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Bootstrap asíncrono del Microfrontend de Usuarios en el puerto 4202
 * para permitir la negociación de librerías compartidas en Module Federation.
 */
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
