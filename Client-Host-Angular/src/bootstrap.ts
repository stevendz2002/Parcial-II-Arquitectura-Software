import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Bootstrap asíncrono del Host para permitir la negociación de librerías compartidas (Module Federation).
 */
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
