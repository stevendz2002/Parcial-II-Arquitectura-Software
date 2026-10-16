import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Punto de entrada (bootstrap) del Microfrontend de Usuarios en el puerto 4202.
 */
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
