import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from "@primeuix/themes/aura"
import { definePreset } from '@primeuix/themes';

const auraLightPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: 'indigo',
        accent: 'lime',
        surface: 'indigo',
        text: 'gray.900',
      },
      dark: {
        primary: 'indigo',
        accent: 'lime',
        surface: 'indigo',
        text: 'gray.100',
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: auraLightPreset
      }
    })
  ]
};
