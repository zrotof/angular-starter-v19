import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import Lara from '@primeng/themes/lara';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(FontAwesomeModule),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          theme: 'lara-light-blue',
          darkModeSelector: false,
        }
      }
    })
  ]
}

